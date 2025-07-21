'use server';
/**
 * @fileOverview A flow to retrieve exam data.
 *
 * - getExamData - A function that returns the exam data.
 * - ExamDataSchema - The Zod schema for the exam data.
 * - ExamData - The TypeScript type for the exam data.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {examData as staticExamData} from '@/lib/exam-data';
import { QuestionSchema, ExamSectionSchema, ExamDataSchema } from '@/lib/types';
import type { ExamData } from '@/lib/types';


export { type ExamData };

const getExamDataFlow = ai.defineFlow(
  {
    name: 'getExamDataFlow',
    inputSchema: z.void(),
    outputSchema: ExamDataSchema,
  },
  async () => {
    // In a real application, you might fetch this from a database.
    return staticExamData;
  }
);

export async function getExamData(): Promise<ExamData> {
  return getExamDataFlow();
}
