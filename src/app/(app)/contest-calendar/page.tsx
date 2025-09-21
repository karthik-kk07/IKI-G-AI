'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addMonths, subMonths } from 'date-fns';

const contests = [
  { date: '2024-08-05', name: 'LeetCode Weekly Contest 399', platform: 'LeetCode', href: '#' },
  { date: '2024-08-10', name: 'Codeforces Round #952 (Div. 4)', platform: 'Codeforces', href: '#' },
  { date: '2024-08-12', name: 'LeetCode Biweekly Contest 123', platform: 'LeetCode', href: '#' },
  { date: '2024-08-17', name: 'CodeChef Starters 112', platform: 'CodeChef', href: '#' },
  { date: '2024-08-25', name: 'Codeforces Educational Round 165', platform: 'Codeforces', href: '#' },
  { date: '2024-09-01', name: 'LeetCode Weekly Contest 400', platform: 'LeetCode', href: '#' },
];

const platformColors: { [key: string]: string } = {
  LeetCode: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/30',
  Codeforces: 'bg-red-400/20 text-red-600 border-red-400/30',
  CodeChef: 'bg-blue-400/20 text-blue-600 border-blue-400/30',
};


export default function ContestCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2024-08-15'));

  const contestsForMonth = contests.filter(contest => 
    new Date(contest.date).getMonth() === currentDate.getMonth() &&
    new Date(contest.date).getFullYear() === currentDate.getFullYear()
  );

  return (
    <div className="container py-10">
      <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Contest Calendar</h1>
      <p className="text-lg text-muted-foreground mb-8">Sharpen your skills. Compete with the best.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle>Calendar</CardTitle>
               <div className="flex gap-2">
                 <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                   <ChevronLeft className="w-4 h-4" />
                 </Button>
                  <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                   <ChevronRight className="w-4 h-4" />
                 </Button>
               </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                month={currentDate}
                onMonthChange={setCurrentDate}
                className="p-0"
                modifiers={{
                  contestDay: contests.map(c => new Date(c.date + 'T00:00:00')) // Add T00:00:00 to avoid timezone issues
                }}
                modifiersStyles={{
                  contestDay: {
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: '9999px'
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Contest List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Upcoming Contests for {format(currentDate, 'MMMM yyyy')}
              </CardTitle>
              <CardDescription>
                Click on a contest to visit the official page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contestsForMonth.length > 0 ? contestsForMonth.map((contest) => (
                  <Card key={contest.name} className="flex items-center justify-between p-4 transition-all hover:shadow-md">
                    <div className="flex items-center gap-4">
                       <div className="text-center w-16">
                         <p className="text-2xl font-bold">{format(new Date(contest.date + 'T00:00:00'), 'dd')}</p>
                         <p className="text-sm text-muted-foreground">{format(new Date(contest.date + 'T00:00:00'), 'MMM')}</p>
                       </div>
                       <div>
                         <h3 className="font-semibold">{contest.name}</h3>
                         <Badge variant="outline" className={platformColors[contest.platform]}>{contest.platform}</Badge>
                       </div>
                    </div>
                    <Button variant="outline" size="icon" asChild>
                      <a href={contest.href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </Card>
                )) : (
                  <div className="text-center py-10">
                    <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">No contests found for this month.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
