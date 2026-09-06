
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import { HeroContent } from './HeroContent';
import { HeroServices } from './HeroServices';
import { HeroSearch } from './HeroSearch';

const slides = [
  {
    id: 1,
    image: '/images/hero/hero1.png',
    alt: 'Slide 1',
  },
  {
    id: 2,
    image: '/images/hero/hero2.png',
    alt: 'Slide 2',
  },
  {
    id: 3,
    image: '/images/hero/hero3.png',
    alt: 'Slide 3',
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

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
                ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }
              `}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
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

        {/* Overlay */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30 md:to-black/20" />

        {/* المحتوى */}
        <div className="absolute inset-0 top-[16.5%] lg:top-[5.5%]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center lg:justify-start">
              <HeroContent />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="absolute top-[5.5%] right-[10%] z-30 pointer-events-auto w-[85%] max-w-[600px] lg:max-w-[700px]">
          <HeroSearch />
        </div>

      </div>

      <HeroServices />
    </section>
  );
};

