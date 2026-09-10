'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { PageBanner } from '@/src/components/common/PageBanner';
import { ProductDetails } from '@/src/components/products/ProductDetails';
import { RelatedProducts } from '@/src/components/products/RelatedProducts';
import { ProductCTA } from '@/src/components/products/ProductCTA';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getProductDetails, Product } from '@/src/services/productApi';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { language, t } = useLanguage();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (id: number, lang: string) => {
    try {
      setLoading(true);
      const response = await getProductDetails(id, lang);
      setProduct(response.data.product);
      setRelatedProducts(response.data.related_products);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
      setError('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchData(productId, language);
    }
  }, [productId, language, fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* ===== 1. البانر ===== */}
      <PageBanner 
        title={product.name}
        backgroundImage={product.banner_image || '/images/banner/products-banner.png'}
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: t.products?.title || 'Products', href: '/products' },
          { label: product.name, href: '#' },
        ]}
      />

      {/* ===== 2. تفاصيل المنتج ===== */}
      <ProductDetails product={product} />

      {/* ===== 3. المنتجات ذات الصلة ===== */}
      {/* <RelatedProducts products={relatedProducts} /> */}

      {/* ===== 4. CTA ===== */}
      {/* <ProductCTA /> */}
    </main>
  );
}