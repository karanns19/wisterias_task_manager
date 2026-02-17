"use client";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative group flex-1">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Filter by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-12 py-3 text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-zinc-900 focus:border-indigo-500/30"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
