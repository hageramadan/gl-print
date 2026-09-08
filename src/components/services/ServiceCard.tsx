'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

export const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  delay = 0 
}: ServiceCardProps) => {
  const { t, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group bg-white rounded-[14px] p-3 md:p-8 
        border border-[#E6E8ED]
        transition-all duration-100 hover:-translate-y-2
        hover:bg-secondary hover:text-white
        flex flex-col items-start
        max-h-71 h-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ 
        transitionProperty: 'all',
        transitionDuration: '0.3s',
      }}
    >
      {/* ===== الأيقونة ===== */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="object-contain w-10 h-10 md:w-12 md:h-12"
        />
      </div>

      {/* ===== العنوان ===== */}
      <h3 className="text-base md:text-lg font-bold text-[#070D14] mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>

      {/* ===== الوصف ===== */}
      <p className="text-sm md:text-base text-[#667085] font-medium group-hover:text-white leading-relaxed mb-2 lg:mb-4 flex-1 line-clamp-3">
        {description}
      </p>

      {/* ===== رابط Learn More ===== */}
      <Link
        href={link}
        className="
          inline-flex items-center gap-2 
          text-primary font-semibold text-sm md:text-base
          transition-colors
          group-hover:gap-3 duration-300
          group-hover:text-white
        "
      >
        <span>{t.services?.learnMore || 'Learn More'}</span>
        <FiArrowRight 
          className={`text-sm transition-transform duration-300 group-hover:translate-x-1 ${
            dir === 'rtl' ? 'rotate-180' : ''
          }`}
        />
      </Link>
    </div>
  );
};