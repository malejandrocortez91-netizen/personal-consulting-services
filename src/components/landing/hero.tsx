'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative bg-background py-10 sm:py-12 scroll-mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Architecting Operational Excellence, Delivering Strategic Growth
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            An executive operations leader specializing in scaling businesses, identifying systemic weaknesses, and deploying high-efficiency AI solutions to drive strategic growth and transformation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/portfolio">My Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
