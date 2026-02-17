"use client";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-purple-500 animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="mt-4 text-zinc-400 text-sm font-medium animate-pulse tracking-wide">
        LOADING TASKS...
      </p>
    </div>
  );
}
