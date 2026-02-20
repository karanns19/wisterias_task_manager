"use client";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center rounded-[32px] border border-red-500/10 bg-red-500/5 backdrop-blur-md">
      <div className="p-4 bg-red-500/10 rounded-2xl mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">Connection Interrupted</h3>
      <p className="text-muted max-w-sm mb-8 leading-relaxed">
        {message || "We encountered an error while communicating with the neural link. Please verify your connection and try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-3 px-8 py-3 bg-foreground text-background font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          Re-establish Link
        </button>
      )}
    </div>
  );
}
