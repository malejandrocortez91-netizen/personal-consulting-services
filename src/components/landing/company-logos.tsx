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
  { name: 'Samsung', logoUrl: '/logos/Samsung_Orig_Wordmark_BLUE_RGB.jpg' },
  { name: 'CCHI', logoUrl: '/logos/CCHI-Logo-small-DOUIcFDL.png' },
  { name: 'Facebook Meta', logoUrl: '/logos/Facebook-Meta.png' },
  { name: 'Meraki', logoUrl: '/logos/Meraki_Logo_2016_transparent.svg.png' },
  { name: 'Nielsen', logoUrl: '/logos/nielsen_default_meta_image_1200x675.png' },
];

export default function CompanyLogos() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay({ delay: 1500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

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

        <div className="embla mt-16" ref={emblaRef}>
          <div className="embla__container">
            {[...companies, ...companies].map((company, index) => (
              <div className="embla__slide" key={`${company.name}-${index}`}>
                <div className="relative mx-4 flex h-24 items-center justify-center">
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
       <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          flex: 0 0 auto;
          min-width: 0;
          position: relative;
          width: auto;
        }
      `}</style>
    </section>
  );
}
