'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

interface IndustryCardProps {
  industry: {
    id: number;
    slug: string;
    name: string;
    description: string;
    image: string;
  };
  delay?: number;
}

export const IndustryCard = ({ industry, delay = 0 }: IndustryCardProps) => {
  const { dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <Link href={`/industries/${industry.slug}`} className="block group">
      <div
        ref={cardRef}
        className={`
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{
          transitionProperty: 'all',
          transitionDuration: '0.6s',
        }}
      >
        {/* ===== الصورة لوحدها ===== */}
        <div className="relative max-w-full h-40 lg:h-70.5 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <Image
            src={industry.image}
            alt={industry.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#00000029] to-transparent"></div>
        </div>

        {/* ===== الاسم لوحده تحت الصورة ===== */}
        <h3 className="mt-4 text-lg md:text-2xl font-extrabold text-primary group-hover:text-primary transition-colors text-center">
          {industry.name}
        </h3>
      </div>
    </Link>
  );
};