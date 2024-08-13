import { Metadata } from 'next';
import CalComTool from '@/app/_components/cal-com-tool/cal-com-tool';
import { notFound } from 'next/navigation';
import { getFlashByTitle } from '@/app/_lib/flash-actions';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Select Your Time slot',
};

export default async function SelectAvailability({
  params,
  searchParams,
}: {
  params: { event: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const validBookingEvents = new Set([
    'flash',
    '2-hour-tattoo',
    '1-hour-tattoo',
  ]);

  if (!validBookingEvents.has(params.event)) {
    notFound();
  }

  let flash = null;
  if (params.event === 'flash') {
    flash = await getFlashByTitle(searchParams?.title as string);

    if (!flash) {
      notFound();
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {flash && (
        <figure className="text-center">
          <figcaption className="mb-2 text-2xl font-bold text-raw-sienna-dark">
            {flash.name}
          </figcaption>
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-[360px] rounded-lg"
            src={`https://drive.google.com/uc?export=view&id=${flash.id}`}
            alt={flash.name}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
          />
        </figure>
      )}
      <Card className="shadow-none">
        <CardBody>
          <p className="text-ironstone">
            {/* https://github.com/calcom/cal.com/issues/11272 */}
            <span className="text-porsche">Note:</span> You&apos;ll receive a
            payment reminder email just in case you leave this page before
            making your deposit. If you have paid, you can safely ignore it.
          </p>
        </CardBody>
      </Card>
      <div className="w-full">
        <CalComTool event={params.event} flashId={flash?.id}></CalComTool>
      </div>
    </div>
  );
}
