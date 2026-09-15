"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FiChevronDown } from "react-icons/fi";

interface ServiceFilterProps {
  services: Array<{ id: number; title: string }>;
  selectedService: number | null;
  onServiceChange: (serviceId: number | null) => void;
}

export const ServiceFilter = ({
  services,
  selectedService,
  onServiceChange,
}: ServiceFilterProps) => {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ المراجع للقياس
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // ✅ عدد الخدمات المرئية (يتحدد ديناميكياً)
  const [visibleCount, setVisibleCount] = useState(5);

  const allServices = [
    { id: null, title: t.products?.all || "All" },
    ...services,
  ];

  const visibleServices = allServices.slice(0, visibleCount);
  const hiddenServices = allServices.slice(visibleCount);
  const hasHiddenServices = hiddenServices.length > 0;

  // ✅ قياس ديناميكي لعدد الخدمات التي تتناسب مع السطر
  useEffect(() => {
    const calculateVisibleCount = () => {
      if (!containerRef.current || !measureRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const buttons =
        measureRef.current.querySelectorAll<HTMLElement>("[data-measure]");
      if (buttons.length === 0) return;

      const gap = 12; // يعادل gap-3
      const moreButtonWidth = 100; // عرض تقريبي لزر "المزيد"
      const moreButtonWithGap = moreButtonWidth + gap;

      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < buttons.length; i++) {
        const btnWidth = buttons[i].offsetWidth + gap;
        const isLast = i === buttons.length - 1;

        // إذا كانت هذه آخر خدمة، لا نحتاج زر "المزيد"
        if (isLast) {
          if (totalWidth + btnWidth <= containerWidth) {
            count = i + 1;
          }
          break;
        }

        // إذا كانت هناك خدمات متبقية بعدها، نحتاج مساحة لزر "المزيد"
        const remaining = buttons.length - (i + 1);
        const needsMoreButton = remaining > 0;

        if (
          totalWidth + btnWidth + (needsMoreButton ? moreButtonWithGap : 0) <=
          containerWidth
        ) {
          totalWidth += btnWidth;
          count = i + 1;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(1, count));
    };

    calculateVisibleCount();

    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [services, t]);

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

  const handleServiceSelect = (serviceId: number | null) => {
    onServiceChange(serviceId);
    setIsDropdownOpen(false);
  };

  // ✅ نفس التصميم للموبايل والديسكتوب
  return (
    <div className="mb-4 lg:mb-8">
      <div
        ref={containerRef}
        className="flex flex-wrap items-center gap-2 sm:gap-3 relative"
      >
        {/* ✅ عناصر قياس مخفية */}
        <div
          ref={measureRef}
          className="absolute top-0 start-0 w-0 h-0 overflow-hidden flex gap-2 sm:gap-3"
          aria-hidden="true"
        >
          {allServices.map((service, idx) => (
            <button
              key={idx}
              data-measure
              className="px-4 py-2 rounded-xl text-sm sm:text-base lg:text-[18px] font-medium border border-[#D2D6DF] whitespace-nowrap"
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* ✅ الخدمات المرئية */}
        {visibleServices.map((service) => (
          <button
            key={service.id ?? "all"}
            onClick={() => handleServiceSelect(service.id)}
            className={`
              px-3 sm:px-4 py-2 rounded-xl text-sm cursor-pointer font-medium transition-all duration-300 border border-[#D2D6DF] whitespace-nowrap
              ${
                selectedService === service.id
                  ? "bg-primary text-white"
                  : "text-[#74767B] text-sm sm:text-base lg:text-[18px] font-medium hover:bg-gray-50 bg-white"
              }
            `}
          >
            {service.title}
          </button>
        ))}

        {/* ✅ زر المزيد */}
        {hasHiddenServices && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-[#D2D6DF] whitespace-nowrap
                ${
                  hiddenServices.some((s) => s.id === selectedService)
                    ? "bg-primary text-white"
                    : "text-[#74767B] text-sm sm:text-base lg:text-[18px] font-medium hover:bg-gray-50 bg-white"
                }
              `}
            >
              <span>{t.products?.more || "More"}</span>
              <FiChevronDown
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full -start-[7rem] lg:start-0 mt-2 bg-white rounded-xl shadow-2xl min-w-[200px] max-h-[300px] overflow-y-auto z-30 border border-gray-100 py-1">
                {hiddenServices.map((service) => (
                  <button
                    key={service.id ?? "all"}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`
                      w-full text-start px-4 py-2.5 text-sm transition-colors whitespace-nowrap
                      ${
                        selectedService === service.id
                          ? "bg-primary/5 text-primary font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
