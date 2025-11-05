import {
    createLocalizedPathnamesNavigation,
    Pathnames
  } from 'next-intl/navigation';
   
  export const locales = ['en', 'es'] as const;
  
  // The `pathnames` object holds pairs of internal
  // and external paths, separated by locale.
  export const pathnames = {
    // If all locales use the same path, use
    // the catch-all `/.
    '/': '/',
  } satisfies Pathnames<typeof locales>;
   
  export const {Link, redirect, usePathname, useRouter} =
    createLocalizedPathnamesNavigation({
      locales,
      pathnames,
    });