"use client";

import { useLanguage } from "@/src/hooks/useLanguage";
import { ProductCard } from "./ProductCard";
import { Product } from "@/src/services/productApi";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const { t, dir } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  // ✅ التمرير يمين/شمال
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-5 md:py-2 lg:py-2">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* ===== العنوان ===== */}
        <div className="mb-4 md:mb-8 px-4 sm:px-2">
          <h1 className="text-2xl md:text-3xl lg:text-[40px] text-[#171A21] tracking-wider font-extrabold">
            {t.productDetails?.relatedTag || "Related Products"}
          </h1>
        </div>

        {/* ===== Slider Wrapper ===== */}
        <div className="relative">
          {/* زر السابق - على اليسار */}
          {products.length > 2 && (
            <button
              onClick={() => scroll(dir === "rtl" ? "right" : "left")}
              aria-label="Previous"
              className="
                absolute top-1/2 -translate-y-1/2 z-20
                start-0 sm:-start-3 md:-start-6 lg:-start-10
                w-9 h-9 md:w-12 md:h-12
                rounded-full bg-white shadow-lg border border-gray-100
                flex items-center justify-center
                text-[#171A21] hover:bg-primary hover:text-white hover:border-primary
                transition-all duration-300
              "
            >
              {dir === "rtl" ? (
                <FiChevronRight className="text-lg md:text-2xl" />
              ) : (
                <FiChevronLeft className="text-lg md:text-2xl" />
              )}
            </button>
          )}

          {/* زر التالي - على اليمين */}
          {products.length > 2 && (
            <button
              onClick={() => scroll(dir === "rtl" ? "left" : "right")}
              aria-label="Next"
              className="
                absolute top-1/2 -translate-y-1/2 z-20
                end-0 sm:-end-3 md:-end-6 lg:-end-10
                w-9 h-9 md:w-12 md:h-12
                rounded-full bg-white shadow-lg border border-gray-100
                flex items-center justify-center
                text-[#171A21] hover:bg-primary hover:text-white hover:border-primary
                transition-all duration-300
              "
            >
              {dir === "rtl" ? (
                <FiChevronLeft className="text-lg md:text-2xl" />
              ) : (
                <FiChevronRight className="text-lg md:text-2xl" />
              )}
            </button>
          )}

          {/* ===== Slider ===== */}
          <div
            ref={sliderRef}
            dir={dir}
            className="
              flex gap-4 md:gap-6
              overflow-x-auto scroll-smooth snap-x snap-mandatory
              pb-4 lg:justify-center
              [scrollbar-width:none] [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
              w-[80%] lg:w-full mx-auto
            "
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[78%] sm:w-[48%] lg:w-[32%] xl:w-[31.5%]"
              >
                <ProductCard product={product} delay={index * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};