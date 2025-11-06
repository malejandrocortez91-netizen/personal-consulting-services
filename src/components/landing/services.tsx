'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cog, Zap, Target, BrainCircuit, Users, Shuffle } from 'lucide-react';
import { services } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

const serviceIcons = {
  scaling: { icon: Zap, title: 'Global Operational Scaling' },
  optimization: { icon: Cog, title: 'Enterprise Process Optimization' },
  execution: { icon: Target, title: 'Strategic Execution & Delivery' },
  automation: { icon: BrainCircuit, title: 'AI-Powered Transformation' },
  leadership: { icon: Users, title: 'Executive Leadership & Team Building' },
  transformation: { icon: Shuffle, title: 'High-Impact Business Transformation' },
};

type ServiceKey = keyof typeof serviceIcons;

export default function Services() {
  
  return (
    <section id="services" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Separator className="mb-12 bg-border/50" />
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Areas of Executive Expertise
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Driving enterprise-wide growth and efficiency by building high-performance operational frameworks.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const { icon: Icon, title } = serviceIcons[service.key as ServiceKey];
              return (
                <Card key={service.key} className="hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <CardTitle className="font-headline text-xl text-primary font-bold">{title}</CardTitle>
                    </div>
                    <CardDescription className="pt-4">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
