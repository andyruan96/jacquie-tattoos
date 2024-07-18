import { Metadata } from 'next';
import CalComTool from '@/app/_components/cal-com-tool/cal-com-tool';

export const metadata: Metadata = {
  title: 'Select Your Time slot',
};

export default function SelectAvailability() {
  return <CalComTool></CalComTool>;
}
