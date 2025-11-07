
// --- Types ---
interface ContactData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

interface MailAttachment {
  filename: string;
  path: string;
  contentType: string;
}

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: MailAttachment[];
}

// --- Nodemailer Email Service ---
async function sendEmail(options: MailOptions): Promise<void> {
    const nodemailer = (await import('nodemailer')).default;

    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_FROM_NAME = process.env.EMAIL_SENDER_NAME || 'Alejandro Cortez Velasquez';

    // If credentials are not set, we log to the console instead of throwing an error.
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.log('--- MOCK EMAIL SERVICE (Credentials Missing) ---');
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log(`Text: ${options.text}`);
        console.log('--- END MOCK EMAIL SERVICE ---');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
        ...options,
    });
}

export async function sendOwnerNotificationEmail(data: ContactData) {
    return sendEmail({
        to: 'malejandro.cortez91@gmail.com',
        subject: `New Lead from Website: ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nMessage: ${data.message}`,
        html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Phone:</strong> ${data.phone || 'N/A'}</p><p><strong>Message:</strong> ${data.message}</p>`,
    });
}

export async function sendConfirmationEmail(data: ContactData) {
    return sendEmail({
        to: data.email,
        subject: 'Thank You for Your Interest in My Services',
        text: `Dear ${data.name},\n\nThank you for reaching out. I have received your message and will get back to you shortly.\n\nBest regards,\nManuel Alejandro Cortez Velásquez`,
        html: `<p>Dear ${data.name},</p><p>Thank you for reaching out. I have received your message and will get back to you shortly.</p><p>Best regards,<br>Manuel Alejandro Cortez Velásquez</p>`,
    });
}


// --- Google Sheets Service ---
async function getGoogleAuth() {
    const { google } = await import('googleapis');

    const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const GOOGLE_SHEETS_PRIVATE_KEY_BASE64 = process.env.GOOGLE_SHEETS_PRIVATE_KEY_BASE64;
    const SHEET_ID = process.env.SHEET_ID;

    if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY_BASE64 || !SHEET_ID) {
        return null;
    }
    
    const privateKey = Buffer.from(GOOGLE_SHEETS_PRIVATE_KEY_BASE64, 'base64').toString('utf8');

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return { sheets, spreadsheetId: SHEET_ID };
}

export async function appendToSheet(
  data: ContactData,
  followUpStatus: string = ''
): Promise<number | null> {
    const authInfo = await getGoogleAuth();
    if (!authInfo) {
        console.log("--- MOCK GOOGLE SHEETS (Credentials Missing) ---");
        console.log("Append Data:", data);
        return 999; // Return a dummy row number
    }
    
    const { sheets, spreadsheetId } = authInfo;
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

export async function updateSheetCell(cell: string, value: string): Promise<void> {
    const authInfo = await getGoogleAuth();
     if (!authInfo) {
        console.log("--- MOCK GOOGLE SHEETS (Credentials Missing) ---");
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
