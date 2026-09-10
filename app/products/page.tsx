'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { ProductCard } from '@/src/components/products/ProductCard';
import { ServiceFilter } from '@/src/components/products/ServiceFilter';
import { Pagination } from '@/src/components/common/Pagination';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getProducts, Product, Banner } from '@/src/services/productsApi';
import { getServices, Service } from '@/src/services/servicesApi';

export default function ProductsPage() {
  const { language, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  // ✅ استخدام ref لتتبع أول تحميل
  const initialLoadDone = useRef(false);

  // ✅ جلب الخدمات للفلترة (مرة واحدة فقط)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices(1, language);
        setServices(response.data.services);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchServices();
  }, [language]);

  // ✅ جلب المنتجات - منع التكرار
  const fetchProducts = useCallback(async (page: number, serviceId: number | null) => {
    try {
      setLoading(true);
      console.log('🔄 Fetching products with page:', page, 'service:', serviceId);
      const response = await getProducts(page, serviceId, language);
      setProducts(response.data.products);
      setBanner(response.data.banner);
      setCurrentPage(response.data.pagination.current_page);
      setLastPage(response.data.pagination.last_page);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  // ✅ جلب المنتجات عند تغيير الصفحة أو الفلتر
  useEffect(() => {
    // منع الطلب الأول الزائد
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      fetchProducts(currentPage, selectedService);
      return;
    }
    fetchProducts(currentPage, selectedService);
  }, [currentPage, selectedService, fetchProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceChange = (serviceId: number | null) => {
    setSelectedService(serviceId);
    setCurrentPage(1);
  };

  // ✅ إعادة تعيين initialLoadDone عند تغيير اللغة
  useEffect(() => {
    initialLoadDone.current = false;
  }, [language]);

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  const bannerTitle = banner?.title || t.products?.title || 'Products';
  const bannerImage = banner?.image_url || '/images/banner/products-banner.png';

  return (
    <main>
      <PageBanner 
        title={bannerTitle}
        backgroundImage={bannerImage}
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: bannerTitle, href: '#' },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-5 md:mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.products?.tag2 || 'Our Products'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21]">
              {t.products?.title || 'Featured Products'}
            </h2>
          
          </div>

          {services.length > 0 && (
            <ServiceFilter 
              services={services}
              selectedService={selectedService}
              onServiceChange={handleServiceChange}
            />
          )}

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              <Pagination 
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t.products?.noProducts || 'No products found.'}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}