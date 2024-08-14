'use server';

import { GoogleAuth } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';
import { Flash, isValidFlashTime, soldPrefix } from './flash.interfaces';

export async function getFlashFromDrive(): Promise<Flash[]> {
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
    orderBy: 'createdTime desc,quotaBytesUsed', // secondary sort in case multiple flash uploads at the same time
    q: `'${process.env.GOOGLE_DRIVE_FLASH_FOLDER_ID}' in parents`,
    fields: 'files(id,name,mimeType,kind,description)',
  });

  return (res.data.files ?? []).map((resFile) => mapToFlashItem(resFile));
}

export async function getFlashByTitle(
  title: string,
): Promise<Flash | undefined> {
  const flash = await getFlashFromDrive();
  const match = flash.find((flashItem) => flashItem.name === title);
  return match;
}

function mapToFlashItem(file: drive_v3.Schema$File): Flash {
  return {
    kind: file.kind ?? '',
    id: file.id ?? '',
    name: file.name ?? '',
    mimeType: file.mimeType ?? '',
    isSold: file.name?.startsWith(soldPrefix) ?? false,
    duration: isValidFlashTime(file.description) ? file.description : '60',
  };
}
