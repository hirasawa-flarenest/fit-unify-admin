"use client";

import { Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Dumbbell className="w-12 h-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          FitUnify
        </h1>
      </div>
    </main>
  );
}