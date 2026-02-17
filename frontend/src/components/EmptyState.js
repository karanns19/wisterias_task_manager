"use client";
import { Inbox } from "lucide-react";

export default function EmptyState({ message = "No tasks found" }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="p-4 bg-zinc-800/50 rounded-full mb-6 text-zinc-600">
        <Inbox className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-medium text-zinc-300 mb-2">{message}</h3>
      <p className="text-zinc-500 max-w-xs">
        Try adjusting your filters or add a new task to get started on your productivity journey.
      </p>
    </div>
  );
}
