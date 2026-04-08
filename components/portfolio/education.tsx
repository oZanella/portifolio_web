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
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <article
              key={`${item.school}-${item.course}`}
              className="rounded-3xl border surface-card p-6"
            >
              <h3 className="font-heading text-xl font-semibold text-tone">
                {item.course}
              </h3>
              <p className="mt-2 text-sm text-tone-secondary">{item.school}</p>
              <span className="mt-4 inline-flex text-xs uppercase tracking-[0.2em] text-tone-subtle">
                {item.period}
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
