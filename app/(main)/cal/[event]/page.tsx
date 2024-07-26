import { Metadata } from 'next';
import CalComTool from '@/app/_components/cal-com-tool/cal-com-tool';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Select Your Time slot',
};

export default function SelectAvailability({
  params,
}: {
  params: { event: string };
}) {
  const validBookingEvents = new Set(['2-hour-tattoo', '1-hour-tattoo']);

  if (!validBookingEvents.has(params.event)) {
    notFound();
  }

  return <CalComTool event={params.event}></CalComTool>;
}
