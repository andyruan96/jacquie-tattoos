'use client';
import { useEffect, useState } from 'react';
import { GalleryItem, fetchIGFeed } from '@/app/_lib/gallery-actions';
import Image from 'next/image';
import { useCrash } from '@/app/_lib/use-crash';
import Link from 'next/link';

export default function Gallery() {
  const crash = useCrash();

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  useEffect(() => {
    async function fetchIGItems() {
      const galleryItems = await fetchIGFeed();
      setGalleryItems(galleryItems);
    }

    fetchIGItems();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {/* <video width="320" height="240" controls preload="none">
        <source
          src="https://scontent.cdninstagram.com/o1/v/t16/f1/m82/5644DD3EC4292EE7199888217A260888_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent.cdninstagram.com&_nc_cat=104&vs=1608495146596498_3451237100&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC81NjQ0REQzRUM0MjkyRUU3MTk5ODg4MjE3QTI2MDg4OF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dJeFNTeHBDTG9TandkNEVBR3hrakYtTjhYWm5icV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJvqn%2BqG6sPw%2FFQIoAkMzLBdALszMzMzMzRgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfCGbTJeFIuCgwyfisNGCn_XNGNxDzMYnJkK1MpcQEi1cQ&oe=663843BB&_nc_sid=1d576d&_nc_rid=d4e7ff1119"
          type="video/mp4"
        />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video> */}
        {/* <Image
        width="360"
        height="360"
        className="shrink grow"
        src="https://scontent.cdninstagram.com/v/t51.29350-15/441013691_406779642122882_125419712077160874_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=YOnFthEcTIIQ7kNvgGBoTnx&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfCnoWNzR2Uk9U6-Hfmd6LDW9m18exHtwpVzFgM5NxI6tg&oe=663DA220"
        alt={'test'}
      /> */}

        {galleryItems.map((item) => {
          return (
            // <a href={item.permalink} target="__blank" key={item.id}>
            //   <Image
            //     width="360"
            //     height="360"
            //     sizes="100vw"
            //     // className="h-[360px] w-auto rounded-lg"
            //     className="h-[360px] w-auto transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            //     // style={{ transform: 'translate3d(0, 0, 0)' }}
            //     src={item.src}
            //     alt="A piece of work or post on Jacquie's Instagram"
            //     placeholder="blur"
            //     blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
            //   />
            // </a>
            <Link href={`/gallery/c#${item.id}`} key={item.id}>
              <Image
                width="360"
                height="360"
                sizes="100vw"
                // className="h-[360px] w-auto rounded-lg"
                className="h-[360px] w-auto transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                // style={{ transform: 'translate3d(0, 0, 0)' }}
                src={item.src}
                alt="A piece of work or post on Jacquie's Instagram"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCADAARIDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACBf/EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDspEEQQJBwDhwYcBrCCBIIFJAUkCBAIEAA0AZDQBkNAGQ0AZRABJAEQCSQFFAkiCKIJoECQQJBApICkgSSAIoGQ0AAaAMstgGE0AZDQBlEAEUARQFFACiCSIIogikBIIEggikCSIBFAyigZgjUEBmCNQQGYI1BAZDUAMooGUUARQFFACkCKQIggUkBIIEggUiCSIBFAEUDKjQBmCNAGYI0AZDQBkNAGUUARQFJAkkCSQFJAUCBIIEskGiyQJBApIEkgQKBkNAGQ0AZDTIAEAEQCSQEEAkkCSQIhASyQJZINFkg0WSDRBAoECgQCSAJIGQ0yA0EAAQASQJJAEgBQQEJAkEDSCBpMkGiyQaaxgg2WSDSCBpBAUECCAIIAggASAIJAkkAAVAoVUChRQKoqoEs1UGqazVQbprFNBumsU0G6axWqDVNYpoNU1mqg1RRVQNFFFA0VUUEBRQIFFAoUUGkzUAqrNVBqiiqgaqzVQaqrNVBqqs1UGqazVQbprFNBumsU0G6axTQaprFNBuqs1UGqqzVQNVZooNUUUUDRRRQNFFFA1UUUGqmagZqoqoGqiig1VWaqDVVZQNVVmqg1TWaqDVNZpoNU1img3TWKaDVNYpoNVVmqg1VWaqDVFFFA1VmqgaKKKBooqoGiiqgahUDNVFQGqhAaggKCAoIGkEDSZINU1lA1TWUDVNZqoNVVmqg1VWaqDVFFFA1UUUDRRUCqoQKqhAahUAQQFBAUEBQIJJAUCBQIFAgUCBQQFJAkEBCAJIAkgCQQJIAUED/2Q=="
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
