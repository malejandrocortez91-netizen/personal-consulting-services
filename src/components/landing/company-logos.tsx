'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { cn } from '@/lib/utils';

const companies = [
  { name: 'Amazon', logoUrl: '/logos/amazon-logo-squid-ink-smile-orange.png' },
  { name: 'Cricket Wireless', logoUrl: '/logos/Cricket_Wireless_Logo.png' },
  { name: 'Ibex Global', logoUrl: '/logos/Ibex-global-logo.png' },
  { name: 'Sago', logoUrl: '/logos/sago logo.png' },
  { name: 'Samsung', logoUrl: '/logos/Samsung_Orig_Wordmark_BLUE_RGB.jpg' },
  { name: 'CCHI', logoUrl: '/logos/CCHI-Logo-small-DOUIcFDL.png' },
  { name: 'Facebook Meta', logoUrl: '/logos/Facebook-Meta.png' },
  { name: 'Meraki', logoUrl: '/logos/Meraki_Logo_2016_transparent.svg.png' },
  { name: 'Nielsen', logoUrl: '/logos/nielsen_default_meta_image_1200x675.png' },
];

export default function CompanyLogos() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  return (
    <section id="companies" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            A Proven Track Record With Industry Leaders
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            I&apos;ve had the opportunity to learn best practices for multiple
            industries, industry leaders and partners, driving growth and
            operational excellence.
          </p>
        </div>

        <div className="embla mt-16 overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex items-center">
            {[...companies, ...companies].map((company, index) => (
              <div
                className="embla__slide flex-[0_0_auto] min-w-0 px-6"
                key={`${company.name}-${index}`}
              >
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={158}
                  height={48}
                  className={cn(
                    'object-contain w-auto max-h-12 filter grayscale transition-all duration-300 hover:grayscale-0',
                    company.name === 'Nielsen' && 'max-h-16'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
