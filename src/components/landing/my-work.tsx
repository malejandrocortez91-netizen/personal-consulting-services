'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Separator } from '@/components/ui/separator';
import { education } from '@/lib/data';
import { Award } from 'lucide-react';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCarousel } from '@/components/ui/interactive-carousel';

const workItems = [
  {
    id: 'center-of-excellence',
    title: 'New Center of Excellence Buildout',
    description:
      'Architected and deployed a global center of excellence from the ground up, scaling from an initial team of 5 to a fully operational 60-person hub. This initiative involved comprehensive operational planning, talent acquisition, and infrastructure setup, creating a high-performance engine for global market research and project management functions. The center became a cornerstone of the company’s operational strategy, leading to its successful acquisition by SAGO.',
    imageIds: ['coe-1', 'coe-2', 'coe-3'],
  },
  {
    id: 'rebranding-integration',
    title: 'Rebranding & Post-Acquisition Integration',
    description:
      'Led the critical post-acquisition integration of multiple global companies, unifying disparate brands, systems, and cultures under a new corporate identity. This complex transformation required meticulous change management, stakeholder communication, and the harmonization of core operational processes. The outcome was a seamless transition that preserved business continuity, retained key talent, and established a cohesive global brand presence.',
    imageIds: ['rebrand-1', 'rebrand-2'],
  },
  {
    id: 'csat-dashboard',
    title: 'Call Center Performance Dashboard (B2C)',
    description:
      'Developed and implemented a comprehensive B2C call center performance dashboard using Power BI. This tool provided real-time tracking of critical KPIs including Customer Satisfaction (CSAT), Net Promoter Score (NPS), and Average Handle Time (AHT). By visualizing performance data, we empowered team leaders to identify trends, address issues proactively, and drive a 25% improvement in overall customer satisfaction scores.',
    imageIds: ['csat-1', 'csat-2', 'csat-3'],
  },
  {
    id: 'appointment-dashboard',
    title: 'Appointment Setter Looker Dashboard',
    description:
      'Designed a sophisticated Looker dashboard to monitor and optimize the performance of appointment-setting teams. The dashboard integrated data from multiple sources to track key metrics like call volume, connection rates, and appointments scheduled per agent. This data-driven approach enabled managers to implement targeted coaching, resulting in a 40% increase in qualified appointments and a significant boost in sales pipeline value.',
    imageIds: ['looker-appt-1', 'looker-appt-2'],
  },
  {
    id: 'quality-tools',
    title: '7 Tools of Quality Applied to Call Center',
    description:
      'Championed a quality revolution within the call center by applying the 7 Basic Tools of Quality (e.g., Pareto charts, fishbone diagrams, control charts). This systematic, data-driven methodology allowed us to diagnose the root causes of common issues like long wait times and repeat calls. The initiative resulted in a 30% reduction in customer complaints and a more efficient, quality-focused operational culture.',
    imageIds: ['quality-1', 'quality-2', 'quality-3'],
  },
  {
    id: 'financial-dashboard',
    title: 'Financial Looker Dashboard',
    description:
      'Created a comprehensive financial dashboard in Looker for executive leadership, providing a consolidated view of the company’s fiscal health. The dashboard included detailed P&L statements, cash flow analysis, and automated expense classification. This tool replaced manual reporting processes, reduced financial closing times by 50%, and equipped the C-suite with accurate, real-time data for strategic decision-making.',
    imageIds: ['looker-finance-1', 'looker-finance-2'],
  },
  {
    id: 'crm-automation',
    title: 'Dialer & CRM Automations',
    description:
      'Spearheaded a major automation project to integrate the dialer system with the CRM, eliminating manual data entry and streamlining lead management workflows. Custom automations were built to handle lead assignment, status updates, and follow-up scheduling. This initiative recovered thousands of agent hours annually and increased lead engagement rates by over 50% by ensuring timely and consistent communication.',
    imageIds: ['crm-1', 'crm-2'],
  },
];

export default function MyWork() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const certifications = education.filter(
    (e) =>
      e.degree.toLowerCase().includes('certifi') ||
      e.institution.toLowerCase() === 'google' ||
      e.institution.toLowerCase() === 'microsoft'
  );

  const getImages = (ids: string[]): ImagePlaceholder[] =>
    ids.map(id => PlaceHolderImages.find(img => img.id === id)).filter((img): img is ImagePlaceholder => !!img);


  return (
    <section id="my-work" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Separator className="mb-12 bg-border/50" />
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            My Work
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A showcase of strategic frameworks, operational dashboards, and impactful automations.
          </p>
        </div>

        {/* Dynamic Work Items Section */}
        <div className="mx-auto mt-16 max-w-7xl space-y-24 sm:mt-20 lg:mt-24">
          {workItems.map((item, index) => {
             const images = getImages(item.imageIds);
             const isReversed = index % 2 !== 0;
             return (
                <Card key={item.id} className="relative animate-unfold border shadow-lg" style={{ animationDelay: `${index * 150}ms`}}>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl font-semibold text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className={cn("space-y-6", isReversed && "lg:order-last")}>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                        {images.length > 0 && (
                          <div className={cn("relative h-80 w-full", isReversed && "lg:order-first")}>
                              <InteractiveCarousel images={images} />
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
             );
          })}
        </div>


        {/* Certifications Carousel */}
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24">
          <h3 className="font-headline text-2xl font-semibold text-primary mb-8 text-center">
            Certifications & Achievements
          </h3>
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex items-center">
              {[...certifications, ...certifications].map((cert, index) => (
                <div
                  className="embla__slide flex-[0_0_auto] min-w-0 px-8 py-4"
                  key={`${cert.degree}-${index}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="bg-muted p-3 rounded-lg">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {cert.degree}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cert.institution}
                      </p>
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
