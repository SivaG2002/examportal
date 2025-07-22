
"use client";

import { useExam } from '@/context/ExamProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { sectionDetails, Section } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export function SectionSelector() {
  const { startSection, completedSections, examData } = useExam();
  
  if (!examData) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="text-center p-6">
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-10 w-full mt-2" />
                    </div>
                </Card>
            ))}
        </div>
    )
  }

  const sections = examData.sections.map(s => ({
      key: s.name.toLowerCase().replace(/ /g, ''),
      name: s.name,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sections.map((section) => {
        const isCompleted = completedSections.includes(section.key);
        const details = sectionDetails[section.key] || sectionDetails['english']; // fallback icon
        const Icon = details.icon;
        
        return (
          <Card
            key={section.key}
            className={cn(
              "text-center transition-all transform hover:scale-105 hover:shadow-xl",
              isCompleted && "bg-muted/50 opacity-60"
            )}
          >
            <CardHeader className="items-center">
              <div className={cn("p-4 rounded-full mb-4", isCompleted ? "bg-gray-300" : "bg-primary/20")}>
                <Icon className={cn("h-10 w-10", isCompleted ? "text-gray-500" : "text-primary")} />
              </div>
              <CardTitle className="text-2xl font-semibold">{section.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {isCompleted ? (
                <div className="flex items-center justify-center text-green-600 font-medium">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Completed
                </div>
              ) : (
                <Button onClick={() => startSection(section.key)} size="lg" className="w-full" variant="default">
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
