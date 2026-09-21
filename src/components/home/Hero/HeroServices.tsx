'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getServices, Service } from '@/src/services/servicesApi';

import 'swiper/css';
import 'swiper/css/autoplay';
import { LoadingScreen } from '../../common/LoadingScreen';

export const HeroServices = () => {
  const { language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ تحديد اللغة العربية
  const isArabic = language === 'ar';

  // ✅ نص "Learn more" حسب اللغة
  const learnMoreText = isArabic ? 'اعرف المزيد' : 'Learn more';

  // ✅ أيقونة السهم حسب اللغة (معكوسة في العربية)
  const ArrowIcon = isArabic ? FiArrowLeft : FiArrowRight;

  // ✅ جلب أول 3 خدمات من API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices(1, language);
        // ✅ أول 3 خدمات فقط
        setServices(response.data.services.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch hero services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [language]);

  // if (loading || services.length === 0) {
  //   return null;
  // }
  if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}

  return (
    <div className="absolute bottom-0 sm:-bottom-1 lg:bottom-1 start-0 end-0 z-20">
      <div className="container mx-auto px-1 lg:px-4">
        {/* ===== Desktop & Tablet ===== */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="
                group
                bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg 
                p-4 sm:p-5 md:p-6 
                transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl
                border border-gray-200/80 hover:border-primary/20
                animate-fade-in-up
              "
              style={{
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
                animationFillMode: 'forwards',
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="shrink-0">
                  <div
                    className="
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                      rounded-full 
                      bg-[#ECF6FF] flex items-center justify-center
                      group-hover:bg-[#ECF6FF]/90 transition-all duration-300
                      overflow-hidden
                    "
                  >
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={50}
                      height={50}
                      className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 p-0.5 sm:p-1"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="
                      text-xs sm:text-sm md:text-base lg:text-lg 
                      font-bold text-[#070D14] mb-0.5 sm:mb-1 
                      group-hover:text-primary transition-colors 
                      line-clamp-1
                    "
                  >
                    {service.title}
                  </h3>
                  <p
                    className="
                      text-[10px] sm:text-xs md:text-sm lg:text-base 
                      text-[#585858] mb-1 sm:mb-2 
                      line-clamp-2
                    "
                  >
                    {service.description}
                  </p>
                  <Link
                    aria-label={`go to services`}
                    href={`/products?service=${service.id}`}
                    className="
                      inline-flex items-center gap-1 
                      text-primary font-medium 
                      text-[10px] sm:text-xs md:text-sm lg:text-base
                      hover:text-primary-dark transition-colors
                      group-hover:gap-2 transition-all duration-300
                    "
                  >
                    {learnMoreText}
                    <ArrowIcon
                      className="
                        text-[10px] sm:text-xs md:text-sm 
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Mobile ===== */}
        <div className="block lg:hidden overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.25}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="!overflow-visible"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div
                  className="
                    group 
                    my-4
                    bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg 
                    p-5 
                    transition-all duration-500 hover:shadow-2xl
                    border border-gray-200/80
                    h-full
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div
                        className="
                          w-14 h-14 
                          rounded-full 
                          bg-[#ECF6FF] flex items-center justify-center
                          group-hover:bg-[#ECF6FF]/90 transition-all duration-300
                          overflow-hidden
                        "
                      >
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={50}
                          height={50}
                          className="object-contain w-10 h-10 p-1"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="
                          text-sm 
                          font-bold text-[#070D14] mb-1 
                          group-hover:text-primary transition-colors 
                          line-clamp-1
                        "
                      >
                        {service.title}
                      </h3>
                      <p
                        className="
                          text-xs 
                          text-[#585858] mb-2 
                          line-clamp-2
                        "
                      >
                        {service.description}
                      </p>
                      <Link
                        aria-label={`go to services`}
                        href={`/products?service=${service.id}`}
                        className="
                          inline-flex items-center gap-1 
                          text-primary font-semibold text-xs
                          hover:text-primary-dark transition-colors
                          group-hover:gap-2 transition-all duration-300
                        "
                      >
                        {learnMoreText}
                        <ArrowIcon
                          className="
                            text-xs 
                            transition-transform duration-300
                            group-hover:translate-x-1
                          "
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};