'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiChevronDown } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

interface ServiceFilterProps {
  services: Array<{ id: number; title: string }>;
  selectedService: number | null;
  onServiceChange: (serviceId: number | null) => void;
}

export const ServiceFilter = ({ 
  services, 
  selectedService, 
  onServiceChange 
}: ServiceFilterProps) => {
  const { t, dir } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // أول 5 خدمات
  const visibleServices = services.slice(0, 5);
  // باقي الخدمات
  const hiddenServices = services.slice(5);
  const hasHiddenServices = hiddenServices.length > 0;

  // إغلاق الـ Dropdown عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceSelect = (serviceId: number | null) => {
    onServiceChange(serviceId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-4 lg:mb-8">
  
      {/* ===== ديسكتوب: عرض 5 خدمات + Dropdown ===== */}
      <div className="hidden lg:flex flex-wrap items-center gap-3">
        {/* زر الكل */}
        <button
          onClick={() => handleServiceSelect(null)}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-[#D2D6DF]
            ${selectedService === null 
              ? 'bg-primary text-white' 
              : 'text-[#74767B] text-base lg:text-[18px] font-medium hover:bg-gray-50'
            }
          `}
        >
          {t.products?.all || 'All'}
        </button>

        {/* أول 5 خدمات */}
        {visibleServices.map((service) => (
          <button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className={`
              px-4 py-2 rounded-xl text-sm cursor-pointer font-medium transition-all duration-300 border border-[#D2D6DF]
              ${selectedService === service.id 
                ? 'bg-primary text-white' 
                : 'text-[#74767B] text-base lg:text-[18px] font-medium hover:bg-gray-50'
              }
            `}
          >
            {service.title}
          </button>
        ))}

        {/* Dropdown لباقي الخدمات */}
        {hasHiddenServices && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-[#D2D6DF]
                ${hiddenServices.some(s => s.id === selectedService)
                  ? 'bg-primary text-white'
                  : 'text-[#74767B] text-base lg:text-[18px] font-medium hover:bg-gray-50'
                }
              `}
            >
              <span>{t.products?.more || 'More'}</span>
              <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full start-0 mt-2 bg-white rounded-xl shadow-2xl min-w-[200px] max-h-[300px] overflow-y-auto z-30 border border-gray-100 py-1">
                {hiddenServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`
                      w-full text-start px-4 py-2.5 text-sm transition-colors
                      ${selectedService === service.id 
                        ? 'bg-primary/5 text-primary font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
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

      {/* ===== موبايل: سلايدر أفقي ===== */}
      <div className="lg:hidden">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          className="!overflow-visible"
        >
          {/* زر الكل */}
          <SwiperSlide className="!w-auto">
            <button
              onClick={() => handleServiceSelect(null)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-[#D2D6DF] whitespace-nowrap
                ${selectedService === null 
                  ? 'bg-primary text-white' 
                  : 'text-[#74767B] bg-white hover:bg-gray-50'
                }
              `}
            >
              {t.products?.all || 'All'}
            </button>
          </SwiperSlide>

          {/* كل الخدمات */}
          {services.map((service) => (
            <SwiperSlide key={service.id} className="!w-auto">
              <button
                onClick={() => handleServiceSelect(service.id)}
                className={`
                  px-4 py-2 rounded-xl text-sm cursor-pointer font-medium transition-all duration-300 border border-[#D2D6DF] whitespace-nowrap
                  ${selectedService === service.id 
                    ? 'bg-primary text-white' 
                    : 'text-[#74767B] bg-white hover:bg-gray-50'
                  }
                `}
              >
                {service.title}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};