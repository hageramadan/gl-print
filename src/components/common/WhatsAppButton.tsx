'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FaWhatsapp } from 'react-icons/fa';
import { getHomeData } from '@/src/services/homeApi';

interface WhatsAppButtonProps {
  message?: string;
}

export const WhatsAppButton = ({
  message = 'Hello! I would like to inquire about your services.',
}: WhatsAppButtonProps) => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  // ✅ جلب رقم الواتساب من API /home
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const response = await getHomeData(language);
        const socialLinks = response.footer?.social_links;

        if (socialLinks?.whatsapp) {
          setWhatsappUrl(socialLinks.whatsapp);
        }
      } catch (error) {
        console.error('Failed to fetch WhatsApp number:', error);
      }
    };
    fetchWhatsAppNumber();
  }, [language]);

  // ✅ ظهور الزر بعد 2 ثانية
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!whatsappUrl) return;

    // ✅ إذا كان الرابط كاملاً (https://wa.me/...)، نضيف الرسالة
    const url = whatsappUrl.includes('?')
      ? `${whatsappUrl}&text=${encodeURIComponent(message)}`
      : `${whatsappUrl}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };

  // ✅ لا نعرض الزر إذا لم يكن هناك رقم واتساب
  if (!whatsappUrl) return null;

  return (
    <div
      className={`
        fixed bottom-6 end-6 z-[9999] 
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
        <FaWhatsapp className="text-white text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
};