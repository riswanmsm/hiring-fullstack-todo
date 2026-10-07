import { TodoItem } from './TodoItem';
import { Inbox } from 'lucide-react';

export const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
        <Inbox size={40} className="mx-auto text-slate-300 mb-3" />
        <h4 className="text-sm font-semibold text-slate-700">No tasks created yet</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          Add your first task above to populate your list.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};