"use client";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
      <div className="p-3 bg-red-500/10 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
      <p className="text-zinc-400 max-w-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl border border-zinc-700 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
