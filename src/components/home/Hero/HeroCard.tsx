"use client";

import { useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
export const HeroCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        flex flex-col justify-center items-center gap-2 px-4 py-3  md:py-4 
        rounded-2xl shadow-2xl cursor-pointer
        transition-all duration-500 ease-in-out
        border border-white/20
        ${
          isHovered
            ? "bg-secondary text-white scale-105 shadow-secondary/30"
            : "bg-white/80 backdrop-blur-md text-[#090E1B]"
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== الأيقونة ===== */}
      <div
        className={`
        
        flex items-center justify-center
        transition-all duration-500
        text-amber-400
      `}
      >
        <TiStarFullOutline className="text-lg " />
        <TiStarFullOutline className="text-lg " />
        <TiStarFullOutline className="text-lg " />
        <TiStarFullOutline className="text-lg " />
        <TiStarFullOutline className="text-lg " />
      </div>

    
      <div>
        <h1
          className={`text-xl text-center md:text-[32px] font-extrabold  ${isHovered ? "text-white" : "text-primary"}`}
        >
          +1M
        </h1>
        <p
          className={`
          text-xs md:text-lg font-medium
          transition-colors duration-500
          ${isHovered ? "text-white" : "text-[#667085]"}
        `}
        >
          Best Rated
        </p>
      </div>
    </div>
  );
};
