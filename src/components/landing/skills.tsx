import { CheckCircle } from 'lucide-react';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Core Competencies
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A diverse skill set to tackle complex challenges and deliver tangible results.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
