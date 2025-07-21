"use client";

import { useExam } from '@/context/ExamProvider';
import { questions, TOTAL_QUESTIONS_PER_SECTION } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Answer } from '@/lib/types';

export function QuestionDisplay() {
  const {
    currentSection,
    currentQuestionIndex,
    answers,
    saveAnswer,
    selectQuestion,
    submitSection,
  } = useExam();

  if (currentSection === null) return null;

  const questionData = questions[currentSection][currentQuestionIndex];
  const currentAnswer: Answer | undefined = answers[currentSection]?.[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS_PER_SECTION - 1) {
      selectQuestion(currentQuestionIndex + 1);
    }
  };

  const handleDoubtToggle = () => {
    saveAnswer(currentSection, currentQuestionIndex, { isMarkedForDoubt: !currentAnswer?.isMarkedForDoubt });
  }

  const handleAnswerChange = (value: string) => {
    saveAnswer(currentSection, currentQuestionIndex, { answer: value });
  }

  const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS_PER_SECTION - 1;

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardDescription className="font-semibold">Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS_PER_SECTION}</CardDescription>
        <CardTitle className="text-2xl leading-relaxed">{questionData.question}</CardTitle>
      </CardHeader>
      
      <div className="p-6 pt-0">
        <RadioGroup
            value={currentAnswer?.answer}
            onValueChange={handleAnswerChange}
            className="space-y-4"
        >
          {questionData.options.map((option, index) => (
            <Label key={index}
              className={cn("flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-accent",
                currentAnswer?.answer === option ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <span className="text-base">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      <CardFooter className="flex justify-between items-center mt-4">
        <Button 
            variant={currentAnswer?.isMarkedForDoubt ? 'secondary' : 'outline'} 
            onClick={handleDoubtToggle}
            className={cn(currentAnswer?.isMarkedForDoubt && "bg-yellow-200 text-yellow-900 hover:bg-yellow-300")}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          {currentAnswer?.isMarkedForDoubt ? 'Unmark Doubt' : 'Mark for Doubt'}
        </Button>
        <div>
          {isLastQuestion ? (
            <Button onClick={submitSection} size="lg" variant="default" className="bg-green-600 hover:bg-green-700">
              Submit Section <Check className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" variant="default">
              Next Question <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
