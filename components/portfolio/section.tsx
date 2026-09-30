import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Casca padrão das seções: numeração, título com âncora acessível e
 * `tabIndex=-1` para receber o foco quando navegada pelo menu/paleta.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  aside,
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-titulo`;

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={titleId}
      className={cn('relative py-20 outline-none sm:py-28', className)}
    >
      <Container>
        <header className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 font-mono text-xs text-ink-subtle">
              <span className="text-brand">{index}</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span className="uppercase tracking-[0.14em]">{eyebrow}</span>
            </p>
            <h2
              id={titleId}
              className="text-balance-safe mt-5 text-[clamp(2rem,3.6vw+0.9rem,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </header>

        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  );
}

/** Palavra de destaque em serifa itálica, usada nos títulos. */
export function Accent({ children }: { children: ReactNode }) {
  return <span className="accent-serif pr-[0.06em] text-[1.08em]">{children}</span>;
}
