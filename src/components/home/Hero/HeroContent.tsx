'use client';

import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { useEffect, useRef } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { HeroCard } from './HeroCard';

export const HeroContent = () => {
  const { t, dir } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={contentRef}
      className="relative w-full lg:w-1/2 bg-white/75 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/10 opacity-0 mx-auto lg:mx-0"
      style={{ animationFillMode: 'forwards' }}
      dir={dir}
    >
      {/* ===== العنوان ===== */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-[10px] sm:text-[12.5px] font-bold mb-2 flex items-center gap-2">
          <div className="h-0.5 w-4 sm:w-5 bg-secondary"></div>
          <span className="text-secondary">GL</span>
          <span className="text-primary">PRINT</span>
        </h2>
        <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-[50px] xl:text-[60px] w-full lg:max-w-xl font-extrabold leading-tight text-[#090E1B]">
          We Print Your Ideas.
          <br />
          <span className="text-secondary">We Build Your Brand.</span>
        </h1>
      </div>

      {/* ===== الوصف ===== */}
      <p className="text-sm sm:text-base md:text-lg text-[#3E3F42] mb-6 sm:mb-8 max-w-xl font-medium">
        GL PRINT delivers complete solutions that help businesses look consistent, 
        professional, and ready to grow.
      </p>

      {/* ===== الأزرار ===== */}
      <div className="flex  gap-1 sm:gap-4 mb-3 md:mb-8">
        <Link
          href="/quote"
          className="text-[10px] sm:text-[14.5px] font-bold flex items-center gap-1 sm:gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-2xl shadow-lg shadow-red-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <span>Get a Quote</span>
          <FaArrowRight className="text-white text-xs sm:text-sm" />
        </Link>
        <Link
          href="/services"
          className="text-[10px] sm:text-[14.5px] font-bold flex items-center gap-1 sm:gap-2 bg-primary text-white px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-white/30"
        >
          <span>Explore Our Services</span>
          <FaArrowRight className="text-white text-xs sm:text-sm" />
        </Link>
      </div>

      {/* ===== خط فاصل ===== */}
      <div className='h-px w-full bg-primary/10'></div>

      {/* ===== الإحصائيات ===== */}
      <div className="flex  items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 pt-4 mb-6">
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">20+</div>
          <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#667085] font-semibold">YEARS OF EXPERIENCE</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">10,000+</div>
          <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#667085] font-semibold">BUSINESSES SERVED</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">50+</div>
          <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-[#667085] font-semibold">PRODUCTS & SERVICES</div>
        </div>
      </div>

      {/* ===== HeroCard ===== */}
      <div className='absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 xl:-right-20 -bottom-16 md:-bottom-2 lg:-bottom-12'>
        <HeroCard />
      </div>
    </div>
  );
};