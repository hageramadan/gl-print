"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import {
  FiMail,
  FiPhone,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

export const SubNavbar = () => {
  const { t, language, toggleLanguage, dir } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="bg-linear-to-l from-[#090E1B] to-primary text-white text-sm lg:text-base font-medium py-2 border-b border-primary-light relative z-50"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
       
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            <a
              href="mailto:glprint@gmail.com"
              className="hidden lg:flex items-center gap-2 hover:text-white transition-colors"
            >
              <FiMail className="text-white w-5 h-5" />
              <span>glprint@gmail.com</span>
            </a>
            <a
              href="tel:+201234567890"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FiPhone className="text-white w-5 h-5" />
              <span>+20 123 456 7890</span>
            </a>
          </div>

          
          <div className="flex items-center gap-1 lg:gap-4 flex-wrap">
            <Link
              href="/faqs"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <span>{t.subNav.faqs}</span>
            </Link>
            <div className="h-6 w-px bg-gray-600 mx-2"></div>
            {/* Language Switcher with Dropdown */}
            <div className="relative cursor-pointer" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-1 lg:px-3 py-1 rounded transition-colors text-white"
              >
                <span>{language === "en" ? "Eng" : "العربية"}</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
             
              {isDropdownOpen && (
                <div className="absolute top-full end-0 mt-2 bg-white text-gray-800 rounded-lg shadow-2xl min-w-40 overflow-hidden z-50 border border-gray-200">
                  <button
                    onClick={() => handleLanguageSelect("en")}
                    className={`
                      w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                      ${language === "en" ? "bg-primary/5 text-primary font-semibold" : ""}
                    `}
                  >
                    <span>English</span>
                    {language === "en" && <FiCheck className="text-white" />}
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={() => handleLanguageSelect("ar")}
                    className={`
                      w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between
                      ${language === "ar" ? "bg-primary/5 text-primary font-semibold" : ""}
                    `}
                  >
                    <span>العربية</span>
                    {language === "ar" && <FiCheck className="text-white" />}
                  </button>
                </div>
              )}
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};
