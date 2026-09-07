"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiSend,
} from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { SiTiktok } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

interface FooterData {
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  social_links: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
  };
}

interface FooterProps {
  data?: FooterData | null;
}

export const Footer = ({ data }: FooterProps) => {
  const { t, dir } = useLanguage();

  const footerData = data || {
    phone: "+20 123 456 7890",
    email: "quotes@glprint.com",
    address: "123 Printing Ave, Cairo, Egypt",
    working_hours: "Sun - Thu: 9 AM - 6 PM",
    social_links: {
      whatsapp: "https://wa.me/201234567890",
      facebook: "https://facebook.com/glprint",
      linkedin: "https://linkedin.com/company/glprint",
      instagram: "https://instagram.com/glprint",
      tik_tok: "https://tiktok.com/@glprint",
    },
  };

  return (
    <footer className="relative w-full overflow-hidden" dir={dir}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer/footer-bg.png"
          alt="Footer Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#152141]/92"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8 lg:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10 lg:gap-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/footer/footer-logo.png"
                  alt="GL Print"
                  width={500}
                  height={500}
                  className="object-contain w-20 h-20"
                />
              </div>
            </Link>
            <p className="text-base lg:text-[20px] text-white leading-relaxed font-semibold mb-3">
              Experience Comfort &amp; Creative at GL Print
            </p>
            <p className="text-[15px] lg:text-lg font-bold text-[#B3B3B3] leading-relaxed">
              GL Print is your trusted partner for professional printing,
              advertising, branding, and promotional solutions.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg lg:text-2xl font-semibold text-white mb-4">
              {t.footer?.company || "Company"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.about || "About GL Print"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.services || "Services"}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.products || "Products"}
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.industries || "Industries"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg lg:text-2xl font-semibold text-white mb-4">
              {t.footer?.support || "Support"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/quote"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.quote || "Request a Quote"}
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.faq || "FAQ"}
                </Link>
              </li>
              <li>
                <Link
                  href={footerData.social_links.whatsapp}
                  target="_blank"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.whatsapp || "WhatsApp"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.contact || "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">
              {t.footer?.newsletter || "Follow Us"}
            </h3>
            <form className="relative flex items-center mb-4 w-full lg:w-[80%]">
              <input
                type="email"
                placeholder={t.footer?.emailPlaceholder || "Email"}
                className="w-full px-4 py-2.5 pe-14 rounded-full bg-white text-[#B3B3B3] placeholder:text-[#B3B3B3] focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute end-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white p-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                <BiSend className="text-lg" />
              </button>
            </form>

            <div className="flex items-center gap-3 py-4 lg:py-6">
              <Link
                href={footerData.social_links.tik_tok}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
              >
                <SiTiktok className="text-white w-4 h-4" />
              </Link>
              <Link
                href={footerData.social_links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
              >
                <IoLogoWhatsapp className="text-white w-4 h-4" />
              </Link>
              <Link
                href={footerData.social_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
              >
                <FiInstagram className="text-white w-4 h-4" />
              </Link>
              <Link
                href={footerData.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="text-white w-4 h-4" />
              </Link>
              <Link
                href={footerData.social_links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="text-white w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`tel:${footerData.phone}`}
                className="flex items-center gap-3 text-[#B3B3B3] font-bold hover:text-white transition-colors text-sm"
              >
                <Image
                  src="/images/footer/Phone.png"
                  alt="Phone"
                  width={200}
                  height={200}
                  className="w-10 h-10"
                />
              </Link>
              <Link
                href={`mailto:${footerData.email}`}
                className="flex items-center gap-3 text-[#B3B3B3] font-bold hover:text-white transition-colors text-sm"
              >
                <Image
                  src="/images/footer/Email.png"
                  alt="Email"
                  width={200}
                  height={200}
                  className="w-10 h-10"
                />
              </Link>
              <div className="flex items-center gap-3 text-[#B3B3B3] font-bold text-sm">
                <Image
                  src="/images/footer/Location.png"
                  alt="Location"
                  width={200}
                  height={200}
                  className="w-10 h-10"
                />
                <span className="hidden lg:block">{footerData.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/50 text-center">
          <p className="text-sm lg:text-base text-[#F2F2F2] font-bold">
            © {new Date().getFullYear()} GL Print.{" "}
            {t.footer?.copyright || "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};