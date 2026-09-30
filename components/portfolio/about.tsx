import { Accent, Section } from '@/components/portfolio/section';
import { principles, profile } from '@/lib/portfolio-data';

export function About() {
  const [stack, transition, academic] = profile.about;

  return (
    <Section
      id="sobre"
      index="01"
      eyebrow="Sobre"
      title={
        <>
          Do <Accent>suporte</Accent> ao código.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="text-pretty text-xl leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
            {transition}
          </p>
          <p className="text-pretty leading-relaxed text-ink-muted">{stack}</p>
          <p className="text-pretty leading-relaxed text-ink-muted">{academic}</p>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow reveal mb-4">Como eu trabalho</p>
          <ol className="grid gap-3 sm:grid-cols-2">
            {principles.map((item, index) => (
              <li
                key={item.title}
                className="spotlight reveal group flex flex-col rounded-[var(--radius)] border border-line bg-surface/70 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="flex items-center justify-between font-mono text-xs text-ink-subtle">
                  <span className="text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-8 bg-line-strong transition-[width,background-color] duration-500 group-hover:w-14 group-hover:bg-brand"
                  />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty text-[0.94rem] leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
