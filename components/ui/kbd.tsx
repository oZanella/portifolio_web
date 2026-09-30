import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line bg-elevated px-1.5 font-mono text-[0.68rem] font-medium leading-none text-ink-subtle shadow-[inset_0_-1px_0_var(--line)]',
        className,
      )}
      {...props}
    />
  );
}
