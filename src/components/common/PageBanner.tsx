"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiChevronRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
  breadcrumbs?: {
    label: string;
    href: string;
  }[];
  height?: string;
}

export const PageBanner = ({
  title,
  backgroundImage = "/images/banner/services-banner.png",
  breadcrumbs = [],
  height = "h-[250px] lg:h-[300px]",
}: PageBannerProps) => {
  const { t, dir } = useLanguage();

  const defaultBreadcrumbs = [
    { label: t.banner?.home || "Home", href: "/" },
    { label: title, href: "#" },
  ];

  const finalBreadcrumbs =
    breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <div className={`relative w-full ${height} overflow-hidden`} dir={dir}>
      {/* ===== خلفية الصورة ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
                    className={`text-white/90 ${dir === "rtl" ? "rotate-180" : ""}`}
                    size={14}
                  />
                )}
                {isLast ? (
                  <span className="text-white font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
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

        {/* ===== العنوان في المنتصف ===== */}
        <div className="flex-1 flex items-center">
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};