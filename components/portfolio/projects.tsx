import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { projects } from '@/lib/portfolio-data';

export function Projects() {
  return (
    <section id="projetos" className="scroll-mt-24 pt-24">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="projetos"
          title="Alguns projetos recentes"
        />

        <div className="reveal mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border surface-card"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[hsl(var(--tone-surface))] via-transparent to-transparent opacity-70" />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border surface-strong text-tone opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold text-tone">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tone-secondary">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Tag key={item} tone="neutral" variant="outline">
                      {item}
                    </Tag>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--tone-primary))]">
                  Ver projeto
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
