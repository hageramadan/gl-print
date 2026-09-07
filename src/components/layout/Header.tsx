"use client";

import { SubNavbar } from "./SubNavbar";
import { Navbar } from "./Navbar";

interface SocialLinks {
  whatsapp: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  tik_tok: string;
}

interface HeaderProps {
  socialLinks?: SocialLinks | null;
}

export const Header = ({ socialLinks }: HeaderProps) => {
  return (
    <header className="relative z-50">
      <SubNavbar socialLinks={socialLinks} />
      <Navbar socialLinks={socialLinks} />
    </header>
  );
};