"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiInstagram } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { SiTiktok } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { subscribeEmail } from "@/src/services/emailApi";
import toast from "react-hot-toast";

interface FooterData {
  phone: string;
  email: string;
  whatsapp?: string;  
  address: string;
  working_hours: string;
  social_links: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
     pinterest?: string;
  };
}

interface FooterProps {
  data?: FooterData | null;
}

export const Footer = ({ data }: FooterProps) => {
  const { t, dir, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isArabic = language === "ar";

  // ✅ إذا لم توجد بيانات، لا نعرض الفوتر
  if (!data) return null;

  const socialLinks = data.social_links || {};

  // ✅ إرسال الإيميل
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error(
        isArabic
          ? "الرجاء إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email",
      );
      return;
    }

    try {
      setSubmitting(true);
      const response = await subscribeEmail(trimmedEmail, language);
      if (response.result) {
        toast.success(
          response.message ||
            (isArabic ? "تم الاشتراك بنجاح!" : "Subscribed successfully!"),
        );
        setEmail("");
      }
    } catch (error: any) {
      toast.error(
        error.message ||
          (isArabic
            ? "فشل الاشتراك. حاول مرة أخرى."
            : "Failed to subscribe. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
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
          {/* العمود الأول */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-block mb-4"
              aria-label="go to home"
            >
              <Image
                src="/images/footer/footer-logo.png"
                alt="GL Print"
                width={500}
                height={500}
                className="object-contain w-20 h-20"
              />
            </Link>

            <p className="text-base lg:text-[20px] text-white leading-relaxed font-semibold mb-3">
              {t.footer?.tagline ||
                (isArabic
                  ? "اختبر الراحة والإبداع في GL Print"
                  : "Experience Comfort & Creative at GL Print")}
            </p>

            <p className="text-[15px] lg:text-lg font-bold text-[#B3B3B3] leading-relaxed">
              {t.footer?.description ||
                (isArabic
                  ? "GL Print هو شريكك الموثوق لحلول الطباعة والإعلان والعلامات التجارية والمواد الترويجية الاحترافية."
                  : "GL Print is your trusted partner for professional printing, advertising, branding, and promotional solutions.")}
            </p>
          </div>

          {/* العمود الثاني: Company */}
          <div className="col-span-1">
            <h3 className="text-lg lg:text-2xl font-semibold text-white mb-4">
              {t.footer?.company || "Company"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  aria-label="go to aboute"
                  href="/about"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.about || "About GL Print"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to services"
                  href="/services"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.services || "Services"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to products"
                  href="/products"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.products || "Products"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to industries"
                  href="/industries"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.industries || "Industries"}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: Support */}
          <div className="col-span-1">
            <h3 className="text-lg lg:text-2xl font-semibold text-white mb-4">
              {t.footer?.support || "Support"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  aria-label="go to quote"
                  href="/quote"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.quote || "Request a Quote"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to faqs"
                  href="/faqs"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.faq || "FAQ"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to whatsapp"
                  href={data.whatsapp || '/'}
                  target="_blank"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.whatsapp || "WhatsApp"}
                </Link>
              </li>
              <li>
                <Link
                  aria-label="go to contact"
                  href="/contact"
                  className="text-[#B3B3B3] font-bold hover:text-white transition-colors"
                >
                  {t.footer?.contact || "Contact"}
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: Newsletter + Social + Contact */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">
              {t.footer?.newsletter || "Follow Us"}
            </h3>

            {/* ✅ نموذج الاشتراك */}
            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center mb-4 w-full lg:w-[80%]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer?.emailPlaceholder || "Email"}
                disabled={submitting}
                className="w-full px-4 py-2.5 pe-14 rounded-full bg-white text-[#424141] placeholder:text-[#B3B3B3] focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label={`sent`}
                disabled={submitting}
                className="absolute end-1 cursor-pointer top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <BiSend className="text-lg" />
                )}
              </button>
            </form>

            {/* ✅ السوشيال بالترتيب: Facebook → LinkedIn → Instagram → Pinterest */}
            <div className="flex items-center gap-3 py-4 lg:py-6">
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook className="text-white w-4 h-4" />
                </Link>
              )}
              {socialLinks.linkedin && (
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedinIn className="text-white w-4 h-4" />
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-all duration-300 hover:scale-110"
                >
                  <FiInstagram className="text-white w-4 h-4" />
                </Link>
              )}
              {socialLinks.pinterest && (
                <Link
                  href={socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="transition-all duration-300 hover:scale-110"
                >
                  <FaPinterestP className="text-white w-4 h-4" />
                </Link>
              )}
            </div>

            {/* ✅ معلومات الاتصال من API */}
            <div className="flex items-center gap-3">
              {data.phone && (
                <Link
                  aria-label={`go to ${data.phone}`}
                  href={`tel:${data.phone}`}
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
              )}
              {data.email && (
                <Link
                  aria-label={`go to ${data.email}`}
                  href={`mailto:${data.email}`}
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
              )}
              {data.address && (
                <div className="flex items-center gap-3 text-[#B3B3B3] font-bold text-sm">
                  <Image
                    src="/images/footer/Location.png"
                    alt="Location"
                    width={200}
                    height={200}
                    className="w-10 h-10"
                  />
                  <span className="hidden lg:block">{data.address}</span>
                </div>
              )}
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
