'use server';
/**
 * @fileOverview Generates personalized career recommendations based on user skill assessment data.
 *
 * - generatePersonalizedCareerRecommendations - A function that generates personalized career recommendations.
 * - GeneratePersonalizedCareerRecommendationsInput - The input type for the generatePersonalizedCareerRecommendations function.
 * - GeneratePersonalizedCareerRecommendationsOutput - The return type for the generatePersonalizedCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedCareerRecommendationsInputSchema = z.object({
  skills: z
    .string()
    .describe('The skills of the user.'),
  preferences: z.string().describe('The preferences of the user.'),
  ikigaiComponents: z
    .string()
    .describe('The Ikigai components of the user.'),
});
export type GeneratePersonalizedCareerRecommendationsInput = z.infer<
  typeof GeneratePersonalizedCareerRecommendationsInputSchema
>;

const GeneratePersonalizedCareerRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .string()
    .describe('The personalized career recommendations.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type GeneratePersonalizedCareerRecommendationsOutput = z.infer<
  typeof GeneratePersonalizedCareerRecommendationsOutputSchema
>;

export async function generatePersonalizedCareerRecommendations(
  input: GeneratePersonalizedCareerRecommendationsInput
): Promise<GeneratePersonalizedCareerRecommendationsOutput> {
  return generatePersonalizedCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedCareerRecommendationsPrompt',
  input: {schema: GeneratePersonalizedCareerRecommendationsInputSchema},
  output: {schema: GeneratePersonalizedCareerRecommendationsOutputSchema},
  prompt: `You are a career counselor. Based on the user's skills, preferences, and Ikigai components, generate personalized career recommendations and explain your reasoning.\n\nSkills: {{{skills}}}\nPreferences: {{{preferences}}}\nIkigai Components: {{{ikigaiComponents}}}\n\nCareer Recommendations:`,
});

const generatePersonalizedCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedCareerRecommendationsFlow',
    inputSchema: GeneratePersonalizedCareerRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedCareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
