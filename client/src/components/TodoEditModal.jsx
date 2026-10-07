import React, { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';

export const TodoEditModal = ({ isOpen, todo, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setValidationError('');
      setSubmitError('');
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Title cannot be empty');
      return;
    }

    setValidationError('');
    setSubmitError('');
    setIsSubmitting(true);
    const result = await onSave(todo._id, {
      title: title.trim(),
      description: description.trim(),
    });
    setIsSubmitting(false);

    if (result.success) {
      onClose();
    } else if (result.error) {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X size={18} />
        </button>

        <h3 className="text-base font-bold text-slate-800 mb-4">Edit Task</h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (validationError) setValidationError('');
              }}
              className="w-full px-3 py-2 border rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {validationError && (
              <p className="text-xs text-red-500 mt-1">{validationError}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              disabled={isSubmitting}
              onChange={(e) => {
                setDescription(e.target.value);
                if (submitError) setSubmitError('');
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {submitError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
              <span className="font-medium">{submitError}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};