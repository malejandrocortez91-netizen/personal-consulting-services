'use client';

import { CheckCircle } from 'lucide-react';
import { skills } from '@/lib/data';
import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations('Skills');
  return (
    <section id="skills" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {t('title')}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-8">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
