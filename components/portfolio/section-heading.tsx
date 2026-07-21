import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  align?: 'left' | 'right';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-4',
        align === 'right' && 'md:ml-auto md:items-end md:text-right',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3',
          align === 'right' && 'md:flex-row-reverse',
        )}
      >
        {index ? (
          <span className="section-index text-xs font-medium">{index}</span>
        ) : null}
        <span className="text-[0.65rem] uppercase tracking-[0.35em] text-tone-subtle">
          {eyebrow}
        </span>
        <span className="rule flex-1" />
      </div>
      <h2 className="font-heading text-3xl font-semibold leading-tight text-tone md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-tone-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
