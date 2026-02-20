"use client";
import { CheckCircle2, Circle, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
      className={cn(
        "group relative flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300",
        "bg-zinc-900/40 backdrop-blur-md border-zinc-800 shadow-xl",
        task.completed ? "border-emerald-500/20 bg-emerald-500/5" : ""
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => onToggle(task)}
            className={cn(
              "mt-1 flex-shrink-0 transition-colors duration-200",
              task.completed ? "text-emerald-500" : "text-zinc-600 hover:text-indigo-400"
            )}
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6 fill-emerald-500/10" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                "text-lg font-semibold transition-all duration-300",
                task.completed ? "text-zinc-500 line-through" : "text-zinc-100"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-sm leading-relaxed max-w-lg mb-2",
                task.completed ? "text-zinc-600" : "text-zinc-400"
              )}>
                {task.description}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-zinc-800/50">
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
          task.completed 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
        )}>
          {task.completed ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {task.completed ? "Completed" : "Pending"}
        </div>
        
        <span className="text-[10px] font-medium text-zinc-600">
          ID: #{task.id}
        </span>
      </div>
      {!task.completed && (
        <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent blur-sm opacity-50" />
      )}
    </motion.div>
  );
}
