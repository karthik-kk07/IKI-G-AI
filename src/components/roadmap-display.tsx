'use client';

import { useState, useRef, DragEvent } from 'react';
import { Card } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoadmapDisplayProps {
  initialSteps: string[];
}

export function RoadmapDisplay({ initialSteps }: RoadmapDisplayProps) {
  const [steps, setSteps] = useState<string[]>(initialSteps);
  const [dragging, setDragging] = useState(false);
  const dragItemIndex = useRef<number | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    dragItemIndex.current = index;
    setDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, index: number) => {
    if (dragItemIndex.current === null) return;
    
    const newSteps = [...steps];
    const dragItemContent = newSteps[dragItemIndex.current];
    newSteps.splice(dragItemIndex.current, 1);
    newSteps.splice(index, 0, dragItemContent);
    
    setSteps(newSteps);
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItemIndex.current = null;
  };
  
  if (initialSteps.length === 0) {
    return <p className="text-muted-foreground">The AI did not produce a valid list of roadmap steps. Check the full response below.</p>;
  }

  return (
    <div className="space-y-4" onDragEnd={handleDragEnd}>
      {steps.map((step, index) => (
        <Card
          key={step + index}
          className={cn(
            'flex items-center p-4 bg-background hover:bg-accent/50 transition-all cursor-grab active:cursor-grabbing',
            dragging && dragItemIndex.current === index && 'opacity-50',
          )}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground mr-4 flex-shrink-0" />
          <p className="flex-grow text-base">{step}</p>
        </Card>
      ))}
    </div>
  );
}
