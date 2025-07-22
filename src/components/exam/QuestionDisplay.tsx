
"use client";

import { useExam } from '@/context/ExamProvider';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Answer } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function QuestionDisplay() {
  const {
    currentSection,
    currentQuestionIndex,
    answers,
    saveAnswer,
    selectQuestion,
    submitSection,
    examData,
  } = useExam();

  if (currentSection === null || !examData) {
      return (
        <div className="space-y-8">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
      )
  };

  const sectionData = examData.sections.find(s => s.name.toLowerCase().replace(/ /g, '') === currentSection);
  if (!sectionData) return <div>Section not found.</div>

  const totalQuestions = sectionData.questions.length;
  const questionData = sectionData.questions[currentQuestionIndex];
  const currentAnswer: Answer | undefined = answers[currentSection]?.[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      selectQuestion(currentQuestionIndex + 1);
    }
  };

  const handleDoubtToggle = () => {
    saveAnswer(currentSection, currentQuestionIndex, { isMarkedForDoubt: !currentAnswer?.isMarkedForDoubt });
  }

  const handleAnswerChange = (value: string) => {
    saveAnswer(currentSection, currentQuestionIndex, { answer: value });
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardDescription className="font-semibold">Question {currentQuestionIndex + 1} of {totalQuestions}</CardDescription>
        <CardTitle className="text-2xl leading-relaxed">{questionData.question}</CardTitle>
      </CardHeader>
      
      <div className="p-6 pt-0">
        <RadioGroup
            value={currentAnswer?.answer}
            onValueChange={handleAnswerChange}
            className="space-y-4"
        >
          {Object.entries(questionData.options).map(([key, optionText]) => (
            <Label key={key}
              className={cn("flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-accent",
                currentAnswer?.answer === key ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <RadioGroupItem value={key} id={`option-${key}`} />
              <span className="font-bold mr-2">{key}.</span>
              <span className="text-base">{optionText}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-4 mt-4">
        <Button 
            variant={currentAnswer?.isMarkedForDoubt ? 'secondary' : 'outline'} 
            onClick={handleDoubtToggle}
            className={cn("w-full sm:w-auto", currentAnswer?.isMarkedForDoubt && "bg-yellow-200 text-yellow-900 hover:bg-yellow-300")}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          {currentAnswer?.isMarkedForDoubt ? 'Unmark Doubt' : 'Mark for Doubt'}
        </Button>
        <div>
          {isLastQuestion ? (
            <Button onClick={submitSection} size="lg" variant="default" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
              Submit Section <Check className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" variant="default" className="w-full sm:w-auto">
              Next Question <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
