import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <li
      className={`group flex items-start justify-between gap-4 p-4 rounded-xl border transition-all duration-200 ${
        todo.done
          ? 'bg-slate-50 border-slate-200 opacity-60'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <button
          type="button"
          onClick={() => onToggle(todo._id)}
          aria-label={todo.done ? 'Mark as incomplete' : 'Mark as complete'}
          className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer focus:outline-none"
        >
          {todo.done ? (
            <CheckCircle2 size={20} className="text-emerald-600" />
          ) : (
            <Circle size={20} className="hover:stroke-indigo-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-semibold truncate ${
              todo.done ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-xs mt-1 leading-relaxed ${
                todo.done ? 'line-through text-slate-400' : 'text-slate-500'
              }`}
            >
              {todo.description}
            </p>
          )}
          <span className="inline-block text-[10px] text-slate-400 mt-2 font-mono">
            {new Date(todo.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          aria-label="Edit task"
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer focus:outline-none"
        >
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo._id)}
          aria-label="Delete task"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer focus:outline-none"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
};