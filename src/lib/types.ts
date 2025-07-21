import { Sigma, BookText, BarChart3 } from 'lucide-react';
import { z } from 'zod';

export type Section = 'math' | 'english' | 'analytics' | 'englishlanguage';

// Keep this for UI details, but the source of truth for section names will be the fetched data.
export const sectionDetails: { [key in Section]: { name: string; icon: React.FC<any> } } = {
    math: { name: 'Math', icon: Sigma },
    english: { name: 'English', icon: BookText },
    analytics: { name: 'Analytics', icon: BarChart3 },
    englishlanguage: { name: 'English Language', icon: BookText }
};

// Zod Schemas for data validation
export const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.record(z.string()),
  answer: z.string(),
});

export const ExamSectionSchema = z.object({
  name: z.string(),
  questions: z.array(QuestionSchema),
});

export const ExamDataSchema = z.object({
  exam: z.string(),
  year: z.number(),
  sections: z.array(ExamSectionSchema),
});


// TypeScript types inferred from Zod schemas
export type Question = z.infer<typeof QuestionSchema>;
export type ExamSection = z.infer<typeof ExamSectionSchema>;
export type ExamData = z.infer<typeof ExamDataSchema>;


export interface Answer {
  answer?: string; // This will be the key of the option, e.g., "A", "B"
  isMarkedForDoubt: boolean;
}

export type ExamAnswers = {
  [key in Section]?: { [questionIndex: number]: Answer };
};

export interface ExamState {
  user: { name: string; id: string } | null;
  currentSection: Section | null;
  completedSections: Section[];
  answers: ExamAnswers;
  currentQuestionIndex: number;
  sectionStartTime: number | null;
  examData: ExamData | null;
}

export interface ExamContextType extends ExamState {
  setUser: (user: { name: string; id: string }) => void;
  startSection: (section: Section) => void;
  selectQuestion: (index: number) => void;
  saveAnswer: (section: Section, questionIndex: number, answerData: Partial<Answer>) => void;
  submitSection: () => void;
  resetExam: () => void;
  getRemainingTime: () => number;
}
