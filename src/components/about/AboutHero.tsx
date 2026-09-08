'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { FaArrowRight } from 'react-icons/fa6';

interface AboutHeroProps {
  data: {
    tagline: string;
    title: string;
    description: string;
    button: {
      text: string;
      action_type: string;
    };
    page_main_image: string;
  };
}

export const AboutHero = ({ data }: AboutHeroProps) => {
  const { dir } = useLanguage();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
             
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data.page_main_image}
                alt={data.tagline}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* ===== المحتوى ===== */}
          <div className="w-full lg:w-1/2" dir={dir}>
            
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-secondary"></div>
                  <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                    {data?.tagline || 'About GL Print'}
                  </span>
                </div>
             <p
                className={`
                  text-xl md:text-2xl lg:text-[32px] text-primary font-extrabold mb-4 leading-relaxed
                  transition-all duration-700 ease-out
                 
                `}
                style={{ transitionDelay: "0.4s" }}
              >
                {data?.title || 'GL Print delivers precision, consistency, and professional craftsmanship.'}
              </p>
            <p
                className={`
                  text-sm md:text-base lg:text-lg text-[#667085] font-medium md:font-semibold leading-relaxed mb-8
                  transition-all duration-700 ease-out
                 
                `}
                style={{ transitionDelay: "0.6s" }}
              >
                {data?.description || 'GL Print (Cairo, Egypt) offers full-service design, printing, and outdoor advertising solutions, using advanced technologies to deliver high-quality prints that help businesses stand out and succeed.'}
              </p>
            <Link
              href={data.button.action_type === 'request_quote' ? '/quote' : '/'}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span>{data.button.text}</span>
              <FaArrowRight className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

      
        </div>
      </div>
    </section>
  );
};