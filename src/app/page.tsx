import { UserForm } from '@/components/exam/UserForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PenSquare } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="items-center text-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4">
              <PenSquare className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">ExPortal</CardTitle>
            <CardDescription>Welcome! Please enter your details to begin.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
