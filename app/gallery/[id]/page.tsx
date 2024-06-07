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
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContext.Provider value={{ handleBack }}>
        <InstagramItem mediaId={id}></InstagramItem>
      </GalleryContext.Provider>
    </Suspense>
  );
}
