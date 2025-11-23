
'use server';

import { appendToSheet } from '@/services/google-sheets';

type NewsletterFormState = {
  success: boolean;
  message: string;
};

export async function handleNewsletterSubmission(
  prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const email = formData.get('email') as string;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: 'A valid email is required.',
    };
  }

  const sheetData = {
    name: 'NEWSLETTER SUB',
    email: email,
    phone: 'NEWS LETTER SUB',
    message: 'SUSCRIBED TO THE NEWS LETTER',
  };

  try {
    await appendToSheet(sheetData, 'WEB MESSAGE CONFIRMED');
    return {
      success: true,
      message: "Thank you for subscribing! You've been added to the list.",
    };
  } catch (error: any) {
    console.error('Newsletter submission error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
