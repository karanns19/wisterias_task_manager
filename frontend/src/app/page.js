"use client";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { 
  LayoutDashboard, 
  CheckCircle, 
  Clock, 
  Layers,
  Zap
} from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 font-sans selection:bg-indigo-500/30">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto p-4 md:p-8 grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
        
        {/* Sidebar Header & Task Form */}
        <aside className="space-y-8">
          <header className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/40">
                <Zap className="w-6 h-6 text-white text-shadow" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                Task<span className="text-indigo-500">Manager</span>
              </h1>
            </div>
          </header>

          <TaskForm onAdd={addTask} isSubmitting={isSubmitting} />

          {/* Productivity Stats */}
          <section className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-6 backdrop-blur-md">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Diagnostics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl">
                <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Total</p>
                <p className="text-2xl font-black text-white">{stats.total}</p>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold text-emerald-500/70 uppercase mb-1">Resolved</p>
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                </div>
                <p className="text-2xl font-black text-emerald-400">{stats.completed}</p>
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl col-span-2">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-bold text-amber-500/70 uppercase mb-1">Active Objectives</p>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-2xl font-black text-amber-400">{stats.pending}</p>
              </div>
            </div>
          </section>
        </aside>

        {/* Main Task List */}
        <main className="space-y-8">
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 sticky top-4 z-50 p-2">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterBar activeFilter={statusFilter} onFilterChange={setStatusFilter} />
          </div>

          {/* Task List Area */}
          <section className="min-h-[600px]">
            {error ? (
              <ErrorState message={error} onRetry={refresh} />
            ) : loading ? (
              <Loader />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-lg font-bold text-zinc-400 flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Objective Feed
                  </h2>
                  <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-bold text-zinc-500">
                    {tasks.length} {tasks.length === 1 ? 'TASK' : 'TASKS'} FOUND
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
  );
}
