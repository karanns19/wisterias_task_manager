"use client";
import { useState } from "react";
import { Plus, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskForm({ onAdd, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    const success = await onAdd({ title, description });
    if (success) {
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    }
  };

  return (
    <motion.div 
      layout
      className="bg-card/40 backdrop-blur-md border border-card-border rounded-3xl p-6 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-accent/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">Create Objective</h3>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="w-full bg-background/50 border border-card-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 rounded-2xl px-5 py-3 text-foreground placeholder:text-muted/50 outline-none transition-all duration-300"
            required
          />

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <textarea
                  placeholder="Add details (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-background/50 border border-card-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 rounded-2xl px-5 py-3 text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 min-h-[100px] resize-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between pt-2">
          {isExpanded && (
             <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          )}
          <div className="flex-1" />
          <button
            type="submit"
            disabled={!title.trim() || isSubmitting}
            className="flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-accent/20 active:scale-95"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Create Task
          </button>
        </div>
      </form>
    </motion.div>
  );
}
