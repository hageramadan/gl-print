'use client';

import Image from 'next/image';

interface CompanyValuesProps {
  data: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
}

export const CompanyValues = ({ data }: CompanyValuesProps) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-2 md:py-16 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[#E6E8ED] transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4  rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain w-16 h-16"
                />
              </div>
              <h3 className="text-xl lg:text-[28px] font-bold text-[#171A21] mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm md:text-xl font-medium text-[#667085] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};