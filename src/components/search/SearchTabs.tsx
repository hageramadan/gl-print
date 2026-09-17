'use client';

import { useLanguage } from '@/src/hooks/useLanguage';
import { SearchType } from '@/src/services/searchApi';

interface SearchTabsProps {
  activeTab: SearchType;
  counts: {
    all: number;
    services: number;
    products: number;
  };
  onTabChange: (tab: SearchType) => void;
}

export const SearchTabs = ({ activeTab, counts, onTabChange }: SearchTabsProps) => {
  const { t } = useLanguage();

  const tabs: { key: SearchType; label: string; count: number }[] = [
    { key: 'all', label: t.search?.all || 'All', count: counts.all },
    { key: 'services', label: t.search?.services || 'Services', count: counts.services },
    { key: 'products', label: t.search?.products || 'Products', count: counts.products },
  ];

  return (
    <div className="flex items-center gap-3 mb-8 border-b border-[#E1E3E4] pb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            px-5 py-3  text-sm md:text-base whitespace-nowrap cursor-pointer
            transition-all duration-300 
            ${
              activeTab === tab.key
                ? ' text-secondary border-b border-secondary font-bold'
                : ' text-primary font-semibold'
            }
          `}
        >
          {tab.label}
          <span
            className={`
               ms-1 text-sm lg:text-base 
              ${
                activeTab === tab.key
                  ? ' text-secondary font-bold'
                  : ' text-primary font-semibold'
              }
            `}
          >
            ({tab.count})
          </span>
        </button>
      ))}
    </div>
  );
};