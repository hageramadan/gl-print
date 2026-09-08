'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '@/src/hooks/useLanguage';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
  const { dir } = useLanguage();

  if (lastPage <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < lastPage - 2) {
        pages.push('...');
      }
      
      pages.push(lastPage);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* ===== زر السابق ===== */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg
          transition-all duration-300
          ${currentPage === 1 
            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-gray-100 hover:bg-primary hover:text-white text-gray-700 hover:shadow-md'
          }
        `}
      >
        <FiChevronLeft className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
        <span className="text-sm font-medium">Previous</span>
      </button>

      {/* ===== أرقام الصفحات ===== */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-2 py-2 text-gray-400">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`
                w-10 h-10 rounded-lg font-medium text-sm
                transition-all duration-300
                ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary/20 hover:text-primary'
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* ===== زر التالي ===== */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={`
          flex items-center gap-1 px-3 py-2 rounded-lg
          transition-all duration-300
          ${currentPage === lastPage
            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-gray-100 hover:bg-primary hover:text-white text-gray-700 hover:shadow-md'
          }
        `}
      >
        <span className="text-sm font-medium">Next</span>
        <FiChevronRight className={`${dir === 'rtl' ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};