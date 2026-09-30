import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { Accent, Section } from '@/components/portfolio/section';
import { projects, type Project } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function BrowserFrame({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-elevated shadow-soft">
      <div aria-hidden className="flex h-8 items-center gap-3 border-b border-line px-3">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-canvas/70 px-3 py-0.5 font-mono text-[0.65rem] text-ink-subtle">
          {hostname(project.link)}
        </span>
        <span className="w-8" />
      </div>
      <div className="relative aspect-16/10 overflow-hidden bg-canvas">
        <Image
          src={project.image}
          alt={`Captura de tela do projeto ${project.title}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article
      className={cn(
        'spotlight reveal group relative flex min-w-0 flex-col gap-6 rounded-[var(--radius)] border border-line bg-surface/70 p-3 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand sm:p-4',
        featured && 'lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-10',
      )}
    >
      <BrowserFrame
        project={project}
        sizes={
          featured
            ? '(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw'
            : '(min-width: 768px) 560px, 100vw'
        }
      />

      <div className={cn('flex flex-1 flex-col px-2 pb-2', featured && 'lg:py-4 lg:pr-6')}>
        <div className="flex flex-wrap items-center gap-2">
          <Tag variant="brand" size="sm">
            {project.kind}
          </Tag>
          {featured ? (
            <Tag size="sm" variant="outline">
              Destaque
            </Tag>
          ) : null}
        </div>

        <h3
          className={cn(
            'mt-4 font-semibold tracking-[-0.02em] text-ink',
            featured ? 'text-3xl' : 'text-2xl',
          )}
        >
          {/* O link cobre o cartão inteiro, mas só o título é o nome acessível. */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-none after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
          >
            {project.title}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </h3>

        <p className="mt-3 text-pretty leading-relaxed text-ink-muted">{project.description}</p>

        {featured && project.highlights.length ? (
          <ul className="mt-5 grid gap-2 text-sm text-ink-muted">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.stack.map((item) => (
            <li key={item}>
              <Tag variant="outline" size="sm">
                {item}
              </Tag>
            </li>
          ))}
        </ul>

        <span
          aria-hidden
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand"
        >
          Ver ao vivo
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section
      id="projetos"
      index="05"
      eyebrow="Projetos"
      title={
        <>
          Alguns projetos que eu <Accent>construí</Accent>.
        </>
      }
      description="Do projeto pessoal ao TCC: cada um me ensinou algo diferente sobre construir para pessoas reais."
    >
      <div className="grid gap-4">
        <ProjectCard project={featured} featured />
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
