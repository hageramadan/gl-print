'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/useLanguage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface SuccessPartnersProps {
  data: Array<{
    id: number;
    logo: string;
  }>;
}

export const SuccessPartners = ({ data }: SuccessPartnersProps) => {
  const { t, dir } = useLanguage();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.partners?.tag || 'Our Success Partners'}
            </span>
          </div>
          <h3 className="text-lg md:text-xl lg:text-[46px] w-full lg:max-w-2xl text-[#171A21] font-extrabold">
            {t.partners?.subtitle || 'Companies and projects that have trusted us.'}
          </h3>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 50,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 60,
              },
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
                <div className="flex items-center justify-center transition-all duration-500">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 xl:w-37.5 xl:h-37.5">
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
      </div>
    </section>
  );
};