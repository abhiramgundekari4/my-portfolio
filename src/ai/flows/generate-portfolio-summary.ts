'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a professional portfolio summary.
 *
 * It includes:
 * - generatePortfolioSummary: A function to generate the portfolio summary.
 * - PortfolioSummaryInput: The input type for the function.
 * - PortfolioSummaryOutput: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioSummaryInputSchema = z.object({
  skills: z
    .string()
    .describe(
      'A comma-separated list of technical skills, e.g., Python, SQL, Data Analysis.'
    ),
  experience: z
    .string()
    .describe(
      'A brief description of your work experience and projects, highlighting achievements and responsibilities.'
    ),
  objective: z
    .string()
    .optional()
    .describe(
      'The job or internship objective you are seeking (e.g., Software Engineer Internship, Data Scientist Role).'
    ),
});
export type PortfolioSummaryInput = z.infer<typeof PortfolioSummaryInputSchema>;

const PortfolioSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A professional summary highlighting skills, experience, and objectives for a portfolio.'
    ),
});
export type PortfolioSummaryOutput = z.infer<typeof PortfolioSummaryOutputSchema>;

export async function generatePortfolioSummary(
  input: PortfolioSummaryInput
): Promise<PortfolioSummaryOutput> {
  return generatePortfolioSummaryFlow(input);
}

const portfolioSummaryPrompt = ai.definePrompt({
  name: 'portfolioSummaryPrompt',
  input: {schema: PortfolioSummaryInputSchema},
  output: {schema: PortfolioSummaryOutputSchema},
  prompt: `You are a professional resume writer. Please create a compelling "About Me" section for a portfolio based on the following information. Focus on making it attractive to recruiters.

Skills: {{{skills}}}
Experience: {{{experience}}}
Objective: {{{objective}}}

Summary:`, // Removed unnecessary newline.
});

const generatePortfolioSummaryFlow = ai.defineFlow(
  {
    name: 'generatePortfolioSummaryFlow',
    inputSchema: PortfolioSummaryInputSchema,
    outputSchema: PortfolioSummaryOutputSchema,
  },
  async input => {
    const {output} = await portfolioSummaryPrompt(input);
    return output!;
  }
);
