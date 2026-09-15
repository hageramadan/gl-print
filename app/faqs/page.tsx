'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { FAQItem } from '@/src/components/faqs/FAQItem';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getFAQs, FAQ, Banner } from '@/src/services/faqsApi';

export default function FAQsPage() {
  const { language, t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (lang: string) => {
    try {
      setLoading(true);
      const response = await getFAQs(lang);
      setFaqs(response.data.faqs || []);
      if (response.data.banner) setBanner(response.data.banner);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
      setError('Failed to load FAQs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(language);
  }, [language, fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || faqs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t.faqs?.notFound || 'No FAQs Found'}
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const bannerTitle = banner?.title || t.faqs?.pageTitle || 'FAQs';
  const bannerImage =
    banner?.image_url || '/images/banner/faqs-banner.png';

  return (
    <main>
      {/* ===== البانر ===== */}
      <PageBanner
        title={bannerTitle}
        backgroundImage={bannerImage}
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: bannerTitle, href: '#' },
        ]}
      />

      {/* ===== قسم الأسئلة الشائعة ===== */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* ===== العنوان ===== */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-secondary"></div>
              <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                {t.faqs?.tag || 'FAQs'}
              </span>
              <div className="w-10 h-0.5 bg-secondary"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] mb-4">
              {t.faqs?.title || 'Frequently Asked Questions'}
            </h2>
            <p className="text-base md:text-lg text-[#667085] max-w-2xl mx-auto">
              {t.faqs?.subtitle ||
                'Find answers to the most common questions about our printing services.'}
            </p>
          </div>

          {/* ===== قائمة الأسئلة ===== */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}