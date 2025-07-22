
"use client";

import { useExam } from '@/context/ExamProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Award, CheckCircle, HelpCircle, XCircle, Home } from 'lucide-react';
import { Section, sectionDetails } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function ResultsPage() {
  const { user, answers, completedSections, resetExam, examData } = useExam();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || !examData) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 md:p-8">
            <div className="max-w-4xl w-full space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
    );
  }

  const sections = examData.sections.map(s => s.name.toLowerCase().replace(' ', '') as Section);
  const totalQuestionsPerSection = examData.sections[0]?.questions.length || 25;

  const calculateStats = (section: Section) => {
    const sectionAnswers = answers[section] || {};
    const sectionIndex = examData.sections.findIndex(s => s.name.toLowerCase().replace(' ', '') === section);
    const questions = examData.sections[sectionIndex].questions;

    const attempted = Object.values(sectionAnswers).filter(a => a.answer).length;
    const correct = Object.values(sectionAnswers).filter((a, i) => {
      const question = questions[i];
      return question && a.answer === question.answer;
    }).length;
    const markedForDoubt = Object.values(sectionAnswers).filter(a => a.isMarkedForDoubt).length;
    return { attempted, correct, markedForDoubt };
  }

  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center items-center">
            <div className="p-3 bg-accent/20 rounded-full mb-4">
              <Award className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-4xl font-bold">Exam Results</CardTitle>
            <CardDescription className="text-lg">Congratulations, {user.name}! Here is your performance summary.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {examData.sections.map((sectionData, sectionIndex) => {
                 const sectionKey = sectionData.name.toLowerCase().replace(' ', '') as Section;
                 if (!completedSections.includes(sectionKey)) return null;

                 const stats = calculateStats(sectionKey);
                 const details = sectionDetails[sectionKey];
                 const Icon = details.icon;
                 
                 return (
                    <AccordionItem key={sectionKey} value={sectionKey}>
                      <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        <div className="flex items-center gap-4 flex-wrap">
                           <Icon className="h-6 w-6 text-primary" />
                           <span>{details.name}</span>
                           <Badge variant="secondary">{stats.attempted}/{totalQuestionsPerSection} Attempted</Badge>
                           <Badge variant="outline" className="text-green-600 border-green-600">{stats.correct} Correct</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {Array.from({length: totalQuestionsPerSection}, (_, i) => {
                                const question = examData.sections[sectionIndex].questions[i];
                                if (!question) return null;

                                const ans = answers[sectionKey]?.[i];
                                const isCorrect = ans?.answer === question.answer;
                                const isAttempted = !!ans?.answer;

                                return (
                                    <div key={i} className={cn("p-3 rounded-lg flex items-center gap-2 border", 
                                        !isAttempted && "bg-gray-100",
                                        isAttempted && !isCorrect && "bg-red-100 border-red-300",
                                        isCorrect && "bg-green-100 border-green-300"
                                    )}>
                                        <span className="font-bold text-sm">Q{i+1}:</span>
                                        {isAttempted ? (isCorrect ? 
                                            <CheckCircle className="h-5 w-5 text-green-600" /> : 
                                            <XCircle className="h-5 w-5 text-red-600" />
                                        ) : <span className="text-xs text-gray-500">Skipped</span>}
                                        {ans?.isMarkedForDoubt && <HelpCircle className="h-5 w-5 text-yellow-600 ml-auto" />}
                                    </div>
                                )
                            })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                 )
              })}
            </Accordion>
          </CardContent>
          <CardFooter className="flex justify-center mt-6">
            <Button onClick={resetExam} size="lg">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
