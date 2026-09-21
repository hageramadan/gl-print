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
        rounded-2xl border transition-all duration-300 overflow-hidden
        ${
          isOpen
            ? 'border-[#B5B7BA] shadow-lg'
            : 'bg-white border-[#B5B7BA52] hover:border-primary/20 hover:shadow-md'
        }
      `}
    >
      <button
      aria-label={`go to faq`}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-4 px-4 py-3 md:px-5 md:py-3 text-start cursor-pointer
          transition-colors duration-300
          ${isOpen ? 'bg-primary' : 'bg-white'}
        `}
        aria-expanded={isOpen}
      >
        <h3
          className={`
            text-sm md:text-xl font-medium transition-colors flex-1 flex items-start gap-2
            ${isOpen ? 'text-white' : 'text-primary'}
          `}
        >
          <span className="shrink-0">
            {faq.id}.
          </span>
          <span >{faq.question}</span>
        </h3>

        <div
          className={`
            w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0
            transition-all duration-300
            ${
              isOpen
                ? 'text-white  rotate-180'
                : ' text-primary'
            }
          `}
        >
          {isOpen ? (
            <FiMinus className="text-lg lg:text-xl" />
          ) : (
            <FiPlus className="text-lg lg:text-xl" />
          )}
        </div>
      </button>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out bg-white
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
          <div className="border-t border-[#B5B7BA] pt-4">
            <p className="text-sm md:text-lg text-[#74767B] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};