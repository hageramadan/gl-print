'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

interface StatsProps {
  data: Array<{
    id: number;
    number: string;
    name: string;
    is_visible: boolean;
    sort_order: number;
  }>;
}

export const Stats = ({ data }: StatsProps) => {
  const {  dir } = useLanguage();
  const [counts, setCounts] = useState<number[]>(data?.map(() => 0) || []);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(false);

  // تحويل الأرقام من string إلى number
  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/[^0-9]/g, '')) || 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted.current) {
            setIsVisible(true);
            animationStarted.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // if (sectionRef.current) {
      //   observer.unobserve(sectionRef.current);
      // }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !data || data.length === 0) return;

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const endCounts = data.map((stat) => parseNumber(stat.number));
    // const increments = endCounts.map((end) => end / steps);

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCounts = endCounts.map((end, index) => {
        const progress = Math.min(currentStep / steps, 1);
        return Math.floor(progress * endCounts[index]);
      });
      setCounts(newCounts);

      if (currentStep >= steps) {
        setCounts(endCounts);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, data]);

  // إذا لم توجد بيانات، لا نعرض شيء
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="py-2 md:py-20 bg-white lg:mt-5"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {data.map((stat, index) => {
            // const numericValue = parseNumber(stat.number);
            const suffix = stat.number.replace(/[0-9]/g, '');
            
            return (
              <div
                key={stat.id || index}
                className="
                  text-center p-6 md:p-8 rounded-2xl
                  border border-[#D2D6DF66]
                  bg-[#D2D6DF66]
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                  group
                "
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {counts[index] || 0}{suffix}
                </div>
                <p className="text-sm md:text-[24px] font-semibold text-primary transition-colors">
                  {stat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};