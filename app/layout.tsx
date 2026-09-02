import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { LanguageProvider } from "@/src/context/LanguageProvider";

// ============================================
// تحميل خط Montserrat
// ============================================

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

// ============================================
// Metadata
// ============================================

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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">{children}</main>
           
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}