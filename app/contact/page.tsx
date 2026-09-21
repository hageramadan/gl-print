'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageBanner } from '@/src/components/common/PageBanner';
import { ContactSidebar } from '@/src/components/quote/ContactSidebar';

import { ContactMap } from '@/src/components/contact/ContactMap';
import { useLanguage } from '@/src/hooks/useLanguage';
import { getContactData, ContactData, Banner } from '@/src/services/contactApi';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

export default function ContactPage() {
  const { language, t, dir } = useLanguage();
  const [contact, setContact] = useState<ContactData | null>(null);
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (lang: string) => {
    try {
      setLoading(true);
      const response = await getContactData(lang);
      setContact(response.data.contact);
      if (response.data.banner) setBanner(response.data.banner);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch contact data:', err);
      setError('Failed to load contact data.');
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

  if (error || !contact) {
    return (
      <></>
    );
  }

  const bannerTitle = banner?.title || t.contact?.pageTitle || 'Contact Us';
  const bannerImage =
    banner?.image_url || '/images/banner/contact-banner.png';

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

      {/* ===== العنوان ===== */}
      <section className="pt-12 md:pt-16 lg:pt-20 pb-3 lg:pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className=" mb-4">
           
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#171A21] mb-4">
              {t.contact?.title2 || "Let's Get in Touch"}
            </h2>
            <p className="text-base md:text-lg text-[#45464F] max-w-2xl">
              {t.contact?.subtitle2 ||
                "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </div>
        </div>
      </section>

      {/* ===== المحتوى: الفورم + الخريطة + Sidebar ===== */}
      <section className="pb-12 md:pb-16 lg:pb-20 bg-white" dir={dir}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-8">
            {/* =====  + الخريطة ===== */}
            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            

              {/* الخريطة */}
              <ContactMap
                lat={contact.location.lat}
                long={contact.location.long}
                title={t.contact?.mapTitle || 'Our Location'}
                address={contact.address}
              />
            </div>

            {/* ===== Sidebar ===== */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <ContactSidebar
                  contactInfo={{
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address,
                    working_hours: contact.working_hours,
                  }}
                  socialLinks={contact.social_links}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}