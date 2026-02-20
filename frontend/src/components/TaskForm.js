"use client";
import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { validateTask } from "../utils/validation";
import { cn } from "../utils/cn";

export default function TaskForm({ onAdd, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateTask(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await onAdd({ title, description });
    if (res.success) {
      setTitle("");
      setDescription("");
      setError(null);
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Plus className="w-6 h-6 text-indigo-500" />
        New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className={cn(
              "w-full bg-zinc-950/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-white transition-all placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40",
              error && "border-red-500/50 focus:ring-red-500/20"
            )}
          />
          {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
        </div>

        <textarea
          placeholder="Detailed description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-white transition-all placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 resize-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative overflow-hidden group py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
        >
          <div className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {isSubmitting ? "ADDING..." : "ADD TASK"}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </form>
    </div>
  );
}
