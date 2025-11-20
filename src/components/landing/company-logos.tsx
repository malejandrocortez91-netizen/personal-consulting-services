'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const companies = [
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
        <div className="mt-16 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex-grow-0 basis-1/4 min-w-0 px-8 flex items-center justify-center"
              >
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={158}
                  height={48}
                  className="object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
