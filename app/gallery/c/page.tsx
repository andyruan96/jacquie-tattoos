'use client';
import { useEffect, useRef, useState } from 'react';
import { GalleryItem, fetchIGFeed } from '@/app/_lib/gallery-actions';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  FreeMode,
  Navigation,
  Thumbs,
  EffectCoverflow,
  Mousewheel,
  HashNavigation,
} from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import useHash from '@/app/_lib/use-url-fragment';

export default function Carousel({
  carouselItems,
}: {
  carouselItems?: GalleryItem[];
}) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  useEffect(() => {
    async function fetchIGItems() {
      const galleryItems = await fetchIGFeed();
      setGalleryItems(galleryItems);
      console.log('set gallery items', galleryItems);
    }

    if (!carouselItems) {
      fetchIGItems();
    } else {
      setGalleryItems(carouselItems);
    }
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const hash = useHash();
  const thumbsSwiperRef = useRef<SwiperType>();
  const mainSwiperRef = useRef<SwiperType>();
  const [swipersInit, setSwipersInit] = useState(false);
  useEffect(() => {
    if (
      !swipersInit &&
      thumbsSwiperRef &&
      thumbsSwiperRef.current &&
      mainSwiperRef &&
      mainSwiperRef.current &&
      galleryItems.length &&
      hash
    ) {
      const slideToIndex = galleryItems.findIndex((item) => item.id === hash);

      mainSwiperRef.current.slideTo(slideToIndex);
      thumbsSwiperRef.current.update(); // calling after slide manipulation sets the active thumb

      setSwipersInit(true);
    }
  }, [thumbsSwiperRef, galleryItems, mainSwiperRef, hash]);

  return (
    <div className="h-[80vh] overflow-hidden md:h-full">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        modules={[
          FreeMode,
          Navigation,
          Thumbs,
          EffectCoverflow,
          Mousewheel,
          HashNavigation,
        ]}
        thumbs={{ swiper: thumbsSwiper }}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        mousewheel={true}
        hashNavigation={{
          watchState: false,
        }}
        className="mySwiper2 mb-10 h-4/6 md:mb-20 md:h-2/3"
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: {
            slidesPerView: 3,
          },
        }}
        onBeforeInit={(swiper) => (mainSwiperRef.current = swiper)}
      >
        {galleryItems.map((item) => {
          return (
            <SwiperSlide key={item.id} data-hash={item.id}>
              <div className="flex h-full justify-center">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-full w-auto rounded-lg object-cover"
                  src={item.src}
                  alt="A piece of work or post on Jacquie's Instagram"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        centeredSlides={true}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        mousewheel={true}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel, HashNavigation]}
        className="mySwiper h-1/6 md:h-1/3"
        hashNavigation={{
          watchState: true, // HashNavigation has the side effect of centering the thumbs swiper (probably triggers a handler)
        }}
        breakpoints={{
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 10,
          },
          1536: {
            slidesPerView: 15,
          },
        }}
        onBeforeInit={(swiper) => (thumbsSwiperRef.current = swiper)}
      >
        {galleryItems.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              data-hash={item.id}
              className="opacity-40"
            >
              <Image
                width="0"
                height="0"
                sizes="100vw"
                className="h-[100px] w-[100px] rounded-lg object-cover"
                src={item.src}
                alt="A piece of work or post on Jacquie's Instagram"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
