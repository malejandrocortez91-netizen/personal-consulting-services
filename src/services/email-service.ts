// This is a mock email service. In a real application, you would use a library
// like Nodemailer and configure it with your email provider's credentials,
// likely using environment variables for security.

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

export async function sendEmail(options: MailOptions): Promise<void> {
  console.log('--- MOCK EMAIL SERVICE ---');
  console.log('Simulating email sending:');
  console.log(`  To: ${options.to}`);
  console.log(`  Subject: ${options.subject}`);
  console.log(`  Text: ${options.text}`);
  if (options.attachments && options.attachments.length > 0) {
    console.log('  Attachments:');
    options.attachments.forEach(att => console.log(`    - ${att.filename} (from ${att.path})`));
  }
  console.log('--- END MOCK EMAIL SERVICE ---');

  // In a real application, this would be implemented with a library like Nodemailer:
  /*
  import nodemailer from 'nodemailer';

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM, // Your 'from' address
    ...options
  });
  */

  // We resolve the promise to simulate a successful email send.
  return Promise.resolve();
}
