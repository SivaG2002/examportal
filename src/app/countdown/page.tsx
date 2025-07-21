"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CountdownPage() {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/exam');
    }
  }, [count, router]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-lg text-muted-foreground mb-4">The exam will begin in...</p>
        <div className="relative h-64 w-64">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <div className="relative flex items-center justify-center h-full w-full bg-primary/30 rounded-full">
            <h1 className="text-9xl font-bold text-primary-foreground animate-pulse">{count}</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
