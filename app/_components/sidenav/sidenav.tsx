'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './navlinks';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

export default function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between md:flex-col">
      <Link className="md:mb-10" href="/home">
        <Image
          src="/logo.jpg"
          alt="logo"
          height="150"
          width="150"
          className="h-16 w-16 object-contain md:h-36 md:w-36"
        />
      </Link>

      <Navbar onMenuOpenChange={setIsMobileMenuOpen} className="w-16 md:hidden">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarMenu className="text-center">
          {NavLinks.map((navLink, index) => (
            <NavbarMenuItem key={`${navLink}-${index}`}>
              <Link
                className={clsx('w-full hover:text-orange-600', {
                  'text-orange-600': pathname === navLink.href,
                })}
                href={navLink.href}
              >
                {navLink.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="hidden gap-2 md:flex md:flex-col">
        {NavLinks.map((navLink, index) => (
          <Link
            key={`${navLink}-${index}`}
            href={navLink.href}
            className={clsx('font-medium hover:text-orange-600', {
              'text-orange-600': pathname === navLink.href,
            })}
          >
            {navLink.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
