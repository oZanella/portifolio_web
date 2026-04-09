import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Tag } from '@/components/ui/tag';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { projects } from '@/lib/portfolio-data';

export function Projects() {
  return (
    <section id="projetos" className="pt-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="projetos"
            title="Alguns projetos recentes"
            description=""
            align="left"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex h-full flex-col justify-between rounded-3xl border surface-card hover-border p-6 transition hover:-translate-y-1"
            >
              <div>
                <div className="relative h-40 overflow-hidden rounded-2xl border surface-card">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading mt-5 text-xl font-semibold text-tone">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-tone-secondary">
                  {project.description}
                </p>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Tag key={item} tone="neutral" variant="outline">
                      {item}
                    </Tag>
                  ))}
                </div>
                <a
                  className="mt-6 inline-flex items-center gap-2 text-sm tone-base tone-primary transition group-hover:opacity-90"
                  href={project.link}
                >
                  Ver projeto
                  <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
