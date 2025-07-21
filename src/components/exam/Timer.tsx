"use client";

import { useState, useEffect } from 'react';
import { useExam } from '@/context/ExamProvider';
import { Clock } from 'lucide-react';
import { useToast } from '../ui/use-toast';

export function Timer() {
  const { getRemainingTime, submitSection } = useExam();
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getRemainingTime();
      setRemainingTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        toast({
            title: "Time's up!",
            description: "Your section has been automatically submitted.",
            variant: "destructive",
        })
        submitSection();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime, submitSection, toast]);

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  const timeColor = remainingTime < 5 * 60 * 1000 ? 'text-destructive' : 'text-foreground';

  return (
    <div className={`flex items-center gap-2 font-mono text-xl font-bold p-2 rounded-lg bg-muted ${timeColor}`}>
      <Clock className="h-6 w-6" />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
}
