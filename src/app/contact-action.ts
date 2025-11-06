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

  try {
    newRowIndex = await appendToSheet({ name, email, phone, message }, 'Attempting to send email');

    // Send notification to site owner
    await sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: `New Lead from Website: ${name}`,
      text: `A new lead has submitted the contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
    });

    // Try to send confirmation to the lead
    try {
        const leadEmailSubject = 'Thank you for contacting me - Alejandro Cortez Velasquez';
        const leadEmailBody = `Dear ${name},

Thank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.

I am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.

In the meantime, feel free to connect with me on LinkedIn or explore my project highlights on my website.

Best regards,

Alejandro Cortez Velasquez
Executive Operations & Transformation Leader`;

      await sendEmail({
        to: email,
        subject: leadEmailSubject,
        text: leadEmailBody,
      });
      if (newRowIndex) await updateSheetCell(`F${newRowIndex}`, 'Confirmation Sent');
    } catch (leadEmailError) {
      console.error('Failed to send email to lead:', leadEmailError);
      if (newRowIndex) await updateSheetCell(`F${newRowIndex}`, 'Failed to Send Confirmation');
    }

    return { data: { success: true }, error: null, errors: null };
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    const errorMessage = error.message || 'Failed to process your request. Please try again later.';
    if (newRowIndex) {
        try {
            await updateSheetCell(`F${newRowIndex}`, 'Processing Error');
        } catch (updateError) {
            console.error('Failed to update sheet after initial error:', updateError);
        }
    }
    return { data: null, error: errorMessage, errors: null };
  }
}
