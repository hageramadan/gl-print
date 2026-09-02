"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/hooks/useLanguage";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export const About = () => {
  const { t, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* ===== الجالري (الجهة اليسرى) ===== */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto lg:mx-0">
              
              {/* ===== الصورة الكبيرة (الخلفية) ===== */}
              <div
                className={`
                  hidden md:block absolute rounded-xl overflow-hidden shadow-2xl
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                `}
                style={{
                  width: "346px",
                  height: "458px",
                  top: "77px",
                  left: "253px",
                  borderRadius: "10.97px",
                  zIndex: 1,
                  transitionDelay: "0.1s",
                }}
              >
                <Image
                  src="/images/about/ab1.png"
                  alt="About GL Print"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== الصورة الوسطى (يمين - أعلى) ===== */}
              <div
                className={`
                  hidden md:block absolute rounded-lg overflow-hidden shadow-xl z-20
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-95'}
                `}
                style={{
                  width: "200px",
                  height: "211px",
                  top: "36px",
                  left: "154px",
                  borderRadius: "5.48px",
                  transitionDelay: "0.3s",
                }}
              >
                <Image
                  src="/images/about/ab2.png"
                  alt="About GL Print 2"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== الصورة الصغيرة (يسار - أسفل) ===== */}
              <div
                className={`
                  hidden md:block absolute rounded-lg overflow-hidden shadow-xl z-30
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}
                `}
                style={{
                  width: "224px",
                  height: "247px",
                  top: "191px",
                  left: "0px",
                  borderRadius: "5.48px",
                  transitionDelay: "0.5s",
                }}
              >
                <Image
                  src="/images/about/ab3.png"
                  alt="About GL Print 3"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* ===== صورة الموبايل ===== */}
              <div
                className={`
                  md:hidden relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
              >
                <Image
                  src="/images/about/ab1.png"
                  alt="About GL Print"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ===== عناصر زخرفية متحركة ===== */}
              <div
                className={`
                  absolute -z-10 rounded-full bg-secondary/10 hidden md:block
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                style={{
                  width: "120px",
                  height: "120px",
                  bottom: "-20px",
                  right: "-20px",
                  transitionDelay: "0.7s",
                }}
              />
              <div
                className={`
                  absolute -z-10 rounded-full bg-primary/5 hidden md:block
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}
                style={{
                  width: "80px",
                  height: "80px",
                  top: "-10px",
                  left: "100px",
                  transitionDelay: "0.9s",
                }}
              />

              {/* ===== إطار زخرفي متحرك ===== */}
              <div
                className={`
                  absolute -z-5 border-2 border-secondary/20 rounded-2xl hidden md:block
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'}
                `}
                style={{
                  width: "380px",
                  height: "490px",
                  top: "60px",
                  left: "30px",
                  borderRadius: "16px",
                  transitionDelay: "0.2s",
                }}
              />
            </div>
          </div>

          {/* ===== المحتوى (الجهة اليمنى) ===== */}
          <div className="w-full lg:w-1/2" dir={dir}>
            <div className="max-w-xl mx-auto lg:mx-0">
              {/* ===== عنوان القسم ===== */}
              <div
                className={`
                  mb-6 transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-secondary"></div>
                  <span className="text-xs md:text-sm lg:text-base text-secondary uppercase tracking-wider font-bold">
                    About GL Print
                  </span>
                </div>
              </div>

              {/* ===== الوصف - النص الكبير ===== */}
              <p
                className={`
                  text-xl md:text-2xl lg:text-[32px] text-primary font-extrabold mb-4 leading-relaxed
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.4s" }}
              >
                GL Print delivers precision, consistency, and professional
                craftsmanship.
              </p>

              {/* ===== الوصف - النص الطويل ===== */}
              <p
                className={`
                  text-sm md:text-base lg:text-lg text-[#667085] font-medium md:font-semibold leading-relaxed mb-8
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                `}
                style={{ transitionDelay: "0.6s" }}
              >
                GL Print (Cairo, Egypt) offers full-service design, printing,
                and outdoor advertising solutions, using advanced technologies
                to deliver high-quality prints that help businesses stand out
                and succeed.
              </p>

              {/* ===== زر Get a Quote ===== */}
              <Link
                href="/quote"
                className={`
                  w-fit text-sm md:text-[14.5px] font-bold flex items-center gap-2 
                  bg-secondary hover:bg-secondary-dark text-white 
                  px-8 md:px-10 lg:px-12 py-3 md:py-3.5 lg:py-4 
                  rounded-2xl shadow-lg shadow-red-200 
                  transition-all duration-500 hover:-translate-y-1 hover:shadow-xl
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: "0.8s" }}
              >
                <span>Get a Quote</span>
                <FaArrowRight className="ml-1 md:ml-2 text-white text-xs md:text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};