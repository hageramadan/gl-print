'use client';

import { useLanguage } from '@/src/hooks/useLanguage';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface ContactSidebarProps {
  contactInfo?: {
    phone: string;
    email: string;
    address: string;
    working_hours?: string;
  };
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    tik_tok?: string;
    twitter?: string;
    pinterest?: string;
  };
}

interface SocialItem {
  Icon: IconType;
  href: string;
  label: string;
  bg: string;
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
    facebook: socialLinks?.facebook,
    linkedin: socialLinks?.linkedin,
    instagram: socialLinks?.instagram,
    pinterest: socialLinks?.pinterest,
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

  // ✅ الترتيب المطلوب: Facebook → LinkedIn → Instagram → Pinterest
  const allSocials: SocialItem[] = [
    {
      Icon: FaFacebookF,
      href: links.facebook || '',
      label: 'Facebook',
      bg: 'bg-[#1877F2]',
    },
    {
      Icon: FaLinkedinIn,
      href: links.linkedin || '',
      label: 'LinkedIn',
      bg: 'bg-[#0A66C2]',
    },
    {
      Icon: FaInstagram,
      href: links.instagram || '',
      label: 'Instagram',
      bg: 'bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
    },
    {
      Icon: FaPinterestP,
      href: links.pinterest || '',
      label: 'Pinterest',
      bg: 'bg-[#E60023]',
    },
  ];

  const socialMediaLinks = allSocials.filter(
    (s) => s.href && s.href.trim() !== ''
  );

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

      {/* ✅ السوشيال ميديا بالترتيب المطلوب */}
      {socialMediaLinks.length > 0 && (
        <div className="mt-8 pt-6">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {socialMediaLinks.map(({ Icon, href, label, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                  ${bg}
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-white shadow-md
                  transition-all duration-300
                  hover:scale-110 hover:shadow-lg hover:brightness-110
                `}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};