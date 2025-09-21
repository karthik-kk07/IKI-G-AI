import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Compass, Bot, Network, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: <Compass className="w-8 h-8 mb-4 text-primary" />,
    title: 'Start Your Assessment',
    description: 'Discover your strengths, passions, and what the world needs from you.',
    href: '/assessment',
    cta: 'Begin Assessment',
  },
  {
    icon: <Network className="w-8 h-8 mb-4 text-primary" />,
    title: 'View Your Roadmap',
    description: 'Explore your AI-generated career path and customize your journey.',
    href: '/roadmap',
    cta: 'See My Roadmap',
  },
  {
    icon: <Bot className="w-8 h-8 mb-4 text-primary" />,
    title: 'Chat with AI Counselor',
    description: 'Get personalized advice and answers to your career questions, anytime.',
    href: '/chat',
    cta: 'Start Chatting',
  },
];

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
        Welcome to your Career Cockpit
      </h1>
      <p className="text-lg text-muted-foreground mt-2">
        This is your control center for navigating your professional journey.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
                {feature.icon}
              <CardTitle className="font-headline">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  {feature.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 bg-accent/10 border-accent/20">
        <CardHeader className="grid md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <CardTitle className="font-headline text-2xl text-accent-foreground">Ready to find your Ikigai?</CardTitle>
            <CardDescription className="mt-2 text-base text-accent-foreground/80">
              The first step is a deep dive into what makes you unique. Our assessment is designed to be insightful and thought-provoking.
            </CardDescription>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/assessment">Start the Ikigai Assessment</Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
