'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Separator } from '@/components/ui/separator';
import { education } from '@/lib/data';
import { Award, CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';


const workItems = [
  {
    title: 'Post-Acquisition Integration Workflow',
    description:
      'Following a major acquisition, I designed and led the 90-day integration plan to unify technology stacks, operational teams, and cultural practices. This visual workflow was the master document that aligned all stakeholders—from C-suite executives to frontline managers—on key milestones, dependencies, and success metrics.',
    deliverables: [
      'Reduced system redundancy by 40% within the first 6 months.',
      'Achieved a 95% employee retention rate in key acquired teams.',
      'Unified disparate CRM and ERP systems into a single source of truth.',
    ],
    imageId: 'work-diagram',
  },
  {
    title: 'AI-Powered Process Optimization Dashboard',
    description:
      'To address rising operational costs and manual inefficiencies, I spearheaded an initiative to implement an AI-driven process optimization framework. This dashboard, built in Power BI, provided real-time visibility into key performance indicators, identifying bottlenecks and opportunities for automation. The system integrated with existing tools to learn and suggest improvements over time.',
    deliverables: [
      'Automated over 20,000 manual hours of data entry annually.',
      'Increased processing throughput by 35% in the first quarter.',
      'Provided predictive insights that led to a 15% reduction in error rates.',
    ],
    imageId: 'work-dashboard',
  },
    {
    title: 'Startup Scaling & Go-to-Market Framework',
    description:
      'Working with an early-stage startup, I developed a comprehensive framework that guided them from 5 to 60 employees and ultimately to a successful acquisition. This model defined the core operational pillars—HR, finance, product, and sales—and established the scalable processes needed to support rapid growth while maintaining a lean structure and clear go-to-market strategy.',
    deliverables: [
      'Secured a successful exit through acquisition by a major industry player.',
      'Established a data-driven culture with clear KPIs for each department.',
      'Built a repeatable sales process that increased lead-to-close ratio by 50%.',
    ],
    imageId: 'work-framework',
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

  const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);


  return (
    <section id="my-work" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Separator className="mb-12 bg-border/50" />
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            My Work
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A showcase of my work, including strategic frameworks, operational dashboards, certifications, and achievements.
          </p>
        </div>

        {/* Dynamic Work Items Section */}
        <div className="mx-auto mt-16 max-w-7xl space-y-16 sm:mt-20 lg:mt-24">
          {workItems.map((item, index) => {
             const image = getImage(item.imageId);
             const isReversed = index % 2 !== 0;
             return (
                <div key={item.title} className="relative animate-unfold" style={{ animationDelay: `${index * 150}ms`}}>
                   <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                      <div className={cn("space-y-6", isReversed && "lg:order-last")}>
                         <h3 className="font-headline text-2xl font-semibold text-primary">{item.title}</h3>
                         <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                         <div>
                            <h4 className="font-semibold mb-3 text-foreground">
                               Key Outcomes:
                            </h4>
                            <ul className="space-y-2">
                               {item.deliverables.map((deliverable) => (
                                  <li key={deliverable} className="flex items-start gap-3">
                                     <CheckCircle className="h-5 w-5 text-accent mt-1 shrink-0" />
                                     <span className="text-muted-foreground">{deliverable}</span>
                                  </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                      {image && (
                         <div className={cn("relative h-80 w-full rounded-lg shadow-xl", isReversed && "lg:order-first")}>
                            <Image
                               src={image.imageUrl}
                               alt={image.description}
                               fill
                               sizes="(max-width: 1024px) 100vw, 50vw"
                               className="object-cover rounded-lg"
                               data-ai-hint={image.imageHint}
                            />
                         </div>
                      )}
                   </div>
                </div>
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
