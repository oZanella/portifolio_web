import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'group/button relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-on-brand shadow-[0_8px_24px_-10px_var(--brand)] hover:shadow-[0_12px_32px_-10px_var(--brand)] hover:brightness-[1.06]',
        secondary:
          'border border-line bg-surface text-ink shadow-soft hover:border-line-strong hover:bg-elevated',
        ghost: 'text-ink-muted hover:bg-elevated hover:text-ink',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm [&_svg]:size-4',
        md: 'h-11 px-5 text-sm [&_svg]:size-4',
        lg: 'h-12 px-6 text-[0.95rem] [&_svg]:size-[1.1rem]',
        icon: 'size-10 [&_svg]:size-[1.1rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? props : { type, ...props })}
    />
  );
}

export { buttonVariants };
