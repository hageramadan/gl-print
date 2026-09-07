'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HeroContent } from './HeroContent';
import { HeroServices } from './HeroServices';
import { HeroSearch } from './HeroSearch';
import { HeroSlide } from '@/src/services/homeApi';

interface HeroProps {
  data: {
    tagline: string;
    title: string;
    description: string;
    primary_button: { text: string; action_type: string };
    secondary_button: { text: string; action_type: string };
    slides_images: HeroSlide[];
    counters_section: any[];
  };
}

export const Hero = ({ data }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // استخدام الصور من الـ API بدلاً من الثابتة
  const slides = data.slides_images || [];

  const nextSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, slides.length]);

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
    <section className="relative w-full overflow-visible pb-20 md:pb-24 lg:pb-28">
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
              <Image
                src={slide.url}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover object-center"
                style={{
                  objectPosition: 'center 15%',
                }}
                priority={index === 0}
              />
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
        <div className="absolute top-[5.5%] end-[10%] z-30 pointer-events-auto w-[85%] max-w-[600px] lg:max-w-[700px]">
          <HeroSearch />
        </div>
      </div>

      <HeroServices />
    </section>
  );
};