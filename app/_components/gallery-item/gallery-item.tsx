'use client';

import { GalleryItem } from '@/app/_lib/gallery-actions';
import GalleryContext from '@/app/_lib/gallery-context';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { useContext } from 'react';

export default function GalleryItemComponent({
  galleryItem,
  className,
}: {
  galleryItem: GalleryItem;
  className?: string;
}) {
  const { handleBack } = useContext(GalleryContext);

  return (
    <div className="relative h-auto max-h-full">
      {galleryItem.type === 'VIDEO' ? (
        <video
          controls
          muted
          preload="metadata"
          poster={galleryItem.src}
          className={className}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <source
            src={galleryItem.videoSrc}
            type="video/mp4"
            aria-label="Video player"
          />
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className={className}
            src={galleryItem.src}
            alt="A piece of work or post on Jacquie's Instagram"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
          />
        </video>
      ) : (
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className={`${className} relative`}
          src={galleryItem.src}
          alt="A piece of work or post on Jacquie's Instagram"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
          onClick={(e) => e.stopPropagation()}
        />
      )}

      {handleBack && (
        <Button
          isIconOnly
          aria-label="Back"
          className="absolute left-2 top-2"
          onClick={handleBack}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-xl"
          ></FontAwesomeIcon>
        </Button>
      )}
      <Button
        isIconOnly
        aria-label="Link to Instagram"
        role="link"
        className="absolute right-2 top-2"
      >
        <a href={galleryItem.permalink} target="__blank">
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-xl"
          ></FontAwesomeIcon>
        </a>
      </Button>
    </div>
  );
}
