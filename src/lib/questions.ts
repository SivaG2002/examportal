import type { Question, Section } from './types';
import { examData } from './exam-data';

export const DURATION_PER_SECTION = 30 * 60 * 1000; // 30 minutes in milliseconds
export const TOTAL_QUESTIONS_PER_SECTION = 25;

const getQuestionsForSection = (sectionName: string): Question[] => {
    const sectionData = examData.sections.find(s => s.name.toLowerCase() === sectionName.toLowerCase());
    return sectionData ? sectionData.questions.slice(0, TOTAL_QUESTIONS_PER_SECTION) : [];
}

export const questions: { [key in Section]: Question[] } = {
  math: getQuestionsForSection('math'),
  english: getQuestionsForSection('english'),
  analytics: getQuestionsForSection('analytics'),
};
