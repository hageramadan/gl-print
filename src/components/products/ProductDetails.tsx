'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa6';
import { LuRuler, LuFileText, LuPrinter, LuPackage } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: Array<{ id: number; url: string }>;
  };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { t, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const images = product.image || [];
  const hasMultipleImages = images.length > 3;

  // ✅ للتأكد من أن Swiper تم تحميله
  useState(() => {
    setIsMounted(true);
  });

  // المواصفات الثابتة مع الأيقونات
  const specifications = [
    {
      id: 1,
      icon: LuRuler,
      label: t.productDetails?.specs?.size || 'Size',
      value: 'A5 , A6 , A4',
    },
    {
      id: 2,
      icon: LuFileText,
      label: t.productDetails?.specs?.paper || 'Paper',
      value: '150... 170.... more',
    },
    {
      id: 3,
      icon: LuPrinter,
      label: t.productDetails?.specs?.printing || 'Printing',
      value: 'Single or Double sided',
    },
    {
      id: 4,
      icon: LuPackage,
      label: t.productDetails?.specs?.quantity || 'Quantity',
      value: 'Low to high....',
    },
  ];

  // ✅ التمرير في الصور المصغرة
  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailsRef.current) {
      const scrollAmount = 300;
      thumbnailsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // ✅ عند الضغط على صورة مصغرة
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* ===== الصور ===== */}
          <div className="w-full lg:w-1/2">
            {/* ===== البوكس الكبير ===== */}
            <div className="relative w-full max-h-[702px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
              
              {/* ===== سلايدر الصور ===== */}
              {images.length > 0 && (
                <Swiper
                  modules={[Navigation, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
                  loop={false}
                  allowTouchMove={true}
                  className="w-full h-full"
                >
                  {images.map((img) => (
                    <SwiperSlide key={img.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={img.url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* ===== خلفية سوداء شفافة ===== */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none z-10"></div>

              {/* ===== الصور المصغرة فوق الصورة من الأسفل ===== */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-20 px-4">
                  <div className="flex items-center gap-2">
                    {/* ===== سهم اليسار ===== */}
                    {hasMultipleImages && (
                      <button
                        onClick={() => scrollThumbnails('left')}
                        className="shrink-0 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
                        aria-label="Scroll left"
                      >
                        <FiChevronLeft className="text-primary text-lg" />
                      </button>
                    )}

                    {/* ===== الصور المصغرة ===== */}
                    <div
                      ref={thumbnailsRef}
                      className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {images.map((img, index) => (
                        <button
                          key={img.id}
                          onClick={() => handleThumbnailClick(index)}
                          className="shrink-0 transition-all duration-300 hover:scale-105"
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '8px',
                            boxShadow: '#00000040 0px 4px 12px',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={img.url}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {/* ===== خلفية سوداء شفافة على الصور غير المختارة ===== */}
                          {index !== selectedImage && (
                            <div className="absolute inset-0 bg-black/40"></div>
                          )}
                          {/* ===== إطار أحمر للصورة المختارة ===== */}
                          {index === selectedImage && (
                            <div className="absolute inset-0 border-2 border-secondary rounded-lg"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* ===== سهم اليمين ===== */}
                    {hasMultipleImages && (
                      <button
                        onClick={() => scrollThumbnails('right')}
                        className="shrink-0 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
                        aria-label="Scroll right"
                      >
                        <FiChevronRight className="text-primary text-lg" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== التفاصيل ===== */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4">
              {product.name}
            </h1>
            <p className="text-base md:text-lg text-[#667085] font-semibold leading-relaxed mb-8">
              {product.description}
            </p>

            {/* ===== المواصفات الثابتة مع الأيقونات ===== */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {specifications.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div 
                    key={spec.id}
                    className="p-4 border-b border-[#E6E8ED] hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-14 h-14 rounded-lg bg-[#F6F7F9] flex items-center justify-center shrink-0">
                        <Icon className="text-primary text-2xl" />
                      </div>
                      <div>
                        <span className="font-bold text-primary text-sm md:text-[20px]">
                          {spec.label}
                        </span>
                        <p className="text-sm lg:text-[18px] font-medium text-[#667085]">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="/quote"
              className="inline-flex w-full mx-auto justify-center items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span>{t.productDetails?.requestQuote || 'Request a Quote'}</span>
              <FaArrowRight className={dir === 'rtl' ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};