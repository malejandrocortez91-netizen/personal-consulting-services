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

// --- Google Sheets config ---
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const SHEET_ID = process.env.SHEET_ID;

// Helper: ensures required Google auth
function getGoogleAuth() {
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY || !SHEET_ID) {
    throw new Error('Google Sheets API credentials are not configured in environment variables.');
  }
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId: SHEET_ID };
}

// Append data to Google Sheet
async function appendToSheet(
  data: { name: string; email: string; phone?: string; message: string },
  followUpStatus: string = ''
) {
  try {
    const { sheets, spreadsheetId } = getGoogleAuth();
    const range = 'Sheet1!A:F';
    const timestamp = new Date().toISOString();
    const values = [[timestamp, data.name, data.email, data.phone || 'N/A', data.message, followUpStatus]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    const updatedRange = response.data.updates?.updatedRange;
    if (updatedRange) {
      const match = updatedRange.match(/!A(\d+):/);
      if (match && match[1]) return parseInt(match[1], 10);
    }
    return null;
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    throw new Error('Failed to write to Google Sheet. Please ensure API is enabled and credentials are correct.');
  }
}

// Update a specific cell
async function updateSheetCell(cell: string, value: string) {
  try {
    const { sheets, spreadsheetId } = getGoogleAuth();
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!${cell}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[value]] },
    });
  } catch (error) {
    console.error(`Error updating cell ${cell}:`, error);
    throw new Error(`Failed to update cell ${cell} in Google Sheet.`);
  }
}

// Handle contact form submission
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
  let newRowIndex: number | null = null;

  try {
    newRowIndex = await appendToSheet({ name, email, phone, message }, 'Attempting to send email');

    // Send notification to site owner
    await sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: `New Message from ${name}`,
      text: `From: ${name} <${email}>\nPhone: ${phone || 'N/A'}\n\n${message}`,
    });

    // Try to send confirmation to the lead
    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting me',
        text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nAlejandro Cortez Velasquez`,
      });
      if (newRowIndex) await updateSheetCell(`F${newRowIndex}`, 'Sent');
    } catch (leadEmailError) {
      console.error('Failed to send email to lead:', leadEmailError);
      if (newRowIndex) await updateSheetCell(`F${newRowIndex}`, 'Failed to send');
    }

    return { data: { success: true }, error: null, errors: null };
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    const errorMessage = error.message || 'Failed to process your request. Please try again later.';
    if (newRowIndex) await updateSheetCell(`F${newRowIndex}`, 'Processing Error');
    return { data: null, error: errorMessage, errors: null };
  }
}

// Summarize resume (placeholder)
export async function summarizeResumeAction(
  prevState: { summary: string | null; error: string | null },
  formData: FormData
): Promise<{ summary: string | null; error: string | null }> {
  const jobDescription = formData.get('jobDescription');
  if (typeof jobDescription !== 'string' || jobDescription.length < 10) {
    return { summary: null, error: 'Job description must be at least 10 characters.' };
  }

  console.log('Summarizing resume for job description:', jobDescription);

  const summary = `As a highly skilled and experienced software engineer, I am confident that I have the skills and qualifications that you are looking for. I have a proven track record of success in developing and delivering high-quality software, and I am an expert in a wide range of programming languages and technologies. I am also a highly motivated and results-oriented individual, and I am confident that I can make a significant contribution to your team.`;

  return new Promise((resolve) => setTimeout(() => resolve({ summary, error: null }), 2000));
}
