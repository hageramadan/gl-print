"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiPlus } from "react-icons/fi";

interface FeaturedProductsProps {
  data: Array<{
    id: number;
    service_id: number;
    name: string;
    description: string;
    image: Array<{
      id: number;
      url: string;
      file_name: string;
      mime_type: string;
    }>;
  }>;
}

export const FeaturedProducts = ({ data }: FeaturedProductsProps) => {
  const { t, dir } = useLanguage();

  if (!data || data.length === 0) {
    return null;
  }

  const formattedProducts = data.map((product) => ({
    id: product.id,
    title: product.name,
    description: product.description,
    image: product.image?.[0]?.url || "/images/products/placeholder.png",
    link: `/products/${product.id}`,
    category: "Product",
  }));

  const topProducts = formattedProducts.slice(0, 2);
  const bottomProducts = formattedProducts.slice(2, 5);

  return (
    <section className="py-5 lg:py-12 bg-white" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-5 md:mb-12">
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
          </Link>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
        <div className="relative w-full h-48 sm:h-56 md:h-62.5 lg:h-70 xl:h-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30 lg:from-primary/0 lg:via-primary/0 lg:to-primary/0 lg:group-hover:from-primary/90 lg:group-hover:via-primary/60 lg:group-hover:to-primary/30 transition-all duration-500"></div>

          <div className="absolute inset-0 flex justify-between items-end p-4 sm:p-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
            <h3 className="text-white text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-1 drop-shadow-lg">
              {product.title}
            </h3>

            <div className="bg-primary rounded-full p-2 sm:p-3 hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30 flex-shrink-0 ms-2">
              <FiPlus className="text-white text-lg sm:text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};