'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { useLanguage } from '@/src/hooks/useLanguage';

interface SearchBannerProps {
  backgroundImage?: string;
  initialQuery?: string;
}

export const SearchBanner = ({
  backgroundImage = '/images/banner/banner-quote.png',
  initialQuery = '',
}: SearchBannerProps) => {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden" dir={dir}>
      {/* ===== الخلفية ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* ===== المحتوى ===== */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-center">
          {t.search?.bannerTitle || 'Search '}
         <span className='text-secondary ms-2'>{t.search?.bannerTitle2 || ' Results'}</span> 
        </h1>

        {/* ===== حقل البحث ===== */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl flex items-center gap-3"
        >
          {/* <div className="relative flex-1">
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FiSearch className="text-lg" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search?.placeholder || 'Search for products, services...'}
              className="w-full ps-12 pe-4 py-3.5 rounded-xl border-2 border-white/30 bg-white/95 backdrop-blur-sm text-black placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-primary focus:shadow-lg text-base"
            />
          </div> */}
           <div className="relative flex-1">
          <div className="absolute start-4 z-50 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="text-lg z-50" />
          </div>
          <input
            type="text"
            value={query}
             onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search?.placeholder || 'Search for products, services...'}
            className="w-full rounded-xl border-2 border-white/30 bg-white/95 backdrop-blur-sm py-3.5 ps-12 pe-4 text-black placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-primary focus:shadow-lg text-base caret-transparent focus:caret-black"
            dir={dir}
          />
        </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-dark px-6 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-primary/30 whitespace-nowrap flex-shrink-0"
          >
            <FiSearch className="text-lg" />
            <span className="hidden sm:inline">
              {t.search?.button || 'Search'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};