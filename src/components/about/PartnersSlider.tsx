'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/useLanguage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface PartnersSliderProps {
  data: Array<{
    id: number;
    logo: string;
  }>;
}

export const PartnersSlider = ({ data }: PartnersSliderProps) => {
  const { t } = useLanguage();

  if (!data || data.length === 0) return null;

  return (
    <section className="py-2 md:py-16 lg:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* ===== العنوان ===== */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.about?.partners || 'Our Partners'}
            </span>
          </div>
        </div>

        {/* ===== سلايدر الشركاء ===== */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 30 },
            768: { slidesPerView: 5, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
            1280: { slidesPerView: 7, spaceBetween: 50 },
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={3000}
          className="overflow-visible"
        >
          {data.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="flex items-center justify-center transition-all duration-500 opacity-90 hover:opacity-100">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                  <Image
                    src={partner.logo}
                    alt={`Partner ${partner.id}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};