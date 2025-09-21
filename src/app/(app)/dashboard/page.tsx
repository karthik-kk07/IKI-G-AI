import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Compass, Bot, Network, Award, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


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

const achievements = [
    {
        icon: <CheckCircle className="w-10 h-10 text-green-500" />,
        title: "Assessment Complete",
        description: "You've taken the first step on your journey of self-discovery.",
        unlocked: true,
    },
    {
        icon: <Sparkles className="w-10 h-10 text-purple-500" />,
        title: "Roadmap Generated",
        description: "Your personalized career path has been created by the AI.",
        unlocked: true,
    },
    {
        icon: <Award className="w-10 h-10 text-yellow-500" />,
        title: "Creative Thinker",
        description: "Awarded for demonstrating strong creative skills.",
        unlocked: true,
    },
    {
        icon: <Award className="w-10 h-10 text-muted-foreground/30" />,
        title: "Team Leader",
        description: "Demonstrate leadership potential in your assessments.",
        unlocked: false,
    },
     {
        icon: <Award className="w-10 h-10 text-muted-foreground/30" />,
        title: "Problem Solver",
        description: "Excel at finding innovative solutions to challenges.",
        unlocked: false,
    },
    {
        icon: <Award className="w-10 h-10 text-muted-foreground/30" />,
        title: "Digital Nomad",
        description: "Unlock a career path that allows for remote work and travel.",
        unlocked: false,
    }
]

export default function DashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
        Welcome to your Ikigai
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

       <Card className="mt-10">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">My Achievements</CardTitle>
          <CardDescription>
            Visual milestones on your career journey. Unlock more as you progress!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {achievements.map((ach) => (
            <Card key={ach.title} className={`p-4 text-center flex flex-col items-center justify-start ${!ach.unlocked ? 'opacity-50' : ''}`}>
               {ach.icon}
               <h3 className="font-semibold mt-3 text-base">{ach.title}</h3>
               <p className="text-xs text-muted-foreground mt-1 mb-3 flex-grow">{ach.description}</p>
                {ach.unlocked ? (
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Unlocked</Badge>
                ) : (
                    <Badge variant="outline">Locked</Badge>
                )}
            </Card>
          ))}
        </CardContent>
       </Card>

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
