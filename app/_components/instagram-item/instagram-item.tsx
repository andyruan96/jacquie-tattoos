'use client';

import {
  GalleryItem,
  fetchIGCarouselAlbum,
  fetchIGItem,
} from '@/app/_lib/gallery-actions';
import { useEffect, useState } from 'react';
import GalleryItemComponent from '../gallery-item/gallery-item';
import Carousel from '@/app/_components/carousel/carousel';

export default function InstagramItem({ mediaId }: { mediaId: string }) {
  const [igItem, setIgItem] = useState<GalleryItem | null>();
  const [igCarouselAlbum, setIgCarouselAlbum] = useState<GalleryItem[]>();
  useEffect(() => {
    async function loadIgItem() {
      const igItem = await fetchIGItem(mediaId);
      setIgItem(igItem);

      if (igItem) {
        const carouselAlbum = await fetchIGCarouselAlbum(igItem.id);
        setIgCarouselAlbum(carouselAlbum);
      }
    }

    loadIgItem();
  }, []);

  function renderIgItem() {
    if (igItem) {
      if (igItem.type === 'CAROUSEL_ALBUM') {
        return <Carousel carouselItems={igCarouselAlbum}></Carousel>;
      } else {
        return (
          <GalleryItemComponent
            galleryItem={igItem}
            className="h-fit max-h-full w-auto rounded-lg object-contain"
          ></GalleryItemComponent>
        );
      }
    }
  }

  return renderIgItem();
}
