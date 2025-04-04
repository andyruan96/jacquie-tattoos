import { Card, CardBody } from '@nextui-org/react';
import faqs from './faq';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Got questions to ask Jacquie? Visit my FAQ page for common responses.',
};

export default function Faq() {
  return (
    <>
      <h2 className="mb-5 text-center text-4xl font-bold text-raw-sienna-dark">
        FAQ
      </h2>
      <Card className="shadow-bottom">
        <CardBody>
          <div className="flex flex-wrap">
            {faqs.map((faq, index) => (
              <div
                key={`faq-${index}`}
                className="flex flex-col gap-2 p-5 md:basis-1/2"
              >
                <h3 className="text-lg font-bold text-porsche">
                  {faq.question}
                </h3>
                {faq.answer.map((ansLine, index) => (
                  <p className="text-ironstone" key={`${ansLine}-${index}`}>
                    {ansLine}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <div className="mt-5 flex w-full justify-center">
        <iframe
          className="w-full rounded-md border-8 border-porsche"
          height="450"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}
    &q=place_id:ChIJRZTroXlxhlQRihHJRYedPys`}
        ></iframe>
      </div>
    </>
  );
}
