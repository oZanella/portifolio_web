import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      tone: {
        primary: "tone-base tone-primary",
        accent: "tone-base tone-accent",
        warm: "tone-base tone-warm",
        neutral: "tone-base tone-neutral",
      },
      variant: {
        soft: "tone-soft",
        solid: "tone-solid",
        outline: "tone-outline",
      },
    },
    defaultVariants: {
      tone: "neutral",
      variant: "soft",
    },
  }
);

interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function Tag({ className, tone, variant, ...props }: TagProps) {
  return (
    <span
      className={cn(tagVariants({ tone, variant }), className)}
      {...props}
    />
  );
}

export { tagVariants };
