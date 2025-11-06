'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { handleContactSubmission } from '@/app/contact-action';

type ContactFormState = {
  data: { success: boolean } | null;
  error: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  } | null;
};

const initialState: ContactFormState = {
  data: null,
  error: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><LoaderCircle className="animate-spin mr-2" />Sending...</> : 'Send Message'}
    </Button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(handleContactSubmission, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.data?.success) {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I will get back to you shortly.',
      });
    }
    if (state?.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <Separator className="mb-12 bg-border/50" />
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground">
              Have a project in mind or want to learn more about my services? I'm here to answer your questions.
            </p>
            <p className="text-muted-foreground">
              Fill out the form, and I'll get back to you as soon as possible.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>
                Please provide your details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" placeholder="(555) 555-5555" />
                  {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message..." />
                  {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
