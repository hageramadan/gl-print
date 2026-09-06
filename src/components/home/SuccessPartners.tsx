'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/useLanguage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const partnersData = [
  {
    id: 1,
    name: 'Company 1',
    image: '/images/partners/partner1.png',
  },
  {
    id: 2,
    name: 'Company 2',
    image: '/images/partners/partner2.png',
  },
  {
    id: 3,
    name: 'Company 3',
    image: '/images/partners/partner3.png',
  },
  {
    id: 4,
    name: 'Company 4',
    image: '/images/partners/partner4.png',
  },
  {
    id: 5,
    name: 'Company 5',
    image: '/images/partners/partner5.png',
  },
  {
    id: 6,
    name: 'Company 6',
    image: '/images/partners/partner6.png',
  },
  {
    id: 7,
    name: 'Company 7',
    image: '/images/partners/partner7.png',
  },
  {
    id: 8,
    name: 'Company 8',
    image: '/images/partners/partner8.png',
  },
];

export const SuccessPartners = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        
  
        <div className=" mb-10 md:mb-14">
          <div className="flex items-center  gap-3 mb-3">
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
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 40,
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
            {partnersData.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="flex items-center justify-center transition-all duration-500 ">
                  <div className="relative w-37.5 h-37.5">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={150}
                      height={150}
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