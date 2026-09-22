'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FiX, FiSearch, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { getHomeData } from '@/src/services/homeApi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    tik_tok?: string;
    pinterest?: string;
  };
}

export const Sidebar = ({
  isOpen,
  onClose,
  contactInfo,
  socialLinks,
}: SidebarProps) => {
  const { t, dir, language } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ بيانات من API
  const [fetchedContact, setFetchedContact] = useState<{
    phone: string;
    email: string;
    address: string;
  } | null>(null);

  const [fetchedSocial, setFetchedSocial] = useState<{
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    pinterest?: string;
  } | null>(null);

  const fixedSide = useRef<'left' | 'right'>('right');

  // ✅ جلب البيانات من API مع اللغة في الهيدر
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomeData(language);
        const footer = response.footer;

        if (footer) {
          setFetchedContact({
            phone: footer.phone,
            email: footer.email,
            address: footer.address,
          });

          setFetchedSocial({
            facebook: footer.social_links?.facebook,
            linkedin: footer.social_links?.linkedin,
            instagram: footer.social_links?.instagram,
            pinterest: (footer.social_links as any)?.pinterest,
          });
        }
      } catch (error) {
        console.error('Failed to fetch sidebar data:', error);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    fixedSide.current = 'right';
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

  // ✅ استخدام البيانات من API أو الـ props
  const contact = fetchedContact ||
    contactInfo || {
      phone: '+20 00 020 000 000',
      email: 'glprinttt123@gmail.com',
      address: 'stt, Maadi',
    };

  const links = {
    facebook: fetchedSocial?.facebook || socialLinks?.facebook,
    linkedin: fetchedSocial?.linkedin || socialLinks?.linkedin,
    instagram: fetchedSocial?.instagram || socialLinks?.instagram,
    pinterest: fetchedSocial?.pinterest || socialLinks?.pinterest,
  };

  // ✅ الترتيب المطلوب: Facebook → LinkedIn → Instagram → Pinterest
  const socialMediaLinks = [
    { icon: FaFacebookF, href: links.facebook, label: 'Facebook' },
    { icon: FaLinkedinIn, href: links.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: links.instagram, label: 'Instagram' },
    { icon: FaPinterestP, href: links.pinterest, label: 'Pinterest' },
  ].filter((s) => s.href && s.href.trim() !== '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(trimmed)}&type=all&page=1`);
    }
  };

  const side = fixedSide.current;
  const sideStyle = side === 'left' ? { left: 0 } : { right: 0 };
  const closedTransform =
    side === 'left' ? 'translateX(-100%)' : 'translateX(100%)';

  return (
    <>
      {/* ===== Overlay ===== */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={onClose}
      />

      {/* ===== Sidebar ===== */}
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
        {/* ===== اللوجو + زر الإغلاق ===== */}
        <div className="flex items-center justify-between p-6">
          <Link href="/" onClick={onClose} aria-label="go to home">
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
            className="p-2 hover:bg-gray-700 cursor-pointer bg-[#3E3F42] rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <FiX className="text-xl text-gray-50" />
          </button>
        </div>

        {/* ===== البحث ===== */}
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

        {/* ===== معلومات الاتصال ===== */}
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

        {/* ===== السوشيال ميديا ===== */}
        {socialMediaLinks.length > 0 && (
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              {t.sidebar?.followUs || 'Follow Us'}
            </p>
            <div className="flex items-center gap-3">
              {socialMediaLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href as string}
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
        )}
      </div>
    </>
  );
};