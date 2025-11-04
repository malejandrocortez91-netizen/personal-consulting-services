import Link from 'next/link';
import { Logo } from '@/components/icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-headline text-lg font-bold text-primary">
              Consultant Canvas
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
