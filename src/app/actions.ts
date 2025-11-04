'use server';

import { z } from 'zod';
import { summarizeSkillsFromResume } from '@/ai/flows/summarize-skills-from-resume';
import { chatbotAutoResponseWithResume } from '@/ai/flows/chatbot-auto-response-with-resume';
import { sendEmail } from '@/services/email-service';

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
  resumeText: z.string().min(100, 'Resume text must be at least 100 characters.'),
});

type SummarizeFormState = {
    data: { skillsSummary: string } | null;
    error: string | null;
};

export async function summarizeResumeAction(
  prevState: SummarizeFormState,
  formData: FormData
): Promise<SummarizeFormState> {
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
    const result = await summarizeSkillsFromResume(validatedFields.data);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to summarize. Please try again.' };
  }
}

const chatbotSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
  email: z.string().email('A valid email is required.'),
});

type ChatbotFormState = {
    data: { response: string } | null;
    error: string | null;
}

export async function handleChatbotSubmission(
  prevState: ChatbotFormState,
  formData: FormData
): Promise<ChatbotFormState> {
  const validatedFields = chatbotSchema.safeParse({
    message: formData.get('message'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = errors.message?.[0] ?? errors.email?.[0] ?? 'Invalid input.';
    return { data: null, error: errorMessage };
  }

  try {
    const result = await chatbotAutoResponseWithResume(validatedFields.data);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: 'Chatbot failed to respond. Please try again.' };
  }
}
