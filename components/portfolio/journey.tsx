import { GraduationCap } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { Accent, Section } from '@/components/portfolio/section';
import { education, experience } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export function Journey() {
  return (
    <Section
      id="trajetoria"
      index="02"
      eyebrow="Trajetória"
      title={
        <>
          Uma carreira que começou <Accent>ouvindo</Accent> quem usa o sistema.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ol className="relative lg:col-span-8">
          {/* trilho da linha do tempo */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[0.3125rem] top-2 w-px bg-linear-to-b from-brand/60 via-line-strong to-transparent"
          />

          {experience.map((item) => (
            <li key={`${item.company}-${item.role}`} className="reveal relative pb-12 pl-9 last:pb-0 sm:pl-12">
              <span
                aria-hidden
                className={cn(
                  'absolute left-0 top-1.5 size-2.75 rounded-full border-2 border-canvas',
                  item.current ? 'pulse-dot bg-brand' : 'bg-line-strong',
                )}
              />

              <p
                className={cn(
                  'font-mono text-xs',
                  item.current ? 'text-brand' : 'text-ink-subtle',
                )}
              >
                {item.period}
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-ink">
                {item.role}
              </h3>
              <p className="mt-1 text-sm font-medium text-brand">{item.company}</p>

              <p className="mt-4 max-w-2xl text-pretty text-lg leading-snug text-ink">
                {item.summary}
              </p>

              <ul className="mt-5 grid gap-2.5 text-[0.95rem] leading-relaxed text-ink-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong"
                    />
                    <span className="text-pretty">{bullet}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <aside aria-label="Formação" className="lg:col-span-4">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <p className="eyebrow reveal">Formação</p>
            {education.map((item) => (
              <article
                key={item.course}
                className="spotlight reveal rounded-[var(--radius)] border border-line bg-surface/70 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                    <GraduationCap className="size-5" aria-hidden />
                  </span>
                  <Tag size="sm">Graduado</Tag>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {item.course}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{item.school}</p>
                <p className="mt-1 font-mono text-xs text-ink-subtle">{item.period}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Destaques da formação">
                  {item.topics.map((topic) => (
                    <li key={topic}>
                      <Tag variant="outline" size="sm">
                        {topic}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}
