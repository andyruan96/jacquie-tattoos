'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ZodParsedType, z } from 'zod';
import nodemailer from 'nodemailer';
import {
  EmailTemplate,
  EmailTemplateSingleFormResponse,
  EmailTemplateQuestionKey,
  EmailTemplateAnswerKey,
  EmailTemplateFormResponsesKey,
} from './email-template';
import Mail from 'nodemailer/lib/mailer';
import sanitize from 'sanitize-html';
import { createReadStream, writeFile, writeFileSync } from 'fs';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { Readable } from 'node:stream';

const BookingFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  preferredName: z.string(),
  pronoun: z.string(),
  instagram: z.string(),
  phone: z.string().min(10),
  dob: z.string().date(),
  type: z.enum(['custom', 'flash']),
  description: z.string().min(1),
  size: z.coerce.number().gt(0),
  placement: z.string().min(1),
  availability: z
    .enum(['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Friday'])
    .array()
    .min(1),
  time: z.string(),
  budget: z.string().min(1),
  previousClient: z.enum(['Yes', 'No']),
  medical1: z.enum(['Yes', 'No']),
  medical2: z.string(),
  moreInfo: z.string(),
});

type ParsedBookingForm = {
  email: string;
  name: string;
  preferredName: string;
  pronoun: string;
  instagram: string;
  phone: string;
  dob: string;
  type: 'custom' | 'flash';
  description: string;
  size: number;
  placement: string;
  availability: ('Sunday' | 'Monday' | 'Wednesday' | 'Thursday' | 'Friday')[];
  time: string;
  budget: string;
  previousClient: 'Yes' | 'No';
  medical1: 'Yes' | 'No';
  medical2: string;
  moreInfo: string;
};

// This is temporary until @types/react-dom is updated
export type State = {
  errors: {
    [key: string]: string[];
  };
  message?: string | null;
};

export async function sendBookingForm(
  gRecaptchaToken: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  if (!(await checkRecaptcha(gRecaptchaToken))) {
    throw new Error('Failed Recaptcha');
  }

  const files = formData.getAll('file') as File[];

  const validatedFields = await BookingFormSchema.safeParseAsync({
    email: formData.get('email'),
    name: formData.get('name'),
    preferredName: formData.get('preferredName'),
    pronoun: formData.get('pronoun'),
    instagram: formData.get('instagram'),
    phone: formData.get('phone'),
    dob: formData.get('dob'),
    type: formData.get('type'),
    description: formData.get('description'),
    size: formData.get('size'),
    placement: formData.get('placement'),
    availability: formData.getAll('availability'),
    time: formData.get('time'),
    budget: formData.get('budget'),
    previousClient: formData.get('previousClient'),
    medical1: formData.get('medical1'),
    medical2: formData.get('medical2'),
    moreInfo: formData.get('moreInfo'),
  });

  console.log(validatedFields);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Form validation failed.',
    };
  }

  // process data
  const emailHtml = generateEmailFormResponseHtml(validatedFields.data);
  console.log(emailHtml);

  // TODO: preview without email
  writeFileSync(
    'C:/Users/andyr/projects/jacquie-tattoos/email-test.html',
    emailHtml,
  );

  // await uploadToDrive(files);
  // await appendToSheet(validatedFields.data, []);

  // if (await sendMail(emailHtml, files)) {
  //   // revalidatePath('/booking');
  //   // redirect('/');
  //   return { message: 'Form Processed Successfully.', errors: {} };
  // } else {
  //   return {
  //     message: 'Email failed to send.',
  //     errors: { server: ['Email failed to send'] },
  //   };
  // }

  return { message: 'Form Processed Successfully.', errors: {} };
}

async function sendMail(html: string, files?: File[]) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: 'your_email@gmail.com', // sending from gmail app -- this has no affect
    to: 'andyruan@hotmail.ca',
    subject: 'Hello from Jacquie!',
    // text: 'This is a test email sent using Nodemailer.',
    html,
  };

  if (files?.length && files[0].size > 0) {
    const attachments = await Promise.all(
      (files ?? []).map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    mailOptions.attachments = attachments;
  }

  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const formResponseConfig: { key: keyof ParsedBookingForm; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name' },
  { key: 'preferredName', label: 'Preferred Name' },
  { key: 'pronoun', label: 'Pronoun' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'phone', label: 'Phone' },
  { key: 'dob', label: 'Date of Birth' },
  { key: 'type', label: 'Custom or Flash' },
  { key: 'description', label: 'Design Description' },
  { key: 'size', label: 'Size (In Inches)' },
  { key: 'placement', label: 'Body Placement' },
  { key: 'availability', label: 'Availability' },
  { key: 'time', label: 'Time Specification' },
  { key: 'budget', label: 'Budget' },
  { key: 'previousClient', label: 'Have I tattooed you before?' },
  {
    key: 'medical1',
    label: 'Do you have any medical conditions or allergies?',
  },
  { key: 'medical2', label: 'Medical condition details' },
  { key: 'moreInfo', label: 'Anything else I should know about?' },
];

function generateEmailFormResponseHtml(validatedFieldsData: ParsedBookingForm) {
  const formResponses = formResponseConfig.reduce((acc, cur) => {
    const responseField = validatedFieldsData[cur.key];

    return responseField
      ? `${acc}${EmailTemplateSingleFormResponse.replace(EmailTemplateQuestionKey, cur.label).replace(EmailTemplateAnswerKey, sanitize(responseField.toString()))}`
      : acc;
  }, '');

  return EmailTemplate.replace(EmailTemplateFormResponsesKey, formResponses);
}

async function checkRecaptcha(gRecaptchaToken: string) {
  const gRecaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!gRecaptchaSecretKey) {
    console.log('missing google recaptcha secret key');
    return false;
  }

  const gRecaptchaFormData = `secret=${gRecaptchaSecretKey}&response=${gRecaptchaToken}`;
  console.log(gRecaptchaFormData);

  let res;
  try {
    res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?${gRecaptchaFormData}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const response = await res.json();
    if (response.success && response.score > 0.5) {
      console.log(`recaptcha passed with score of ${response.score}`);
      return true;
    } else {
      console.log(
        `failed recaptcha with score of  ${response.score}`,
        response,
      );
      return false;
    }
  } catch (e) {
    console.log('issue sending request to recaptcha service');
    return false;
  }
}

async function uploadToDrive(files?: File[]) {
  if (!files?.length || files[0].size <= 0) {
    // no files to upload
    return;
  }

  const auth = new OAuth2Client({
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    credentials: {
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    },
  });

  const service = google.drive({ version: 'v3', auth: auth });

  const fileIds = [];
  for (const file of files) {
    const requestBody = {
      name: file.name,
      fields: 'id',
      parents: [`${process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID}`],
    };

    const buffer = Buffer.from(await file.arrayBuffer());

    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    try {
      const file = await service.files.create({
        requestBody,
        media: media,
      });
      console.log('File Id:', file.data.id);
      fileIds.push(file.data.id);
    } catch (err) {
      // TODO(developer) - Handle error
      console.log('issue uploading to drive');
      throw err;
    }
  }

  return fileIds;
}

const sheetValueOrderConfig = [
  () => new Date().toISOString(),
  'email',
  'name',
  'pronoun',
  'email',
  'instagram',
  'phone',
  'dob',
  'type',
  'description',
  // ref pics
  ({ fileIds }) =>
    (fileIds as string[])
      .map((fileId) => `https://drive.google.com/open?id=${fileId}`)
      .join(),
  'size',
  'placement',
  'availability',
  'time',
  'budget',
  'previousClient',
  'medical1',
  'medical2',
  'moreInfo',
  'preferredName',
  // visiting outside van
  () => '',
] satisfies (
  | keyof ParsedBookingForm
  | ((args: Record<string, unknown>) => string)
)[];

async function appendToSheet(
  validatedFieldsData: ParsedBookingForm,
  fileIds: string[],
) {
  const auth = new OAuth2Client({
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    credentials: {
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
    },
  });

  const service = google.sheets({ version: 'v4', auth });
  const values = [
    sheetValueOrderConfig.map((key) => {
      if (typeof key === 'string') {
        return validatedFieldsData[key]?.toString() ?? '';
      } else {
        return key({ validatedFieldsData, fileIds });
      }
    }),
  ];

  const requestBody = { values };

  try {
    const result = await service.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_RESPONSES_ID,
      range: process.env.GOOGLE_SHEETS_APPEND_RANGE,
      valueInputOption: 'RAW',
      requestBody,
    });
    console.log(`${result.data.updates?.updatedCells} cells appended.`);
    return result;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}
