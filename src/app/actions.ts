'use server';

import { z } from 'zod';
import { sendEmail } from '@/services/email-service';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

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

export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
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
      text: `From: ${validatedFields.data.name} <${validatedFields.data.email}>\nPhone: ${validatedFields.data.phone || 'N/A'}\n\n${validatedFields.data.message}`,
    });

    return { data: { success: true }, error: null, errors: null };
  } catch (error) {
    return { data: null, error: 'Failed to send message. Please try again later.', errors: null };
  }
}

export async function summarizeResumeAction(
  prevState: { summary: string | null; error: string | null },
  formData: FormData
): Promise<{ summary: string | null; error: string | null }> {
  // TODO: Implement the logic to summarize the resume.
  // For now, we'll just return a dummy summary.
  const jobDescription = formData.get("jobDescription");
  if (typeof jobDescription !== "string" || jobDescription.length < 10) {
    return {
      summary: null,
      error: "Job description must be at least 10 characters.",
    };
  }

  console.log("Summarizing resume for job description:", jobDescription);

  // This is where you would call your AI model to generate the summary.
  // For now, we'll just return a placeholder.
  const summary = `As a highly skilled and experienced software engineer, I am confident that I have the skills and qualifications that you are looking for. I have a proven track record of success in developing and delivering high-quality software, and I am an expert in a wide range of programming languages and technologies. I am also a highly motivated and results-oriented individual, and I am confident that I can make a significant contribution to your team.`;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ summary, error: null });
    }, 2000);
  });
}