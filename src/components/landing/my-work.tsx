'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { education } from '@/lib/data';
import { Award, FileText, ImageIcon } from 'lucide-react';

const placeholders = [
    {
        title: 'Whitepaper: Scaling Operations for Enterprise',
        description: 'An in-depth analysis of methodologies for scaling near-shore operations centers.',
        icon: FileText
    },
    {
        title: 'Diagram: Post-Acquisition Integration Flow',
        description: 'Visual flowchart detailing the 90-day plan for integrating technology stacks and teams.',
        icon: FileText
    },
    {
        title: 'Screenshot: Custom Project Dashboard',
        description: 'A snapshot of a Power BI dashboard tracking KPIs for a major client project.',
        icon: ImageIcon
    }
]

export default function MyWork() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const certifications = education.filter(e => e.degree.toLowerCase().includes('certifi') || e.institution.toLowerCase() === 'google' || e.institution.toLowerCase() === 'microsoft');


  return (
    <section id="my-work" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Separator className="mb-12 bg-border/50" />
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            My Work
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A showcase of my work, including whitepapers, diagrams, screenshots, certifications, and achievements.
          </p>
        </div>

        {/* Whitepapers, Screenshots, Diagrams */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <h3 className="font-headline text-2xl font-semibold text-primary mb-8 text-center">Whitepapers, Diagrams & Screenshots</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <CardTitle className="font-headline text-xl text-primary font-bold">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Certifications Carousel */}
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
            <h3 className="font-headline text-2xl font-semibold text-primary mb-8 text-center">Certifications & Achievements</h3>
            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex items-center">
                {[...certifications, ...certifications].map((cert, index) => (
                    <div
                    className="embla__slide flex-[0_0_auto] min-w-0 px-8 py-4"
                    key={`${cert.degree}-${index}`}
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="bg-muted p-3 rounded-lg">
                                <Award className="h-6 w-6 text-accent"/>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground text-sm">{cert.degree}</p>
                                <p className="text-xs text-muted-foreground">{cert.institution}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
