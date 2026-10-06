import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoEditModal } from './components/TodoEditModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';
import { CheckSquare } from 'lucide-react';

function App() {
  const {
    todos,
    isLoading,
    error,
    clearError,
    addTodo,
    toggleTodoDone,
    removeTodo,
    editTodo,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <main className="max-w-2xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs">
              <CheckSquare size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">TaskFlow</h1>
              <p className="text-xs text-slate-500 font-medium">Spec-Driven Full-Stack TODO</p>
            </div>
          </div>

          {todos.length > 0 && (
            <div className="flex items-center justify-between mt-4 py-2.5 px-4 bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-500">
              <span>{completedCount} of {todos.length} tasks completed</span>
              <span className="font-mono text-indigo-600 font-semibold">
                {Math.round((completedCount / todos.length) * 100)}%
              </span>
            </div>
          )}
        </header>

        <Toast message={error} onClose={clearError} />

        <TodoForm onAdd={addTodo} />

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-16 bg-white border border-slate-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodoDone}
            onEdit={(todo) => setEditingTodo(todo)}
            onDelete={(todo) => setDeletingTodo(todo)}
          />
        )}

        <TodoEditModal
          isOpen={Boolean(editingTodo)}
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={editTodo}
        />

        <DeleteConfirmModal
          isOpen={Boolean(deletingTodo)}
          todo={deletingTodo}
          onClose={() => setDeletingTodo(null)}
          onConfirm={removeTodo}
        />
      </main>
    </div>
  );
}

export default App;