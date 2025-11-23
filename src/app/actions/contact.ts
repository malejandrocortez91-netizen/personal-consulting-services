
'use server';

import {
  sendConfirmationEmail,
  sendOwnerNotificationEmail,
} from '@/services/email';
import { appendToSheet, updateSheetCell } from '@/services/google-sheets';

type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  } | null;
};

export async function handleContactSubmission(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = (formData.get('phone') as string) || undefined;
  const message = formData.get('message') as string;

  // Basic validation
  const errors: { name?: string[]; email?: string[]; message?: string[] } = {};
  if (!name) errors.name = ['Name is required'];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = ['A valid email is required'];
  if (!message || message.length < 10)
    errors.message = ['Message must be at least 10 characters'];

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: 'Please correct the errors below.',
    };
  }

  const validatedData = { name, email, phone, message };
  let newRowIndex: number | null = null;
  let finalSheetStatus = 'Processing Error';

  try {
    const [sheetResult, ownerEmailResult, leadEmailResult] =
      await Promise.allSettled([
        appendToSheet(validatedData, 'Attempting to send emails...'),
        sendOwnerNotificationEmail(validatedData),
        sendConfirmationEmail(validatedData),
      ]);

    if (sheetResult.status === 'fulfilled') {
      newRowIndex = sheetResult.value;
    } else {
      console.error(
        'Critical Error: Failed to write to Google Sheet.',
        sheetResult.reason
      );
      // We will still try to send emails, but log this critical failure.
      finalSheetStatus = `Failed to write to sheet. Reason: ${
        (sheetResult.reason as Error).message
      }`;
    }

    const errorMessages = [];
    if (leadEmailResult.status === 'rejected') {
      console.error('Lead Email Error:', leadEmailResult.reason);
      errorMessages.push('Failed to send confirmation to lead.');
    }
    if (ownerEmailResult.status === 'rejected') {
      console.error('Owner Email Error:', ownerEmailResult.reason);
      errorMessages.push('Failed to send notification to owner.');
    }

    if (errorMessages.length === 0) {
      finalSheetStatus = 'Confirmation Sent';
    } else if (newRowIndex) {
      // If there was an email error, update the sheet status
      finalSheetStatus = errorMessages.join(' ');
    }
    
    if (newRowIndex) {
      // Don't await this, let it run in the background
      updateSheetCell(`F${newRowIndex}`, finalSheetStatus).catch(e => console.error("Failed to update sheet status:", e));
    }

    if (errorMessages.length > 0) {
      return {
        success: false,
        message: 'Your message was recorded, but there was an issue sending email notifications.',
        errors: null,
      };
    }

    return {
      success: true,
      message: 'Thank you for reaching out. I will get back to you shortly.',
      errors: null,
    };
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: error.message || 'An unexpected error occurred.',
      errors: null,
    };
  }
}
