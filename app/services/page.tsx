'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { ServiceCard } from '@/src/components/services/ServiceCard';
import { Pagination } from '@/src/components/common/Pagination';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getServices, Service } from '@/src/services/servicesApi';

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchServices = useCallback(async (page: number, lang: string) => {
    try {
      setLoading(true);
      console.log('🔄 Fetching services with language:', lang, 'page:', page);
      const response = await getServices(page, lang);
      setServices(response.data.services);
      setCurrentPage(response.data.pagination.current_page);
      setLastPage(response.data.pagination.last_page);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices(currentPage, language);
  }, [fetchServices, currentPage, language]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PageBanner 
        title={t.servicesPage?.title || 'Services'}
        backgroundImage="/images/banner/services-banner.png"
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: t.servicesPage?.title || 'Services', href: '#' },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 md:mb-14">
            <div className="flex items-center  gap-3 mb-3">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.servicesPage?.tag || 'Our Services'}
              </span>
              
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21]">
              {t.servicesPage?.subtitle || 'Everything Your Brand'}
              <br />
              <span className="text-[#171A21]">
                {t.servicesPage?.subtitle2 || 'Needs In One Place.'}
              </span>
            </h2>
            
          </div>

          {services.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                {services.map((service, index) => (
                  <ServiceCard 
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    link={`/services/${service.id}`}
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
              <p className="text-gray-500 text-lg">No services found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}