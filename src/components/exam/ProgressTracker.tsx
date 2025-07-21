"use client";

import { useExam } from '@/context/ExamProvider';
import { Button } from '@/components/ui/button';
import { TOTAL_QUESTIONS_PER_SECTION } from '@/lib/questions';
import { cn } from '@/lib/utils';

export function ProgressTracker() {
  const { currentSection, answers, currentQuestionIndex, selectQuestion } = useExam();

  if (!currentSection) return null;

  const sectionAnswers = answers[currentSection] || {};

  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: TOTAL_QUESTIONS_PER_SECTION }, (_, i) => {
        const questionState = sectionAnswers[i];
        const isAttempted = !!questionState?.answer;
        const isMarkedForDoubt = !!questionState?.isMarkedForDoubt;
        const isActive = i === currentQuestionIndex;

        return (
          <Button
            key={i}
            onClick={() => selectQuestion(i)}
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={cn("h-10 w-10 text-base font-bold",
              isActive ? "bg-accent text-accent-foreground ring-2 ring-accent" : "",
              isAttempted && !isActive && "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
              isMarkedForDoubt && !isActive && "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
              isMarkedForDoubt && isAttempted && !isActive && "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200"
            )}
          >
            {i + 1}
          </Button>
        );
      })}
    </div>
  );
}
