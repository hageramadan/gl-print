"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import {  FiPlus } from "react-icons/fi";

const productsData = [
  {
    id: 1,
    title: "Premium Business Cards",
    description: "High-quality business cards with premium finish.",
    image: "/images/products/product1.png",
    link: "/products/business-cards",
    category: "Business Cards",
  },
  {
    id: 2,
    title: "Luxury Brochures",
    description: "Elegant brochures for your brand identity.",
    image: "/images/products/product2.png",
    link: "/products/brochures",
    category: "Brochures",
  },
  {
    id: 3,
    title: "Custom Flyers",
    description: "Eye-catching flyers for your promotions.",
    image: "/images/products/product3.png",
    link: "/products/flyers",
    category: "Flyers",
  },
  {
    id: 4,
    title: "Branded Posters",
    description: "High-impact posters for advertising.",
    image: "/images/products/product4.png",
    link: "/products/posters",
    category: "Posters",
  },
  {
    id: 5,
    title: "Packaging Boxes",
    description: "Custom packaging solutions for your products.",
    image: "/images/products/product5.png",
    link: "/products/packaging",
    category: "Packaging",
  },
];

export const FeaturedProducts = () => {
  const { t, dir } = useLanguage();

  const topProducts = productsData.slice(0, 2);
  const bottomProducts = productsData.slice(2, 5);

  return (
    <section className="py-5 lg:py-12 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.products?.tag || "Featured Products"}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold text-primary">
              {t.products?.title2 || "Latest Products"}
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex text-lg items-center gap-2 text-secondary/90 font-bold hover:text-secondary transition-colors mt-3 sm:mt-0 group"
          >
            <span>{t.products?.viewAll || "View All"}</span>
            {/* <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" /> */}
          </Link>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {bottomProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={product.link} className="block group">
      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
        <div className="relative w-full h-62.5 md:h-70 lg:h-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30 transition-all duration-500"></div>

          <div className="absolute inset-0 flex  justify-between items-end p-6  opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
           
             <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
              {product.title}
            </h3>

            <div className="bg-primary rounded-full p-3 hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
              <FiPlus className="text-white text-2xl" />
            </div>
         
          </div>
        </div>
      </div>
    </Link>
  );
};
