"use client";

import { SubNavbar } from "./SubNavbar";
import { Navbar } from "./Navbar";
import { SocialLinks } from "@/src/services/contactApi";

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface HeaderProps {
  socialLinks?: SocialLinks | null;
  contactInfo?: ContactInfo;
}

export const Header = ({ socialLinks, contactInfo }: HeaderProps) => {
  return (
    <header className="relative z-50">
      <SubNavbar socialLinks={socialLinks} />
      <Navbar socialLinks={socialLinks} contactInfo={contactInfo} />
    </header>
  );
};