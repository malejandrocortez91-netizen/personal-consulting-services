import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cog, Zap, Target, BrainCircuit, Users, Shuffle } from 'lucide-react';

const serviceIcons = {
  scaling: { icon: Zap, title: 'Operational Scaling', description: 'Designing and implementing scalable systems and processes to support rapid growth and peak performance.' },
  optimization: { icon: Cog, title: 'Process Optimization', description: 'Analyzing and re-engineering workflows to eliminate bottlenecks, reduce costs, and increase efficiency.' },
  execution: { icon: Target, title: 'Strategic Execution', description: 'Translating high-level strategy into actionable plans and leading teams to deliver on key business objectives.' },
  automation: { icon: BrainCircuit, title: 'AI-Powered Automation', description: 'Leveraging AI and automation to streamline complex operations, reduce manual effort, and unlock exponential efficiency gains.' },
  leadership: { icon: Users, title: 'Executive Leadership', description: 'Building, mentoring, and leading high-performing teams that are aligned with strategic goals and drive cultural excellence.' },
  transformation: { icon: Shuffle, title: 'High-Impact Transformation', description: 'Leading critical business turnarounds, post-merger integrations, and high-stakes initiatives that redefine market position.' },
};

type ServiceKey = keyof typeof serviceIcons;

export default function Services() {
  const serviceKeys: ServiceKey[] = Object.keys(serviceIcons) as ServiceKey[];
  
  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            My Expertise
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Driving growth and efficiency by building high-performance operational frameworks.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((key) => {
              const { icon: Icon, title, description } = serviceIcons[key];
              return (
                <Card key={key} className="hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <CardTitle className="font-headline text-xl text-primary">{title}</CardTitle>
                    </div>
                    <CardDescription className="pt-4">{description}</CardDescription>
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
