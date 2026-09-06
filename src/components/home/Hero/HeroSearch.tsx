'use client';

import { useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiSearch } from 'react-icons/fi';

export const HeroSearch = () => {
  const { t, dir } = useLanguage();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div className="relative z-20 w-full max-w-3xl pointer-events-auto">
      <form
        onSubmit={handleSearch}
        dir={dir}
        className="relative z-20 flex items-center gap-3 pointer-events-auto"
      >
        {/* ===== حقل البحث ===== */}
        <div className="relative flex-1">
          {/* ===== أيقونة البحث داخل الانبوت ===== */}
          <div className="absolute left-4 z-50 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <FiSearch className="text-lg z-50" />
          </div>
          
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t.search?.placeholder || 'Search for products, services...'}
            className="w-full rounded-xl border-2 border-white/30 bg-white/95 backdrop-blur-sm py-3.5 pl-12 pr-4 text-black placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-primary focus:shadow-lg text-base"
            dir={dir}
          />
        </div>

        {/* ===== زر البحث ===== */}
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-xl shadow-lg shadow-primary/30 whitespace-nowrap flex-shrink-0"
        >
          {/* <FiSearch className="text-lg" /> */}
          <span className="inline">
            {t.search?.button || 'Search'}
          </span>
        </button>
      </form>
    </div>
  );
};