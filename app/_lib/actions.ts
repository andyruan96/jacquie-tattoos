'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ZodParsedType, z } from 'zod';
import nodemailer from 'nodemailer';
import EmailTemplate from './email-template';

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
    .enum(['sunday', 'monday', 'wednesday', 'thursday', 'friday'])
    .array()
    .min(1),
  time: z.string(),
  budget: z.string().min(1),
  previousClient: z.enum(['true', 'false']),
  medical1: z.enum(['true', 'false']),
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
  availability: ('sunday' | 'monday' | 'wednesday' | 'thursday' | 'friday')[];
  time: string;
  budget: string;
  previousClient: 'true' | 'false';
  medical1: 'true' | 'false';
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

export async function sendBookingForm(prevState: State, formData: FormData) {
  //   console.log(formData);
  console.log(formData.getAll('availability'));

  const validatedFields = BookingFormSchema.safeParse({
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
  // console.log(generateEmailFormResponseHtml(validatedFields.data));

  // if (await sendMail(emailHtml)) {
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

async function sendMail(html: string) {
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

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'andyruan@hotmail.ca',
    subject: 'Hello from Nodemailer',
    // text: 'This is a test email sent using Nodemailer.',
    html,
  };

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
      ? `${acc}
    <tr>
      <td style="padding: 0 15px 0 0">${cur.label}</td>
      <td style="padding: 0 15px">${responseField}</td>
    </tr>`
      : acc;
  }, '');

  return EmailTemplate.replace('{{formResponses}}', formResponses);
}
