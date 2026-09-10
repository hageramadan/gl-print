'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: Array<{ url: string }>;
  };
  delay?: number;
}

export const ProductCard = ({ product, delay = 0 }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const imageUrl = product.image?.[0]?.url || '/images/products/placeholder.png';

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div
        ref={cardRef}
        className={`
          relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
        style={{
          transitionDelay: `${delay}s`,
          transitionProperty: 'all',
          transitionDuration: '0.6s',
        }}
      >
        <div className="relative w-full h-64 md:h-72 lg:h-80">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30 lg:from-primary/0 lg:via-primary/0 lg:to-primary/0 lg:group-hover:from-primary/90 lg:group-hover:via-primary/60 lg:group-hover:to-primary/30 transition-all duration-500"></div>

          <div className="absolute inset-0 flex justify-between items-end p-4 sm:p-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0">
            <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 drop-shadow-lg line-clamp-2">
              {product.name}
            </h3>

            <div className="bg-secondary rounded-full p-2 sm:p-3 hover:scale-110 transition-transform duration-300 shadow-lg shadow-secondary/30 flex-shrink-0 ms-2">
              <FiPlus className="text-white text-lg sm:text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};