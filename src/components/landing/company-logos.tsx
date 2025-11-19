'use client';

import Image from 'next/image';

const companies = [
  { name: 'SAGO', logoUrl: '/logos/sago-logo.svg' },
  { name: 'IBEX', logoUrl: '/logos/ibex-logo.svg' },
  { name: 'The Call Center Doctors', logoUrl: '/logos/cc-doctors-logo.svg' },
  { name: 'Addison Research', logoUrl: '/logos/addison-logo.svg' },
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
          <div className="mt-10 grid grid-cols-2 items-center justify-center gap-x-8 gap-y-10 sm:grid-cols-4">
            {companies.map((company) => (
              <div
                key={company.name}
                className="col-span-1 flex justify-center"
              >
                <img
                    className="h-12 w-auto object-contain filter grayscale transition-all duration-300 hover:grayscale-0"
                    src={company.logoUrl}
                    alt={company.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
