type NavLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

const NavLinks: NavLink[] = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Tattoos',
    href: '/tattoos',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Studio',
    href: '/studio',
  },
  {
    label: 'Aftercare',
    href: '/aftercare',
  },
  {
    label: 'Other Social Media',
    href: 'https://jacquietattoos.carrd.co/',
    isExternal: true,
  },
];

export default NavLinks;
