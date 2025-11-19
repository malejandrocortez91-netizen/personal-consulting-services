'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { education, experience } from '@/lib/data';
import { Building, GraduationCap } from 'lucide-react';

export default function ResumeTimeline() {
  return (
    <section id="resume" className="py-12 sm:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A timeline of my experience and education.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-5xl">
          <Accordion type="single" collapsible defaultValue="item-0">
            <h3 className="mb-4 font-headline text-2xl font-semibold text-primary">Experience</h3>
            {experience.map((item, index) => (
              <AccordionItem key={item.company} value={`item-${index}`} className="border-accent/20">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex w-full items-start justify-between gap-4 text-left">
                    <div className="flex items-center gap-4">
                       <div className="bg-muted p-2 rounded-lg hidden sm:block">
                        <Building className="h-5 w-5 text-accent"/>
                       </div>
                       <div>
                         <p className="font-semibold text-primary">{item.role}</p>
                         <p className="text-sm text-muted-foreground">{item.company}</p>
                       </div>
                    </div>
                    <p className="text-sm text-muted-foreground shrink-0">{item.period}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    {item.description.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
            {education.length > 0 && (
              <>
                <h3 className="mt-12 mb-4 font-headline text-2xl font-semibold text-primary">Education</h3>
                {education.map((item, index) => (
                <AccordionItem key={`${item.institution}-${item.degree}`} value={`edu-${index}`} className="border-accent/20">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex w-full items-start justify-between gap-4 text-left">
                      <div className="flex items-center gap-4">
                          <div className="bg-muted p-2 rounded-lg hidden sm:block">
                              <GraduationCap className="h-5 w-5 text-accent"/>
                          </div>
                          <div>
                              <p className="font-semibold text-primary">{item.degree}</p>
                              <p className="text-sm text-muted-foreground">{item.institution}</p>
                          </div>
                      </div>
                      <p className="text-sm text-muted-foreground shrink-0">{item.period}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
