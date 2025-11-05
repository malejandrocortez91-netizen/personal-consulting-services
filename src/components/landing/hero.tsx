'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section id="hero" className="relative bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
            {t('heading')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('subheading')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="#contact">{t('cta_primary')}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#services">{t('cta_secondary')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
