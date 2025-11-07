
'use server';

import { z } from 'zod';
import { google } from 'googleapis';
import { sendEmail } from '@/services/email-service';

// --- Types ---
type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  } | null;
};

// --- Google Sheets Config ---
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const GOOGLE_SHEETS_PRIVATE_KEY_BASE64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64;
const SHEET_ID = process.env.SHEET_ID;

// --- Helper Functions ---

function getGoogleAuth() {
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !SHEET_ID) {
    throw new Error('Google Sheets API credentials are not configured.');
  }
  let privateKey: string;
  if (GOOGLE_SHEETS_PRIVATE_KEY) {
    privateKey = GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n');
  } else if (GOOGLE_SHEETS_PRIVATE_KEY_BASE64) {
    privateKey = Buffer.from(GOOGLE_SHEETS_PRIVATE_KEY_BASE64, 'base64').toString('utf8');
  } else {
    throw new Error('No Google Sheets private key found.');
  }
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId: SHEET_ID };
}

async function appendToSheet(
  data: { name: string; email: string; phone?: string; message: string },
  followUpStatus: string = ''
) {
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
}

async function updateSheetCell(cell: string, value: string) {
  const { sheets, spreadsheetId } = getGoogleAuth();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!${cell}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[value]] },
  });
}

// --- Main Server Action ---

export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const contactSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('A valid email is required'),
      phone: z.string().optional(),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    });

    const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please correct the errors below.',
      };
    }

    const { name, email, phone, message } = validatedFields.data;
    let newRowIndex: number | null = null;
    let finalSheetStatus = 'Processing Error';

    const [sheetResult, ownerEmailResult, leadEmailResult] = await Promise.allSettled([
      appendToSheet({ name, email, phone, message }, 'Attempting to send emails...'),
      sendEmail({
        to: 'malejandro.cortez91@gmail.com',
        subject: `New Lead from Website: ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong> ${message}</p>`,
      }),
      sendEmail({
        to: email,
        subject: 'Thank You for Your Interest in My Services',
        text: `Dear ${name},\n\nThank you for reaching out. I have received your message and will get back to you shortly.\n\nBest regards,\nManuel Alejandro Cortez Velásquez`,
        html: `<p>Dear ${name},</p><p>Thank you for reaching out. I have received your message and will get back to you shortly.</p><p>Best regards,<br>Manuel Alejandro Cortez Velásquez</p>`,
      }),
    ]);

    if (sheetResult.status === 'fulfilled') {
      newRowIndex = sheetResult.value;
    } else {
      console.error('Critical Error: Failed to write to Google Sheet.', sheetResult.reason);
      throw new Error(`Failed to write to sheet. Reason: ${(sheetResult.reason as Error).message}`);
    }

    const errorMessages = [];
    if (leadEmailResult.status === 'rejected') errorMessages.push('Failed to send confirmation to lead.');
    if (ownerEmailResult.status === 'rejected') errorMessages.push('Failed to send notification to owner.');

    finalSheetStatus = errorMessages.length > 0 ? errorMessages.join(' ') : 'Confirmation Sent';

    if (newRowIndex) {
      await updateSheetCell(`F${newRowIndex}`, finalSheetStatus);
    }

    if (errorMessages.length > 0) {
        return { success: false, message: errorMessages.join(' '), errors: null };
    }
    
    return { success: true, message: 'Thank you for reaching out. I will get back to you shortly.', errors: null };

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return { success: false, message: error.message || 'An unexpected error occurred.', errors: null };
  }
}
