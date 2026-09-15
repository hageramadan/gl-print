'use client';

import { useState, Suspense } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { QuickInquiryForm } from '@/src/components/quote/QuickInquiryForm';
import { FullQuoteForm } from '@/src/components/quote/FullQuoteForm';
import { ContactSidebar } from '@/src/components/quote/ContactSidebar';
import { useLanguage } from '@/src/hooks/useLanguage';
interface QuotePageProps {
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
    working_hours?: string;
  };
  socialLinks?: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
  };
}
function  QuoteContent({ contactInfo, socialLinks }: QuotePageProps) {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'quick' | 'full'>('full');

  return (
    <main>
      {/* ===== البانر ===== */}
      <PageBanner
        title={t.quote?.pageTitle || 'Get a Quote'}
        backgroundImage="/images/banner/banner-quote.png"
        breadcrumbs={[
          { label: t.banner?.home || 'Home', href: '/' },
          { label: t.quote?.pageTitle || 'Get a Quote', href: '#' },
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-white" dir={dir}>
        <div className="container mx-auto px-4">
          {/* ===== العنوان والوصف ===== */}
          <div className=" mb-5 md:mb-6">
           
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#051B4B] mb-4">
              {t.quote?.title || 'Get a Quote'}
            </h2>
            <p className="text-base md:text-lg text-[#45464F] max-w-2xl ">
              {t.quote?.description ||
                'Tell us about your project, and our print specialists will provide a detailed estimate.'}
            </p>
          </div>

          

          {/* ===== المحتوى ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-12">
            {/* ===== الفورم ===== */}
            <div className="lg:col-span-4">
              {/* ===== التابات ===== */}
          <div className="flex items-center  gap-3 mb-5 lg:mb-10 border-b pb-5 border-[#E1E3E4]">
            <button
              onClick={() => setActiveTab('quick')}
              className={`
                px-6 py-3 cursor-pointer font-semibold text-primary transition-all duration-300
                ${activeTab === 'quick'
                  ? '  border-b border-primary'
                  : ''
                }
              `}
            >
              {t.quote?.quickInquiry || 'Quick Inquiry'}
            </button>
            <button
              onClick={() => setActiveTab('full')}
              className={`
                px-6 py-3 cursor-pointer font-semibold transition-all duration-300
                ${activeTab === 'full'
                  ? ' border-b border-primary'
                  : 'border-0'
                }
              `}
            >
              {t.quote?.getQuote || 'Get a Quote'}
            </button>
          </div>
              <div className="bg-white rounded-2xl border border-[#E1E3E4] shadow-sm shadow-[#0000000D] p-6 md:p-8 ">
                {activeTab === 'quick' ? <QuickInquiryForm /> : <FullQuoteForm />}
              </div>
            </div>

            {/* ===== Sidebar ===== */}
            <div className="lg:col-span-2">
              <ContactSidebar
                contactInfo={contactInfo}
                socialLinks={socialLinks}
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <QuoteContent />
    </Suspense>
  );
}