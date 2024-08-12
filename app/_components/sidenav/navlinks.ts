import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion, faImage } from '@fortawesome/free-regular-svg-icons';
import {
  faBandage,
  faBolt,
  faEnvelope,
  faHouseChimney,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

type NavLink = {
  label: string;
  href: string;
  icon: IconDefinition;
  isExternal?: boolean;
};

export const NavLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/',
    icon: faHouseChimney,
  },
  {
    label: 'Booking',
    href: '/booking',
    icon: faEnvelope,
  },
  {
    label: 'Flash',
    href: '/flash',
    icon: faBolt,
  },
  {
    label: 'Gallery',
    href: '/gallery',
    icon: faImage,
  },
  {
    label: 'FAQ',
    href: '/faq',
    icon: faCircleQuestion,
  },
  {
    label: 'Studio',
    href: '/studio',
    icon: faLocationDot,
  },
  {
    label: 'Aftercare',
    href: '/aftercare',
    icon: faBandage,
  },
];

export const SocialLinks: NavLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/jacquietattoos',
    icon: faInstagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@jacquietattoos',
    icon: faTiktok,
  },
];
