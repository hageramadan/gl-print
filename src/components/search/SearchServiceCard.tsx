'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/src/hooks/useLanguage';

interface SearchServiceCardProps {
  service: {
    id: number;
    slug:string;
    title: string;
    description: string;
    icon: string;
  };
}

export const SearchServiceCard = ({ service }: SearchServiceCardProps) => {
  const { dir, t } = useLanguage();

  return (
    <Link
    aria-label={`go to services`}
      href={`/services/${service.slug}`}
      className="group bg-white rounded-2xl p-5 md:p-6 border border-[#E6E8ED] hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ECF6FF] flex items-center justify-center mb-4">
        <Image
          src={service.icon}
          alt={service.title}
          width={40}
          height={40}
          className="object-contain w-8 h-8 md:w-10 md:h-10"
        />
      </div>

      <h3 className="text-base md:text-lg font-bold text-[#070D14] mb-2 group-hover:text-primary transition-colors line-clamp-1">
        {service.title}
      </h3>

      <p className="text-sm text-[#585858] mb-4 line-clamp-2 flex-1">
        {service.description}
      </p>

      <div className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
        <span>{t.services?.learnMore || 'learnMore'}</span>
        <FiArrowRight className={dir === 'rtl' ? 'rotate-180' : ''} />
      </div>
    </Link>
  );
};