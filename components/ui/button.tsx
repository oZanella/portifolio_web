import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition focus-ring disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      tone: {
        primary: "tone-base tone-primary",
        accent: "tone-base tone-accent",
        warm: "tone-base tone-warm",
        neutral: "tone-base tone-neutral",
      },
      variant: {
        solid: "tone-solid",
        soft: "tone-soft",
        outline: "tone-outline",
        ghost: "border-transparent text-tone-secondary hover:text-tone",
      },
      size: {
        sm: "px-4 py-1.5 text-xs",
        md: "px-5 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      tone: "primary",
      variant: "solid",
      size: "md",
    },
  }
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
};

export function Button({
  className,
  tone,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ tone, variant, size }), className)}
      {...(asChild ? props : { type, ...props })}
    />
  );
}

export { buttonVariants };
