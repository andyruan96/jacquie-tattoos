'use client';
import { useEffect, useRef, useState } from 'react';
import { GalleryItem } from '@/app/_lib/gallery-actions';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Mousewheel } from 'swiper/modules';
import GalleryItemComponent from '../gallery-item/gallery-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Carousel({
  carouselItems,
}: {
  carouselItems?: GalleryItem[];
}) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  useEffect(() => {
    if (carouselItems) {
      setGalleryItems(carouselItems);
    }
  }, [carouselItems]);

  const sliderRef = useRef<any>(null);

  return (
    <>
      <div className="relative flex h-fit items-center justify-center overflow-hidden">
        {galleryItems.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sliderRef.current?.slidePrev();
            }}
            className="absolute left-0 z-20"
          >
            <FontAwesomeIcon
              className="text-4xl text-summer-blue"
              icon={faCircleChevronLeft}
            ></FontAwesomeIcon>
          </button>
        )}
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          className="h-full"
          modules={[Mousewheel, Navigation]}
          mousewheel={true}
          onSwiper={(it) => (sliderRef.current = it)}
        >
          {galleryItems.map((item) => {
            return (
              <SwiperSlide key={item.id} data-hash={item.id}>
                <div className="flex h-full items-center justify-center">
                  <GalleryItemComponent
                    galleryItem={item}
                    className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {galleryItems.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              sliderRef.current?.slideNext();
            }}
            className="absolute right-0 z-20"
          >
            <FontAwesomeIcon
              className="text-4xl text-summer-blue"
              icon={faCircleChevronRight}
            ></FontAwesomeIcon>
          </button>
        )}
      </div>
    </>
  );
}
