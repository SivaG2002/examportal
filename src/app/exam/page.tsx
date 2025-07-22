
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useExam } from '@/context/ExamProvider';
import { SectionSelector } from '@/components/exam/SectionSelector';
import { ExamView } from '@/components/exam/ExamView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamPage() {
  const { user, currentSection, completedSections } = useExam();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (user && completedSections.length === 3) {
      router.replace('/results');
    }
  }, [completedSections, user, router]);

  if (!user) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-8">
      {currentSection ? (
        <ExamView />
      ) : (
        <div className="flex items-center justify-center h-full max-w-4xl mx-auto">
            <Card className="w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                        Choose a Section to Begin
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SectionSelector />
                </CardContent>
            </Card>
        </div>
      )}
    </main>
  );
}
