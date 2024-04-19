import { Button } from '@nextui-org/react';
import Image from 'next/image';
import faqs from './faq';

export default function Faq() {
  return (
    <div className="flex flex-wrap">
      {faqs.map((faq, index) => (
        <div
          key={`faq-${index}`}
          className="flex flex-col gap-2 p-6 md:basis-1/2"
        >
          <p className="font-bold">{faq.question}</p>
          {faq.answer.map((ansLine, index) => (
            <p key={`${ansLine}-${index}`}>{ansLine}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
