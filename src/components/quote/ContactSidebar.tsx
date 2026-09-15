'use client';

import { useLanguage } from '@/src/hooks/useLanguage';
import Image from 'next/image';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

interface ContactSidebarProps {
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
    working_hours?: string;
  };
  socialLinks?: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
  };
}

export const ContactSidebar = ({ contactInfo, socialLinks }: ContactSidebarProps) => {
  const { t, dir } = useLanguage();

  const contact = {
    phone: contactInfo?.phone || '+20 123 456 7890',
    email: contactInfo?.email || 'quotes@glprint.com',
    address: contactInfo?.address || '123 Printing Ave, Cairo, Egypt',
    workingHours: contactInfo?.working_hours || 'Sun - Thu: 9 AM - 6 PM',
  };

  const links = {
    whatsapp: socialLinks?.whatsapp || 'https://wa.me/201234567890',
    facebook: socialLinks?.facebook || 'https://facebook.com/glprint',
    linkedin: socialLinks?.linkedin || 'https://linkedin.com/company/glprint',
    instagram: socialLinks?.instagram || 'https://instagram.com/glprint',
    tik_tok: socialLinks?.tik_tok || 'https://tiktok.com/@glprint',
  };

  const items = [
    {
      icon: FiPhone,
      label: t.quote?.callUs || 'CALL US',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      dir: 'ltr',
    },
    {
      icon: FiMail,
      label: t.quote?.emailUs || 'EMAIL US',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: FiMapPin,
      label: t.quote?.visitUs || 'VISIT US',
      value: contact.address,
    },
    {
      icon: FiClock,
      label: t.quote?.workingHours || 'WORKING HOURS',
      value: contact.workingHours,
    },
  ];

  // ✅ صور السوشيال ميديا
  const socialMediaLinks = [
    {
      image: '/images/social/whats.png',
      href: links.whatsapp,
      label: 'WhatsApp',
    },
    {
      image: '/images/social/face.png',
      href: links.facebook,
      label: 'Facebook',
    },
    {
      image: '/images/social/in.png',
      href: links.linkedin,
      label: 'LinkedIn',
    },
    {
      image: '/images/social/insta.png',
      href: links.instagram,
      label: 'Instagram',
    },
    {
      image: '/images/social/tiktok.png',
      href: links.tik_tok,
      label: 'TikTok',
    },
  ];

  return (
    <div
      className="bg-linear-to-b from-[#090E1B] to-primary rounded-2xl p-6 md:p-8 h-auto"
      dir={dir}
    >
      <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
        {t.quote?.sidebarTitle || "Let's Talk About Your Project"}
      </h3>
      <p className="text-gray-200 text-sm md:text-[15px] mb-8">
        {t.quote?.sidebarDescription ||
          "Need immediate assistance? We're here to help."}
      </p>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-5 h-5 lg:w-6 lg:h-6 flex items-start">
              <item.icon className="text-white w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-white font-medium tracking-wider mb-1">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-white font-medium text-sm md:text-base hover:text-secondary transition-colors break-all"
                  dir={item.dir === 'ltr' ? 'ltr' : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white font-medium text-sm md:text-base">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== صور السوشيال ميديا ===== */}
      <div className="mt-8 pt-6">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {socialMediaLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 p-1 rounded-full overflow-hidden hover:scale-110 transition-all duration-300 flex items-center justify-center"
              aria-label={social.label}
            >
              <Image
                src={social.image}
                alt={social.label}
                width={400}
                height={400}
                className="object-contain w-full h-full"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};