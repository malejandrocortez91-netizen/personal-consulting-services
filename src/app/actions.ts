'use server';

import { google } from 'googleapis';
import { z } from 'zod';
import { sendEmail } from '@/services/email-service';

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
      private_key: (GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId: SHEET_ID };
}

// Append data to Google Sheet
export async function appendToSheet(
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
export async function updateSheetCell(cell: string, value: string) {
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
