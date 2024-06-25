'use client';

import { GalleryItem } from '@/app/_lib/gallery-actions';
import { CaptionContext, GalleryContext } from '@/app/_lib/gallery-context';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import { useContext, useRef } from 'react';

export default function GalleryItemComponent({
  galleryItem,
  className,
}: {
  galleryItem: GalleryItem;
  className?: string;
}) {
  const { handleBack } = useContext(GalleryContext);
  const caption = useContext(CaptionContext);

  const captionRef = useRef<HTMLDivElement>(null);

  function toggleCaption() {
    if (captionRef.current) {
      if (captionRef.current.classList.contains('animate-fadeIn')) {
        // fadeout
        captionRef.current.classList.remove('animate-fadeIn');

        captionRef.current.classList.add('opacity-0');
        captionRef.current.classList.add('animate-fadeOut');

        setTimeout(() => {
          captionRef?.current?.classList.remove('bottom-[-5px]');
        }, 500);
      } else {
        // fadein
        captionRef.current.classList.add('animate-fadeIn');
        captionRef.current.classList.add('bottom-[-5px]');

        captionRef.current.classList.remove('opacity-0');
        captionRef.current.classList.remove('animate-fadeOut');
      }
    }
  }

  return (
    <div className="relative">
      {galleryItem.type === 'VIDEO' ? (
        <div className="relative">
          <video
            controls
            muted
            autoPlay
            preload="metadata"
            poster={galleryItem.src}
            className={`${className}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <source src={galleryItem.videoSrc} type="video/mp4" />
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
          <div className="absolute top-0 flex w-full flex-row justify-between p-2">
            {handleBack && (
              <Button
                isIconOnly
                aria-label="Back"
                onClick={handleBack}
                color="secondary"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-xl"
                ></FontAwesomeIcon>
              </Button>
            )}
            <Button
              isIconOnly
              aria-label="Show caption"
              onClick={toggleCaption}
              color="secondary"
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="text-xl"
              ></FontAwesomeIcon>
            </Button>
            <Button
              isIconOnly
              aria-label="Link to Instagram"
              role="link"
              color="secondary"
            >
              <a href={galleryItem.permalink} target="__blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-xl"
                ></FontAwesomeIcon>
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className={className}
            src={galleryItem.src}
            alt="A piece of work or post on Jacquie's Instagram"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute top-0 flex w-full flex-row justify-between p-2">
            {handleBack && (
              <Button
                isIconOnly
                aria-label="Back"
                onClick={handleBack}
                color="secondary"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-xl"
                ></FontAwesomeIcon>
              </Button>
            )}
            <Button
              isIconOnly
              aria-label="Show caption"
              onClick={toggleCaption}
              color="secondary"
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="text-xl"
              ></FontAwesomeIcon>
            </Button>
            <Button
              isIconOnly
              aria-label="Link to Instagram"
              role="link"
              color="secondary"
            >
              <a href={galleryItem.permalink} target="__blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-xl"
                ></FontAwesomeIcon>
              </a>
            </Button>
          </div>
        </div>
      )}
      <Card
        className="fill-mode-forwards absolute w-full bg-coconut-cream opacity-0"
        ref={captionRef}
      >
        <CardBody>
          <p className="text-sm text-ironstone">{caption}</p>
        </CardBody>
      </Card>
    </div>
  );
}
