'use server';

/**
 * @fileOverview An AI-powered chat interface for personalized career guidance.
 *
 * - provideAICareerCounselorChat - A function that provides career guidance through a chat interface.
 * - ProvideAICareerCounselorChatInput - The input type for the provideAICareerCounselorChat function.
 * - ProvideAICareerCounselorChatOutput - The return type for the provideAICareerCounselorChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAICareerCounselorChatInputSchema = z.object({
  question: z.string().describe('The user\u2019s question about their career path.'),
  assessmentData: z.string().describe('The user\u2019s assessment data, including skills and preferences.'),
});
export type ProvideAICareerCounselorChatInput = z.infer<typeof ProvideAICareerCounselorChatInputSchema>;

const ProvideAICareerCounselorChatOutputSchema = z.object({
  answer: z.string().describe('The AI\u2019s answer to the user\u2019s question, providing personalized career guidance.'),
});
export type ProvideAICareerCounselorChatOutput = z.infer<typeof ProvideAICareerCounselorChatOutputSchema>;

export async function provideAICareerCounselorChat(input: ProvideAICareerCounselorChatInput): Promise<ProvideAICareerCounselorChatOutput> {
  return provideAICareerCounselorChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAICareerCounselorChatPrompt',
  input: {schema: ProvideAICareerCounselorChatInputSchema},
  output: {schema: ProvideAICareerCounselorChatOutputSchema},
  prompt: `You are an AI career counselor providing personalized guidance to users.

  Use the assessment data to understand the user's skills, preferences, and Ikigai components. Tailor your advice to their unique situation.

  User Assessment Data: {{{assessmentData}}}

  User Question: {{{question}}}

  Provide a helpful and informative answer to the user's question.
  `
});

const provideAICareerCounselorChatFlow = ai.defineFlow(
  {
    name: 'provideAICareerCounselorChatFlow',
    inputSchema: ProvideAICareerCounselorChatInputSchema,
    outputSchema: ProvideAICareerCounselorChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
