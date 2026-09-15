"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsPatchCheckFill } from "react-icons/bs";

import { PiSealCheckFill } from "react-icons/pi";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const SuccessPopup = ({
  isOpen,
  onClose,
  language,
}: SuccessPopupProps) => {
  const isArabic = language === "ar";
  const router = useRouter();

  // ✅ إغلاق بـ Escape + منع التمرير
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ زر الإغلاق X */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90 cursor-pointer"
          aria-label={isArabic ? "إغلاق" : "Close"}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* ✅ أيقونة النجاح - بدون أنيميشن */}
        <div className="flex justify-center mb-6">
          <div className=" flex items-center justify-center">
            <PiSealCheckFill className="w-16 h-16 md:w-20 md:h-20  text-[#34C759]" />
          </div>
        </div>

        {/* ✅ العنوان */}
        <h2 className="text-2xl md:text-xl font-extrabold text-[#171A21] mb-3">
          {isArabic ? "تم إرسال طلبك بنجاح" : "Request Sent Successfully"}
        </h2>

        {/* ✅ الوصف */}
        <p className="text-[#667085] text-sm md:text-base leading-relaxed mb-8">
          {isArabic
            ? "شكراً لك! تم استلام طلبك بنجاح ."
            : "Thank you! Your request has been received successfully."}
        </p>

        {/* ✅ الأزرار */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 inline-flex items-center justify-center gap-2 px-1 py-2.5 rounded-xl bg-secondary hover:bg-secondary-dark text-white font-bold text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-sm line-clamp-1">
              {isArabic ? "العودة للرئيسية" : "Back to Home"}
            </span>
          </button>

          <button
            onClick={() => router.push("/services")}
            className="flex-1 inline-flex items-center justify-center gap-2 px-1 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark border-2 border-primary font-bold text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            <span className="text-xs line-clamp-1">
              {isArabic ? "استكشف خدماتنا" : "Explore Our Services"}
            </span>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
