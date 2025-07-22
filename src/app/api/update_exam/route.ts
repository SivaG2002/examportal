
import {NextRequest, NextResponse} from 'next/server';
import {ExamDataSchema, type ExamData} from '@/lib/types';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * API route handler for updating exam data.
 * @param req The incoming request object.
 * @returns A response object.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the incoming data against the schema
    const validationResult = ExamDataSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid data format.',
          errors: validationResult.error.flatten().fieldErrors,
        },
        {status: 400}
      );
    }

    const examData: ExamData = validationResult.data;

    // In a real application, you would save this to a database.
    // For this example, we'll overwrite the src/lib/exam-data.ts file.
    const filePath = path.join(process.cwd(), 'src', 'lib', 'exam-data.ts');

    const fileContent = `
import type { ExamData } from './types';

export const examData: ExamData = ${JSON.stringify(examData, null, 2)};
`;
    await fs.writeFile(filePath, fileContent.trim());

    return NextResponse.json({
      message: 'Exam data updated successfully.',
      data: examData,
    });
  } catch (error) {
    console.error('Failed to process request:', error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({message: errorMessage}, {status: 500});
  }
}
