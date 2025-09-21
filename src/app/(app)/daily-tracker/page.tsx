'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Plus, Trash, Edit, Save, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const taskSchema = z.object({
  text: z.string().min(1, 'Task cannot be empty.'),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: 'Solve 2 LeetCode problems (Easy)', completed: true },
  { id: 2, text: 'Watch a tutorial on React custom hooks', completed: true },
  { id: 3, text: 'Read a chapter of "Clean Code"', completed: false },
  { id: 4, text: 'Work on portfolio project for 1 hour', completed: false },
];

export default function DailyTrackerPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { text: '' },
  });

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    const newTask: Task = {
      id: Date.now(),
      text: data.text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    form.reset();
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };
  
  const saveEdit = (id: number) => {
    if (editingText.trim() === '') return;
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editingText } : task));
    setEditingTaskId(null);
    setEditingText('');
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Daily Tracker</CardTitle>
          <CardDescription>Stay organized and motivated by tracking your daily learning tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Daily Progress</p>
              <p className="text-sm font-bold">{Math.round(progress)}%</p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <motion.div 
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mb-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="e.g., Learn about closures in JavaScript" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </form>
          </Form>

          <div className="space-y-3">
            <AnimatePresence>
            {tasks.map((task) => (
               <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                className="flex items-center p-3 rounded-md border bg-background hover:bg-accent/50 group"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  id={`task-${task.id}`}
                  className="mr-4"
                />
                
                {editingTaskId === task.id ? (
                   <Input 
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                      className="flex-grow bg-transparent border-primary"
                   />
                ) : (
                  <label htmlFor={`task-${task.id}`} className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.text}
                  </label>
                )}

                <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   {editingTaskId === task.id ? (
                    <>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => saveEdit(task.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingTaskId(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                   ) : (
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditing(task)}>
                       <Edit className="h-4 w-4" />
                     </Button>
                   )}
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteTask(task.id)}>
                     <Trash className="h-4 w-4" />
                   </Button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
             {tasks.length === 0 && (
                <div className="text-center py-10 border-dashed border-2 rounded-md">
                    <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
                </div>
             )}
          </div>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">You have {totalTasks - completedTasks} tasks remaining.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
