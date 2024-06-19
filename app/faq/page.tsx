import { Card, CardBody } from '@nextui-org/react';
import faqs from './faq';

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
    </>
  );
}
