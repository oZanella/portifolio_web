import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { experience } from '@/lib/portfolio-data';

export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-24 pt-24">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="experiência"
          title="Trajetória profissional"
        />

        <div className="mt-14 border-l border-[hsl(var(--tone-border))] pl-6 md:pl-10">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="reveal relative pb-12 last:pb-0"
            >
              <span className="absolute -left-7.25 top-1.5 flex h-2.5 w-2.5 md:-left-11.25">
                <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--tone-primary))] ring-4 ring-[hsl(var(--tone-surface))]" />
              </span>

              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-tone md:text-2xl">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-[hsl(var(--tone-primary))]">
                    {item.company}
                  </p>
                </div>
                <span className="section-index shrink-0 text-xs uppercase tracking-[0.2em]">
                  {item.period}
                </span>
              </div>

              <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-tone-secondary md:text-base">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--tone-primary))]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
