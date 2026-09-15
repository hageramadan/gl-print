'use client';

import Link from 'next/link';
import Image from 'next/image';

interface SocialShareProps {
  socialLinks?: {
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    pinterest?: string;
    instagram?: string;
    tik_tok?: string;
  };
}

export const SocialShare = ({ socialLinks }: SocialShareProps) => {
  // ✅ الصور من المجلد المحلي
  const socials = [
    {
      key: 'whatsapp',
      image: '/images/social/whats.png',
      href: socialLinks?.whatsapp,
      label: 'WhatsApp',
    },
    {
      key: 'facebook',
      image: '/images/social/face.png',
      href: socialLinks?.facebook,
      label: 'Facebook',
    },
     {
      key: 'twitter',
      image: '/images/social/twitter.png',
      href: socialLinks?.twitter,
      label: 'twitter',
    },
    {
      key: 'linkedin',
      image: '/images/social/in.png',
      href: socialLinks?.linkedin,
      label: 'LinkedIn',
    },
     {
      key: 'pinterest',
      image: '/images/social/pinterest.png',
      href: socialLinks?.pinterest,
      label: 'pinterest',
    },
    {
      key: 'instagram',
      image: '/images/social/insta.png',
      href: socialLinks?.instagram,
      label: 'Instagram',
    },
    {
      key: 'tik_tok',
      image: '/images/social/tiktok.png',
      href: socialLinks?.tik_tok,
      label: 'TikTok',
    },
    {
      key: 'website-link',
      image: '/images/social/website-link.png',
      href: socialLinks?.tik_tok,
      label: 'TikTok',
    },
  ];

  // ✅ عرض الأيقونات التي لها لينك فقط
  const activeSocials = socials.filter(
    (s) => s.href && s.href.trim() !== '' && s.href !== '#'
  );

  if (activeSocials.length === 0) return null;

  return (
    <div className="flex items-center  flex-wrap">
      {activeSocials.map((social) => (
        <Link
          key={social.key}
          href={social.href as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="
            w-12 h-12 rounded-full overflow-hidden flex items-center justify-center
            transition-all duration-300 hover:scale-110
          "
        >
          <Image
            src={social.image}
            alt={social.label}
            width={400}
            height={400}
            className="object-contain w-8 h-8 "
          />
        </Link>
      ))}
    </div>
  );
};