import { Loader2 } from 'lucide-react';

/**
 * GlobalLoader renders a full-page backdrop overlay that prevents all user interactions
 * across the application whenever network requests (initial load or mutations) are in-flight.
 */
export const GlobalLoader = ({
  active = false,
  label = 'Connecting to server...',
  subtext = 'Please wait while we sync your tasks...',
}) => {
  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/30 backdrop-blur-xs cursor-wait select-none transition-all animate-in fade-in duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top indeterminate progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-indigo-200/80 overflow-hidden">
        <div className="bg-indigo-600 animate-indeterminate shadow-[0_0_10px_rgba(79,70,229,0.6)]" />
      </div>

      {/* Centered loader card */}
      <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200/80 flex flex-col items-center gap-3.5 max-w-xs w-full mx-4 text-center animate-in zoom-in-95 duration-150">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner">
          <Loader2 size={30} className="animate-spin text-indigo-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">{label}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtext}</p>
        </div>
      </div>
    </div>
  );
};
