'use client';
import { useEffect, useState } from 'react';
import { GalleryItem, fetchIGFeed } from '@/app/_lib/gallery-actions';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSpinner, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [nextPage, setNextPage] = useState<string>('');
  const [debouncer, setDebouncer] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    async function fetchIGItems() {
      const { items, after } = await fetchIGFeed();
      setGalleryItems(items);
      setNextPage(after);
    }

    fetchIGItems();
  }, []);

  useEffect(() => {
    async function handleScroll() {
      const debounceTime = 500;
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && nextPage) {
        clearTimeout(debouncer);
        const timeout = setTimeout(async () => {
          setNextPage('');
          const { items, after } = await fetchIGFeed(nextPage);
          setGalleryItems([...galleryItems, ...items]);
          setNextPage(after);
        }, debounceTime);
        setDebouncer(timeout);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(debouncer);
    };
  }, [nextPage, debouncer, galleryItems]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:flex-wrap">
      {galleryItems.map((item) => {
        return (
          <Link href={`/gallery/${item.id}`} key={item.id} className="relative">
            <Image
              width="360"
              height="360"
              sizes="100vw"
              className="h-auto w-[360px] transform rounded-lg brightness-90 transition will-change-auto hover:brightness-100 md:h-[360px] md:w-auto"
              src={item.src}
              alt="A piece of work or post on Jacquie's Instagram"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
            />
            {item.type === 'CAROUSEL_ALBUM' && (
              <FontAwesomeIcon
                icon={faFilm}
                className="absolute right-2 top-2 z-20 text-xl text-white"
              />
            )}
            {item.type === 'VIDEO' && (
              <FontAwesomeIcon
                icon={faVideo}
                className="absolute right-2 top-2 z-20 text-xl text-white"
              />
            )}
          </Link>
        );
      })}
      {!nextPage && (
        <div className="flex w-full justify-center py-10">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin text-4xl"
          ></FontAwesomeIcon>
        </div>
      )}
    </div>
  );
}
