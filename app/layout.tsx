
import type { Metadata } from "next";
import { Montserrat, Almarai } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { LanguageProvider } from "@/src/context/LanguageProvider";
import { Footer } from "@/src/components/layout/Footer";
import { WhatsAppButton } from "@/src/components/common/WhatsAppButton";
import { getHomeData } from "@/src/services/homeApi";

export const dynamic = 'force-dynamic';

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

export const metadata: Metadata = {
  title: {
    default: "PrintCo - Printing Excellence",
    template: "%s | PrintCo",
  },
  description: "We bring your ideas to life with high-quality printing solutions",
  keywords: ["printing", "digital printing", "offset printing", "printing company"],
  authors: [{ name: "PrintCo" }],
  icons: {
    icon: "/logo1.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let footerData = null;
  let socialLinks = null;
  
  try {
    const homeData = await getHomeData('en');
    footerData = homeData.footer;
    socialLinks = homeData.footer?.social_links || null;
  } catch (error) {
    console.error('Failed to fetch footer data:', error);
  }

  return (
    <html lang="en" className="lang-en">
      <body className={`${montserrat.variable} ${almarai.variable} antialiased`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header socialLinks={socialLinks || undefined} />
            <main className="grow">{children}</main>
            <Footer data={footerData} />
            {/* ===== زر واتساب الثابت ===== */}
            <WhatsAppButton 
              phoneNumber="201234567890"
              message="Hello! I would like to inquire about your printing services."
            />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}