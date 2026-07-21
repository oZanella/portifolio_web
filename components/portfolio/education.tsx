import { GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { education } from '@/lib/portfolio-data';

export function Education() {
  return (
    <section id="educacao" className="scroll-mt-24 pt-24">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="educação"
          title="Formação acadêmica"
          description="Base acadêmica em tecnologia com foco em desenvolvimento de software."
        />

        <div className="reveal mt-12 grid gap-6">
          {education.map((item) => (
            <article
              key={`${item.school}-${item.course}`}
              className="card-lift group flex flex-col gap-6 rounded-3xl border surface-card p-8 md:flex-row md:items-center"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[hsl(var(--tone-primary)/0.25)] bg-[hsl(var(--tone-primary)/0.12)] text-[hsl(var(--tone-primary))]">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-xl font-semibold text-tone md:text-2xl">
                  {item.course}
                </h3>
                <p className="mt-1 font-medium text-tone-secondary">
                  {item.school}
                </p>
              </div>

              <span className="section-index shrink-0 text-xs uppercase tracking-[0.2em]">
                {item.period}
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
