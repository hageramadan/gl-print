'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/useLanguage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonialsData = [
  {
    id: 1,
    name: 'Mohamed Mostafa',
    date: '26 Jan, 2025',
    comment: 'An excellent company that is very flexible to work with',
    image: '/images/testimonials/client.png',
    rating: 5,
  },
  {
    id: 2,
    name: 'Ahmed Ibrahim',
    date: '20 Jan, 2025',
    comment: 'An excellent company that is very flexible to work with',
    image: '/images/testimonials/client.png',
    rating: 5,
  },
  {
    id: 3,
    name: 'Saad Khaled',
    date: '15 Jan, 2025',
    comment: 'An excellent company that is very flexible to work with',
    image: '/images/testimonials/client.png',
    rating: 4,
  },
  {
    id: 4,
    name: 'Khaled Youssef',
    date: '10 Jan, 2025',
    comment: 'Highly recommended! They transformed our ideas into beautiful prints that perfectly represent our brand.',
    image: '/images/testimonials/client.png',
    rating: 5,
  },
  {
    id: 5,
    name: 'Nader Hassan',
    date: '5 Jan, 2025',
    comment: 'Professional, reliable, and always on time. We have been working with them for years and never been disappointed.',
    image: '/images/testimonials/client.png',
    rating: 5,
  },
];

export const Testimonials = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="py-5 md:py-12 lg:py-12 overflow-hidden" dir={dir}>
      <div className="container mx-auto px-4 relative">
        

        <div className="mb-3 md:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.testimonials?.tag || 'What Our Clients Say'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21]">
            {t.testimonials?.title || 'Real Success Stories'}
          </h2>
        </div>

        
        <div className="relative">
          
          
          <div className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <button className="swiper-button-prev-custom w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary group border border-gray-200">
              <FiChevronLeft className="text-2xl text-primary group-hover:text-white transition-colors" />
            </button>
          </div>

          
          <div className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <button className="swiper-button-next-custom w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-primary group border border-gray-200">
              <FiChevronRight className="text-2xl text-primary group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* ===== Swiper ===== */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
           dir='ltr'
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3.2,
                spaceBetween: 24,
              },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-primary/30 !opacity-100',
              bulletActiveClass: '!bg-secondary !w-8 !rounded-full',
            }}
            loop={true}
            
            className="lg:pb-14!"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-[#F6F7F9] my-4 rounded-2xl border border-[#D2D6DF] shadow-lg shadow-[#0000000F] p-6 md:p-8 h-52 md:h-71 lg:h-71 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
                  
                 
                  <div className="flex items-center gap-4 mb-4 shrink-0">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-base md:text-[20px] font-semibold text-[#1A1A1A]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm md:text-base text-[#717182]">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex items-center gap-1 mb-3 shrink-0">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`text-sm md:text-base ${
                          index < testimonial.rating
                            ? 'text-[#FD9E1A] fill-[#FD9E1A]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

              
                  <p className="text-sm md:text-base text-[#717182] font-medium leading-relaxed line-clamp-3 flex-1">
                    {testimonial.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};