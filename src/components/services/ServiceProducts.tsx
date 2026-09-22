'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ProductInService } from '@/src/services/servicesApi';
import { Pagination } from '@/src/components/common/Pagination';

interface ServiceProductsProps {
  products: ProductInService[];
}

const PRODUCTS_PER_PAGE = 12;

export const ServiceProducts = ({ products }: ServiceProductsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!products || products.length === 0) return null;

  // ✅ حساب المنتجات المعروضة
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // ✅ تمرير سلس إلى أعلى القسم
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pb-3 md:pb-6 lg:pb-10">
      <div className="container mx-auto px-4">
        {/* ===== المنتجات ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative w-full h-56 md:h-64 lg:h-72">
                  <Image
                    src={
                      product.image?.[0]?.url ||
                      '/images/products/placeholder.png'
                    }
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/50 to-transparent lg:from-primary/0 lg:via-primary/0 lg:to-primary/0 lg:group-hover:from-primary/90 lg:group-hover:via-primary/50 lg:group-hover:to-primary/30 transition-all duration-500"></div>

                  <div className="absolute inset-0 flex justify-between items-end p-4 sm:p-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 drop-shadow-lg line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="bg-primary rounded-full p-2 sm:p-3 hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30 shrink-0 ms-2">
                      <FiPlus className="text-white text-lg sm:text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== Pagination ===== */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};