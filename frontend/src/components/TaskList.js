"use client";
import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
