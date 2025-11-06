import nodemailer from 'nodemailer';

interface MailAttachment {
  filename: string;
  path: string;
  contentType: string;
}

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  attachments?: MailAttachment[];
}

// Securely read credentials from environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM_NAME = process.env.EMAIL_SENDER_NAME || 'Alejandro Cortez Velasquez';

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn(
    'EMAIL_USER or EMAIL_PASS environment variables are missing. Emails will be mocked in the console.'
  );
}

// Nodemailer transporter (Gmail SMTP)
const transporter =
  EMAIL_USER && EMAIL_PASS
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      })
    : null;

/**
 * Sends an email
 * @param options Mail options (to, subject, text, attachments)
 */
export async function sendEmail(options: MailOptions): Promise<void> {
  if (!transporter) {
    // Mock email if credentials are missing
    console.log('--- MOCK EMAIL SERVICE (Credentials Missing) ---');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Text: ${options.text}`);
    if (options.attachments && options.attachments.length > 0) {
      console.log('Attachments:');
      options.attachments.forEach((att) =>
        console.log(`- ${att.filename} (from ${att.path})`)
      );
    }
    console.log('--- END MOCK EMAIL SERVICE ---');
    // In a real scenario, you might want to throw an error here
    // For this app, we will just log and proceed.
    return;
  }

  // Send real email
  await transporter.sendMail({
    from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
    ...options,
  });
}
