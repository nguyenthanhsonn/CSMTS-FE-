'use client';

import React, { createContext, useCallback, useContext, useMemo, useState, useRef } from 'react';
import { CheckCircle, Info, X, XCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_DURATION_MS = 4200;

const toastStyles: Record<ToastType, { icon: React.ReactNode; className: string; progressClassName: string }> = {
  success: {
    icon: <CheckCircle size={18} />,
    className: 'border-green-100 bg-green-50 text-green-700',
    progressClassName: 'bg-green-500',
  },
  error: {
    icon: <XCircle size={18} />,
    className: 'border-red-100 bg-red-50 text-red-700',
    progressClassName: 'bg-red-500',
  },
  info: {
    icon: <Info size={18} />,
    className: 'border-blue-100 bg-blue-50 text-blue-700',
    progressClassName: 'bg-blue-500',
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const lastToastRef = useRef<{ message: string; type: ToastType; timestamp: number } | null>(null);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, type: ToastType) => {
      const now = Date.now();

      // Deduplicate: từ chối nếu đã có toast cùng nội dung/loại trong 2 giây qua
      if (
        lastToastRef.current &&
        lastToastRef.current.message === message &&
        lastToastRef.current.type === type &&
        now - lastToastRef.current.timestamp < 2000
      ) {
        return;
      }

      // Deduplicate: từ chối nếu hiện đang có toast cùng nội dung/loại đang hiển thị
      setToasts((prev) => {
        const isDuplicate = prev.some((t) => t.message === message && t.type === type);
        if (isDuplicate) return prev;

        lastToastRef.current = { message, type, timestamp: now };
        const id = now + Math.random();
        window.setTimeout(() => removeToast(id), TOAST_DURATION_MS);
        return [...prev, { id, message, type, duration: TOAST_DURATION_MS }];
      });
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      success: (message: string) => pushToast(message, 'success'),
      error: (message: string) => pushToast(message, 'error'),
      info: (message: string) => pushToast(message, 'info'),
    }),
    [pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-9999 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type];

          return (
            <div
              key={toast.id}
              className={`relative overflow-hidden rounded-xl border text-sm font-semibold shadow-lg shadow-black/10 ${style.className}`}
              role="status"
            >
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="mt-0.5 shrink-0">{style.icon}</span>
                <p className="min-w-0 flex-1 leading-relaxed">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 rounded-lg p-1 opacity-70 transition hover:bg-white/60 hover:opacity-100"
                  aria-label="Đóng thông báo"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="h-1 w-full bg-black/5">
                <div
                  className={`h-full origin-left ${style.progressClassName}`}
                  style={{
                    animation: `toast-progress ${toast.duration}ms linear forwards`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <style jsx global>{`
        @keyframes toast-progress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return toast;
}
