'use server';
/**
 * @fileOverview Summarizes skills and experiences from a resume/CV using AI.
 *
 * - summarizeSkillsFromResume - A function that handles the summarization process.
 * - SummarizeSkillsFromResumeInput - The input type for the summarizeSkillsFromResume function.
 * - SummarizeSkillsFromResumeOutput - The return type for the summarizeSkillsFromResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSkillsFromResumeInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume/CV to summarize.'),
});
export type SummarizeSkillsFromResumeInput = z.infer<
  typeof SummarizeSkillsFromResumeInputSchema
>;

const SummarizeSkillsFromResumeOutputSchema = z.object({
  skillsSummary: z
    .string()
    .describe(
      'A concise summary of the key skills and experiences highlighted in the resume/CV.'
    ),
});
export type SummarizeSkillsFromResumeOutput = z.infer<
  typeof SummarizeSkillsFromResumeOutputSchema
>;

export async function summarizeSkillsFromResume(
  input: SummarizeSkillsFromResumeInput
): Promise<SummarizeSkillsFromResumeOutput> {
  return summarizeSkillsFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSkillsFromResumePrompt',
  input: {schema: SummarizeSkillsFromResumeInputSchema},
  output: {schema: SummarizeSkillsFromResumeOutputSchema},
  prompt: `You are an AI assistant that specializes in extracting and summarizing key skills and experiences from resumes and CVs.

  Given the text from a resume, create a concise summary of the candidate's key skills and experiences.

  Resume Text: {{{resumeText}}} `,
});

const summarizeSkillsFromResumeFlow = ai.defineFlow(
  {
    name: 'summarizeSkillsFromResumeFlow',
    inputSchema: SummarizeSkillsFromResumeInputSchema,
    outputSchema: SummarizeSkillsFromResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
