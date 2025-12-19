
'use client';

import Link from 'next/link';
import { Hexagon, Linkedin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/" className="flex items-center space-x-3">
            <Hexagon className="h-6 w-6 text-primary" />
            <span className="inline-block font-font-handwriting text-2xl font-bold text-primary">
              Alejandro Cortez Velasquez
            </span>
          </Link>
          <div className="flex items-center gap-2">
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
        <p className="text-center text-sm leading-loose text-muted-foreground sm:text-left">
          © {currentYear} Alejandro Cortez Velasquez. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
