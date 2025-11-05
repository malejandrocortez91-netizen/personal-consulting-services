'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Logo } from '@/components/icons';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-headline text-lg font-bold text-primary">
              Alejandro Cortez
            </span>
          </Link>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
