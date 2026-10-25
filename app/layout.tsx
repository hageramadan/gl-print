import type { Metadata } from "next";
import { Montserrat, Almarai } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { LanguageProvider } from "@/src/context/LanguageProvider";
import { Footer } from "@/src/components/layout/Footer";
import { WhatsAppButton } from "@/src/components/common/WhatsAppButton";
import { getInitialHomeData } from "@/src/services/homeServer";
import { Toaster } from "react-hot-toast";

export const revalidate = 300;

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
  preload: false,
  variable: "--font-almarai",
});

export const metadata: Metadata = {
  title: "GL Print - Printing Excellence",
  description: "We bring your ideas to life with high-quality printing solutions",
  authors: [{ name: "GL Print" }],
  icons: { icon: "/logo1.png" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialHomeData;
  let footerData = null;
  let socialLinks = null;
  let contactInfo = null;

  try {
    const homeData = await getInitialHomeData();
    initialHomeData = homeData;
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
        <LanguageProvider initialHomeData={initialHomeData}>
          <div className="flex flex-col min-h-screen">
            <Header
              socialLinks={socialLinks || undefined}
              contactInfo={contactInfo || undefined}
            />
            <main className="grow">{children}</main>
            <Footer data={footerData} />
            <WhatsAppButton
             
              message="Hello! I would like to inquire about your printing services."
            />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
