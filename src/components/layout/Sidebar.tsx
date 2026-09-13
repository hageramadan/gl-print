'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiX, FiSearch, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaTiktok, FaInstagram } from 'react-icons/fa6';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks?: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
  };
}

export const Sidebar = ({ isOpen, onClose, contactInfo, socialLinks }: SidebarProps) => {
  const { t, dir } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ✅ تثبيت الجانب بناءً على اللغة الأولية فقط
  const fixedSide = useRef<'left' | 'right'>('right');

  useEffect(() => {
    // تحديد الجانب مرة واحدة عند أول تحميل
    fixedSide.current = dir === 'rtl' ? 'right' : 'right';
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const contact = contactInfo || {
    phone: '+20 00 020 000 000',
    email: 'glprinttt123@gmail.com',
    address: 'stt, Maadi',
  };

  const links = socialLinks || {
    whatsapp: 'https://wa.me/201234567890',
    facebook: 'https://facebook.com/glprint',
    linkedin: 'https://linkedin.com/company/glprint',
    instagram: 'https://instagram.com/glprint',
    tik_tok: 'https://tiktok.com/@glprint',
  };

  const socialMediaLinks = [
    { icon: FaFacebookF, href: links.facebook, label: 'Facebook' },
    { icon: FaTiktok, href: links.tik_tok, label: 'TikTok' },
    { icon: FaInstagram, href: links.instagram, label: 'Instagram' },
    { icon: FaLinkedinIn, href: links.linkedin, label: 'LinkedIn' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchValue)}`;
    }
  };

  // ✅ استخدام الجانب الثابت
  const side = fixedSide.current;
  const sideStyle = side === 'left' ? { left: 0 } : { right: 0 };
  const closedTransform = side === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={onClose}
      />

      <div
        ref={sidebarRef}
        dir={dir}
        className="
          fixed top-0 h-full w-full max-w-[400px] bg-white z-[9999]
          shadow-2xl transition-transform duration-300 ease-in-out
          overflow-y-auto
        "
        style={{
          ...sideStyle,
          transform: isOpen ? 'translateX(0)' : closedTransform,
          willChange: 'transform',
        }}
      >
        <div className="flex items-center justify-between p-6">
          <Link href="/" onClick={onClose}>
            <Image
              src="/logo1.png"
              alt="Logo"
              width={100}
              height={50}
              className="object-contain w-14 h-14 lg:w-25 lg:h-20"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 bg-[#3E3F42] rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <FiX className="text-xl text-gray-50" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <FiSearch className="text-lg" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t.sidebar?.searchPlaceholder || 'Search...'}
              className="w-full ps-12 pe-4 py-3 rounded-xl border border-gray-200 bg-[#1801000F] text-gray-700 placeholder:text-gray-500 focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </form>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FiPhone className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-[#090E1B] font-medium mb-1 text-sm lg:text-base">
                {t.sidebar?.callUs || 'Call us now'}
              </p>
              <a
                href={`tel:${contact.phone}`}
                className="text-base lg:text-lg font-bold text-[#090E1B] hover:text-secondary transition-colors"
                dir="ltr"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FiMail className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-[#090E1B] font-medium mb-1 text-sm lg:text-base">
                {t.sidebar?.emailAddress || 'Email Address'}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="text-base lg:text-lg font-bold text-[#090E1B] hover:text-secondary transition-colors break-all"
              >
                {contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FiMapPin className="text-primary text-xl" />
            </div>
            <div>
              <p className="text-[#090E1B] font-medium mb-1 text-sm lg:text-base">
                {t.sidebar?.officeAddress || 'Office Address'}
              </p>
              <p className="text-base font-bold text-gray-800">
                {contact.address}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            {t.sidebar?.followUs || 'Follow Us'}
          </p>
          <div className="flex items-center gap-3">
            {socialMediaLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-primary hover:bg-primary/95 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label={social.label}
              >
                <social.icon className="text-lg text-gray-50 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};