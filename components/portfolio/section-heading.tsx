import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'right';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'right' && 'md:items-end md:text-right',
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-tone-subtle">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-semibold text-tone md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className=" text-sm text-tone-secondary">{description}</p>
      ) : null}
    </div>
  );
}
