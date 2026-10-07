import { useState } from 'react';
import { PlusCircle, Loader2, AlertCircle } from 'lucide-react';

export const TodoForm = ({ onAdd, disabled = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBusy = isSubmitting || disabled;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;
    if (!title.trim()) {
      setValidationError('Task title cannot be empty.');
      return;
    }

    setValidationError('');
    setSubmitError('');
    setIsSubmitting(true);

    const result = await onAdd({
      title: title.trim(),
      description: description.trim(),
    });

    setIsSubmitting(false);

    if (result.success) {
      setTitle('');
      setDescription('');
      setSubmitError('');
    } else if (result.error) {
      setSubmitError(result.error);
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
            disabled={isBusy}
            onChange={(e) => {
              setTitle(e.target.value);
              if (validationError) setValidationError('');
              if (submitError) setSubmitError('');
            }}
            placeholder="What needs to be done?"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed ${
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
            disabled={isBusy}
            onChange={(e) => {
              setDescription(e.target.value);
              if (submitError) setSubmitError('');
            }}
            placeholder="Add context, specifications, or notes..."
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed"
          />
        </div>

        {submitError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2.5 animate-in fade-in duration-150">
            <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
            <span className="font-medium">{submitError}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Adding task...</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};