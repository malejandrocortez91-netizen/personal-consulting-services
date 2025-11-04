'use server';

import { z } from 'zod';
import { sendEmail } from '@/services/email-service';
import { summarizeSkillsFromResume } from '@/ai/flows/summarize-skills-from-resume';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormState = {
  data: { success: boolean } | null;
  error: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
};

export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      errors: validatedFields.error.flatten().fieldErrors,
      error: 'Please correct the errors below.',
    };
  }
  
  try {
    await sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: `New Message from ${validatedFields.data.name}`,
      text: `From: ${validatedFields.data.name} <${validatedFields.data.email}>\n\n${validatedFields.data.message}`,
    });

    return { data: { success: true }, error: null, errors: null };
  } catch (error) {
    return { data: null, error: 'Failed to send message. Please try again later.', errors: null };
  }
}

const resumeSchema = z.object({
  resumeText: z.string().min(50, 'Resume text must be at least 50 characters'),
});

type SummarizeResumeState = {
  data: { skillsSummary: string } | null;
  error: string | null;
}

export async function summarizeResumeAction(
  prevState: SummarizeResumeState,
  formData: FormData
): Promise<SummarizeResumeState> {
  const validatedFields = resumeSchema.safeParse({
    resumeText: formData.get('resumeText'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.resumeText?.[0] ?? 'Invalid input.',
    };
  }

  try {
    const result = await summarizeSkillsFromResume({ resumeText: validatedFields.data.resumeText });
    return { data: result, error: null };
  } catch(e) {
    console.error(e);
    return { data: null, error: 'Failed to summarize skills. Please try again.' };
  }
}
