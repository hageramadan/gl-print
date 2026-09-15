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
  const isRTL = dir === 'rtl';

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

        {/* ===== الكروت مع أسهم ===== */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-1 lg:gap-8 relative">
          {data.map((step, index) => {
            const isLast = index === data.length - 1;
            return (
              <div key={step.id} className="relative">
                <WorkStep step={step} />
                {/* ===== سهم بين الكروت ===== */}
                {!isLast && (
                  <div
                    className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center ${
                      isRTL ? '-left-5' : '-right-5'
                    }`}
                  >
                    <ArrowIcon direction={isRTL ? 'left' : 'right'} />
                  </div>
                )}
                {!isLast && index!=2 && (
                  <div
                    className={`flex lg:hidden absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center ${
                      isRTL ? '-left-5' : '-right-5'
                    }`}
                  >
                    <ArrowIcon direction={isRTL ? 'left' : 'right'} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ===== مكون السهم ===== */
const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => {
  return (
    <svg
      width="40"
      height="16"
      viewBox="0 0 40 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-primary ${direction === 'left' ? 'rotate-180' : ''}`}
    >
      <path
        d="M0 8H36M36 8L30 2M36 8L30 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
    <div className="rounded-xl p-4 md:p-8 text-center  transition-all duration-300  group">
      <div className="space-y-2">
        <div className="text-xl lg:text-[28px] font-bold text-secondary mb-2">
          {step.step_number}
        </div>
        <div className="flex flex-col md:gap-3">
          {/* ===== الدائرة الحمراء غير المكتملة حول الصورة ===== */}
          <div className="relative w-15 h-15 lg:w-20 lg:h-20 mx-auto lg:mb-4">
            {/* الدائرة الحمراء غير المكتملة */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="150 50"
                className="transition-all duration-500 group-hover:strokeDasharray-[220_10]"
              />
            </svg>
            {/* الصورة */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={step.icon}
                alt={step.title}
                width={40}
                height={40}
                className="object-contain w-11 h-11 lg:w-15.5 lg:h-15.5"
              />
            </div>
          </div>
          <h3 className="text-sm lg:text-lg font-bold text-[#171A21] mb-2 group-hover:text-primary transition-colors">
            {step.title}
          </h3>
        </div>
      </div>
    </div>
  );
};