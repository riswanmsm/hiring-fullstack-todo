import { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer)
    }, [message, onClose])
    
    if (!message) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 animate-in slide-in-from-bottom-5 duration-200">
            <AlertCircle size={18} className="text-rose-400 shrink-0" />
            <span className="text-xs font-medium pr-2">{message}</span>
            <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss error"
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
                <X size={15} />
            </button>
        </div>
    );
};
  