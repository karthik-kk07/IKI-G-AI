import { Suspense } from 'react';
import { generateCareerRecommendations } from '@/ai/flows/generate-career-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Lightbulb } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { RoadmapDisplay } from '@/components/roadmap-display';

interface RoadmapPageProps {
  searchParams: {
    skills?: string;
    preferences?: string;
    ikigaiComponents?: string;
  };
}

const readinessItems = {
  "Technical Skills": ["Learn a new programming language", "Complete a data science course", "Get a cloud certification (e.g., AWS, Azure)"],
  "Soft Skills": ["Practice public speaking", "Take a leadership workshop", "Improve negotiation skills"],
  "Digital Identity": ["Update LinkedIn profile", "Create a professional portfolio website", "Clean up social media presence", "Contribute to an open-source project on GitHub"],
};

function ReadinessChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Readiness Checklist</CardTitle>
        <CardDescription>Essential steps to prepare for your new career path.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(readinessItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-lg mb-2">{category}</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox id={`${category}-${index}`} />
                  <Label htmlFor={`${category}-${index}`} className="text-base font-normal">{item}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

async function RoadmapGenerator({ skills, preferences, ikigaiComponents }: { skills: string; preferences: string; ikigaiComponents: string; }) {
  const userUniquePath = `Based on the user's skills: ${skills}, preferences: ${preferences}, and Ikigai components: ${ikigaiComponents}, the user's unique path is formulated`;

  const { careerRecommendations, reasoning } = await generateCareerRecommendations({
    skills,
    preferences,
    ikigaiComponents,
    userUniquePath,
  });

  const roadmapSteps = careerRecommendations.split('\n').filter(line => /^\s*\d+\.\s*/.test(line)).map(step => step.replace(/^\s*\d+\.\s*/, ''));

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Personalized Career Roadmap</CardTitle>
            <CardDescription>An AI-generated guide to help you navigate your career path. Drag and drop to reorder steps.</CardDescription>
          </CardHeader>
          <CardContent>
             <RoadmapDisplay initialSteps={roadmapSteps} />
          </CardContent>
        </Card>
        
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="font-headline">AI Reasoning</AlertTitle>
          <AlertDescription>
            {reasoning}
          </AlertDescription>
        </Alert>

        <Alert variant="default" className="bg-secondary">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-headline">Full AI Response</AlertTitle>
          <AlertDescription className="whitespace-pre-wrap font-code text-sm">
            {careerRecommendations}
          </AlertDescription>
        </Alert>
      </div>
      <div>
        <ReadinessChecklist />
      </div>
    </div>
  );
}

function RoadmapSkeleton() {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-3/4 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-6 w-1/3 mt-4 mb-2" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function RoadmapPage({ searchParams }: RoadmapPageProps) {
  const { skills, preferences, ikigaiComponents } = searchParams;

  if (!skills || !preferences || !ikigaiComponents) {
    return (
      <div className="container py-10 text-center">
        <h1 className="font-headline text-2xl font-bold">No Assessment Data Found</h1>
        <p className="text-muted-foreground mt-2">Please complete the assessment to generate your career roadmap.</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Suspense fallback={<RoadmapSkeleton />}>
        <RoadmapGenerator skills={skills} preferences={preferences} ikigaiComponents={ikigaiComponents} />
      </Suspense>
    </div>
  );
}
