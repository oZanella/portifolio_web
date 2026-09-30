import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border text-xs font-medium leading-none',
  {
    variants: {
      variant: {
        neutral: 'border-line bg-elevated/60 text-ink-muted',
        outline: 'border-line text-ink-muted',
        brand: 'border-brand/25 bg-brand/10 text-brand',
      },
      size: {
        sm: 'h-6 px-2.5',
        md: 'h-7 px-3',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
);

interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props} />
  );
}

export { tagVariants };
