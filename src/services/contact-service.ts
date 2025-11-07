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
  const EMAIL_FROM_NAME =
    process.env.EMAIL_SENDER_NAME || 'Alejandro Cortez Velasquez';

  // If credentials are not set, we log to the console instead of throwing an error.
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('--- MOCK EMAIL SERVICE (Credentials Missing) ---');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Text: ${options.text}`);
    if (options.attachments) {
      console.log(
        'Attachments:',
        options.attachments.map((a) => a.filename).join(', ')
      );
    }
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
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${
      data.phone || 'N/A'
    }\nMessage: ${data.message}`,
    html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${
      data.email
    }</p><p><strong>Phone:</strong> ${
      data.phone || 'N/A'
    }</p><p><strong>Message:</strong> ${data.message}</p>`,
  });
}

export async function sendConfirmationEmail(data: ContactData) {
  const firstName = data.name.split(' ')[0];

  const textContent = `
Dear ${firstName},

Thank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.

I am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.

In the meantime, feel free to connect with me on LinkedIn or explore the project highlights on my website.

Best regards,

Manuel Alejandro Cortez Velásquez
Alternate: ing.cortez.vlz@gmail.com
Mobile & Whatsapp: +505 5731 3554
LinkedIn: https://www.linkedin.com/in/alecortez91/
    `.trim();

  const htmlContent = `
<p>Dear ${firstName},</p>
<p>Thank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.</p>
<p>I am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.</p>
<p>In the meantime, feel free to connect with me on <a href="https://www.linkedin.com/in/alecortez91/">LinkedIn</a> or explore the project highlights on my website.</p>
<p>Best regards,</p>
<p>
    <strong>Manuel Alejandro Cortez Velásquez</strong><br>
    Alternate: ing.cortez.vlz@gmail.com<br>
    Mobile & Whatsapp: +505 5731 3554<br>
    LinkedIn: <a href="https://www.linkedin.com/in/alecortez91/">https://www.linkedin.com/in/alecortez91/</a>
</p>
    `.trim();

  return sendEmail({
    to: data.email,
    subject: 'Thank You for Your Interest in My Services',
    text: textContent,
    html: htmlContent,
  });
}

// --- Google Sheets Service ---
async function getGoogleAuth() {
  const { google } = await import('googleapis');

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
