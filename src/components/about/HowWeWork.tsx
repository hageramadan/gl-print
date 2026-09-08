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

  // تقسيم الخطوات إلى صفين (3 + 3)
  const firstRow = data.slice(0, 3);
  const secondRow = data.slice(3, 6);

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
          <h2 className="text-xl font-extrabold md:text-2xl lg:text-[32px]  text-primary">
            {t.about?.implementationStages || 'Implementation Stages From concept to final product'}
          </h2>
          {/* <p className="text-sm md:text-base text-[#667085] mt-2">
            {t.about?.fromConcept || 'From concept to final product'}
          </p> */}
        </div>

        {/* ===== الخطوات ===== */}
        <div className="space-y-6">
          {/* الصف الأول */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {firstRow.map((step) => (
              <WorkStep key={step.id} step={step} />
            ))}
          </div>
          {/* الصف الثاني */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {secondRow.map((step) => (
              <WorkStep key={step.id} step={step} />
            ))}
          </div>
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
    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className='flex items-center justify-between'>
       <div className="text-2xl lg:text-[64px] font-bold text-[#B4BACA] mb-2">
        {step.step_number}
      </div>
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
        <Image
          src={step.icon}
          alt={step.title}
          width={40}
          height={40}
          className="object-contain w-12 h-12 lg:w-20 lg:h-20"
        />
      </div>
      
      </div>
      <h3 className="text-lg font-bold text-[#171A21] mb-2 group-hover:text-primary transition-colors">
        {step.title}
      </h3>
      {step.description && (
        <p className="text-sm text-[#667085] leading-relaxed">
          {step.description}
        </p>
      )}
    </div>
  );
};