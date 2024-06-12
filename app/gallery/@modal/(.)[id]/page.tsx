'use client';

import InstagramItem from '@/app/_components/instagram-item/instagram-item';
import { Modal } from './modal';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryContext } from '@/app/_lib/gallery-context';

export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Modal>
      <Suspense fallback={<div>Loading...</div>}>
        <GalleryContext.Provider value={{ handleBack }}>
          <InstagramItem mediaId={id}></InstagramItem>
        </GalleryContext.Provider>
      </Suspense>
    </Modal>
  );
}
