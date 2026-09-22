import type { Metadata } from "next";
import { Montserrat, Almarai } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { LanguageProvider } from "@/src/context/LanguageProvider";
import { Footer } from "@/src/components/layout/Footer";
import { WhatsAppButton } from "@/src/components/common/WhatsAppButton";
import { getHomeData } from "@/src/services/homeApi";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
  variable: "--font-almarai",
});

// ✅ جلب الـ Metadata من API
export async function generateMetadata(): Promise<Metadata> {
  try {
    const homeData = await getHomeData("en");
    const seo = homeData.seo;

    return {
      title: seo?.meta_title || "GL Print - Printing Excellence",
      description: seo?.meta_description || "",
      keywords: seo?.focus_words || [],
      authors: [{ name: "GL Print" }],
      metadataBase: seo?.canonical_url
        ? new URL(seo.canonical_url)
        : undefined,
      alternates: {
        canonical: seo?.canonical_url || undefined,
      },
      openGraph: {
        title: seo?.meta_title || "GL Print - Printing Excellence",
        description: seo?.meta_description || "",
        url: seo?.canonical_url || undefined,
        siteName: "GL Print",
        type: "website",
        locale: "en_US",
        images: seo?.image_alt
          ? [{ url: seo.image_alt, alt: seo.h1_tag || "GL Print" }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.meta_title || "GL Print - Printing Excellence",
        description: seo?.meta_description || "",
      },
      icons: {
        icon: "/logo1.png",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);

    // ✅ Fallback
    return {
      title: "GL Print - Printing Excellence",
      description:
        "We bring your ideas to life with high-quality printing solutions",
      icons: {
        icon: "/logo1.png",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let footerData = null;
  let socialLinks = null;
  let contactInfo = null;

  try {
    const homeData = await getHomeData("en");
    footerData = homeData.footer;
    socialLinks = homeData.footer?.social_links || null;
    contactInfo = {
      phone: homeData.footer?.phone || "",
      email: homeData.footer?.email || "",
      address: homeData.footer?.address || "",
    };
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
  }

  return (
    <html lang="en" className="lang-en">
      <body
        className={`${montserrat.variable} ${almarai.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header
              socialLinks={socialLinks || undefined}
              contactInfo={contactInfo || undefined}
            />
            <main className="grow">{children}</main>
            <Footer data={footerData} />
            <WhatsAppButton
              // phoneNumber="201234567890"
              message="Hello! I would like to inquire about your printing services."
            />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}