'use client';

import { useState, useEffect } from 'react';

import { useLanguage } from '@/src/hooks/useLanguage';
import { FaWhatsapp } from "react-icons/fa";
interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppButton = ({ 
  phoneNumber = '201234567890',
  message = 'Hello! I would like to inquire about your services.'
}: WhatsAppButtonProps) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // ظهور الزر بعد 2 ثانية مع تأثير
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999] 
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
    >
      {/* ===== الزر الرئيسي ===== */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          group relative flex items-center justify-center
          w-16 h-16 md:w-18 md:h-18 rounded-full
          bg-primary hover:bg-primary/90
          shadow-lg hover:shadow-2xl
          transition-all duration-300
          hover:scale-110 hover:rotate-3
          active:scale-95
        "
        aria-label="Chat on WhatsApp"
      >
        {/* ===== الأيقونة ===== */}
        <FaWhatsapp 
          className="text-white text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110" 
        />

       
       
      </button>
    </div>
  );
};