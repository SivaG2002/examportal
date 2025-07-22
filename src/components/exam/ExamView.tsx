
"use client";

import { useExam } from '@/context/ExamProvider';
import { ProgressTracker } from './ProgressTracker';
import { QuestionDisplay } from './QuestionDisplay';
import { Timer } from './Timer';
import { sectionDetails } from '@/lib/types';
import { Button } from '../ui/button';
import { LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

export function ExamView() {
  const { currentSection, submitSection, examData } = useExam();

  if (!currentSection || !examData) return null;
  
  const sectionKey = currentSection.toLowerCase().replace(/ /g, '');
  const sectionData = examData.sections.find(s => s.name.toLowerCase().replace(/ /g, '') === sectionKey);
  const details = sectionDetails[sectionKey] || sectionDetails['english']; // fallback
  const Icon = details.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
      <div className="lg:col-span-9">
        <div className="bg-card rounded-xl shadow-lg p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl md:text-3xl font-bold">{sectionData?.name || 'Section'}</h1>
              </div>
              <div className="flex items-center gap-4">
                <Timer />
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open Palette</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="text-xl font-bold mb-4 text-center">Question Palette</SheetTitle>
                            </SheetHeader>
                            <ProgressTracker />
                            <Button variant="destructive" className="w-full mt-6" onClick={submitSection}>
                                <LogOut className="mr-2 h-4 w-4"/>
                                Submit Section
                            </Button>
                        </SheetContent>
                    </Sheet>
                </div>
              </div>
          </div>
          <div className="flex-grow">
            <QuestionDisplay />
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 hidden lg:block">
        <div className="bg-card rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-center">Question Palette</h2>
            <ProgressTracker />
            <Button variant="destructive" className="w-full mt-6" onClick={submitSection}>
                <LogOut className="mr-2 h-4 w-4"/>
                Submit Section
            </Button>
        </div>
      </div>
    </div>
  );
}
