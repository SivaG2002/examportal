
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useExam } from '@/context/ExamProvider';
import { SectionSelector } from '@/components/exam/SectionSelector';
import { ExamView } from '@/components/exam/ExamView';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function ExamPage() {
  const { user, currentSection, completedSections, resetExam, examData } = useExam();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, router]);

  useEffect(() => {
    // Redirect to results if all sections are completed
    if (user && examData && completedSections.length === examData.sections.length) {
      router.replace('/results');
    }
  }, [completedSections, user, router, examData]);

  if (!user) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-8 flex items-center justify-center">
      {currentSection ? (
        <ExamView />
      ) : (
        <div className="flex items-center justify-center h-full max-w-4xl mx-auto w-full">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                        Choose a Section to Begin
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SectionSelector />
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                  <Button variant="outline" onClick={resetExam}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </CardFooter>
            </Card>
        </div>
      )}
    </main>
  );
}
