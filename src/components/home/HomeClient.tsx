'use client';

import { useEffect, useState } from 'react';
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
import type { Service } from '@/src/services/servicesApi';

export default function HomeClient({ initialData, initialServices }: { initialData: HomeData; initialServices: Service[] }) {
  const { language } = useLanguage();
  const [data, setData] = useState<HomeData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        if (language !== 'en') setLoading(true);
        const homeData = await (language === 'en' ? Promise.resolve(initialData) : getHomeData(language));
        if (!active) return;
        setData(homeData);
        setError(null);
      } catch (err) {
        if (!active) return;
        console.error('Failed to fetch home data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, [language, initialData]);

  // عرض شاشة التحميل
  if (loading) {
    return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
  }

  if (error || !data) {
    return <p role="alert" className="text-center py-12">{error}</p>;
  }

  return (
    <div lang={/[\u0600-\u06ff]/.test(data.hero_section.title) ? 'ar' : 'en'}>
      <Hero data={data.hero_section} initialServices={initialServices} />
      <About data={data.about_section} />
      <Stats data={data.counters} />
      <Services data={data.services} />
      <FeaturedProducts data={data.products} />
      <Testimonials data={data.testimonials} />
      <SuccessPartners data={data.companies} />
    </div>
  );
}
