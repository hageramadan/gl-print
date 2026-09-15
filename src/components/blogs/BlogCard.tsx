'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiArrowRight } from 'react-icons/fi';
import { BsCalendar4 } from 'react-icons/bs';

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    description: string;
    image: string;
    published_at: string;
  };
  delay?: number;
}

export const BlogCard = ({ blog, delay = 0 }: BlogCardProps) => {
  const { t, dir } = useLanguage();
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
    <div
      ref={cardRef}
      className={`
        group bg-white p-2 md:p-6 rounded-2xl overflow-hidden border border-[#E6E8ED]
        shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
        flex flex-col h-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{
        transitionProperty: 'all',
        transitionDuration: '0.6s',
      }}
    >
      {/* ===== الصورة ===== */}
      <Link href={`/blogs/${blog.id}`} className="block">
        <div className="relative w-full h-32 md:h-60 rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover  group-hover:scale-105 transition-transform duration-700"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
        </div>
      </Link>

      {/* ===== المحتوى ===== */}
      <div className="py-1.5 mt-2 lg:mt-4 flex flex-col flex-1">
        {/* التاريخ */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-[#475156] mb-1.5 lg:mb-3">
          <BsCalendar4 className="text-primary w-3 h-3 lg:w-5 lg:h-5" />
          <span className='text-xs lg:text-sm font-medium'>{blog.published_at}</span>
        </div>

        {/* العنوان */}
        <Link href={`/blogs/${blog.id}`}>
          <h3 className="text-xs md:text-lg font-semibold text-[#191C1F] mb-1 lg:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>

        {/* الوصف */}
        <p className="text-[10px] md:text-base font-semibold lg:font-medium text-[#77878F] leading-relaxed mb-1 lg:mb-4 line-clamp-2 lg:line-clamp-3 flex-1">
          {blog.description}
        </p>

        {/* اقرأ المزيد */}
        <Link
          href={`/blogs/${blog.id}`}
          className="inline-flex   items-center border px-2 lg:px-3 py-1 lg:py-2 w-fit rounded-lg capitalize gap-2 text-primary font-semibold text-[10px] md:text-base hover:text-secondary transition-colors group-hover:gap-3 duration-300"
        >
          {t.blogs?.readMore || 'Read more'}
          <FiArrowRight
            className={`transition-transform duration-300 group-hover:translate-x-1 ${
              dir === 'rtl' ? 'rotate-180' : ''
            }`}
          />
        </Link>
      </div>
    </div>
  );
};