// 'use client';

// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import { useLanguage } from '@/src/hooks/useLanguage';
// import { usePathname } from 'next/navigation';
// import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
// import { getServices, Service } from '@/src/services/servicesApi';

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
//   const { t, language } = useLanguage();
//   const pathname = usePathname();
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [servicesData, setServicesData] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(false);

//   // جلب الخدمات عند فتح القائمة
//   useEffect(() => {
//     if (isOpen && servicesData.length === 0) {
//       const fetchServices = async () => {
//         setLoading(true);
//         try {
//           const response = await getServices(1, language);
//           setServicesData(response.data.services);
//         } catch (error) {
//           console.error('Failed to fetch services:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchServices();
//     }
//   }, [isOpen, language, servicesData.length]);

//   const navItems = [
//     { key: 'home', href: '/' },
//     { key: 'about', href: '/about' },
//     { 
//       key: 'services', 
//       href: '/services', 
//       hasSubMenu: true,
//       subItems: servicesData.map((service) => ({
//         key: `service-${service.id}`,
//         href: `/services/${service.id}`,
//         label: service.title,
//       })),
//     },
//     { key: 'products', href: '/products' },
//     { key: 'industries', href: '/industries' },
//     { key: 'blogs', href: '/blogs' },
//     { key: 'contact', href: '/contact' },
//   ];

//   if (!isOpen) return null;

//   return (
//     <nav className="lg:hidden py-6 border-t border-gray-200">
//       <div className="flex flex-col gap-2">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;
//           const hasSubMenu = item.hasSubMenu && item.subItems && item.subItems.length > 0;
//           const isSubOpen = servicesOpen;

//           return (
//             <div key={item.key}>
//               <div className="flex items-center justify-between">
//                 {/* ===== رابط الصفحة ===== */}
//                 {hasSubMenu ? (
//                   // إذا كان للعنصر قائمة فرعية، نستخدم div مع onClick للانتقال
//                   <div
//                     className={`
//                       flex-1 font-medium py-2 px-4 rounded transition-colors cursor-pointer
//                       ${isActive 
//                         ? 'bg-secondary text-white' 
//                         : 'hover:bg-gray-100'
//                       }
//                     `}
//                     onClick={() => {
//                       // الانتقال إلى صفحة الخدمات
//                       window.location.href = item.href;
//                     }}
//                   >
//                     {t.nav[item.key as keyof typeof t.nav]}
//                   </div>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`
//                       flex-1 font-medium py-2 px-4 rounded transition-colors
//                       ${isActive 
//                         ? 'bg-secondary text-white' 
//                         : 'hover:bg-gray-100'
//                       }
//                     `}
//                     onClick={onClose}
//                   >
//                     {t.nav[item.key as keyof typeof t.nav]}
//                   </Link>
//                 )}
                
//                 {/* ===== زر السهم (للقوائم الفرعية فقط) ===== */}
//                 {hasSubMenu && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setServicesOpen(!isSubOpen);
//                     }}
//                     className={`
//                       p-2 rounded transition-colors
//                       hover:bg-gray-100
//                       ${isSubOpen ? 'text-secondary' : 'text-gray-500'}
//                     `}
//                     aria-label="Toggle services"
//                   >
//                     {isSubOpen ? (
//                       <FiChevronDown className="text-lg" />
//                     ) : (
//                       <FiChevronRight className="text-lg" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* ===== القائمة الفرعية للخدمات ===== */}
//               {hasSubMenu && isSubOpen && (
//                 <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-4">
//                   {loading ? (
//                     <div className="py-2 px-4 text-sm text-gray-500">
//                       Loading services...
//                     </div>
//                   ) : servicesData.length === 0 ? (
//                     <div className="py-2 px-4 text-sm text-gray-500">
//                       No services available
//                     </div>
//                   ) : (
//                     item.subItems?.map((subItem) => {
//                       const isSubActive = pathname === subItem.href;
//                       return (
//                         <Link
//                           key={subItem.key}
//                           href={subItem.href}
//                           className={`
//                             block py-2 px-4 text-sm rounded transition-colors
//                             ${isSubActive 
//                               ? 'bg-secondary/10 text-secondary font-semibold' 
//                               : 'hover:bg-gray-100'
//                             }
//                           `}
//                           onClick={onClose}
//                         >
//                           {subItem.label}
//                         </Link>
//                       );
//                     })
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

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
    <nav className="lg:hidden py-6 border-t border-gray-200">
      <div className="flex flex-col gap-2">
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
                  : 'hover:bg-gray-100'
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