'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

type Toast = { id: number; message: string; tone: 'success' | 'error' };
type Notify = (message: string, tone?: Toast['tone']) => void;

const ToastContext = createContext<Notify | null>(null);

const DURATION = 2600;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback<Notify>((message, tone = 'success') => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message, tone });
    timer.current = setTimeout(() => setToast(null), DURATION);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <ToastContext.Provider value={notify}>
      {children}
      {/* A região aria-live existe sempre, para leitores de tela anunciarem a mudança. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[80] flex justify-center px-4"
      >
        {toast ? (
          <div
            key={toast.id}
            className="glass flex max-w-full items-center gap-2.5 rounded-full border border-line py-2.5 pl-3 pr-4 text-sm text-ink shadow-lift [animation:pop-in_300ms_var(--ease-out-expo)]"
          >
            <span
              className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-full',
                toast.tone === 'success'
                  ? 'bg-brand text-on-brand'
                  : 'bg-danger text-white',
              )}
            >
              {toast.tone === 'success' ? (
                <Check className="size-3.5" strokeWidth={3} aria-hidden />
              ) : (
                <CircleAlert className="size-3.5" strokeWidth={3} aria-hidden />
              )}
            </span>
            <span className="min-w-0 truncate">{toast.message}</span>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast precisa estar dentro de <ToastProvider>');
  return context;
}
