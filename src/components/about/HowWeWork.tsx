'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/useLanguage';

interface HowWeWorkProps {
  data: Array<{
    id: number;
    step_number: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

export const HowWeWork = ({ data }: HowWeWorkProps) => {
  const { t, dir } = useLanguage();

  if (!data || data.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* ===== العنوان ===== */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-secondary"></div>
            <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
              {t.about?.howWeWork || 'How do we work?'}
            </span>
          </div>
          <h2 className="text-xl font-extrabold md:text-2xl lg:text-[32px] text-primary">
            {t.about?.implementationStages || 'Implementation Stages From concept to final product'}
          </h2>
        </div>

        {/* ===== الكروت مع خطوط رأسية ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 relative">
          {data.map((step, index) => {
            const isLast = index === data.length - 1;
            return (
              <div key={step.id} className="relative">
                <WorkStep step={step} />
                {/* ===== خط رأسي بين الكروت (يختفي عن آخر وحدة) ===== */}
                {!isLast && index !== 2 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-3/4 bg-[#E6E8ED]"></div>
                )}
                {/* ===== خط رأسي للموبايل ===== */}
                {!isLast && index % 2 === 0 && (
                  <div className="lg:hidden absolute -right-2 top-1/2 -translate-y-1/2 w-px h-3/4 bg-[#E6E8ED]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface WorkStepProps {
  step: {
    id: number;
    step_number: string;
    title: string;
    description: string;
    icon: string;
  };
}

const WorkStep = ({ step }: WorkStepProps) => {
  return (
    <div className="rounded-xl p-4 md:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex md:items-center justify-around">
        <div className="text-2xl lg:text-[64px] font-bold text-[#B4BACA] mb-2">
          {step.step_number}
        </div>
        <div className="flex flex-col md:gap-3">
          <div className="w-20 h-20 mx-auto lg:mb-4 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
            <Image
              src={step.icon}
              alt={step.title}
              width={40}
              height={40}
              className="object-contain w-12 h-12 lg:w-20 lg:h-20"
            />
          </div>
          <h3 className="text-lg font-bold text-[#171A21] mb-2 group-hover:text-primary transition-colors">
            {step.title}
          </h3>
        </div>
      </div>
    </div>
  );
};