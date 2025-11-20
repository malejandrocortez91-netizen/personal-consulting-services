'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.setAttribute('data-animated', 'true');
    }
  }, []);

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

        <div
          ref={scrollerRef}
          className="scroller group relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={cn(
              "flex min-w-full shrink-0 animate-marquee items-center gap-16 py-4 [animation-duration:60s]",
              isPaused && "[animation-play-state:paused]"
            )}
          >
            {[...companies, ...companies].map((company, index) => (
              <div className="flex-shrink-0" key={`${company.name}-${index}`}>
                <Image
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  width={158}
                  height={48}
                  className="max-h-12 w-auto object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
       <style jsx>{`
        .animate-marquee {
          animation: marquee linear infinite;
        }
       `}</style>
    </section>
  );
}
