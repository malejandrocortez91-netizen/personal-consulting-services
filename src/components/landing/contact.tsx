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
      {pending ? <><LoaderCircle className="animate-spin mr-2" />{t('submit_button_pending')}</> : t('submit_button')}
    </Button>
  );
}

export default function Contact() {
  const t = useTranslations('Contact');
  const [state, formAction] = useActionState(handleContactSubmission, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.data) {
      toast({
        title: t('toast_success_title'),
        description: t('toast_success_description'),
      });
    }
    if (state?.error && !state.errors) {
      toast({
        variant: 'destructive',
        title: t('toast_error_title'),
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
              {t('description')}
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t('form_title')}</CardTitle>
              <CardDescription>
                {t('form_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name_label')}</Label>
                  <Input id="name" name="name" placeholder={t('name_placeholder')} />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email_label')}</Label>
                  <Input id="email" name="email" type="email" placeholder={t('email_placeholder')} />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone_label')}</Label>
                  <Input id="phone" name="phone" placeholder={t('phone_placeholder')} />
                  {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('message_label')}</Label>
                  <Textarea id="message" name="message" placeholder={t('message_placeholder')} />
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
