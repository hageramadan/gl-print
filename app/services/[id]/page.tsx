"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { PageBanner } from "@/src/components/common/PageBanner";
import { ServiceProducts } from "@/src/components/services/ServiceProducts";
import { useLanguage } from "@/src/hooks/useLanguage";
import { getServiceDetails, ServiceDetails } from "@/src/services/servicesApi";
import { LoadingScreen } from "@/src/components/common/LoadingScreen";

export default function ServiceDetailsPage() {
  const params = useParams();
  const serviceSlug = params.id as string;
  const { language, t, dir } = useLanguage();

  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (slug: string, lang: string) => {
    try {
      setLoading(true);
      const response = await getServiceDetails(slug, lang);
      setService(response.data.service);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch service details:", err);
      setError("Failed to load service details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (serviceSlug) {
      fetchData(serviceSlug, language);
    }
  }, [serviceSlug, language, fetchData]);

  if (loading) {
    return <LoadingScreen isLoading={loading} videoSrc="/videos/loading.mp4" />;
  }

  if (error || !service) {
    return null;
  }

  return (
    <main>
      <PageBanner
        title={service.title}
        backgroundImage={
          service.cover_image || "/images/banner/services-banner.png"
        }
        breadcrumbs={[
          { label: t.banner?.home || "Home", href: "/" },
          { label: t.servicesPage?.title || "Services", href: "/services" },
          { label: service.title, href: "#" },
        ]}
      />

      <section className="py-3  lg:py-10 bg-white" dir={dir}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 mt-2">
                {service.title}
              </h1>

              {/* <p className="text-base md:text-lg text-[#45464F] font-medium leading-relaxed">
                {service.description}
              </p> */}
                <div
                className="text-base md:text-lg text-[#45464F] font-medium leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          </div>
        </div>
      </section>

      {service.products && service.products.length > 0 && (
        <ServiceProducts products={service.products} />
      )}
    </main>
  );
}
