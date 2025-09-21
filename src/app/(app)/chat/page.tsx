'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { SendHorizonal, Bot, User, Sparkles, AlertTriangle } from 'lucide-react';
import { provideAICareerCounselorChat } from '@/ai/flows/provide-ai-career-counselor-chat';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type ChatFormData = z.infer<typeof chatSchema>;

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Kai, your AI career counselor. Ask me anything about your career path, skills, or roadmap.",
      sender: 'ai',
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [assessmentData, setAssessmentData] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('Demo User');
  const [hasAssessment, setHasAssessment] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for assessment data in local storage
    const storedData = localStorage.getItem('assessmentData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const ikigaiComponents = `What I love: ${parsedData.love}\nWhat I'm good at: ${parsedData.goodAt}\nWhat the world needs: ${parsedData.worldNeeds}\nWhat I can be paid for: ${parsedData.paidFor}`;
        setAssessmentData(ikigaiComponents);
        setHasAssessment(true);
      } catch (error) {
        console.error("Failed to parse assessment data from local storage", error);
        setHasAssessment(false);
      }
    } else {
      setHasAssessment(false);
    }
  }, []);

  const form = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ChatFormData> = async (data) => {
    if (!assessmentData) {
      toast({
        title: 'Complete Assessment First',
        description: 'Please complete your Ikigai assessment to get personalized advice.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    const userMessage: Message = {
      id: Date.now(),
      text: data.message,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const response = await provideAICareerCounselorChat({
        question: data.message,
        assessmentData: assessmentData,
        userName: userName,
      });

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response.answer,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error('Failed to get chat response:', error);
      toast({
        title: 'Error',
        description: 'Could not get a response from the AI counselor. Please try again.',
        variant: 'destructive',
      });
      // Optionally remove the user's message if the API call fails
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container h-[calc(100vh-4rem)] flex flex-col py-6">
      <div className="text-center mb-6">
          <h1 className="font-headline text-3xl font-bold">AI Career Counselor</h1>
          <p className="text-muted-foreground">Your personal guide for career-related questions.</p>
      </div>

      {hasAssessment === false && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No Assessment Data Found</AlertTitle>
          <AlertDescription>
            To get personalized career advice, you need to complete the assessment first. 
            <Button variant="link" asChild className="p-0 h-auto ml-1">
              <Link href="/assessment">Start your assessment now.</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 flex flex-col border rounded-lg bg-card overflow-hidden">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-4',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'ai' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-prose rounded-lg px-4 py-3',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isSending && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg px-4 py-3 bg-secondary flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-card">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Ask about career paths, skills, or interview tips..."
                        autoComplete="off"
                        disabled={isSending || hasAssessment === false}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSending || hasAssessment === false}>
                <SendHorizonal className="w-5 h-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
