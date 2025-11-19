'use client';

import Image from 'next/image';

const companies = [
  { name: 'SAGO', logoUrl: '/logos/sago-logo.svg' },
  { name: 'IBEX', logoUrl: '/logos/ibex-logo.svg' },
  { name: 'The Call Center Doctors', logoUrl: '/logos/cc-doctors-logo.svg' },
  { name: 'Foundever', logoUrl: '/logos/foundever-logo.svg' },
  { name: 'Toys R Us', logoUrl: '/logos/toys-r-us-logo.svg' },
  { name: 'Walmart', logoUrl: '/logos/walmart-logo.svg' },
  { name: 'Amazon', logoUrl: '/logos/amazon-logo.svg' },
  { name: 'Cricket Telecom', logoUrl: '/logos/cricket-telecom-logo.svg' },
  { name: 'Sprint', logoUrl: '/logos/sprint-logo.svg' },
  { name: 'AT&T', logoUrl: '/logos/att-logo.svg' },
  { name: 'Nielsen Korea', logoUrl: '/logos/nielsen-korea-logo.svg' },
  { name: 'Samsung', logoUrl: '/logos/samsung-logo.svg' },
  { name: 'Apple', logoUrl: '/logos/apple-logo.svg' },
  { name: 'Tiktok', logoUrl: '/logos/tiktok-logo.svg' },
  { name: 'Meta', logoUrl: '/logos/meta-logo.svg' },
];

export default function CompanyLogos() {
  return (
    <section id="companies" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A Proven Track Record With Industry Leaders
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            I have had the privilege of driving growth and operational excellence at these great companies.
          </p>
        </div>
        <div className="mt-16 relative w-full overflow-hidden">
          <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 w-1/5 flex justify-center items-center px-8"
              >
                <img
                  className="h-12 w-auto object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                  src={company.logoUrl}
                  alt={company.name}
                />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
