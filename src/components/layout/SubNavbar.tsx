"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  FiMail,
  FiPhone,
  FiChevronDown,
  FiCheck,
  FiInstagram,
} from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedinIn, FaPinterest, FaPinterestP } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { getHomeData } from "@/src/services/homeApi";
import { SocialLinks } from "@/src/services/contactApi";


interface SubNavbarProps {
  socialLinks?: SocialLinks | null;
}

export const SubNavbar = ({ socialLinks }: SubNavbarProps) => {
  const { t, language, toggleLanguage, dir } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<{
    phone: string;
    email: string;
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = socialLinks;

  // ✅ جلب الإيميل والهاتف من API /home
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await getHomeData(language);
        if (response.footer) {
          setContactInfo({
            phone: response.footer.phone,
            email: response.footer.email,
          });
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };
    fetchContactInfo();
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: "en" | "ar") => {
    if (language !== lang) {
      toggleLanguage();
    }
    setIsDropdownOpen(false);
  };

  const displayEmail = contactInfo?.email || "glprint@gmail.com";
  const displayPhone = contactInfo?.phone || "+20 123 456 7890";

  return (
    <div
      className="bg-linear-to-l from-[#090E1B] to-primary text-white text-sm lg:text-base font-medium py-0.5 border-b border-primary-light relative z-50"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            {/* ✅ الإيميل من API */}
            <a
              href={`mailto:${displayEmail}`}
              className="hidden lg:flex items-center gap-2 hover:text-white transition-colors"
            >
              <FiMail className="text-white w-5 h-5" />
              <span>{displayEmail}</span>
            </a>

            {/* ✅ الهاتف من API */}
            <a
              href={`tel:${displayPhone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FiPhone className="text-white w-5 h-5" />
              <span dir="ltr">{displayPhone}</span>
            </a>
          </div>

          <div className="flex items-center gap-1 lg:gap-1 flex-wrap">
            <Link
              aria-label={`go to faqs`}
              href="/faqs"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <span>{t.subNav.faqs}</span>
            </Link>
            <div className="h-6 w-px bg-gray-600 mx-2"></div>

            <div className="relative cursor-pointer" ref={dropdownRef}>
              <button
                aria-label={`select language`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-1 lg:px-1.5 py-1 rounded transition-colors text-white"
              >
                <span>{language === "en" ? "Eng" : "العربية"}</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full end-0 mt-2 bg-white text-gray-800 rounded-lg shadow-2xl min-w-40 overflow-hidden z-50 border border-gray-200">
                  <button
                    aria-label={`select english `}
                    onClick={() => handleLanguageSelect("en")}
                    className={`
                      w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                      ${language === "en" ? "bg-primary/5 text-primary font-semibold" : ""}
                    `}
                  >
                    <span>English</span>
                    {language === "en" && (
                      <FiCheck className="text-secondary" />
                    )}
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button
                    aria-label={`select arabic language`}
                    onClick={() => handleLanguageSelect("ar")}
                    className={`
                      w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                      ${language === "ar" ? "bg-primary/5 text-primary font-semibold" : ""}
                    `}
                  >
                    <span>العربية</span>
                    {language === "ar" && (
                      <FiCheck className="text-secondary" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="hidden lg:block h-6 w-px bg-gray-600 mx-2"></div>

            <div className="hidden lg:flex items-center gap-3 my-2 lg:my-3">
              {/* ✅ الترتيب: Facebook → LinkedIn → Instagram → Pinterest */}
              <Link
                href={links?.facebook || ""}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="text-white w-4 h-4" />
              </Link>
              <Link
                href={links?.linkedin || ""}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="text-white w-4 h-4" />
              </Link>
              <Link
                href={links?.instagram || ""}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-all duration-300 hover:scale-110"
              >
                <FiInstagram className="text-white w-4 h-4" />
              </Link>
              <Link
                href={links?.pinterest || ""}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="transition-all duration-300 hover:scale-110"
              >
                <FaPinterestP className="text-white w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
