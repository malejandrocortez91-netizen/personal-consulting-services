'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const companies = [
  { name: 'Foundever', logoUrl: '/logos/foundever-logo.svg' },
  { name: 'Toys R Us', logoUrl: '/logos/toys-r-us-logo.svg' },
  { name: 'Walmart', logoUrl: '/logos/walmart-logo.svg' },
  { name: 'Amazon', logoUrl: '/logos/amazon-logo.svg' },
  { name: 'Cricket Telecom', logoUrl: '/logos/cricket-telecom-logo.svg' },
];

export default function CompanyLogos() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    Autoplay({ playOnInit: true, delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section id="companies" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A Proven Track Record With Industry Leaders
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            I've had the opportunity to learn best practices for multiple industries, industry leaders and partners, driving growth and operational excellence.
          </p>
        </div>
        <div className="mt-16 relative w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="relative flex-[0_0_20%] min-w-0 flex justify-center items-center px-8"
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
