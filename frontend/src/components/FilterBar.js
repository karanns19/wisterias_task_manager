"use client";
import { cn } from "../utils/cn";

export default function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "pending" },
    { label: "Done", value: "completed" },
  ];

  return (
    <div className="flex bg-card/40 backdrop-blur-md border border-card-border p-1.5 rounded-2xl">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
            activeFilter === filter.value
              ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
              : "text-muted hover:text-foreground hover:bg-card/60"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
