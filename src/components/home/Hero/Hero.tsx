'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { HeroContent } from './HeroContent';
import { HeroServices } from './HeroServices';
import { HeroSearch } from './HeroSearch';
import type { HeroSlide, Counter } from '@/src/services/homeApi';
import type { Service } from '@/src/services/servicesApi';

interface HeroProps {
  initialServices: Service[];
  data: {
    tagline: string;
    title: string;
    description: string;
    primary_button: { text: string; action_type: string };
    secondary_button: { text: string; action_type: string };
    slides_images: HeroSlide[];
    counters_section: Counter[];
  };
}

export const Hero = ({ data, initialServices }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const animatingUntil = useRef(0);
  const section = useRef<HTMLElement>(null);
  const firstImage = useRef<HTMLImageElement>(null);
  const [enabledSlides, setEnabledSlides] = useState(() => new Set([0]));
  const [touchStartX, setTouchStartX] = useState(0);

  // استخدام الصور من الـ API بدلاً من الثابتة
  const slides = data.slides_images || [];

  const nextSlide = useCallback(() => {
    if (performance.now() < animatingUntil.current || slides.length < 2) return;
    animatingUntil.current = performance.now() + 500;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (performance.now() < animatingUntil.current || slides.length < 2) return;
    animatingUntil.current = performance.now() + 500;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const element = section.current;
    if (!element || slides.length < 2) return;
    let visible = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    const updateAutoplay = () => {
      clearInterval(interval);
      if (visible && !document.hidden) interval = setInterval(nextSlide, 5000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAutoplay();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', updateAutoplay);
    return () => {
      clearInterval(interval);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateAutoplay);
    };
  }, [nextSlide, slides.length]);

  useEffect(() => {
    const image = firstImage.current;
    if (slides.length < 2 || !image) return;
    // Prepare only the next frame, after the first image has loaded. Idle time
    // alone does not mean the critical image has finished on a slow connection.
    const prepareNext = () => setEnabledSlides((previous) => {
      const next = (currentSlide + 1) % slides.length;
      return previous.has(next) ? previous : new Set([...previous, next]);
    });
    let idleTask: number | undefined;
    let frameTask: number | undefined;
    const scheduleNext = () => {
      if ('requestIdleCallback' in window) {
        idleTask = window.requestIdleCallback(prepareNext, { timeout: 2000 });
      } else {
        frameTask = requestAnimationFrame(prepareNext);
      }
    };
    if (image.complete) scheduleNext();
    else {
      image.addEventListener('load', scheduleNext, { once: true });
      image.addEventListener('error', scheduleNext, { once: true });
    }
    return () => {
      image.removeEventListener('load', scheduleNext);
      image.removeEventListener('error', scheduleNext);
      if (idleTask !== undefined) window.cancelIdleCallback(idleTask);
      if (frameTask !== undefined) cancelAnimationFrame(frameTask);
    };
  }, [currentSlide, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  if (slides.length === 0) {
    return <div className="min-h-[600px] flex items-center justify-center">Loading...</div>;
  }

  return (
    <section ref={section} className="relative w-full overflow-visible pb-20 md:pb-24 lg:pb-28">
      <div className="relative w-full min-h-[600px] max-h-[1024px] md:h-[700px] lg:h-[900px] overflow-hidden">
        {/* الصور */}
        <div
          className="absolute inset-0 z-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`
                absolute inset-0 transition-all duration-700 ease-in-out
                ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              `}
            >
              {(enabledSlides.has(index) || index === currentSlide) && <Image
                ref={index === 0 ? firstImage : undefined}
                src={slide.url}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                style={{
                  objectPosition: 'center 15%',
                }}
                preload={index === 0}
              />}
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-r from-primary/10 via-primary/10 to-primary/10" />
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30 md:to-black/20" />

        {/* المحتوى */}
        <div className="absolute inset-0 top-[16.5%] lg:top-[5.5%]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center lg:justify-start">
              <HeroContent data={data} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="absolute top-[5.5%] end-[8%] xl:end-[10%] z-30 pointer-events-auto w-[85%] max-w-[600px] lg:min-w-[400px] xl:max-w-[700px]">
          <HeroSearch />
        </div>
      </div>

      <HeroServices initialServices={initialServices} />
    </section>
  );
};
