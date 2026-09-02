'use client';

import Link from 'next/link';
import { useLanguage } from '@/src/hooks/useLanguage';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'products', href: '/products' },
    { key: 'industries', href: '/industries' },
    { key: 'blogs', href: '/blogs' },
    { key: 'contact', href: '/contact' },
  ];

  if (!isOpen) return null;

  return (
    <nav className="lg:hidden py-6 border-t border-gray-700">
      <div className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`
                font-medium py-2 px-4 rounded transition-colors
                ${isActive 
                  ? 'bg-secondary text-white' 
                  : 'hover:bg-gray-700'
                }
              `}
              onClick={onClose}
            >
              {t.nav[item.key as keyof typeof t.nav]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};