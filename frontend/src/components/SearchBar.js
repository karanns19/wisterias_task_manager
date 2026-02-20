"use client";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative group flex-1">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-muted transition-colors group-focus-within:text-accent" />
      </div>
      <input
        type="text"
        placeholder="Search objectives..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card/40 backdrop-blur-md border border-card-border hover:border-accent/30 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 rounded-2xl pl-12 pr-12 py-3.5 text-foreground placeholder:text-muted/50 outline-none transition-all duration-300"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
