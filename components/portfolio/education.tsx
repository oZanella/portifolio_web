import { GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { education } from '@/lib/portfolio-data';

export function Education() {
  return (
    <section id="educacao" className="pt-24">
      <Container>
        <SectionHeading
          eyebrow="educação"
          title="Formação acadêmica"
          description="Base acadêmica em tecnologia com foco em desenvolvimento de software."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-1">
          {education.map((item) => (
            <article
              key={`${item.school}-${item.course}`}
              className="group flex flex-col gap-6 rounded-3xl border surface-card p-8 transition-all hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                  {item.period}
                </span>
                <h3 className="font-heading mt-2 text-xl font-semibold text-tone">
                  {item.course}
                </h3>
                <p className="mt-2 text-tone-secondary font-medium">
                  {item.school}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
