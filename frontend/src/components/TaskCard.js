"use client";
import { CheckCircle2, Circle, Trash2, Calendar, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function TaskCard({ task, onToggle, onDelete }) {
  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300",
        "bg-card/40 backdrop-blur-sm border border-card-border hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5",
        task.completed ? "opacity-75" : ""
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => onToggle(task)}
            className={cn(
              "mt-1 flex-shrink-0 transition-all duration-300 rounded-full p-0.5",
              task.completed 
                ? "text-success bg-success/10" 
                : "text-muted hover:text-accent hover:bg-accent/10"
            )}
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6 border-2 border-transparent" />
            )}
          </button>

          <div className="flex flex-col gap-1">
            <h3
              className={cn(
                "text-lg font-medium tracking-tight transition-all duration-300",
                task.completed ? "text-muted line-through" : "text-foreground"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-sm leading-relaxed text-muted line-clamp-2",
                task.completed ? "opacity-50" : "opacity-90"
              )}>
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
           <button
            onClick={() => onDelete(task.id)}
            className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-muted hover:text-red-500 rounded-xl hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-card-border/50">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase",
            task.completed 
              ? "bg-success/10 text-success" 
              : "bg-pending/10 text-pending"
          )}>
            <div className={cn("w-1.5 h-1.5 rounded-full", task.completed ? "bg-success" : "bg-pending animate-pulse")} />
            {task.completed ? "Done" : "In Progress"}
          </div>
          
          <div className="flex items-center gap-1.5 text-muted text-[11px] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
        </div>
        
        <span className="text-[10px] font-mono text-muted/40 group-hover:text-accent/40 transition-colors">
          #{task.id.slice(-4)}
        </span>
      </div>
    </motion.div>
  );
}
