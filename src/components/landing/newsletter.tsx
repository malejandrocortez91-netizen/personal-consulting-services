
'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { handleNewsletterSubmission } from '@/app/actions/newsletter';
import { LoaderCircle } from 'lucide-react';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="flex-none" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="animate-spin mr-2" />
          Subscribing...
        </>
      ) : (
        'Subscribe'
      )}
    </Button>
  );
}

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    handleNewsletterSubmission,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="newsletter" className="py-8 sm:py-12 bg-card">
      <div className="container mx-auto px-4">
        <div className="relative isolate overflow-hidden bg-primary/10 px-6 py-8 text-center shadow-lg sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Subscribe to My Newsletter
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-muted-foreground">
            Stay up to date with my latest articles, projects, and insights on
            technology and leadership.
          </p>
          <form
            ref={formRef}
            action={formAction}
            className="mx-auto mt-6 flex max-w-md gap-x-4"
          >
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
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
