"use client"
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

// Toast types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    const duration = toast.duration || 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Item Component
const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Progress bar animation
    const duration = toast.duration || 5000;
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 50));
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => removeToast(toast.id), 300);
  };

  const getTypeColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          text: 'text-green-400',
          icon: 'text-green-400',
          progress: 'bg-green-400',
          closeHover: 'hover:text-green-300'
        };
      case 'error':
        return {
          text: 'text-red-400',
          icon: 'text-red-400',
          progress: 'bg-red-400',
          closeHover: 'hover:text-red-300'
        };
      case 'warning':
        return {
          text: 'text-amber-400',
          icon: 'text-amber-400',
          progress: 'bg-amber-400',
          closeHover: 'hover:text-amber-300'
        };
      case 'info':
        return {
          text: 'text-blue-400',
          icon: 'text-blue-400',
          progress: 'bg-blue-400',
          closeHover: 'hover:text-blue-300'
        };
      default:
        return {
          text: 'text-gray-400',
          icon: 'text-gray-400',
          progress: 'bg-gray-400',
          closeHover: 'hover:text-gray-300'
        };
    }
  };

  const getIcon = () => {
    const colors = getTypeColors();
    const iconClass = `w-full h-full drop-shadow-sm ${colors.icon}`;
    switch (toast.type) {
      case 'success':
        return <CheckCircle className={iconClass} />;
      case 'error':
        return <AlertCircle className={iconClass} />;
      case 'warning':
        return <AlertTriangle className={iconClass} />;
      case 'info':
        return <Info className={iconClass} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  const colors = getTypeColors();

  return (
    <div
      className={`
        relative flex items-start gap-2 sm:gap-3 p-3 sm:p-4 mb-2 sm:mb-3 
        bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md
        border border-gray-700/50 shadow-2xl
        transition-all duration-300 ease-out transform overflow-hidden
        min-w-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto sm:mx-0
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
        <div 
          className={`h-full transition-all duration-75 ease-linear ${colors.progress}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-4 h-4 sm:w-5 sm:h-5">
          {getIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-1">
        <h4 className={`text-xs sm:text-sm font-bold tracking-wide leading-tight break-words ${colors.text}`}>
          {toast.title}
        </h4>
        {toast.description && (
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-tight break-words text-gray-300 font-medium">
            {toast.description}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className={`flex-shrink-0 p-1 text-gray-400 transition-colors duration-200  hover:bg-white/10 active:bg-white/20 touch-manipulation ${colors.closeHover}`}
      >
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 w-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};