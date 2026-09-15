'use client';

import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface FAQItemProps {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
}

export const FAQItem = ({ faq }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`
        bg-white rounded-2xl border transition-all duration-300
        ${
          isOpen
            ? 'border-primary/30 shadow-lg'
            : 'border-[#E6E8ED] hover:border-primary/20 hover:shadow-md'
        }
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-start"
        aria-expanded={isOpen}
      >
        <h3
          className={`
            text-base md:text-lg font-bold transition-colors flex-1
            ${isOpen ? 'text-primary' : 'text-[#171A21]'}
          `}
        >
          {faq.question}
        </h3>

        <div
          className={`
            w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0
            transition-all duration-300
            ${
              isOpen
                ? 'bg-primary text-white rotate-180'
                : 'bg-primary/10 text-primary'
            }
          `}
        >
          {isOpen ? (
            <FiMinus className="text-lg" />
          ) : (
            <FiPlus className="text-lg" />
          )}
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <div className="border-t border-[#E6E8ED] pt-4">
            <p className="text-sm md:text-base text-[#667085] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};