'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavLinks, SocialLinks } from './navlinks';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkIcon from '@/app/_components/link-icon/link-icon';

export default function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const closeMenu = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeMenu);
    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('scroll', closeMenu);
    };
  });

  const pathname = usePathname();

  return (
    <div className="sticky top-0 flex flex-row justify-between md:flex-col">
      <Link className="md:mb-10" href="/">
        <Image
          src="/logo.png"
          alt="logo"
          height="150"
          width="150"
          className="h-16 w-16 object-contain md:h-36 md:w-36"
        />
        <figcaption className="hidden text-center md:block">
          hello world!
        </figcaption>
      </Link>

      {/* mobile */}
      <Navbar
        onMenuOpenChange={setIsMobileMenuOpen}
        className="text-summer-blue w-16 rounded-xl bg-summer-green md:hidden"
        disableAnimation
        isMenuOpen={isMobileMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarMenu
          id="navMenu"
          className="z-50 h-60 bg-summer-green pt-6 text-coconut-cream"
        >
          {NavLinks.map((navLink, index) => (
            <NavbarMenuItem
              key={`${navLink}-${index}`}
              className="grid grid-cols-8"
            >
              <Link
                className={clsx(
                  'hover:text-summer-blue col-span-6 col-start-3 grid w-full grid-cols-2 items-center gap-4',
                  {
                    'text-summer-blue': pathname === navLink.href,
                  },
                )}
                href={navLink.href}
              >
                {navLink.label}

                <FontAwesomeIcon
                  icon={navLink.icon}
                  className="justify-self-center"
                />
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* desktop */}
      <div className="hidden text-coconut-cream md:block">
        <ul className="flex flex-col gap-1">
          {NavLinks.map((navLink, index) => (
            <li key={`${navLink}-${index}`}>
              <Link
                href={navLink.href}
                className={clsx(
                  'hover:text-summer-blue grid grid-cols-6 items-center font-medium',
                  {
                    'text-summer-blue': pathname === navLink.href,
                  },
                )}
              >
                {navLink.label}
                <FontAwesomeIcon
                  icon={navLink.icon}
                  className="col-start-6 justify-self-center"
                />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex justify-center gap-4">
          {SocialLinks.map((social, index) => (
            <li key={`${social.label}-${index}`}>
              <LinkIcon href={social.href} icon={social.icon} />
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <p className="fixed bottom-5">goodbye world!</p>
        </div>
      </div>
    </div>
  );
}
