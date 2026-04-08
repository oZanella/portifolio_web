import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { TechMarquee } from '@/components/portfolio/tech-marquee';
import { skills } from '@/lib/portfolio-data';

export function Skills() {
  return (
    <section id="habilidades" className="pt-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="habilidades"
            title="Tecnologias que uso no dia a dia"
            description="Selecionei as tecnologias em que tenho mais confiança para entregar produtos modernos, escaláveis e bem cuidados."
          />
        </div>
        <TechMarquee className="mt-10" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="rounded-3xl border surface-card p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                {skill.title}
              </p>
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
