
'use server';

import { google } from 'googleapis';

// --- Google Sheets config ---
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const GOOGLE_SHEETS_PRIVATE_KEY_BASE64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64;
const SHEET_ID = process.env.SHEET_ID;

// Helper: ensures required Google auth
function getGoogleAuth() {
  // Check for email and sheet ID first
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !SHEET_ID) {
    throw new Error('Google Sheets API credentials are not configured in environment variables.');
  }

  let privateKey: string;

  // Primary method: Use the raw private key if it exists
  if (GOOGLE_SHEETS_PRIVATE_KEY) {
    privateKey = GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n');
  } 
  // Fallback method: Use the Base64 encoded key if the raw key is missing
  else if (GOOGLE_SHEETS_PRIVATE_KEY_BASE64) {
    privateKey = Buffer.from(GOOGLE_SHEETS_PRIVATE_KEY_BASE64, 'base64').toString('utf8');
  } 
  // If neither is found, throw an error
  else {
    throw new Error('No Google Sheets private key found in environment variables. Please set either GOOGLE_SHEETS_PRIVATE_KEY or GOOGLE_SHEETS_PRIVATE_KEY_BASE64.');
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
  } catch (error: any) {
    console.error('Error appending to sheet:', error);
    // Re-throw a generic but clear error for the action to handle
    // Avoid exposing detailed internal error messages like `error.message` to the client-side action.
    throw new Error('A server error occurred while writing to the sheet. Please check the server logs for details.');
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
  } catch (error: any) {
    console.error(`Error updating cell ${cell}:`, error);
    // Re-throw a generic but clear error
    throw new Error(`A server error occurred while updating cell ${cell}. Please check the server logs.`);
  }
}
