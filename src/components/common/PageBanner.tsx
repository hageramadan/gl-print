"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { GoHome } from "react-icons/go";

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  height?: string;
  // ✅ إضافة خيار إظهار البحث
  showSearch?: boolean;
  initialQuery?: string;
}

export const PageBanner = ({
  title,
  backgroundImage = "/images/banner/services-banner.png",
  breadcrumbs = [],
  height = "h-[250px] lg:h-[300px]",
  showSearch = false, // ✅ افتراضياً: مخفي
  initialQuery = "",
}: PageBannerProps) => {
  const { t, dir } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const defaultBreadcrumbs = [
    { label: t.banner?.home || "Home", href: "/" },
    { label: title, href: "#" },
  ];

  const finalBreadcrumbs =
    breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  // ✅ دالة البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className={`relative w-full ${height} overflow-hidden`} dir={dir}>
      {/* ===== الخلفية ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* ===== المحتوى ===== */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
        {/* ===== Breadcrumb في الأعلى ===== */}
        <div className="flex items-center gap-1 text-sm text-white/90 pt-6">
          <GoHome className="inline-block text-white" size={16} />
          {finalBreadcrumbs.map((crumb, index) => {
            const isLast = index === finalBreadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <div key={index} className="flex items-center gap-2">
                {!isFirst && (
                  <FiChevronRight
                    className={`text-white/90 ${
                      dir === "rtl" ? "rotate-180" : ""
                    }`}
                    size={14}
                  />
                )}
                {isLast ? (
                  <span className="text-white font-medium line-clamp-1">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    aria-label={`go to ${crumb.href}`}
                    href={crumb.href}
                    className="hover:text-white transition-colors duration-300 text-sm lg:text-base"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* ===== العنوان + البحث في المنتصف ===== */}
        <div className="flex-1 flex flex-col justify-center">
          {showSearch ? (
            <div className="relative z-10 container mx-auto  h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center lg:text-start mb-6">
                {title}
              </h1>

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
          ) : (
            // ✅ بدون البحث: العنوان فقط
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">
              {title}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
