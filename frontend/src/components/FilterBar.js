"use client";
import { cn } from "../utils/cn";

export default function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { id: "all", label: "Overview" },
    { id: "pending", label: "Active" },
    { id: "completed", label: "Resolved" },
  ];

  return (
    <div className="flex bg-zinc-900/50 border border-zinc-800 p-1.5 rounded-2xl">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
            activeFilter === filter.id
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
              : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
