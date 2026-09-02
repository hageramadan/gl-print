"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { usePathname } from "next/navigation";
import { 
  FiMenu, FiX, FiSearch, FiGrid, 
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, 
  FiChevronDown, FiChevronRight 
} from "react-icons/fi";
import Image from "next/image";

export const Navbar = () => {
  const { t, dir } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // إغلاق العناصر عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تنظيف الـ timeout عند إلغاء التثبيت
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
    { key: "industries", href: "/industries" },
    { key: "blogs", href: "/blogs" },
    { key: "contact", href: "/contact" },
  ];

  // روابط السوشيال ميديا
  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  // القوائم الرئيسية مع القوائم الفرعية الجانبية
  const menuItems = {
    services: {
      label: "Services",
      items: [
        { 
          key: "digital-printing", 
          href: "/services/digital-printing", 
          label: "Digital Printing",
          subItems: [
            { key: "small-format", href: "/services/digital/small-format", label: "Small Format" },
            { key: "large-format", href: "/services/digital/large-format", label: "Large Format" },
            { key: "wide-format", href: "/services/digital/wide-format", label: "Wide Format" },
          ]
        },
        { 
          key: "offset-printing", 
          href: "/services/offset-printing", 
          label: "Offset Printing",
          subItems: [
            { key: "sheet-fed", href: "/services/offset/sheet-fed", label: "Sheet Fed" },
            { key: "web-fed", href: "/services/offset/web-fed", label: "Web Fed" },
          ]
        },
        { 
          key: "large-format", 
          href: "/services/large-format", 
          label: "Large Format",
          subItems: [
            { key: "banners", href: "/services/large/banners", label: "Banners" },
            { key: "posters", href: "/services/large/posters", label: "Posters" },
            { key: "billboards", href: "/services/large/billboards", label: "Billboards" },
          ]
        },
        { 
          key: "packaging", 
          href: "/services/packaging", 
          label: "Packaging",
          subItems: [
            { key: "boxes", href: "/services/packaging/boxes", label: "Custom Boxes" },
            { key: "labels", href: "/services/packaging/labels", label: "Labels" },
          ]
        },
      ]
    },
    products: {
      label: "Products",
      items: [
        { 
          key: "business-cards", 
          href: "/products/business-cards", 
          label: "Business Cards",
          subItems: [
            { key: "standard", href: "/products/cards/standard", label: "Standard" },
            { key: "premium", href: "/products/cards/premium", label: "Premium" },
            { key: "luxury", href: "/products/cards/luxury", label: "Luxury" },
          ]
        },
        { 
          key: "brochures", 
          href: "/products/brochures", 
          label: "Brochures",
          subItems: [
            { key: "tri-fold", href: "/products/brochures/tri-fold", label: "Tri-Fold" },
            { key: "bi-fold", href: "/products/brochures/bi-fold", label: "Bi-Fold" },
            { key: "multi-page", href: "/products/brochures/multi-page", label: "Multi-Page" },
          ]
        },
        { 
          key: "flyers", 
          href: "/products/flyers", 
          label: "Flyers",
          subItems: [
            { key: "single-sided", href: "/products/flyers/single-sided", label: "Single Sided" },
            { key: "double-sided", href: "/products/flyers/double-sided", label: "Double Sided" },
          ]
        },
        { 
          key: "posters", 
          href: "/products/posters", 
          label: "Posters",
          subItems: [
            { key: "small", href: "/products/posters/small", label: "Small" },
            { key: "medium", href: "/products/posters/medium", label: "Medium" },
            { key: "large", href: "/products/posters/large", label: "Large" },
          ]
        },
      ]
    }
  };

  // التحقق مما إذا كان العنصر لديه قائمة فرعية
  const hasSubMenu = (key: string) => {
    return key === "services" || key === "products";
  };

  // ===== دوال التحكم في الـ Dropdown =====
  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleSubMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSubDropdown(key);
  };

  const handleSubMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // ===== دوال التحكم في الموبايل =====
  const toggleMobileSub = (key: string) => {
    setMobileSubOpen(mobileSubOpen === key ? null : key);
  };

  return (
    <nav
      className="bg-white text-[#3E3F42] shadow-lg sticky top-0 z-40"
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={50}
              className="object-contain w-14 h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const hasSub = hasSubMenu(item.key);
              const isDropdownOpen = activeDropdown === item.key;
              const menuData = menuItems[item.key as keyof typeof menuItems];

              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => hasSub && handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`
                      font-medium transition-colors relative flex items-center gap-1 py-2
                      ${isActive ? "text-black" : "hover:text-secondary "}
                      ${isActive ? ' text-black font-semibold' : ""}
                    `}
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                    {hasSub && (
                      <FiChevronDown className={`text-xs transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown SubMenu مع Sub-Dropdown جانبي */}
                  {hasSub && isDropdownOpen && menuData && (
                    <div 
                      className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-2xl min-w-[220px] overflow-visible z-[9999] border border-gray-100 py-1"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {menuData.items.map((subItem) => {
                        const hasSubSub = subItem.subItems && subItem.subItems.length > 0;
                        const isSubOpen = activeSubDropdown === subItem.key;

                        return (
                          <div
                            key={subItem.key}
                            className="relative"
                            onMouseEnter={() => hasSubSub && handleSubMouseEnter(subItem.key)}
                            onMouseLeave={handleSubMouseLeave}
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black "
                            >
                              <span>{subItem.label}</span>
                              {hasSubSub && (
                                <FiChevronRight className={`text-xs transition-transform duration-300 ${isSubOpen ? 'rotate-90' : ''}`} />
                              )}
                            </Link>

                            {/* Sub-Dropdown الجانبي */}
                            {hasSubSub && isSubOpen && (
                              <div 
                                className="absolute top-0 bg-white rounded-lg shadow-2xl min-w-[200px] overflow-hidden z-[99999] border border-gray-100 py-1"
                                style={{ 
                                  left: dir === 'rtl' ? 'auto' : '100%',
                                  right: dir === 'rtl' ? '100%' : 'auto',
                                  marginLeft: dir === 'rtl' ? '0' : '4px',
                                  marginRight: dir === 'rtl' ? '4px' : '0',
                                }}
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleSubMouseLeave}
                              >
                                {subItem.subItems.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.key}
                                    href={subSubItem.href}
                                    className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black "
                                  >
                                    {subSubItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions: Search + Apps + Quote + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shadow-lg"
                aria-label="Search"
              >
                <FiSearch className="text-xl" />
              </button>

              {/* Search Input */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl p-4 w-72 z-[9999] border border-gray-200">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Apps Icon (Social Media) */}
            <div className="relative" ref={appsRef}>
              <button
                onClick={() => setIsAppsOpen(!isAppsOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shadow-lg"
                aria-label="Apps"
              >
                <FiGrid className="text-xl" />
              </button>

              {/* Social Media Dropdown */}
              {isAppsOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl p-4 w-56 z-[9999] border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Follow Us</h3>
                  <div className="flex flex-col gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <social.icon className="text-xl text-gray-600 hover:text-secondary transition-colors" />
                        <span className="text-sm text-gray-700">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Get a Quote Button - مع تأثير الرفع */}
            <Link
              href="/quote"
              className="hidden lg:block bg-linear-to-r from-[#090E1B] to-primary hover:from-primary hover:to-[#090E1B] px-6 py-2 text-white rounded-xl transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-xl"
            >
              {t.nav.quote || "Get a Quote"}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const hasSub = hasSubMenu(item.key);
                const menuData = menuItems[item.key as keyof typeof menuItems];
                const isSubOpen = mobileSubOpen === item.key;

                return (
                  <div key={item.key}>
                    <div
                      className={`
                        font-medium py-2 px-4 rounded transition-colors flex items-center justify-between cursor-pointer
                        ${isActive ? "bg-secondary text-white" : "hover:bg-gray-100"}
                      `}
                      onClick={() => {
                        if (hasSub) {
                          toggleMobileSub(item.key);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Link
                        href={item.href}
                        className="flex-1"
                        onClick={(e) => {
                          if (hasSub) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {t.nav[item.key as keyof typeof t.nav]}
                      </Link>
                      {hasSub && (
                        <FiChevronDown 
                          className={`text-xs transition-transform duration-300 ${isSubOpen ? 'rotate-180' : ''}`}
                        />
                      )}
                    </div>
                    
                    {/* Mobile Sub-Menu */}
                    {hasSub && isSubOpen && menuData && (
                      <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-4">
                        {menuData.items.map((subItem) => (
                          <div key={subItem.key}>
                            <Link
                              href={subItem.href}
                              className="block py-2 px-4 text-sm hover:bg-gray-100 rounded transition-colors hover:text-black "
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                            {/* عرض Sub-Sub في الموبايل */}
                            {subItem.subItems && subItem.subItems.length > 0 && (
                              <div className="ml-4 mt-1 border-l-2 border-gray-200 pl-4">
                                {subItem.subItems.map((subSubItem) => (
                                  <Link
                                    key={subSubItem.key}
                                    href={subSubItem.href}
                                    className="block py-2 px-4 text-sm hover:bg-gray-100 rounded transition-colors hover:text-black"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subSubItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href="/quote"
                className="bg-linear-to-r from-[#090E1B] to-primary hover:from-primary hover:to-[#090E1B] px-4 py-2 rounded-xl transition-all duration-300 font-medium text-center mt-2 text-white hover:-translate-y-1 hover:shadow-xl"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.quote || "Get a Quote"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};