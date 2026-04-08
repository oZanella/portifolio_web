import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { highlights, mainStack, metrics, profile } from '@/lib/portfolio-data';

export function Hero() {
  return (
    <section className="pt-10">
      <Container className="flex flex-col items-center text-center">
        <div className="flex max-w-4xl flex-col gap-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-tone-muted">
              {profile.role}
            </p>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-tone md:text-6xl">
              {profile.headline}
            </h1>
            <p className="mx-auto max-w-xl text-base text-tone-secondary md:text-lg">
              {profile.summary}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border surface-card p-4"
              >
                <p className="text-2xl font-semibold text-tone">{item.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-stretch">
            <div className="flex-1 rounded-3xl border surface-card p-6 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-tone-subtle">
                perfil
              </p>
              <h2 className="font-heading mt-3 text-2xl font-semibold text-tone">
                Resumo rápido
              </h2>
              <p className="mt-4 text-sm text-tone-secondary">
                Desenvolvimento de produtos web com arquitetura, interface e
                entrega. Experiência com startups, ERP e sistemas internos.
              </p>
              <div className="mt-6 grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border surface-muted px-4 py-3 text-sm text-tone-secondary"
                  >
                    <span>{item}</span>
                    <span className="tone-base tone-primary text-sm">+</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-3xl border surface-card p-6 text-left">
              <p className="text-xs uppercase tracking-[0.35em] text-tone-subtle">
                stack principal
              </p>
              <p className="mt-3 text-sm text-tone-secondary">
                Tecnologias que uso diariamente para construir produtos sólidos.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {mainStack.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 tech-chip ${item.tone}`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border tech-icon ${item.tone}`}
                    >
                      <TechIcon name={item.icon} label={item.label} />
                    </span>
                    <span
                      className={`text-sm font-medium tech-label ${item.tone}`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button tone="accent" variant="soft" size="lg">
              {profile.availability}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
