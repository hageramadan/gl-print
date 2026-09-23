"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ProductAttribute } from "@/src/services/productApi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: Array<{ id: number; url: string }>;
    product_attributes?: ProductAttribute[]; // ✅ جديد
  };
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { t, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const images = product.image || [];
  const hasMultipleImages = images.length > 2;

  // ✅ استخدام product_attributes من API
  const specifications = product.product_attributes || [];

  // ✅ الانتقال لصورة معينة + تمرير الصور المصغرة
  const goToImage = (index: number) => {
    const total = images.length;
    if (total === 0) return;

    let newIndex = index;
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;

    setSelectedImage(newIndex);

    if (swiperRef.current) {
      swiperRef.current.slideTo(newIndex);
    }

    if (thumbnailsRef.current) {
      const thumb = thumbnailsRef.current.children[newIndex] as HTMLElement;
      if (thumb) {
        const container = thumbnailsRef.current;
        const thumbLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
        const containerWidth = container.clientWidth;

        container.scrollTo({
          left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrev = () => goToImage(selectedImage - 1);
  const handleNext = () => goToImage(selectedImage + 1);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* ===== الصور ===== */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full max-h-[702px] aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {images.length > 0 && (
                <Swiper
                  modules={[Navigation, EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) =>
                    setSelectedImage(swiper.activeIndex)
                  }
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

              <div className="absolute inset-0 bg-black/20 pointer-events-none z-10"></div>

              {/* ===== الصور المصغرة + الأسهم ===== */}
              {images.length > 1 && (
                <div className="absolute bottom-4 start-0 end-0 z-20 px-4">
                  <div className="flex items-center justify-center gap-3">
                    {hasMultipleImages && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="
                          shrink-0 w-10 h-10 md:w-12 md:h-12
                          bg-white/90 hover:bg-white
                          rounded-full shadow-lg
                          flex items-center justify-center
                          transition-all duration-300 hover:scale-110
                          z-30 cursor-pointer
                        "
                        aria-label="Previous image"
                      >
                        <FiChevronLeft
                          className={`text-primary text-xl md:text-2xl ${
                            dir === "rtl" ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                    <div
                      ref={thumbnailsRef}
                      className="flex items-center gap-5 lg:gap-[32px] overflow-x-auto scroll-smooth scrollbar-hide"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        padding: "8px 4px",
                        maxWidth: "100%",
                      }}
                    >
                      {images.map((img, index) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => goToImage(index)}
                          className="shrink-0 w-20 h-20 lg:w-37.5 lg:h-37.5 transition-all duration-300 hover:scale-105 cursor-pointer"
                          style={{
                            borderRadius: "12px",
                            boxShadow: "#00000040 0px 4px 12px",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <Image
                            src={img.url}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index !== selectedImage && (
                            <div className="absolute inset-0 bg-black/40"></div>
                          )}
                          {index === selectedImage && (
                            <div className="absolute inset-0 border-2 border-secondary rounded-xl"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    {hasMultipleImages && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="
                          shrink-0 w-10 h-10 md:w-12 md:h-12
                          bg-white/90 hover:bg-white
                          rounded-full shadow-lg
                          flex items-center justify-center
                          transition-all duration-300 hover:scale-110
                          z-30 cursor-pointer
                        "
                        aria-label="Next image"
                      >
                        <FiChevronRight
                          className={`text-primary text-xl md:text-2xl ${
                            dir === "rtl" ? "rotate-180" : ""
                          }`}
                        />
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

            {/* ✅ الوصف يدعم HTML */}
            <div
              className="text-base md:text-lg text-[#667085] font-semibold leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* ✅ المواصفات من API */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {specifications.map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 border-b border-[#E6E8ED] hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-14 h-14 rounded-lg bg-[#F6F7F9] flex items-center justify-center shrink-0">
                      {spec.image ? (
                        <Image
                          src={spec.image}
                          alt={spec.name}
                          width={120}
                          height={120}
                          className="object-contain w-14 h-14"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-primary/20 rounded" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-primary text-sm md:text-[20px]">
                        {spec.name}
                      </span>
                      <p className="text-sm lg:text-[18px] font-medium text-[#667085]">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/quote"
              className="inline-flex w-full mx-auto justify-center items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span>
                {t.productDetails?.requestQuote || "Request a Quote"}
              </span>
              <FaArrowRight className={dir === "rtl" ? "rotate-180" : ""} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};