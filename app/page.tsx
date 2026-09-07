'use client';

import { useEffect, useState, useCallback } from 'react';
import { About } from "@/src/components/home/About";
import { FeaturedProducts } from "@/src/components/home/FeaturedProducts";
import { Hero } from "@/src/components/home/Hero/Hero";
import { Services } from "@/src/components/home/Services";
import { Stats } from '@/src/components/home/Stats';
import { SuccessPartners } from "@/src/components/home/SuccessPartners";
import { Testimonials } from "@/src/components/home/Testimonials";
import { getHomeData, HomeData } from "@/src/services/homeApi";
import { useLanguage } from '@/src/hooks/useLanguage';
import { LoadingScreen } from '@/src/components/common/LoadingScreen';

export default function Home() {
  const { language } = useLanguage();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
  
      const homeData = await getHomeData(language);
      setData(homeData);
      setError(null);
    } catch (err) {
      console.error('❌ Failed to fetch home data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      // تأخير بسيط لإظهار شاشة التحميل بشكل أنيق
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [language]);

  useEffect(() => {
    fetchData();
  }, [fetchData, language]);

  // عرض شاشة التحميل
  if (loading) {
    return <LoadingScreen isLoading={loading} />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600">{error || 'Failed to load content. Please try again later.'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero data={data.hero_section} />
      <About data={data.about_section} />
      <Stats data={data.counters} />
      <Services data={data.services} />
      <FeaturedProducts data={data.products} />
      <Testimonials data={data.testimonials} />
      <SuccessPartners data={data.companies} />
    </>
  );
}