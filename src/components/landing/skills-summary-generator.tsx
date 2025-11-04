'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { summarizeResumeAction } from '@/app/actions';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <LoaderCircle className="animate-spin" /> : 'Summarize Skills'}
    </Button>
  );
}

export default function SkillsSummaryGenerator() {
  const [state, formAction] = useFormState(summarizeResumeAction, initialState);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Generate Skills Summary</CardTitle>
          <CardDescription>
            Paste a resume or job description below to see how AI can extract and summarize key skills.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <Textarea
              name="resumeText"
              placeholder="Paste resume text here..."
              className="min-h-[200px]"
              required
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state?.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.data && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">AI-Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{state.data.skillsSummary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
