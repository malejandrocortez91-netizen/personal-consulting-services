'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export default function ProjectHighlights() {
  const t = useTranslations('Projects');
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => {
            const image = getImage(project.imageId);
            return (
              <Card key={project.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  {image && (
                    <div className="relative w-full h-48 mb-4">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => {
                      if (tag === 'Onboarding') {
                        return (
                           <Badge key={tag} variant="secondary" className="bg-white text-gray-800 hover:bg-gray-100">{tag}</Badge>
                        )
                      }
                      return (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
