'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { id: 1, value: 400, suffix: '+', label: 'Projects Done' },
  { id: 2, value: 500, suffix: '+', label: 'Happy Client' },
  { id: 3, value: 300, suffix: '+', label: 'Expert Team' },
  { id: 4, value: 35, suffix: '+', label: 'Years Experience' },
];

export const Stats = () => {
  const { t, dir } = useLanguage();
  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(false);

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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const startCounts = statsData.map(() => 0);
    const endCounts = statsData.map((stat) => stat.value);
    const increments = endCounts.map((end) => end / steps);

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCounts = startCounts.map((start, index) => {
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
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-2 md:py-20 bg-white lg:mt-5"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
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
                {counts[index]}{stat.suffix}
              </div>
              <p className="text-sm md:text-[24px] font-semibold text-primary transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};