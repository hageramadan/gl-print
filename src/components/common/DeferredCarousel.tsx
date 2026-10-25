'use client';

import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './deferred-carousel.css';

export interface CarouselProps extends Omit<SwiperOptions, 'modules'> {
  children: ReactNode;
  className?: string;
  dir?: 'ltr' | 'rtl';
  modules?: Array<'autoplay' | 'pagination' | 'navigation'>;
}

let carouselModule: Promise<typeof import('./InteractiveCarousel')> | undefined;

export function DeferredCarousel(props: CarouselProps) {
  const container = useRef<HTMLDivElement>(null);
  const [InteractiveCarousel, setInteractiveCarousel] = useState<ComponentType<CarouselProps> | null>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // Hidden mobile carousels never load on desktop. Offscreen sections stay static
      // until needed, so Swiper's measurements do not block the first interaction.
      carouselModule ??= import('./InteractiveCarousel');
      void carouselModule.then(({ InteractiveCarousel }) => {
        if (!cancelled) setInteractiveCarousel(() => InteractiveCarousel);
      }).catch(() => {
        carouselModule = undefined;
        // The server-rendered, horizontally scrollable content remains usable.
      });
    }, { rootMargin: '200px 0px' });
    observer.observe(element);
    return () => { cancelled = true; observer.disconnect(); };
  }, []);

  const style: CSSProperties & Record<string, string | number> = {
    '--carousel-columns': typeof props.slidesPerView === 'number' ? props.slidesPerView : 1,
    '--carousel-gap': `${props.spaceBetween || 0}px`,
  };
  let columns = style['--carousel-columns'];
  let gap = style['--carousel-gap'];
  for (const width of [480, 640, 768, 1024, 1280]) {
    const breakpoint = props.breakpoints?.[width];
    if (typeof breakpoint?.slidesPerView === 'number') columns = breakpoint.slidesPerView;
    if (typeof breakpoint?.spaceBetween === 'number') gap = `${breakpoint.spaceBetween}px`;
    style[`--carousel-columns-${width}`] = columns;
    style[`--carousel-gap-${width}`] = gap;
  }

  return (
    <div ref={container}>
      {InteractiveCarousel ? <InteractiveCarousel {...props} /> : (
        <div className={`swiper carousel-static ${props.className || ''}`} style={style} dir={props.dir}>
          <div className="swiper-wrapper">{props.children}</div>
        </div>
      )}
    </div>
  );
}

export function CarouselSlide({ children }: { children: ReactNode }) {
  return <div className="swiper-slide">{children}</div>;
}
