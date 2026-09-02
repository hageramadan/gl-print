"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
// استيراد الـ CSS الخاص بـ Swiper
import "swiper/css";
import "swiper/css/pagination";

const servicesData = [
  {
    id: 1,
    title: "Printing Services",
    description:
      "High-quality printing solutions tailored to your business needs.",
    image: "/images/services/service1.jpg",
    link: "/services/printing",
  },
  {
    id: 2,
    title: "Graphic Design Services",
    description:
      "Creative designs tailored to your brand and communication needs.",
    image: "/images/services/service2.png",
    link: "/services/design",
  },
  {
    id: 3,
    title: "Packaging Solutions",
    description:
      "Custom boxes, bags, and product packaging engineered for your brand.",
    image: "/images/services/service3.jpg",
    link: "/services/packaging",
  },
  {
    id: 4,
    title: "Digital Printing",
    description: "Fast and high-quality digital printing for all your needs.",
    image: "/images/services/service1.jpg",
    link: "/services/digital",
  },
];

export const Services = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 lg:py-24  overflow-hidden">
      <div className="= mx-auto ">
        <div className=" container mx-auto mb-12 md:mb-16 px-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.services2?.tag || "Our Services"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] mt-2">
            {t.services2?.title || "Everything Your Brand"}
            <br />
            <span className="text-[#171A21]">
              {t.services2?.subtitle || "Needs In One Place."}
            </span>
          </h2>
        </div>

        {/* ===== سلايدر الخدمات ===== */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1280: {
              slidesPerView: 3.2,
              spaceBetween: 0,
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              "hidden swiper-pagination-bullet !bg-primary/30 !opacity-100",
            bulletActiveClass: "!bg-secondary !w-8 !rounded-full",
          }}
          loop={true}
          className="pb-0!"
        >
          {servicesData.map((service) => (
            <SwiperSlide key={service.id}>
              <Link href={service.link} className="block group">
                <div className="relative  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* ===== الصورة ===== */}
                  <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* ===== الكفر الأحمر الشفاف ===== */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-secondary/20 group-hover:from-secondary/90 group-hover:via-secondary/50 group-hover:to-secondary/30 transition-all duration-500"></div>

                    {/* ===== الكفر الأحمر مع تأثير من الشمال (إضافة جديدة) ===== */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/70 group-hover:via-secondary/40 group-hover:to-secondary/10 transition-all duration-700 ease-out"></div>

                    {/* ===== المحتوى ===== */}
                    <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 group-hover:translate-x-2 transition-all duration-300">
                        {service.title}
                      </h3>

                      {/* ===== الوصف (يظهر عند hover مع حركة) ===== */}
                      <p className="text-white/0 text-sm md:text-base mb-4 max-w-xs transition-all duration-500 group-hover:text-white/90 group-hover:opacity-100 opacity-0 -translate-x-4 group-hover:translate-x-0">
                        {service.description}
                      </p>

                      {/* ===== Learn More مع حدود (يظهر عند hover) ===== */}
                      <div className="inline-flex items-center gap-2 text-white w-fit font-medium border-2  border-white/80 px-2 py-2 rounded-2xl group-hover:rounded-full transition-all duration-500 group-hover:px-4 group-hover:border-white">
                        <span className="text-sm transition-all duration-500 hidden group-hover:block">
                          Learn More
                        </span>
                        <FaArrowRightLong className="text-xl transition-transform duration-300 group-hover:translate-x-1 mx-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== زر View All Services ===== */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span>{t.services2?.viewAll || "View All Services"}</span>
            <FiArrowRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};
