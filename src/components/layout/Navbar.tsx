"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";
import {
  getNavbarData,
  NavbarService,
  NavbarIndustry,
  NavbarProduct,
} from "@/src/services/navbarApi";
import { Sidebar } from "./Sidebar";

import { SocialLinks } from "@/src/services/contactApi";
interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface NavbarProps {
  socialLinks?: SocialLinks | null;
  contactInfo?: ContactInfo;
}

export const Navbar = ({ socialLinks, contactInfo }: NavbarProps) => {
  const { t, dir, language } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null,
  );
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [mobileSubSubOpen, setMobileSubSubOpen] = useState<string | null>(null);

  const [servicesData, setServicesData] = useState<NavbarService[]>([]);
  const [industriesData, setIndustriesData] = useState<NavbarIndustry[]>([]);
  const [productsData, setProductsData] = useState<NavbarProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [subDropdownPosition, setSubDropdownPosition] = useState({
    top: 0,
    left: 0,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const fetchNavbarData = async () => {
    try {
      setIsLoading(true);
      const response = await getNavbarData(language);
      setServicesData(response.data.navbar.services);
      setIndustriesData(response.data.navbar.industries);
      setProductsData(response.data.navbar.products);
    } catch (error) {
      console.error("Failed to fetch navbar data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNavbarData();
  }, [language]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setMobileSubOpen(null);
        setMobileSubSubOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const navItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "products", href: "/products", hasSub: true },
    { key: "services", href: "/services", hasSub: true },

    { key: "industries", href: "/industries", hasSub: true },
    { key: "blogs", href: "/blogs" },
    { key: "contact", href: "/contact" },
  ];

  const hasSubMenu = (key: string) => {
    return key === "services" || key === "products" || key === "industries";
  };

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
    }, 200);
  };

  const handleSubMouseEnter = useCallback(
    (serviceId: number, e: React.MouseEvent) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setActiveSubDropdown(`service-${serviceId}`);

      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      if (dir === "rtl") {
        setSubDropdownPosition({
          top: rect.top,
          left: rect.left - 230,
        });
      } else {
        setSubDropdownPosition({
          top: rect.top,
          left: rect.right + 2,
        });
      }
    },
    [dir],
  );
  const handleSubMouseMove = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const handleSubMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const toggleMobileSub = (key: string) => {
    setMobileSubOpen(mobileSubOpen === key ? null : key);
  };

  const toggleMobileSubSub = (key: string) => {
    setMobileSubSubOpen(mobileSubSubOpen === key ? null : key);
  };

  const activeService = servicesData.find(
    (s) => `service-${s.id}` === activeSubDropdown,
  );

  return (
    <>
      <nav
        ref={mobileMenuRef}
        className="bg-white text-[#3E3F42] shadow-lg sticky top-0 z-[999]"
        dir={dir}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link href="/" aria-label={`go to home`}>
              <Image
                src="/logo2.png"
                alt="Logo"
                width={100}
                height={50}
                className="object-contain w-20 h-12 lg:w-18 lg:h-14"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const hasSub = hasSubMenu(item.key);
                const isDropdownOpen = activeDropdown === item.key;

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => hasSub && handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      aria-label={`go to ${item.href}`}
                      className={`
                        font-medium transition-colors relative flex items-center gap-1 py-2
                        ${isActive ? "text-black" : "hover:text-secondary"}
                        ${isActive ? "text-black font-semibold" : ""}
                      `}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                      {hasSub && (
                        <FiChevronDown
                          className={`text-xs transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>

                    {hasSub && isDropdownOpen && (
                      <div
                        className="absolute top-full start-0 mt-1 bg-white rounded-lg shadow-2xl min-w-[250px] max-h-[450px] overflow-y-auto z-[9999] border border-gray-100 py-1"
                        onMouseEnter={handleDropdownMouseEnter}
                        // onMouseLeave={handleMouseLeave}
                      >
                        {item.key === "services" &&
                          (isLoading && servicesData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              Loading...
                            </div>
                          ) : servicesData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              No services available
                            </div>
                          ) : (
                            servicesData.map((service) => {
                              const hasProducts =
                                service.products && service.products.length > 0;
                              const isSubOpen =
                                activeSubDropdown === `service-${service.id}`;

                              return (
                                <div
                                  key={service.id}
                                  className="relative"
                                  onMouseEnter={(e) => {
                                    if (hasProducts) {
                                      handleSubMouseEnter(service.id, e);
                                    }
                                  }}
                                  // onMouseLeave={handleSubMouseLeave}
                                >
                                  <Link
                                    aria-label={`go to ${service.slug}`}
                                    href={`/services/${service.slug}`}
                                    className={`
                                      flex items-center justify-between px-4 py-2.5 transition-colors
                                      ${isSubOpen ? "bg-primary/5 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-black"}
                                    `}
                                  >
                                    <span>{service.title}</span>
                                    {hasProducts && (
                                      <FiChevronRight
                                        className={`text-xs transition-transform duration-300 ${
                                          language === "ar" ? "rotate-180" : ""
                                        } ${isSubOpen ? "rotate-90" : ""}`}
                                      />
                                    )}
                                  </Link>
                                </div>
                              );
                            })
                          ))}

                        {item.key === "products" &&
                          (isLoading && productsData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              Loading...
                            </div>
                          ) : productsData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              No products available
                            </div>
                          ) : (
                            productsData.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                aria-label={`go to ${product.slug}`}
                                className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black"
                              >
                                {product.name}
                              </Link>
                            ))
                          ))}

                        {item.key === "industries" &&
                          (isLoading && industriesData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              Loading...
                            </div>
                          ) : industriesData.length === 0 ? (
                            <div className="px-4 py-2.5 text-gray-500 text-sm">
                              No industries available
                            </div>
                          ) : (
                            industriesData.map((industry) => (
                              <Link
                                key={industry.id}
                                href={`/industries/${industry.slug}`}
                                aria-label={`go to ${industry.slug}`}
                                className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black"
                              >
                                {industry.name}
                              </Link>
                            ))
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer shadow-lg"
                aria-label="Open sidebar"
              >
                <FiGrid className="text-xl" />
              </button>

              <Link
                href="/quote"
                aria-label={`go to quote`}
                className="hidden lg:block bg-linear-to-r from-[#090E1B] to-primary hover:from-primary hover:to-[#090E1B] px-6 py-2 text-white rounded-xl transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-xl"
              >
                {t.nav.quote || "Get a Quote"}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const hasSub = hasSubMenu(item.key);
                  const isSubOpen = mobileSubOpen === item.key;

                  return (
                    <div key={item.key}>
                      <div
                        className={`
                          font-medium py-2 px-4 rounded transition-colors flex items-center justify-between
                          ${isActive ? "bg-secondary text-white" : "hover:bg-gray-100"}
                        `}
                      >
                        <Link
                          href={item.href}
                          aria-label={`go to ${item.href}`}
                          className="flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {t.nav[item.key as keyof typeof t.nav]}
                        </Link>

                        {hasSub && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileSub(item.key);
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            aria-label={` down arrow`}
                          >
                            <FiChevronDown
                              className={`text-sm transition-transform duration-300 ${isSubOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {hasSub && isSubOpen && (
                        <div className="ms-4 mt-1 border-l-2 border-gray-200 ps-4 max-h-[300px] overflow-y-auto">
                          {item.key === "services" &&
                            (isLoading && servicesData.length === 0 ? (
                              <div className="px-4 py-2 text-gray-500 text-sm">
                                Loading...
                              </div>
                            ) : (
                              servicesData.map((service) => {
                                const hasProducts =
                                  service.products &&
                                  service.products.length > 0;
                                const isSubSubOpen =
                                  mobileSubSubOpen ===
                                  `mobile-service-${service.id}`;

                                return (
                                  <div key={service.id}>
                                    <div className="flex items-center justify-between py-2 px-4">
                                      <Link
                                        href={`/services/${service.slug}`}
                                        aria-label={`go to ${service.slug}`}
                                        className="flex-1 text-sm hover:text-black transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {service.title}
                                      </Link>
                                      {hasProducts && (
                                        <button
                                          aria-label={`show services`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMobileSubSub(
                                              `mobile-service-${service.id}`,
                                            );
                                          }}
                                          className="p-1"
                                        >
                                          <FiChevronDown
                                            className={`text-xs transition-transform duration-300 ${isSubSubOpen ? "rotate-180" : ""}`}
                                          />
                                        </button>
                                      )}
                                    </div>

                                    {hasProducts && isSubSubOpen && (
                                      <div className="ms-4 border-l-2 border-gray-100 ps-4">
                                        {service.products.map((product) => (
                                          <Link
                                            key={product.id}
                                            href={`/products/${product.slug}`}
                                            aria-label={`go to ${product.slug}`}
                                            className="block py-2 px-4 text-xs hover:bg-gray-100 rounded transition-colors hover:text-black"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {product.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ))}

                          {item.key === "products" &&
                            (isLoading && productsData.length === 0 ? (
                              <div className="px-4 py-2 text-gray-500 text-sm">
                                Loading...
                              </div>
                            ) : (
                              productsData.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/products/${product.slug}`}
                                  aria-label={`go to ${product.slug}`}
                                  className="block py-2 px-4 text-sm hover:bg-gray-100 rounded transition-colors hover:text-black"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {product.name}
                                </Link>
                              ))
                            ))}

                          {item.key === "industries" &&
                            (isLoading && industriesData.length === 0 ? (
                              <div className="px-4 py-2 text-gray-500 text-sm">
                                Loading...
                              </div>
                            ) : (
                              industriesData.map((industry) => (
                                <Link
                                  key={industry.id}
                                  href={`/industries/${industry.slug}`}
                                  aria-label={`go to ${industry.slug}`}
                                  className="block py-2 px-4 text-sm hover:bg-gray-100 rounded transition-colors hover:text-black"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {industry.name}
                                </Link>
                              ))
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  href="/quote"
                  aria-label={`go to quote`}
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

      {/* ✅ إضافة شرط activeDropdown === "services" */}
      {activeDropdown === "services" &&
        activeService &&
        activeService.products &&
        activeService.products.length > 0 && (
          <div
            className="fixed bg-white rounded-lg shadow-2xl min-w-[230px] max-h-[400px] overflow-y-auto z-[99999] border border-gray-100 py-1"
            style={{
              top: `${subDropdownPosition.top}px`,
              left: `${subDropdownPosition.left}px`,
            }}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseMove={handleSubMouseMove}
            onMouseLeave={handleSubMouseLeave}
          >
            {activeService.products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                aria-label={`go to ${product.slug}`}
                className="block px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700 hover:text-black text-sm whitespace-nowrap"
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        socialLinks={socialLinks || undefined}
        contactInfo={contactInfo}
      />
    </>
  );
};
