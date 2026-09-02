'use client';

import { SubNavbar } from './SubNavbar';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header >
      <SubNavbar />
      <Navbar />
    </header>
  );
};