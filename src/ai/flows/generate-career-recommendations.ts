'use server';
/**
 * @fileOverview Generates personalized career recommendations based on user skill assessment data.
 *
 * - generateCareerRecommendations - A function that generates personalized career recommendations.
 * - GenerateCareerRecommendationsInput - The input type for the generateCareerRecommendations function.
 * - GenerateCareerRecommendationsOutput - The return type for the generateCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerRecommendationsInputSchema = z.object({
  skills: z
    .string()
    .describe('The skills of the user.'),
  preferences: z.string().describe('The preferences of the user.'),
  ikigaiComponents: z
    .string()
    .describe('The Ikigai components of the user.'),
  userUniquePath: z
    .string()
    .describe('The unique path of the user.'),
});
export type GenerateCareerRecommendationsInput = z.infer<
  typeof GenerateCareerRecommendationsInputSchema
>;

const GenerateCareerRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .string()
    .describe('The personalized career recommendations.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type GenerateCareerRecommendationsOutput = z.infer<
  typeof GenerateCareerRecommendationsOutputSchema
>;

const formulateUserUniquePath = ai.defineTool(
  {
    name: 'formulateUserUniquePath',
    description: 'Formulates the user unique path based on skills, preferences and Ikigai components',
    inputSchema: z.object({
      skills: z.string().describe('The skills of the user.'),
      preferences: z.string().describe('The preferences of the user.'),
      ikigaiComponents: z.string().describe('The Ikigai components of the user.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    return `Based on the user\'s skills: ${input.skills}, preferences: ${input.preferences}, and Ikigai components: ${input.ikigaiComponents}, the user\'s unique path is formulated`;
  }
);

export async function generateCareerRecommendations(
  input: GenerateCareerRecommendationsInput
): Promise<GenerateCareerRecommendationsOutput> {
  return generateCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerRecommendationsPrompt',
  input: {schema: GenerateCareerRecommendationsInputSchema},
  output: {schema: GenerateCareerRecommendationsOutputSchema},
  tools: [formulateUserUniquePath],
  prompt: `You are a career counselor. Your first step is to call the formulateUserUniquePath tool to understand the user's unique path. Then, based on the user's skills, preferences, Ikigai components, and the formulated unique path, generate personalized career recommendations and explain your reasoning.

Skills: {{{skills}}}
Preferences: {{{preferences}}}
Ikigai Components: {{{ikigaiComponents}}}

Career Recommendations:`,
});

const generateCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCareerRecommendationsFlow',
    inputSchema: GenerateCareerRecommendationsInputSchema,
    outputSchema: GenerateCareerRecommendationsOutputSchema,
  },
  async input => {
    const userUniquePath = await formulateUserUniquePath(input);

    const {output} = await prompt({
      ...input,
      userUniquePath,
    });
    return output!;
  }
);
