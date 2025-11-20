'use client';

import React from 'react';
import Image from 'next/image';

const companies = [
  { name: 'Amazon', logoUrl: '/logos/amazon-logo-squid-ink-smile-orange.png' },
  { name: 'Cricket Wireless', logoUrl: '/logos/Cricket_Wireless_Logo.png' },
  { name: 'Ibex Global', logoUrl: '/logos/Ibex-global-logo.png' },
  { name: 'Sago', logoUrl: '/logos/sago logo.png' },
  { name: 'Samsung', logoUrl: '/logos/Samsung_Orig_Wordmark_BLUE_RGB.jpg' },
];

export default function CompanyLogos() {
  const duplicatedCompanies = [...companies, ...companies];

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
        
        <div className="mt-16 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee-slow">
            {duplicatedCompanies.map((company, index) => (
              <li key={`${company.name}-${index}`}>
                <div className="relative flex h-24 items-center justify-center w-[160px]">
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={158}
                    height={48}
                    className="object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}