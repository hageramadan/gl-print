"use client";

import { useEffect, useState } from "react";
import { PageBanner } from "@/src/components/common/PageBanner";
import { AboutHero } from "@/src/components/about/AboutHero";
import { CompanyValues } from "@/src/components/about/CompanyValues";
import { HowWeWork } from "@/src/components/about/HowWeWork";
import { PartnersSlider } from "@/src/components/about/PartnersSlider";
import { getAboutData, AboutData } from "@/src/services/aboutApi";
import { useLanguage } from "@/src/hooks/useLanguage";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const aboutData = await getAboutData(language);
        setData(aboutData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <></>;
  }

  return (
    <main>
      <PageBanner
        title={t.about?.pageTitle || "About Us"}
        backgroundImage={
          data.about.page_banner_image || "/images/banner/services-banner.png"
        }
        breadcrumbs={[
          { label: t.banner?.home || "Home", href: "/" },
          { label: t.about?.pageTitle || "About Us", href: "#" },
        ]}
      />

      <AboutHero data={data.about} />

      <CompanyValues data={data.company_values} />

      <HowWeWork data={data.works} />

      <PartnersSlider data={data.companies} />
    </main>
  );
}
