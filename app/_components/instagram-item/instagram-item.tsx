'use client';

import { GalleryItem, fetchIGItem } from '@/app/_lib/gallery-actions';
import { useEffect, useState } from 'react';
import GalleryItemComponent from '../gallery-item/gallery-item';

export default function InstagramItem({ mediaId }: { mediaId: string }) {
  const [igItem, setIgItem] = useState<GalleryItem | null>();
  useEffect(() => {
    async function loadIgItem() {
      const igItem = await fetchIGItem(mediaId);
      setIgItem(igItem);
    }

    loadIgItem();
  }, []);

  return (
    <>
      {igItem && (
        <GalleryItemComponent
          galleryItem={igItem}
          className="h-fit max-h-full w-auto rounded-lg object-contain"
        ></GalleryItemComponent>
      )}
    </>
  );
}
