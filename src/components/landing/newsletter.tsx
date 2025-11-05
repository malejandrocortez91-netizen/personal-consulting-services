'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Newsletter() {
  return (
    <section id="newsletter" className="py-16 sm:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Subscribe to My Newsletter
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Stay up to date with my latest articles, projects, and insights on technology and leadership.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <form className="flex gap-x-4">
            <Label htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
