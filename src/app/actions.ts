'use server';

import { z } from 'zod';
import { google } from 'googleapis';
import { sendEmail } from '@/services/email-service';

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

// This function will append data to a Google Sheet.
async function appendToSheet(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SHEET_ID;
    const range = 'Sheet1!A:F'; // Assuming headers are in columns A to F

    const timestamp = new Date().toISOString();
    // Headers: Timestamp, Name, Email, Phone, Message, FollowUpStatus
    const values = [[timestamp, data.name, data.email, data.phone || 'N/A', data.message, '']];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    // In a real app, you might want to throw this error or handle it differently
    // For now, we'll log it and let the form submission succeed.
  }
}

export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('A valid email is required'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

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

  const { name, email, phone, message } = validatedFields.data;

  try {
    // 1. Send notification email to yourself
    await sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: `New Message from ${name}`,
      text: `From: ${name} <${email}>\nPhone: ${phone || 'N/A'}\n\n${message}`,
    });

    // 2. Append data to Google Sheet
    await appendToSheet({ name, email, phone, message });
    
    // The delayed email would be handled by a separate process (e.g., a Cloud Function)
    // that is triggered by the new row in the Google Sheet or a new document in Firestore.

    return { data: { success: true }, error: null, errors: null };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { data: null, error: 'Failed to process your request. Please try again later.', errors: null };
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