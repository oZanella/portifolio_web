import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { experience } from '@/lib/portfolio-data';

export function Experience() {
  return (
    <section id="experiencia" className="pt-24">
      <Container>
        <SectionHeading
          eyebrow="experiência"
          title="Trajetória profissional"
          description=""
        />
        <div className="mt-10 grid gap-6">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="rounded-3xl border surface-card p-6"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-tone">
                    {item.role}
                  </h3>
                  <p className="text-sm text-tone-secondary">{item.company}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                  {item.period}
                </span>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-tone-secondary">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="tone-base tone-primary">•</span>
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
