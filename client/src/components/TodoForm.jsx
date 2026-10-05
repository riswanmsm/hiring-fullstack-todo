import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Task title cannot be empty.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    const result = await onAdd({
      title: title.trim(),
      description: description.trim(),
    });

    setIsSubmitting(false);

    if (result.success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-8 transition-shadow hover:shadow-md"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="todo-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            id="todo-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="What needs to be done?"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
              validationError
                ? 'border-red-400 focus:ring-red-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {validationError && (
            <p className="text-xs text-red-500 mt-1.5 font-medium">{validationError}</p>
          )}
        </div>

        <div>
          <label htmlFor="todo-desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
            Description <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="todo-desc"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add context, specifications, or notes..."
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <PlusCircle size={16} />
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
};