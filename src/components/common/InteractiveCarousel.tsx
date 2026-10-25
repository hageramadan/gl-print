'use client';

import { Children, isValidElement, useEffect, useRef, type ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper/types';
import type { CarouselProps } from './DeferredCarousel';

const availableModules = { autoplay: Autoplay, navigation: Navigation, pagination: Pagination };

export function InteractiveCarousel({ children, modules = [], ...options }: CarouselProps) {
  const instance = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    const swiper = instance.current;
    if (!swiper || !options.autoplay) return;
    let visible = false;
    const updateAutoplay = () => {
      if (swiper.destroyed) return;
      if (visible && !document.hidden) {
        if (!swiper.autoplay.running) swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAutoplay();
    });
    observer.observe(swiper.el);
    document.addEventListener('visibilitychange', updateAutoplay);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateAutoplay);
    };
  }, [options.autoplay]);

  return (
    <Swiper {...options} onSwiper={(swiper) => { instance.current = swiper; }} modules={modules.map((name) => availableModules[name])}>
      {Children.toArray(children).map((child, index) => (
        <SwiperSlide key={isValidElement(child) ? child.key : index}>
          {isValidElement<{ children: ReactNode }>(child) ? child.props.children : child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
