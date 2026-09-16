'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { IndustryCard } from '@/src/components/industries/IndustryCard';
import { Pagination } from '@/src/components/common/Pagination';
import { useLanguage } from '@/src/hooks/useLanguage';
import {
  getIndustries,
  Industry,
  Banner,
} from '@/src/services/industriesApi';

export default function IndustriesPage() {
  const { language, t } = useLanguage();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchIndustries = useCallback(async (page: number, lang: string) => {
    try {
      setLoading(true);
      const response = await getIndustries(page, lang);
      setIndustries(response.data.industries);
      if (response.data.banner) setBanner(response.data.banner);
      if (response.data.pagination) {
        setCurrentPage(response.data.pagination.current_page);
        setLastPage(response.data.pagination.last_page);
      }
    } catch (error) {
      console.error('Failed to fetch industries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIndustries(currentPage, language);
  }, [fetchIndustries, currentPage, language]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && industries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const bannerTitle = banner?.title || t.industriesPage?.title || 'Industries';
  const bannerImage =
    banner?.image_url || '/images/banner/services-banner.png';

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
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.industriesPage?.tag || 'Industries We Serve'}
              </span>
              
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] max-w-xl">
              {t.industriesPage?.subtitle || 'Serving Diverse Industries'}
            </h2>
          </div>

          {industries.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-12">
                {industries.map((industry, index) => (
                  <IndustryCard
                    key={industry.id}
                    industry={industry}
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
              <p className="text-gray-500 text-lg">
                {t.industriesPage?.noIndustries || 'No industries found.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}