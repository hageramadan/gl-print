'use client';

import { useLanguage } from '@/src/hooks/useLanguage';
import { ProductCard } from './ProductCard';
import { Product } from '@/src/services/productApi';

interface RelatedProductsProps {
  products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const { t } = useLanguage();

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.productDetails?.relatedTag || 'Related Products'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21]">
            {t.productDetails?.relatedTitle || 'You May Also Like'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};