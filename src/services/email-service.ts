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

// Ensure the environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('EMAIL_USER or EMAIL_PASS environment variables are not set. Email service will be mocked.');
}

const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

export async function sendEmail(options: MailOptions): Promise<void> {
  // If the transporter isn't configured, fall back to the mock service
  if (!transporter) {
    console.log('--- MOCK EMAIL SERVICE ---');
    console.log('Simulating email sending because real credentials are not set:');
    console.log(`  To: ${options.to}`);
    console.log(`  Subject: ${options.subject}`);
    console.log(`  Text: ${options.text}`);
    if (options.attachments && options.attachments.length > 0) {
      console.log('  Attachments:');
      options.attachments.forEach(att => console.log(`    - ${att.filename} (from ${att.path})`));
    }
    console.log('--- END MOCK EMAIL SERVICE ---');
    return Promise.resolve();
  }

  // Send a real email
  await transporter.sendMail({
    from: `"Alejandro Cortez Velasquez" <${process.env.EMAIL_USER}>`,
    ...options
  });
}