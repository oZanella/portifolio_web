'use client';

import { Check, Copy } from 'lucide-react';
import { contact } from '@/lib/portfolio-data';
import { useCopy } from '@/lib/use-copy';
import { cn } from '@/lib/utils';

export function CopyEmail({ className }: { className?: string }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(contact.email, 'E-mail copiado')}
      aria-label={`Copiar e-mail ${contact.email}`}
      className={cn(
        'group inline-flex max-w-full items-center gap-2 rounded-full py-1 text-sm text-ink-muted transition-colors hover:text-ink',
        className,
      )}
    >
      <span className="truncate underline decoration-line-strong decoration-dotted underline-offset-4 transition-colors group-hover:decoration-brand">
        {contact.email}
      </span>
      <span
        aria-hidden
        className={cn(
          'relative flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
          copied
            ? 'border-brand/40 bg-brand/15 text-brand'
            : 'border-line text-ink-subtle group-hover:border-line-strong group-hover:text-ink',
        )}
      >
        <Copy
          className={cn(
            'absolute size-3.5 transition-all duration-300',
            copied ? 'scale-50 opacity-0' : 'scale-100 opacity-100',
          )}
        />
        <Check
          strokeWidth={3}
          className={cn(
            'absolute size-3.5 transition-all duration-300 ease-[var(--ease-spring)]',
            copied ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
          )}
        />
      </span>
    </button>
  );
}
