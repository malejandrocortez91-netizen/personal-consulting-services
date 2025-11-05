'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { handleContactSubmission } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

const initialState = {
  data: null,
  error: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('Contact');
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : t('submitButton')}
    </Button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(handleContactSubmission, initialState);
  const { toast } = useToast();
  const t = useTranslations('Contact');

  useEffect(() => {
    if (state?.data) {
      toast({
        title: t('successTitle'),
        description: t('successDescription'),
      });
    }
    if (state?.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: state.error,
      });
    }
  }, [state, toast, t]);

  return (
    <section id="contact" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
            <p className="text-muted-foreground">
              {t('instructions')}
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t('cardTitle')}</CardTitle>
              <CardDescription>
                {t('cardDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('nameLabel')}</Label>
                  <Input id="name" name="name" placeholder={t('namePlaceholder')} />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('emailLabel')}</Label>
                  <Input id="email" name="email" type="email" placeholder={t('emailPlaceholder')} />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phoneLabel')}</Label>
                  <Input id="phone" name="phone" placeholder={t('phonePlaceholder')} />
                  {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('messageLabel')}</Label>
                  <Textarea id="message" name="message" placeholder={t('messagePlaceholder')} />
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
