import BookingForm from '@/app/_components/booking-form/booking-form';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Book with Jacquie! Fill out my booking form to get in contact.',
};

export default function Booking() {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-2">
        <Card className="mb-5 flex-1 rounded-lg shadow-none">
          <CardHeader>
            <h3 className="font-bold text-porsche">
              Please read everything thoroughly! Things to keep in mind while
              booking with me:
            </h3>
          </CardHeader>
          <CardBody className="text-ironstone">
            <ul className="ml-5 list-disc">
              <li>
                I don&apos;t send out drawing designs before the appointment. So
                be as descriptive as possible. Minor changes can be made on the
                day of your appointment.
              </li>
              <li>
                <span className="font-bold">
                  All deposits are non-refundable.
                </span>{' '}
                If you want to reschedule, you must give me 48hrs notice before
                the original appointment date. You&apos;ll be given 2
                &quot;free&quot; reschedules max. If you fail to give notice, or
                exceed your number of notices, you&apos;ll need to pay another
                deposit to rebook the appointment. This is just to ensure that
                my time is not wasted.
              </li>
              <li>
                I don&apos;t tattoo script/text (exceptions in manga panels).
              </li>
              <li>
                I don&apos;t tattoo behind the ear, hands, feet, or on the
                genitals.
              </li>
              <li>
                I&apos;m still new to colour tattoos so I may not accept your
                project if I don&apos;t feel like I&apos;m there yet.
              </li>
              <li>
                If you&apos;re booking with a friend, keep it to one form! Just
                let me know in the notes, and I&apos;ll ask for their info when
                I email you back.
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card className="mb-5 rounded-lg shadow-none lg:w-1/3">
          <CardHeader>
            <h3 className="font-bold text-porsche">Located At</h3>
          </CardHeader>
          <CardBody className="text-ironstone">
            <div className="text-ironstone lg:flex-1">
              <h3 className="font-bold uppercase text-porsche">
                Gastown, Vancouver
              </h3>
              <p className="mb-3">
                Near Nemesis Coffee
                <br />
                Address provided upon booking.
              </p>
              <p className="mb-3 font-bold">APPOINTMENT ONLY.</p>
              <p className="mb-3">
                <span className="font-bold">Working hours:</span>
                <br />
                Sunday 11:30AM - 7PM
                <br />
                Monday 11:30AM - 7PM
              </p>
              <p>
                (dependant on studio mate&apos;s schedule) <br />
                Wednesday 11:30AM - 5PM
                <br />
                Thursday 11:30AM - 5PM
                <br />
                Friday 11:30AM - 5PM
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      <BookingForm />
    </>
  );
}
