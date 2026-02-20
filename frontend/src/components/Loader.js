"use client";
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-10 h-10 text-accent animate-spin relative z-10" />
      </div>
      <p className="text-muted text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
        Synchronizing_
      </p>
    </div>
  );
}
