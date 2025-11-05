import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/icons';
import LocaleSwitcher from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  const t = useTranslations('Header');
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4 px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-headline text-lg font-bold text-primary">
              {t('name')}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
