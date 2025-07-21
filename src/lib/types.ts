export type Section = 'math' | 'english' | 'analytics';

export const sectionDetails: { [key in Section]: { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> } } = {
    math: { name: 'Math', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 6 6"/><path d="m15 12-6 6"/></svg> },
    english: { name: 'English', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
    analytics: { name: 'Analytics', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> }
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
