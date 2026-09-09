import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  success: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastMessage = { ...toast, id, type: toast.type || 'success' };

    setToasts(prev => [...prev.slice(-3), newToast]); // Keep maximum 4 toasts stacked

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'success' });
  }, [showToast]);

  const info = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'info' });
  }, [showToast]);

  const warning = useCallback((message: string, title?: string) => {
    showToast({ message, title, type: 'warning' });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, info, warning }}>
      {children}

      {/* Floating Toast Portal Container */}
      <div 
        aria-live="polite" 
        role="status" 
        className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-2 duration-200
              ${toast.type === 'success' 
                ? 'bg-white/95 border-emerald-200 text-amazon-text ring-1 ring-emerald-500/20' 
                : toast.type === 'warning'
                  ? 'bg-white/95 border-amber-200 text-amazon-text ring-1 ring-amber-500/20'
                  : 'bg-white/95 border-blue-200 text-amazon-text ring-1 ring-blue-500/20'}
            `}
          >
            {/* Toast Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-left">
              {toast.title && (
                <p className="font-bold text-xs text-amazon-text">{toast.title}</p>
              )}
              <p className="text-xs text-gray-700 leading-snug">{toast.message}</p>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onClick();
                    removeToast(toast.id);
                  }}
                  className="mt-1.5 text-xs font-bold text-amazon-link hover:underline block"
                >
                  {toast.action.label}
                </button>
              )}
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-0.5 rounded transition"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
