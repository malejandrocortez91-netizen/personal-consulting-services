import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'es'] as const;
 
export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: {},
  });