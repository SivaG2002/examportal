import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function GatePage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader className="items-center">
            <div className="p-3 bg-primary/20 rounded-full mb-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Are you ready?</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">The exam is about to begin. Please ensure you are in a quiet environment and have a stable internet connection.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/instructions">Yes, I'm ready to continue</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
