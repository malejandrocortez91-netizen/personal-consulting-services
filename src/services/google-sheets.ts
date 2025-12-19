
'use server';

import { google } from 'googleapis';

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function getGoogleAuth() {
  const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const SHEET_ID = process.env.SHEET_ID;

  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY || !SHEET_ID) {
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId: SHEET_ID };
}

export async function appendToSheet(
  data: Partial<ContactData>,
  followUpStatus: string = ''
): Promise<number | null> {
  const authInfo = await getGoogleAuth();
  if (!authInfo) {
    console.log('--- MOCK GOOGLE SHEETS (Credentials Missing) ---');
    console.log('Append Data:', data);
    return 999; // Return a dummy row number
  }

  const { sheets, spreadsheetId } = authInfo;
  const range = 'Sheet1!A:F';
  
  const now = new Date();
  const estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  const month = pad(estDate.getMonth() + 1);
  const day = pad(estDate.getDate());
  const year = estDate.getFullYear();
  const hours = pad(estDate.getHours());
  const minutes = pad(estDate.getMinutes());
  const seconds = pad(estDate.getSeconds());

  const timestamp = `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;

  const values = [
    [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || 'N/A',
      data.message || '',
      followUpStatus,
    ],
  ];

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

export async function updateSheetCell(
  cell: string,
  value: string
): Promise<void> {
  const authInfo = await getGoogleAuth();
  if (!authInfo) {
    console.log('--- MOCK GOOGLE SHEETS (Credentials Missing) ---');
    console.log(`Update Cell ${cell} to:`, value);
    return;
  }

  const { sheets, spreadsheetId } = authInfo;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!${cell}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[value]] },
  });
}
