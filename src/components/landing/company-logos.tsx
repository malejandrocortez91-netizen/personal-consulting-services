'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const companies = [
  { name: 'Amazon', logoUrl: '/logos/amazon-logo-squid-ink-smile-orange.png' },
  { name: 'Cricket Wireless', logoUrl: '/logos/Cricket_Wireless_Logo.png' },
  { name: 'Ibex Global', logoUrl: '/logos/Ibex-global-logo.png' },
  { name: 'Sago', logoUrl: '/logos/sago logo.png' },
  { name: 'Samsung', logoUrl: '/logos/Samsung_Orig_Wordmark_BLUE_RGB.jpg'},
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
                className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 px-8"
              >
                <div className="relative flex h-24 items-center justify-center">
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={158}
                    height={48}
                    className="object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
