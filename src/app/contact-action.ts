
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
  let finalSheetStatus = 'Processing Error'; // Default status

  try {
    // --- Step 1: Initiate all operations in parallel ---
    const sheetPromise = appendToSheet({ name, email, phone, message }, 'Attempting to send emails...');
    
    const ownerEmailPromise = sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: `New Lead from Website: ${name}`,
      text: `A new lead has submitted the contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
    });

    const leadEmailPromise = sendEmail({
        to: email,
        subject: 'Thank you for contacting me - Alejandro Cortez Velasquez',
        text: `Dear ${name},

Thank you for reaching out and expressing interest in my consulting services. I have successfully received your message and appreciate you taking the time to connect.

I am currently reviewing your inquiry and will get back to you personally as soon as possible, typically within one business day.

In the meantime, feel free to connect with me on LinkedIn or explore my project highlights on my website.

Best regards,

Alejandro Cortez Velasquez
Executive Operations & Transformation Leader`,
      });
      
    const [sheetResult, ownerEmailResult, leadEmailResult] = await Promise.allSettled([
      sheetPromise,
      ownerEmailPromise,
      leadEmailPromise,
    ]);

    // --- Step 2: Handle the results ---

    // Handle Sheet Result
    if (sheetResult.status === 'fulfilled') {
      newRowIndex = sheetResult.value;
    } else {
      // If sheet writing fails, that's a critical error.
      console.error('Critical Error: Failed to write to Google Sheet.', sheetResult.reason);
      throw new Error(`Failed to write to sheet. Reason: ${sheetResult.reason.message}`);
    }

    // Determine final status based on email results
    if (leadEmailResult.status === 'fulfilled') {
        finalSheetStatus = 'Confirmation Sent';
    } else {
        finalSheetStatus = 'Failed to Send Confirmation';
        console.error('Failed to send email to lead:', leadEmailResult.reason);
    }
    
    if (ownerEmailResult.status === 'rejected') {
        console.error('Failed to send email to owner:', ownerEmailResult.reason);
        // You might want to add a status for this, e.g., 'Owner Notification Failed'
    }

    // --- Step 3: Update the sheet with the final status ---
    if (newRowIndex) {
        await updateSheetCell(`F${newRowIndex}`, finalSheetStatus);
    }

    return { data: { success: true }, error: null, errors: null };

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    const errorMessage = error.message || 'Failed to process your request. Please try again later.';
    
    // If we got a row index before the error, try to update the sheet with an error status
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
