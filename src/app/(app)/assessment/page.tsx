'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ikigaiSchema = z.object({
  love: z.string().min(10, 'Please describe in a bit more detail.'),
  goodAt: z.string().min(10, 'Please describe in a bit more detail.'),
  worldNeeds: z.string().min(10, 'Please describe in a bit more detail.'),
  paidFor: z.string().min(10, 'Please describe in a bit more detail.'),
});

type IkigaiFormData = z.infer<typeof ikigaiSchema>;

const steps = [
  { id: 'love', title: 'What You Love', description: 'List activities, subjects, or ideas you are passionate about. What could you do for hours without getting bored?', label: 'I love...' },
  { id: 'goodAt', title: 'What You Are Good At', description: 'What skills have you developed? What do people come to you for help with? Think about both hard and soft skills.', label: 'I am good at...' },
  { id: 'worldNeeds', title: 'What The World Needs', description: 'What problems do you want to solve? What causes do you care about? How do you want to contribute to society?', label: 'The world needs...' },
  { id: 'paidFor', title: 'What You Can Be Paid For', description: 'What skills or services are in demand? What kind of work environment do you prefer? What are your financial goals?', label: 'I can be paid for...' },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<IkigaiFormData>({
    resolver: zodResolver(ikigaiSchema),
    defaultValues: {
      love: '',
      goodAt: '',
      worldNeeds: '',
      paidFor: '',
    },
  });

  const processStep: SubmitHandler<IkigaiFormData> = async (data) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        const ikigaiComponents = `What I love: ${data.love}\nWhat I'm good at: ${data.goodAt}\nWhat the world needs: ${data.worldNeeds}\nWhat I can be paid for: ${data.paidFor}`;
        const assessmentParams = new URLSearchParams({
          skills: data.goodAt,
          preferences: data.paidFor,
          ikigaiComponents,
        });

        // Store assessment data in local storage for the chat feature
        localStorage.setItem('assessmentData', JSON.stringify(data));
        
        // This is a client component, we cannot directly use the AI flow's output to redirect.
        // We pass the parameters to the roadmap page, which will be a server component and will call the AI flow.
        router.push(`/roadmap?${assessmentParams.toString()}`);

      } catch (error) {
        console.error('Failed to generate recommendations:', error);
        toast({
          title: 'Error',
          description: 'Could not generate your roadmap. Please try again.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
      }
    }
  };

  const currentStepId = steps[currentStep].id as keyof IkigaiFormData;

  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
          <CardTitle className="font-headline text-2xl">
            Step {currentStep + 1}: {steps[currentStep].title}
          </CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processStep)}>
            <CardContent>
              <FormField
                control={form.control}
                name={currentStepId}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">{steps[currentStep].label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Be as detailed as you like..."
                        className="min-h-[200px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="submit" disabled={isSubmitting || !form.formState.dirtyFields[currentStepId]}>
                {currentStep === steps.length - 1 ? (
                  isSubmitting ? 'Generating...' : (
                    <>
                      Generate My Roadmap <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )
                ) : (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
