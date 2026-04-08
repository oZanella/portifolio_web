import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-6xl px-6', className)}
      {...props}
    />
  );
}
