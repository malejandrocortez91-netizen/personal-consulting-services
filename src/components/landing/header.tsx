'use client';

import Link from 'next/link';
import { Hexagon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4 px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <Hexagon className="h-6 w-6 text-primary" />
            <span className="inline-block font-font-handwriting text-2xl font-bold text-primary">
              Alejandro Cortez Velasquez
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
