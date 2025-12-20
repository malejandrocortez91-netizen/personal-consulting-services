
'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Separator } from '@/components/ui/separator';
import { education } from '@/lib/data';
import { Award, CheckCircle } from 'lucide-react';
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
    outcomes: [
      "Scaled team from 5 to 60 members in 18 months.",
      "Reduced operational costs by 35% through process centralization.",
      "Improved project delivery time by 25% across all global teams.",
      "Key strategic asset leading to the company's successful acquisition."
    ]
  },
  {
    id: 'rebranding-integration',
    title: 'Rebranding & Post-Acquisition Integration',
    description:
      'Led the critical post-acquisition integration of multiple global companies, unifying disparate brands, systems, and cultures under a new corporate identity. This complex transformation required meticulous change management, stakeholder communication, and the harmonization of core operational processes. The outcome was a seamless transition that preserved business continuity, retained key talent, and established a cohesive global brand presence.',
    imageIds: ['rebrand-1', 'rebrand-2'],
    outcomes: [
      "Unified 4 distinct company brands into a single global identity.",
      "Integrated 3 separate CRM systems into one, creating a single source of truth.",
      "Achieved 95% retention of key employees post-acquisition.",
      "Completed full integration 2 months ahead of schedule."
    ]
  },
  {
    id: 'retail-dashboard',
    title: 'B2C Call Center Performance Dashboard',
    description:
      'Developed and implemented a comprehensive B2C call center performance dashboard using Power BI. This tool provided real-time tracking of critical KPIs including Customer Satisfaction (CSAT), Net Promoter Score (NPS), and Average Handle Time (AHT). By visualizing performance data, we empowered team leaders to identify trends, address issues proactively, and drive significant improvements in service quality.',
    imageIds: ['retail-dash-1', 'retail-dash-2'],
    outcomes: [
      "Improved CSAT scores by 25% within 6 months.",
      "Reduced Average Handle Time (AHT) by 18% through targeted coaching.",
      "Increased agent performance transparency and accountability.",
      "Provided C-level executives with real-time visibility into customer sentiment."
    ]
  },
  {
    id: 'appointment-dashboard',
    title: 'Appointment Setter Looker Dashboard',
    description:
      'Designed a sophisticated Looker dashboard to monitor and optimize the performance of appointment-setting teams. The dashboard integrated data from multiple sources to track key metrics like call volume, connection rates, and appointments scheduled per agent. This data-driven approach enabled managers to implement targeted coaching, resulting in a dramatic increase in qualified appointments and sales pipeline value.',
    imageIds: ['appt-dash-1', 'appt-dash-2', 'appt-dash-3'],
    outcomes: [
      "Increased qualified appointments scheduled by 25%.",
      "Boosted sales pipeline value by $2.5M in the first year.",
      "Reduced agent ramp-up time by 50% with data-driven training.",
      "Improved forecast accuracy for sales leadership."
    ]
  },
  {
    id: 'quality-tools',
    title: '7 Tools of Quality Applied to Call Center',
    description:
      'Championed a quality revolution within the call center by applying the 7 Basic Tools of Quality (e.g., Pareto charts, fishbone diagrams, control charts). This systematic, data-driven methodology allowed us to diagnose the root causes of common issues like long wait times and repeat calls. The initiative resulted in a more efficient, quality-focused operational culture and a significant reduction in customer complaints.',
    imageIds: ['quality-2', 'quality-3'],
    outcomes: [
      "Reduced customer complaints by 30% in one year.",
      "Identified and eliminated root causes for 80% of repeat calls.",
      "Standardized quality control processes across all teams.",
      "Fostered a culture of continuous improvement and data-driven problem-solving."
    ]
  },
  {
    id: 'financial-dashboard',
    title: 'Financial Looker Dashboard',
    description:
      'Created a comprehensive financial dashboard in Looker for executive leadership, providing a consolidated view of the company’s fiscal health. The dashboard included detailed P&L statements, cash flow analysis, and automated expense classification. This tool replaced manual reporting processes, reduced financial closing times, and equipped the C-suite with accurate, real-time data for strategic decision-making.',
    imageIds: ['looker-finance-1', 'looker-finance-2'],
    outcomes: [
      "Reduced monthly financial closing time by 50%.",
      "Automated expense classification, saving 40+ hours per month.",
      "Provided real-time P&L and cash flow visibility to executives.",
      "Improved budget variance analysis and financial forecasting."
    ]
  },
  {
    id: 'crm-automation',
    title: 'Dialer & CRM Automations',
    description:
      'Spearheaded a major automation project to integrate the dialer system with the CRM, eliminating manual data entry and streamlining lead management workflows. Custom automations were built to handle lead assignment, status updates, and follow-up scheduling. This initiative recovered thousands of agent hours annually and and increased lead engagement rates by ensuring timely and consistent communication.',
    imageIds: ['crm-n8n-1', 'crm-n8n-2'],
    outcomes: [
      "Increased lead engagement rates by over 50%.",
      "Saved an estimated 8,000 agent hours annually through automation.",
      "Eliminated 99% of manual data entry errors between dialer and CRM.",
      "Ensured 100% of new leads received follow-up within 5 minutes."
    ]
  },
  {
    id: 'pm-platform',
    title: 'Project Management Platform Integration',
    description: 'Led the integration of a new project management platform (e.g., Asana, ClickUp) with existing company systems. This project included developing a full suite of client success KPIs and building a custom Looker Studio dashboard to track project health, team productivity, and client satisfaction metrics in real-time. The unified platform provided a single source of truth for all project-related activities and communications.',
    imageIds: ['pm-platform-1', 'pm-platform-2', 'pm-platform-3'],
    outcomes: [
      'Centralized project data, leading to a 30% reduction in reporting time.',
      'Improved on-time project delivery rate from 80% to 95%.',
      'Provided clients with transparent, real-time access to project status.',
      'Standardized client success metrics across the entire organization.',
    ],
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
        <div className="mx-auto mt-16 max-w-7xl space-y-16 sm:mt-20 lg:mt-24">
          {workItems.map((item, index) => {
             const images = getImages(item.imageIds);
             const isReversed = index % 2 !== 0;
             
             return (
                <Card key={item.id} className="relative animate-unfold border shadow-lg" style={{ animationDelay: `${index * 150}ms`}}>
                  <CardHeader className="pb-4">
                    <CardTitle className="font-headline text-2xl font-semibold text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 pt-2">
                      <div className={cn("space-y-6", isReversed ? 'lg:order-last' : '')}>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Key Metrics & Outcomes:</h4>
                          <ul className="space-y-2">
                            {item.outcomes.map(outcome => (
                               <li key={outcome} className="flex items-start gap-3">
                                 <CheckCircle className="h-5 w-5 text-accent mt-1 shrink-0" />
                                 <span className="text-muted-foreground">
                                   {outcome}
                                 </span>
                               </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {images.length > 0 && (
                        <div className={cn("relative h-96 w-full", isReversed ? 'lg:order-first' : '')}>
                            <InteractiveCarousel images={images} />
                        </div>
                      )}
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

    

    