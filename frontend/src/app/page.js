"use client";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { 
  Terminal, 
  CheckCircle2, 
  Clock, 
  ListTodo,
  TrendingUp,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    isSubmitting,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addTask,
    toggleTaskStatus,
    deleteTask,
    refresh,
    stats
  } = useTasks();

  return (
    <div className="min-h-screen selection:bg-accent/30 lowercase">
      <div className="mesh-bg" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 md:px-12 lg:py-20">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-slide-up">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
                <Cpu className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Task<span className="text-accent">Manager_</span>
              </h1>
            </div>
            <p className="text-muted text-lg max-w-md font-medium leading-relaxed">
              Streamline your workflow with our advanced objective management system.
            </p>
          </div>

          {/* Productivity Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-w-[300px]">
            <StatCard 
              label="Total" 
              value={stats.total} 
              icon={<ListTodo className="w-4 h-4" />}
              color="text-accent"
            />
            <StatCard 
              label="Completed" 
              value={stats.completed} 
              icon={<CheckCircle2 className="w-4 h-4" />}
              color="text-success"
            />
            <StatCard 
              label="Active" 
              value={stats.pending} 
              icon={<Clock className="w-4 h-4" />}
              color="text-pending"
              className="col-span-2 sm:col-span-1"
            />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Task Creation */}
          <aside className="lg:col-span-4 space-y-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <TaskForm onAdd={addTask} isSubmitting={isSubmitting} />
            
            <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10 space-y-4">
              <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" />
                Performance Insights
              </div>
              <p className="text-muted text-sm leading-relaxed">
                You&apos;ve completed {Math.round((stats.completed / (stats.total || 1)) * 100)}% of your tasks. Keep up the momentum to reach your daily milestones.
              </p>
            </div>
          </aside>

          {/* Right Column: Task Management */}
          <main className="lg:col-span-8 space-y-8">
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <FilterBar activeFilter={statusFilter} onFilterChange={setStatusFilter} />
            </div>

            {/* Task List Area */}
            <section className="min-h-[600px] animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {error ? (
                <ErrorState message={error} onRetry={refresh} />
              ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-48 rounded-3xl bg-card/20 animate-pulse border border-card-border/50" />
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-accent" />
                      Live Feed
                    </h2>
                    <div className="h-px flex-1 mx-6 bg-gradient-to-r from-card-border/50 to-transparent" />
                    <span className="text-xs font-bold text-muted uppercase tracking-widest bg-card/40 border border-card-border px-3 py-1 rounded-full">
                      {tasks.length} items
                    </span>
                  </div>
                  
                  <TaskList 
                    tasks={tasks} 
                    onToggle={toggleTaskStatus} 
                    onDelete={deleteTask} 
                  />
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, className }) {
  return (
    <div className={`p-5 rounded-3xl bg-card/40 backdrop-blur-md border border-card-border flex flex-col gap-2 group hover:border-accent/30 transition-all duration-300 ${className}`}>
      <div className={`flex items-center justify-between ${color}`}>
        <span className="text-xs font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
        {icon}
      </div>
      <p className="text-3xl font-bold text-foreground tracking-tight">
        {value}
      </p>
    </div>
  );
}
