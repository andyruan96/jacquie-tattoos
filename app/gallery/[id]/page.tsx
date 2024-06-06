'use client';

import InstagramItem from '@/app/_components/instagram-item/instagram-item';
import GalleryContext from '@/app/_lib/gallery-context';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function Photo({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();

  function handleBack() {
    router.push('/gallery');
  }

  return (
    // <div className="w-auto">
    //   <Link href="/gallery">
    //     <FontAwesomeIcon
    //       className="text-xl"
    //       icon={faCaretLeft}
    //     ></FontAwesomeIcon>
    //     <span className="text-xl font-medium hover:underline dark:text-blue-500">
    //       Back To Gallery
    //     </span>
    //   </Link>
    //   <div className="mt-2 h-[85vh]">
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <InstagramItem mediaId={id}></InstagramItem>
    //     </Suspense>
    //   </div>
    // </div>
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContext.Provider value={{ handleBack }}>
        <InstagramItem mediaId={id}></InstagramItem>
      </GalleryContext.Provider>
    </Suspense>
  );
}
