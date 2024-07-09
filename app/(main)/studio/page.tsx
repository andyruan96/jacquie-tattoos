import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Located at KULTURA TATTOO STUDIO. No set business hours. Every artist takes care of their own bookings. I am only at the studio when I have appointments so there’s no guarantee I’m there. So if you have a question for me, it’s best to email or message me on Instagram rather than popping by the studio.',
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
            Kultura Tattoo Studio
          </h3>
          <p className="mb-3">
            2603 Kingsway
            <br />
            Vancouver, British Columbia, V5R 4S9
          </p>
          <p className="mb-3">
            No set business hours.
            <br />
            Every artist takes care of their own bookings. I am only at the
            studio when I have appointments so there’s no guarantee I’m there.
            So if you have a question for me, it’s best to email or message me
            on Instagram rather than popping by the studio.
          </p>
        </div>
        <iframe
          className="test-class rounded-md border-8 border-porsche lg:basis-1/2"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}
    &q=place_id:ChIJi6QARrB3hlQRfX4UIchBAP0`}
        ></iframe>
      </div>
    </>
  );
}
