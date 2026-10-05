import React from 'react';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, isLoading, error } = useTodos();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Task Manager</h1>
        <p className="text-slate-500 mt-2 text-sm">Full-Stack TODO with Optimistic UI</p>
      </header>
      
      {isLoading && <p className="text-center text-slate-500">Loading tasks...</p>}
      {error && <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      
      <div className="text-sm text-slate-400 text-center">
        State initialized. Total items: {todos.length}
      </div>
    </div>
  );
}

export default App;