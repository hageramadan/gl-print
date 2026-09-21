'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { FAQItem } from '@/src/components/faqs/FAQItem';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getFAQs, FAQ, Banner } from '@/src/services/faqsApi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

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
  return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
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
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* ===== العنوان ===== */}
          <div className=" mb-12 md:mb-16">
          
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] mb-4">
              {t.faqs?.title || 'Do you have a question?'}
            </h2>
            <p className="text-base md:text-lg text-[#667085]  lg:max-w-lg">
              {t.faqs?.subtitle ||
                'Your Trusted Printing & Advertising Partner in Egypt,'}
            </p >
            <p className="text-base md:text-lg text-[#667085] ">
               {t.faqs?.subtitle2 }
            </p>
          </div>

          {/* ===== قائمة الأسئلة ===== */}
          <div className="max-w-7xl space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}