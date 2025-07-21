import { Sigma, BookText, BarChart3 } from 'lucide-react';

export type Section = 'math' | 'english' | 'analytics';

export const sectionDetails: { [key in Section]: { name: string; icon: React.FC<any> } } = {
    math: { name: 'Math', icon: Sigma },
    english: { name: 'English', icon: BookText },
    analytics: { name: 'Analytics', icon: BarChart3 }
};


export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Answer {
  answer?: string;
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
