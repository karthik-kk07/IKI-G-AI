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
  { 
    id: 'love', 
    title: '💖 What You Love (Passion)', 
    description: 'What activities or topics make you lose all sense of time?\nWhat did you love to do as a child or a teenager?\nWhat subjects or books do you find yourself constantly reading or researching?\nIf money were no object, how would you spend your time?', 
    label: 'I love...' 
  },
  { 
    id: 'goodAt', 
    title: '🧠 What You Are Good At (Vocation)', 
    description: 'What skills or abilities come naturally to you?\nWhat do people consistently ask you for help with or advice on?\nWhat are you an expert at, even if it\'s a niche topic?\nThink about a time you solved a problem that others found difficult. What skills did you use?', 
    label: 'I am good at...' 
  },
  { 
    id: 'worldNeeds', 
    title: '🌎 What the World Needs (Mission)', 
    description: 'What problems or injustices in the world frustrate you the most?\nIf you had a superpower to change one thing about your community or the world, what would it be?\nWhat issues are you passionate about helping to solve?\nWhat kind of positive impact do you want to leave on the world?', 
    label: 'The world needs...' 
  },
  { 
    id: 'paidFor', 
    title: '💰 What You Can Be Paid For (Profession)', 
    description: 'What services or products could you offer that people would be willing to pay for?\nWhat is a desirable skill in your field or a field you\'re interested in?\nWhat jobs or careers align with your skills and offer a sustainable living?\nWhat kind of lifestyle do you want to have, and what kind of work can support that?', 
    label: 'I can be paid for...' 
  },
] as const;

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
    mode: 'onChange',
  });

  const { trigger, formState } = form;
  const currentStepId = steps[currentStep].id;
  
  const handleNext = async () => {
    const isValid = await trigger(currentStepId);
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const onSubmit: SubmitHandler<IkigaiFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const ikigaiComponents = `What I love: ${data.love}\nWhat I'm good at: ${data.goodAt}\nWhat the world needs: ${data.worldNeeds}\nWhat I can be paid for: ${data.paidFor}`;
      const assessmentParams = new URLSearchParams({
        skills: data.goodAt,
        preferences: data.paidFor,
        ikigaiComponents,
      });

      localStorage.setItem('assessmentData', JSON.stringify(data));
      
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
  };

  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
          <CardTitle className="font-headline text-2xl">
             {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="whitespace-pre-line">{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent key={currentStepId}>
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
               {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || !formState.isValid}>
                  {isSubmitting ? 'Generating...' : (
                    <>
                      Generate My Roadmap <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
