'use client';

import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number;
   onBlur?: () => void; 
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;  
  name?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  required = false,
  name,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl border bg-[#F9FAFB] text-start
          flex items-center justify-between gap-2
          transition-all duration-200
          ${
            isOpen
              ? 'border-primary ring-2 ring-primary/10'
              : 'border-[#E6E8ED] hover:border-primary/40'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`text-sm md:text-base truncate ${
            selectedOption ? 'text-gray-700 font-medium' : 'text-gray-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`
            text-gray-400 shrink-0 transition-transform duration-300
            ${isOpen ? 'rotate-180 text-primary' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full start-0 end-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 max-h-[280px] overflow-y-auto z-50">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-400 text-center">
              No options
            </div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full flex items-center justify-between gap-2
                    px-4 py-2.5 text-start text-sm md:text-base
                    transition-colors
                    ${
                      isSelected
                        ? 'bg-primary/5 text-primary font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <FiCheck className="text-primary shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};