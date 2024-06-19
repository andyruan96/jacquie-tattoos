'use client';

import {
  GalleryItem,
  fetchIGCarouselAlbum,
  fetchIGItem,
} from '@/app/_lib/gallery-actions';
import { useEffect, useState } from 'react';
import Carousel from '@/app/_components/carousel/carousel';
import { CaptionContext } from '@/app/_lib/gallery-context';

export default function InstagramItem({ mediaId }: { mediaId: string }) {
  const [igItem, setIgItem] = useState<GalleryItem | null>();
  const [igCarouselAlbum, setIgCarouselAlbum] = useState<GalleryItem[]>();
  useEffect(() => {
    async function loadIgItem() {
      const igItem = await fetchIGItem(mediaId);
      setIgItem(igItem);

      if (igItem) {
        if (igItem.type === 'CAROUSEL_ALBUM') {
          const carouselAlbum = await fetchIGCarouselAlbum(igItem.id);
          setIgCarouselAlbum(carouselAlbum);
        } else {
          setIgCarouselAlbum([igItem]);
        }
      }
    }

    loadIgItem();
  }, []);

  return (
    <CaptionContext.Provider value={igItem?.caption ?? ''}>
      <Carousel carouselItems={igCarouselAlbum}></Carousel>
    </CaptionContext.Provider>
  );
}