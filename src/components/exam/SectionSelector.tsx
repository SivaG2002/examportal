"use client";

import { useExam } from '@/context/ExamProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sectionDetails, Section } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SectionSelector() {
  const { startSection, completedSections } = useExam();
  const sections = Object.keys(sectionDetails) as Section[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sections.map((section) => {
        const isCompleted = completedSections.includes(section);
        const details = sectionDetails[section];
        return (
          <Card
            key={section}
            className={cn(
              "text-center transition-all transform hover:scale-105 hover:shadow-xl",
              isCompleted && "bg-muted/50 opacity-60"
            )}
          >
            <CardHeader className="items-center">
              <div className={cn("p-4 rounded-full mb-4", isCompleted ? "bg-gray-300" : "bg-primary/20")}>
                <details.icon className={cn("h-10 w-10", isCompleted ? "text-gray-500" : "text-primary")} />
              </div>
              <CardTitle className="text-2xl font-semibold">{details.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {isCompleted ? (
                <div className="flex items-center justify-center text-green-600 font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Completed
                </div>
              ) : (
                <Button onClick={() => startSection(section)} size="lg" className="w-full" variant="default">
                  Start Section
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
