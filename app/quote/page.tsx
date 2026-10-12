'use client';

import { useState, Suspense, useEffect } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { QuickInquiryForm } from '@/src/components/quote/QuickInquiryForm';
import { FullQuoteForm } from '@/src/components/quote/FullQuoteForm';
import { ContactSidebar } from '@/src/components/quote/ContactSidebar';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getHomeData } from '@/src/services/homeApi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

async function getQuoteBanner(language: string) {
  try {
    const response = await fetch('https://glprint-eg.com/api/request-quotes/banner', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': language,
      },
    });
    const data = await response.json();
    if (data.result && data.data?.banner) {
      return data.data.banner;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch quote banner:', error);
    return null;
  }
}

function QuoteContent() {
  const { t, dir, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'quick' | 'full'>('full');
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any>(null);
  const [bannerData, setBannerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homeData = await getHomeData(language);
        const footer = homeData.footer;
        if (footer) {
          setContactInfo({
            phone: footer.phone,
            email: footer.email,
            address: footer.address,
            working_hours: footer.working_hours,
          });
          setSocialLinks(footer.social_links);
        }
      } catch (error) {
        console.error('Failed to fetch contact data:', error);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      const banner = await getQuoteBanner(language);
      if (banner) {
        setBannerData(banner);
      }
      setLoading(false);
    };
    fetchBanner();
  }, [language]);

  if (loading) {
    return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
  }

  const bannerTitle = bannerData?.title || t.quote?.pageTitle || 'Get a Quote';
  const bannerImage = bannerData?.image_url || '';

  return (
    <main>
      {bannerImage ? (
        <PageBanner
          title={bannerTitle}
          showSearch={true}
          backgroundImage={bannerImage}
          breadcrumbs={[
            { label: t.banner?.home || 'Home', href: '/' },
            { label: bannerTitle, href: '#' },
          ]}
        />
      ) : null}

      <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
        <div className="container mx-auto px-4">
          <div className="mb-5 md:mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#051B4B] mb-4">
              {t.quote?.title || 'Get a Quote'}
            </h2>
            <p className="text-base md:text-lg text-[#45464F] max-w-2xl">
              {t.quote?.description ||
                'Tell us about your project, and our print specialists will provide a detailed estimate.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 lg:mb-10 border-b pb-5 border-[#E1E3E4]">
                <button
                  aria-label={`go to ${t.quote}`}
                  onClick={() => setActiveTab('quick')}
                  className={`
                    px-6 py-3 cursor-pointer font-semibold text-primary transition-all duration-300
                    ${activeTab === 'quick' ? 'border-b border-primary' : ''}
                  `}
                >
                  {t.quote?.quickInquiry || 'Quick Inquiry'}
                </button>
                <button
                  aria-label={`go to ${t.quote}`}
                  onClick={() => setActiveTab('full')}
                  className={`
                    px-6 py-3 cursor-pointer font-semibold transition-all duration-300
                    ${activeTab === 'full' ? 'border-b border-primary' : 'border-0'}
                  `}
                >
                  {t.quote?.getQuote || 'Get a Quote'}
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E1E3E4] shadow-sm shadow-[#0000000D] p-6 md:p-8">
                {activeTab === 'quick' ? <QuickInquiryForm /> : <FullQuoteForm />}
              </div>
            </div>

            <div className="lg:col-span-2">
              <ContactSidebar
                contactInfo={contactInfo || undefined}
                socialLinks={socialLinks || undefined}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <LoadingScreen isLoading={true} videoSrc="/videos/loading.mp4" />
      }
    >
      <QuoteContent />
    </Suspense>
  );
}