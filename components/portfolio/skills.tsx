import { Tag } from '@/components/ui/tag';
import { Accent, Section } from '@/components/portfolio/section';
import { TechMarquee } from '@/components/portfolio/tech-marquee';
import { skills } from '@/lib/portfolio-data';

export function Skills() {
  return (
    <Section
      id="stack"
      index="04"
      eyebrow="Stack"
      title={
        <>
          Ferramentas que uso <Accent>no dia a dia</Accent>.
        </>
      }
      description="Escolho a ferramenta pelo problema, mas é aqui que me sinto em casa."
    >
      <TechMarquee className="reveal" />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {skills.map((group, index) => (
          <article
            key={group.title}
            className="spotlight reveal flex flex-col rounded-[var(--radius)] border border-line bg-surface/70 p-6"
          >
            <p className="font-mono text-xs text-brand">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-ink">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{group.description}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
