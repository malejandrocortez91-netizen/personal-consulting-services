
'use server';

import { z } from 'zod';
import { appendToSheet, updateSheetCell } from './actions';
import { sendEmail } from '@/services/email-service';

type ContactFormState = {
  data: { success: boolean } | null;
  error: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  } | null;
};

// Handle contact form submission
export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // --- Form Validation ---
    const contactSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('A valid email is required'),
      phone: z.string().optional(),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    });

    const validatedFields = contactSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    });

    if (!validatedFields.success) {
      return {
        data: null,
        errors: validatedFields.error.flatten().fieldErrors,
        error: 'Please correct the errors below.',
      };
    }

    const { name, email, phone, message } = validatedFields.data;
    let newRowIndex: number | null = null;
    let finalSheetStatus = 'Processing Error'; // Default status

    // --- Parallel Operations ---
    const sheetPromise = appendToSheet({ name, email, phone, message }, 'Attempting to send emails...');

    const ownerEmailPromise = sendEmail({
        to: 'malejandro.cortez91@gmail.com',
        subject: `New Lead from Website: ${name}`,
        text: `A new lead has submitted the contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
        html: `<div style="font-family: sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">New Lead from Website</h2>
                <p>A new lead has submitted the contact form.</p>
                <hr>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <h3 style="color: #333;">Message:</h3>
                <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
              </div>`,
      });

    const leadEmailPromise = sendEmail({
        to: email,
        subject: 'Thank You for Your Interest in My Services',
        text: `Dear ${name},\n\nThank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.\n\nI am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.\n\nIn the meantime, feel free to connect with me on LinkedIn or explore the project highlights on my website.\n\nBest regards,\n\nManuel Alejandro Cortez Velásquez\nAlternate: ing.cortez.vlz@gmail.com\nMobile & Whatsapp: +505 5731 3554\nLinkedIn: https://www.linkedin.com/in/alecortez91/`,
        html: `<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #333;">Thank You for Your Interest in My Services</h2>
                <p>Dear ${name},</p>
                <p>Thank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.</p>
                <p>I am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.</p>
                <p>In the meantime, feel free to explore my project highlights or connect with me on social media:</p>
                <ul>
                  <li><a href="https://www.linkedin.com/in/alecortez91/">LinkedIn</a></li>
                </ul>
                <p>Best regards,</p>
                <p><strong>Manuel Alejandro Cortez Velásquez</strong><br>
                Executive Operations & Transformation Leader<br>
                <a href="mailto:ing.cortez.vlz@gmail.com">ing.cortez.vlz@gmail.com</a><br>
                Mobile & Whatsapp: +505 5731 3554</p>
                <hr style="border: none; border-top: 1px solid #eee;">
                <p style="font-size: 0.8em; color: #777;">This is an automated message. Please do not reply directly to this email.</p>
              </div>`
      });

    const [sheetResult, ownerEmailResult, leadEmailResult] = await Promise.allSettled([
      sheetPromise,
      ownerEmailPromise,
      leadEmailPromise,
    ]);

    // --- Handle Results ---
    if (sheetResult.status === 'fulfilled') {
      newRowIndex = sheetResult.value;
    } else {
      console.error('Critical Error: Failed to write to Google Sheet.', sheetResult.reason);
      throw new Error(`Failed to write to sheet. Reason: ${sheetResult.reason.message}`);
    }

    const errorMessages = [];
    if (leadEmailResult.status === 'rejected') {
      errorMessages.push('Failed to send confirmation to lead.');
      console.error('Failed to send email to lead:', leadEmailResult.reason);
    }

    if (ownerEmailResult.status === 'rejected') {
      errorMessages.push('Failed to send notification to owner.');
      console.error('Failed to send email to owner:', ownerEmailResult.reason);
    }

    finalSheetStatus = errorMessages.length > 0 ? errorMessages.join(' ') : 'Confirmation Sent';

    if (newRowIndex) {
      await updateSheetCell(`F${newRowIndex}`, finalSheetStatus);
    }

    return { data: { success: true }, error: null, errors: null };

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    const errorMessage = error.message || 'Failed to process your request. Please try again later.';
    // The row index is not available here, so we can't update the sheet.
    return { data: null, error: errorMessage, errors: null };
  }
}
