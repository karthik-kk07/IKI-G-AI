'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const careerPaths = [
  {
    title: 'Full Stack Developer',
    description: 'Master both front-end and back-end technologies to build complete web applications.',
    progress: 30,
    milestones: [
      { title: 'HTML, CSS & JavaScript', completed: true, skills: ['Semantic HTML', 'CSS Flexbox & Grid', 'DOM Manipulation'] },
      { title: 'Front-end Framework (React)', completed: true, skills: ['Components & Props', 'State & Lifecycle', 'React Hooks'] },
      { title: 'Back-end Development (Node.js & Express)', completed: false, skills: ['REST APIs', 'Authentication', 'Database Integration'] },
      { title: 'Databases (SQL & NoSQL)', completed: false, skills: ['Database Design', 'Querying Data', 'ORMs/ODMs'] },
      { title: 'Deployment & DevOps', completed: false, skills: ['Git & GitHub', 'CI/CD Pipelines', 'Cloud Services (AWS/Firebase)'] },
    ]
  },
  {
    title: 'Data Scientist',
    description: 'Learn to extract insights and build predictive models from complex datasets.',
    progress: 0,
    milestones: [
      { title: 'Python for Data Science', completed: false, skills: ['Pandas', 'NumPy', 'Matplotlib'] },
      { title: 'Statistics & Probability', completed: false, skills: ['Descriptive Statistics', 'Inferential Statistics', 'Hypothesis Testing'] },
      { title: 'Machine Learning Fundamentals', completed: false, skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'] },
      { title: 'Deep Learning', completed: false, skills: ['Neural Networks', 'TensorFlow/PyTorch', 'Computer Vision/NLP'] },
      { title: 'Big Data Technologies', completed: false, skills: ['Spark', 'Hadoop', 'Data Warehousing'] },
    ]
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect digital assets by identifying and mitigating security threats.',
    progress: 10,
    milestones: [
      { title: 'Networking Fundamentals', completed: true, skills: ['TCP/IP', 'OSI Model', 'Common Protocols'] },
      { title: 'Security Principles', completed: false, skills: ['CIA Triad', 'Risk Assessment', 'Access Control'] },
      { title: 'Ethical Hacking', completed: false, skills: ['Penetration Testing', 'Vulnerability Scanning', 'Social Engineering'] },
      { title: 'Cryptography', completed: false, skills: ['Symmetric/Asymmetric Encryption', 'Hashing', 'Digital Signatures'] },
      { title: 'Incident Response & Forensics', completed: false, skills: ['SIEM Tools', 'Malware Analysis', 'Digital Evidence'] },
    ]
  }
];

export default function CareerPathsPage() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0]);

  return (
    <div className="container py-10">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Career Paths</h1>
      <p className="text-lg text-muted-foreground mb-8">Follow our expert-curated roadmaps to master the skills needed for your dream tech career.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Path Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-xl">Choose a Path</h2>
          {careerPaths.map((path) => (
            <Card 
              key={path.title} 
              className={`cursor-pointer transition-all hover:shadow-md ${selectedPath.title === path.title ? 'border-primary shadow-lg' : ''}`}
              onClick={() => setSelectedPath(path)}
            >
              <CardHeader>
                <CardTitle>{path.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                <Progress value={path.progress} />
                <p className="text-xs text-muted-foreground mt-2">{path.progress}% complete</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column: Milestones */}
        <div className="lg:col-span-2">
           <Card className="sticky top-20">
             <CardHeader>
               <CardTitle className="font-headline text-2xl">{selectedPath.title} Roadmap</CardTitle>
               <CardDescription>A step-by-step guide to becoming a {selectedPath.title}.</CardDescription>
             </CardHeader>
             <CardContent>
                <Accordion type="single" collapsible defaultValue="item-0">
                  {selectedPath.milestones.map((milestone, index) => (
                    <AccordionItem value={`item-${index}`} key={milestone.title}>
                      <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-4">
                          {milestone.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Lock className="w-6 h-6 text-muted-foreground" />}
                          <span>{milestone.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-14">
                        <p className="text-muted-foreground mb-4">Key skills to master in this stage:</p>
                        <ul className="space-y-2">
                          {milestone.skills.map(skill => (
                             <li key={skill} className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-primary" />
                                <span>{skill}</span>
                             </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
               </Accordion>
             </CardContent>
              <CardFooter>
                  <Button className="w-full">
                    {selectedPath.progress > 0 ? 'Continue Learning' : 'Start This Path'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
              </CardFooter>
           </Card>
        </div>
      </div>
    </div>
  );
}
