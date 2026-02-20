"use client";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyState({ message = "Terminal Clean" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-20 text-center rounded-[32px] border border-card-border/50 bg-card/10 backdrop-blur-sm"
    >
      <div className="p-6 bg-accent/5 rounded-full mb-8 text-accent/50 border border-accent/10">
        <Coffee className="w-12 h-12" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-3">{message}</h3>
      <p className="text-muted max-w-sm text-lg leading-relaxed">
        Everything is in order. Take a moment to breathe or start a new objective to begin your next session.
      </p>
    </motion.div>
  );
}
