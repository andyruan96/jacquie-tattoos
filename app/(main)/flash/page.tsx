'use client';
import { getFlashFromDrive } from '@/app/_lib/flash-actions';
import { Flash as FlashType } from '@/app/_lib/flash.interfaces';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

export default function Flash() {
  const [flash, setFlash] = useState<FlashType[]>([]);
  useEffect(() => {
    async function fetchFlash() {
      const flashItems = await getFlashFromDrive();
      if (flashItems) {
        setFlash(flashItems);
      }
    }

    fetchFlash();
  }, []);

  return (
    <>
      <h2 className="mb-5 text-center text-4xl font-bold uppercase text-raw-sienna-dark">
        Flash
      </h2>
      <div className="flex flex-col items-center justify-center gap-2 overflow-hidden md:flex-row md:flex-wrap">
        {flash.map((flashItem) => (
          <Link
            href={`/cal/flash-${flashItem.duration}?title=${flashItem.name}`}
            key={flashItem.id}
            className={clsx('relative', {
              'pointer-events-none': flashItem.isSold,
            })}
            aria-disabled={flashItem.isSold}
            tabIndex={flashItem.isSold ? -1 : undefined}
          >
            <Image
              width="0"
              height="0"
              sizes="100vw"
              className="h-[360px] w-[360px] transform rounded-lg object-contain brightness-90 transition will-change-auto hover:brightness-100"
              src={`https://drive.google.com/uc?export=view&id=${flashItem.id}`}
              alt={flashItem.name}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
              onClick={(e) => e.stopPropagation()}
            />
            {flashItem.isSold && (
              <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-lg bg-gray-700 opacity-75"></div>
            )}
            {flashItem.isSold && (
              <div className="absolute left-0 top-0 flex h-[360px] w-[360px] -rotate-45 items-center justify-center">
                <h5 className="text-7xl text-coconut-cream">SOLD</h5>
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
