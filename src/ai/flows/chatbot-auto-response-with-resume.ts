'use server';
/**
 * @fileOverview A chatbot flow that sends an automated message with the consultant's resume.
 *
 * - chatbotAutoResponseWithResume - A function that handles the chatbot interaction and sends the resume.
 * - ChatbotAutoResponseWithResumeInput - The input type for the chatbotAutoResponseWithResume function.
 * - ChatbotAutoResponseWithResumeOutput - The return type for the chatbotAutoResponseWithResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { sendEmail } from '@/services/email-service';

const ChatbotAutoResponseWithResumeInputSchema = z.object({
  message: z.string().describe('The message from the website visitor.'),
  email: z.string().email().describe('The email address of the website visitor.'),
});
export type ChatbotAutoResponseWithResumeInput = z.infer<typeof ChatbotAutoResponseWithResumeInputSchema>;

const ChatbotAutoResponseWithResumeOutputSchema = z.object({
  response: z.string().describe('The automated response to the website visitor.'),
});
export type ChatbotAutoResponseWithResumeOutput = z.infer<typeof ChatbotAutoResponseWithResumeOutputSchema>;

export async function chatbotAutoResponseWithResume(input: ChatbotAutoResponseWithResumeInput): Promise<ChatbotAutoResponseWithResumeOutput> {
  return chatbotAutoResponseWithResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAutoResponseWithResumePrompt',
  input: {schema: ChatbotAutoResponseWithResumeInputSchema},
  output: {schema: ChatbotAutoResponseWithResumeOutputSchema},
  prompt: `You are a chatbot that responds to inquiries about hiring a consultant or their services.

  A user has sent the following message:
  {{message}}

  Respond with a friendly message that acknowledges their inquiry and informs them that a PDF version of the consultant's resume has been sent to their email address.
  Do not include any contact information, or further details about the consultant.
  Make sure that the message does not contain any potentially offensive or harmful content.
  `,
});

const chatbotAutoResponseWithResumeFlow = ai.defineFlow(
  {
    name: 'chatbotAutoResponseWithResumeFlow',
    inputSchema: ChatbotAutoResponseWithResumeInputSchema,
    outputSchema: ChatbotAutoResponseWithResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Send email notification to the consultant
    await sendEmail({
      to: 'malejandro.cortez91@gmail.com',
      subject: 'New Inquiry from Website',
      text: `A user with email ${input.email} has sent the following message: ${input.message}`,
      attachments: [
        {
          filename: 'resume.pdf',
          path: 'public/resume.pdf', // Ensure the resume is in the public directory
          contentType: 'application/pdf',
        },
      ],
    });

    // Send automated response to the website visitor with resume attachment
    await sendEmail({
      to: input.email,
      subject: 'Resume Request',
      text: output?.response || 'Thank you for your inquiry. Please find attached a copy of my resume.',
      attachments: [
        {
          filename: 'resume.pdf',
          path: 'public/resume.pdf',
          contentType: 'application/pdf',
        },
      ],
    });

    return output!;
  }
);
