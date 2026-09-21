'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { PageBanner } from '@/src/components/common/PageBanner';
import { ProductDetails } from '@/src/components/products/ProductDetails';
import { RelatedProducts } from '@/src/components/products/RelatedProducts';
import { ProductCTA } from '@/src/components/products/ProductCTA';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getProductDetails, Product } from '@/src/services/productApi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { language, t } = useLanguage();
   const productSlug = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (slug: string, lang: string) => {
    try {
      setLoading(true);
      const response = await getProductDetails(slug, lang);
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
    if (productSlug) {
      fetchData(productSlug, language);
    }
  }, [productSlug, language, fetchData]);

  if (loading) {
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
}

  if (error || !product) {
    return (
     <></>
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
          { label: t.products?.products2 || 'Products', href: '/products' },
          { label: product.name, href: '#' },
        ]}
      />

      
      <ProductDetails product={product} />

      
      <RelatedProducts products={relatedProducts} />

    
      <ProductCTA />
    </main>
  );
}