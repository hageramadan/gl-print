'use client';

import Link from 'next/link';
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram,
  FaTiktok,
  FaGlobe,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

interface SocialShareProps {
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    pinterest?: string;
    instagram?: string;
    tik_tok?: string;
    website?: string;
  };
}

interface SocialItem {
  key: string;
  Icon: IconType;
  href?: string;
  label: string;
  bg: string;
}

export const SocialShare = ({ socialLinks }: SocialShareProps) => {
  const socials: SocialItem[] = [
    {
      key: 'whatsapp',
      Icon: FaWhatsapp,
      href: socialLinks?.whatsapp,
      label: 'WhatsApp',
      bg: 'bg-[#25D366]',
    },
    {
      key: 'facebook',
      Icon: FaFacebookF,
      href: socialLinks?.facebook,
      label: 'Facebook',
      bg: 'bg-[#1877F2]',
    },
    {
      key: 'twitter',
      Icon: FaTwitter,
      href: socialLinks?.twitter,
      label: 'Twitter',
      bg: 'bg-[#1DA1F2]',
    },
    {
      key: 'linkedin',
      Icon: FaLinkedinIn,
      href: socialLinks?.linkedin,
      label: 'LinkedIn',
      bg: 'bg-[#0A66C2]',
    },
    {
      key: 'pinterest',
      Icon: FaPinterestP,
      href: socialLinks?.pinterest,
      label: 'Pinterest',
      bg: 'bg-[#E60023]',
    },
    {
      key: 'instagram',
      Icon: FaInstagram,
      href: socialLinks?.instagram,
      label: 'Instagram',
      bg: 'bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]',
    },
    {
      key: 'tik_tok',
      Icon: FaTiktok,
      href: socialLinks?.tik_tok,
      label: 'TikTok',
      bg: 'bg-black',
    },
    {
      key: 'website',
      Icon: FaGlobe,
      href: socialLinks?.website,
      label: 'Website',
      bg: 'bg-gray-700',
    },
  ];

  const activeSocials = socials.filter(
    (s) => s.href && s.href.trim() !== '' && s.href !== '#'
  );

  if (activeSocials.length === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-2">
      {activeSocials.map(({ key, Icon, href, label, bg }) => (
        <Link
        
          key={key}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
         aria-label={`go to ${label}`}
          className={`
            bg-[#44537B]
            w-10 h-10 rounded-full flex items-center justify-center
            text-white
            shadow-md
            transition-all duration-300
            hover:scale-110 hover:shadow-lg hover:brightness-110
          `}
        >
          <Icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};