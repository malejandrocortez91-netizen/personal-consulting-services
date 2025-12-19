
'use client';

import Link from 'next/link';
import {
  Hexagon,
  MessageSquare,
  Briefcase,
  Server,
  Linkedin,
  Phone,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between space-x-4 px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center space-x-3">
            <Hexagon className="h-6 w-6 text-primary" />
            <span className="inline-block font-font-handwriting text-2xl font-bold text-primary">
              Alejandro Cortez Velasquez
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/alecortez91/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="tel:+18132798549" aria-label="Call">
                <Phone className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/services" aria-label="Services">
              <Server className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/portfolio" aria-label="Portfolio">
              <Briefcase className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/#contact" aria-label="Contact">
              <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
