import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { TechMarquee } from '@/components/portfolio/tech-marquee';
import { skills } from '@/lib/portfolio-data';

export function Skills() {
  return (
    <section id="habilidades" className="scroll-mt-24 pt-24">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="habilidades"
          title="Tecnologias que uso no dia a dia"
        />

        <TechMarquee className="mt-12" />

        <div className="reveal mt-12 grid gap-6 md:grid-cols-3">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="card-lift rounded-3xl border surface-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="section-index text-xs font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                  {skill.title}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Tag key={item} tone="neutral" variant="soft">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
