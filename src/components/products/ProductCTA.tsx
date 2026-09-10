'use client';

import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FaArrowRight } from 'react-icons/fa6';
import { FiPackage } from 'react-icons/fi';

export const ProductCTA = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* ===== الأيقونة والمحتوى ===== */}
          <div className="flex items-center gap-6 text-center lg:text-start">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <FiPackage className="text-white text-3xl md:text-4xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2">
                {t.productDetails?.ctaTitle || 'Need a Custom Quote?'}
              </h2>
              <p className="text-sm md:text-base text-gray-300 max-w-xl">
                {t.productDetails?.ctaDescription || 'Contact us today and get a personalized quote for your project.'}
              </p>
            </div>
          </div>

          {/* ===== الزر ===== */}
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl whitespace-nowrap"
          >
            <span>{t.productDetails?.ctaButton || 'Get a Quote'}</span>
            <FaArrowRight className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  );
};