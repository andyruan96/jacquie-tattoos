'use server';

import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

export async function getFlashFromDrive(): Promise<any[]> {
  const credentials = JSON.parse(
    Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '',
      'base64',
    ).toString(),
  );

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive.readonly',
    credentials,
  });

  const service = google.drive({ version: 'v3', auth: auth });

  const res = await service.files.list({
    q: `'${process.env.GOOGLE_DRIVE_FLASH_FOLDER_ID}' in parents`,
  });

  return res.data.files ?? [];
}
