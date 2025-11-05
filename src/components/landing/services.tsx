import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { Cog, Zap, Target, BrainCircuit, Users, Shuffle } from 'lucide-react';

const serviceIcons = {
  scaling: Zap,
  optimization: Cog,
  execution: Target,
  automation: BrainCircuit,
  leadership: Users,
  transformation: Shuffle,
};

type ServiceKey = keyof typeof serviceIcons;

export default function Services() {
  const t = useTranslations('Services');
  const serviceKeys: ServiceKey[] = Object.keys(serviceIcons) as ServiceKey[];
  
  return (
    <section id="services" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <Card key={key} className="hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <CardTitle className="font-headline text-xl text-primary">{t(`items.${key}.title`)}</CardTitle>
                    </div>
                    <CardDescription className="pt-4">{t(`items.${key}.description`)}</CardDescription>
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
