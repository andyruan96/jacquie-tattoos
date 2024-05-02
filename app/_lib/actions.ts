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
import { writeFile, writeFileSync } from 'fs';
import axios from 'axios';

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
    return {
      errors: { ...prevState.errors, recaptcha: ['failed recaptcha'] },
      message: 'failed recaptcha',
    };
  }

  console.log(formData);
  console.log(formData.getAll('file'));

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

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error("Error sending email: ", error);
  //   } else {
  //     console.log("Email sent: ", info.response);
  //   }
  // });

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
    res = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      gRecaptchaFormData,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
  } catch (e) {
    console.log('issue sending request to recaptcha service');
    return false;
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    console.log(`recaptcha passed with score of ${res.data.score}`);
    return true;
  } else {
    console.log('recaptcha did not return confident response', res.data);
    return false;
  }
}
