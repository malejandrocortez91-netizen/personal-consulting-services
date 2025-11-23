
'use server';

import nodemailer from 'nodemailer';

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

async function sendEmail(options: MailOptions): Promise<void> {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_FROM_NAME =
    process.env.EMAIL_SENDER_NAME || 'Alejandro Cortez Velasquez';

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('--- MOCK EMAIL SERVICE (Credentials Missing) ---');
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
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
