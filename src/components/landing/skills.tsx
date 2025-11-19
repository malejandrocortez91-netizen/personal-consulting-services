'use client';

import { CheckCircle } from 'lucide-react';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div>
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Core Competencies
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                A diverse skill set to tackle complex challenges and deliver tangible results.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-8">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6" />
                    </div>
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
