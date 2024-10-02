import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Located at The Dominion Building, 207 W Hastings St, Vancouver, BC. No set business hours. Every artist takes care of their own bookings. I am only at the studio when I have appointments so there’s no guarantee I’m there. So if you have a question for me, it’s best to email or message me on Instagram rather than popping by the studio.',
};

export default function Studio() {
  return (
    <>
      <h2 className="mb-5 text-4xl font-bold uppercase text-raw-sienna-dark">
        Located At
      </h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="text-ironstone lg:flex-1">
          <h3 className="font-bold uppercase text-porsche">
            The Dominion Building
          </h3>
          <p className="mb-3">
            207 W Hastings St
            <br />
            Vancouver, British Columbia, V6B 1H7
            <br />
            Unit provided upon booking.
          </p>
          <p className="mb-3">
            <span className="font-bold">APPOINTMENT ONLY.</span> Please fill out
            my booking form{' '}
            <Link href="/booking" className="text-porsche hover:underline">
              here
            </Link>
            .
          </p>
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
        <iframe
          className="test-class rounded-md border-8 border-porsche lg:basis-1/2"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}
    &q=place_id:ChIJBwXXo3lxhlQRcMilcWye6oo`}
        ></iframe>
      </div>
    </>
  );
}
