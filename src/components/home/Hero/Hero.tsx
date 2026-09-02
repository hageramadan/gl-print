'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HeroContent } from './HeroContent';
import { HeroServices } from './HeroServices';

// صور السلايدر
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

  // تعريف دوال التنقل
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentSlide]);

  // التبديل التلقائي كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // دعم السحب باللمس
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
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
      <div 
        className="relative w-full  min-h-[600px] max-h-[1024px] md:h-[700px] lg:h-[1024px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* ===== الصور ===== */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute inset-0 transition-all duration-700 ease-in-out
              ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
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

        {/* ===== تدرج أزرق خفيف ===== */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/10 to-primary/10 z-5"></div>
        
        {/* ===== تدرج للأسفل لتسهيل قراءة الخدمات ===== */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 md:to-black/20 z-5"></div>

        {/* ===== المحتوى النصي ===== */}
        <div className="absolute inset-0 flex lg:items-center pt-20 lg:pt-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center lg:justify-start">
              <HeroContent />
            </div>
          </div>
        </div>

        {/* ===== نقاط التنقل (مخفية) ===== */}
        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === currentSlide ? 'w-10 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>

      {/* ===== خدمات الهيرو (نصفها داخل الهيرو ونصفها خارجه) ===== */}
      <HeroServices />
    </section>
  );
};