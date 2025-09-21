'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, Search, PenSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const forumPosts = [
  { id: 1, title: "Is learning Go a good idea in 2024 for backend development?", author: "Alex Morgan", avatar: "https://picsum.photos/seed/avatar1/40/40", replies: 12, likes: 34, tag: "backend", time: "2 hours ago" },
  { id: 2, title: "How do you center a div? (I'm serious)", author: "Jane Doe", avatar: "https://picsum.photos/seed/avatar2/40/40", replies: 25, likes: 5, tag: "frontend", time: "5 hours ago" },
  { id: 3, title: "Best resources for mastering data structures and algorithms?", author: "Sam Wilson", avatar: "https://picsum.photos/seed/avatar3/40/40", replies: 8, likes: 52, tag: "algorithms", time: "1 day ago" },
  { id: 4, title: "Struggling with React state management. Redux, Zustand, or Context API?", author: "Chris Evans", avatar: "https://picsum.photos/seed/avatar4/40/40", replies: 18, likes: 41, tag: "react", time: "2 days ago" },
  { id: 5, title: "Showcase: I built a real-time chat app with Socket.io and Next.js", author: "Nina Petrova", avatar: "https://picsum.photos/seed/avatar5/40/40", replies: 5, likes: 67, tag: "showcase", time: "3 days ago" },
];

const tagColors: { [key: string]: string } = {
  backend: "bg-blue-100 text-blue-800",
  frontend: "bg-purple-100 text-purple-800",
  algorithms: "bg-green-100 text-green-800",
  react: "bg-sky-100 text-sky-800",
  showcase: "bg-pink-100 text-pink-800",
};


export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = forumPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-10">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-lg text-muted-foreground mt-1">Ask questions, share projects, and learn together.</p>
        </div>
        <Button className="mt-4 md:mt-0">
            <PenSquare className="mr-2 h-4 w-4" /> Start a New Discussion
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column: Posts */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
               <Tabs defaultValue="latest" className="w-full">
                  <TabsList>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                    <TabsTrigger value="top">Top</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative w-full max-w-xs">
                    <Input 
                        placeholder="Search discussions..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y">
                 {filteredPosts.map(post => (
                   <div key={post.id} className="p-4 flex items-start gap-4 hover:bg-accent/50 transition-colors">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                          <Link href="#" className="font-semibold hover:text-primary transition-colors text-lg">{post.title}</Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                             <Badge variant="secondary" className={tagColors[post.tag]}>{post.tag}</Badge>
                             <span>·</span>
                             <span>Posted by {post.author}</span>
                             <span>·</span>
                             <span>{post.time}</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                           <ThumbsUp className="w-4 h-4" />
                           <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <MessageSquare className="w-4 h-4" />
                           <span>{post.replies}</span>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
                {filteredPosts.length === 0 && (
                    <div className="text-center p-16">
                        <p className="text-muted-foreground">No discussions found matching your search.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-6">
                {/* Pagination could go here */}
            </CardFooter>
          </Card>
        </div>
        
        {/* Right Column: Info & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {Object.keys(tagColors).map(tag => (
                    <Badge key={tag} variant="secondary" className={`cursor-pointer hover:shadow-md transition-shadow ${tagColors[tag]}`}>{tag}</Badge>
                ))}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Forum Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Discussions:</span> <span className="font-semibold">1,204</span></div>
                <div className="flex justify-between"><span>Members:</span> <span className="font-semibold">8,932</span></div>
                <div className="flex justify-between"><span>Online:</span> <span className="font-semibold">47</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
