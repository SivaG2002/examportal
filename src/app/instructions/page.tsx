import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Clock, Sigma, BookText, BarChart3 } from 'lucide-react';

export default function InstructionsPage() {
  const instructions = [
    { icon: ListChecks, text: 'The exam consists of 3 sections: Math, English, and Analytics.' },
    { icon: Sigma, text: 'Each section contains 25 multiple-choice questions.' },
    { icon: Clock, text: 'You will have 30 minutes to complete each section.' },
    { icon: BookText, text: 'You can only attempt one section at a time.' },
    { icon: BarChart3, text: 'You can navigate between questions within a section.' },
  ];

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4">
                <ListChecks className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Exam Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {instructions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <item.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/countdown">Start Exam</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
