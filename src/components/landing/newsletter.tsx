'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Newsletter() {
  return (
    <section id="newsletter" className="py-12 sm:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="relative isolate overflow-hidden bg-primary/10 px-6 py-12 text-center shadow-lg sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Subscribe to My Newsletter
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-muted-foreground">
            Stay up to date with my latest articles, projects, and insights on technology and leadership.
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-x-4">
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
              className="min-w-0 flex-auto"
            />
            <Button type="submit" className="flex-none">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
