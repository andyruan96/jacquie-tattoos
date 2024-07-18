import BookingForm from '@/app/_components/booking-form/booking-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Book with Jacquie! Fill out my booking form to get in contact.',
};

export default function Booking() {
  return <BookingForm />;
}
