import { getFlashFromDrive } from '@/app/_lib/flash-actions';
import { Flash, soldPrefix } from '@/app/_lib/flash.interfaces';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

enum CalEvent {
  BookingCancel = 'BOOKING_CANCELLED',
  BookingPaid = 'BOOKING_PAID',
  // TODO: probably not using the below two events
  BookingReject = 'BOOKING_REJECTED',
  BookingRequest = 'BOOKING_REQUESTED',
}

export async function POST(request: NextRequest) {
  const secret = process.env.CALCOM_SECRET ?? '';
  const hmac = crypto.createHmac('sha256', secret);
  const json = await request.json();
  const expectedSignature = hmac.update(JSON.stringify(json)).digest('hex');
  const receivedSignature = request.headers.get('x-cal-signature-256');

  if (receivedSignature !== expectedSignature) {
    return NextResponse.json(
      {
        error:
          'Invalid signature. Include a signature created using a valid secret key.',
      },
      { status: 401 },
    );
  }

  const event: CalEvent = json['triggerEvent'];
  const flashId = json['payload']['responses']['flashId']['value'];
  console.log('triggerEvent, flashId', event, flashId);

  let flashToModify = null;
  if (flashId) {
    const flash = await getFlashFromDrive();
    flashToModify = flash.find((flashItem) => flashItem.id === flashId);
  }

  if (!flashToModify) {
    return NextResponse.json(
      { message: `No flash found with id '${flashId}'.` },
      { status: 404 },
    );
  }

  let success = false;
  switch (event) {
    case CalEvent.BookingPaid:
      success = await updateFlashSaleStatus(flashToModify, true);
      break;
    case CalEvent.BookingCancel:
      success = await updateFlashSaleStatus(flashToModify, false);
      break;
    default:
      return NextResponse.json(
        { message: `Not Implemented for event type ${event}.` },
        { status: 501 },
      );
  }

  return success
    ? NextResponse.json(
        { message: 'Flash sale status has been updated.' },
        { status: 200 },
      )
    : NextResponse.json(
        { message: 'Error occurred while updating flash sale status.' },
        { status: 500 },
      );
}

async function updateFlashSaleStatus(flash: Flash, isSold: boolean) {
  const credentials = JSON.parse(
    Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY ?? '',
      'base64',
    ).toString(),
  );

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
    credentials,
  });

  const service = google.drive({ version: 'v3', auth: auth });

  let name = flash.name;
  if (isSold && !name.startsWith(soldPrefix)) {
    name = `${soldPrefix}${flash.name}`;
  } else if (!isSold && name.startsWith(soldPrefix)) {
    name = name.substring(soldPrefix.length);
  }

  const res = await service.files.update({
    fileId: flash.id,
    requestBody: { name },
  });

  return res.status === 200;
}
