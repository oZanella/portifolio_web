import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { HeroOrbit } from '@/components/portfolio/hero-orbit';
import { contact, mainStack, metrics, profile } from '@/lib/portfolio-data';

export function Hero() {
  return (
    <section className="relative pt-16 md:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna de texto */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            <div
              className="animate-enter flex items-center gap-3"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--tone-primary))]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--tone-primary))]" />
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-tone-secondary">
                {profile.availability}
              </span>
            </div>

            <div className="space-y-5">
              <p
                className="animate-enter text-sm uppercase tracking-[0.35em] text-tone-muted"
                style={{ animationDelay: '0.12s' }}
              >
                {profile.role}
              </p>
              <h1
                className="animate-enter font-heading text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
                style={{ animationDelay: '0.2s' }}
              >
                <span className="text-gradient">{profile.headline}</span>
              </h1>
              <p
                className="animate-enter max-w-xl text-base leading-relaxed text-tone-secondary"
                style={{ animationDelay: '0.3s' }}
              >
                {profile.about[0]}
              </p>
            </div>

            <div
              className="animate-enter flex flex-wrap items-center gap-3"
              style={{ animationDelay: '0.4s' }}
            >
              <Button tone="primary" variant="solid" size="lg" asChild>
                <a href="/CurriculoHenrique2026.pdf" download>
                  <Download className="h-4 w-4" />
                  Baixar CV
                </a>
              </Button>
              <Button tone="neutral" variant="outline" size="lg" asChild>
                <a href={`mailto:${contact.email}`}>
                  <Mail className="h-4 w-4" />
                  Entrar em contato
                </a>
              </Button>
            </div>

            <div
              className="animate-enter flex flex-wrap items-center gap-2 pt-2"
              style={{ animationDelay: '0.5s' }}
            >
              {mainStack.map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 tech-chip ${item.tone}`}
                >
                  <TechIcon
                    name={item.icon}
                    label={item.label}
                    className="h-4 w-4"
                  />
                  <span className="text-xs font-medium tech-label">
                    {item.label}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Showcase animado */}
          <div
            className="animate-enter hidden lg:col-span-5 lg:block"
            style={{ animationDelay: '0.35s' }}
          >
            <HeroOrbit />
          </div>
        </div>

        {/* Métricas */}
        <div
          className="animate-enter mt-16 grid divide-y divide-[hsl(var(--tone-border))] overflow-hidden rounded-3xl border surface-card sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          style={{ animationDelay: '0.6s' }}
        >
          {metrics.map((item) => (
            <div key={item.label} className="px-6 py-7 text-center sm:text-left">
              <p className="font-heading text-4xl font-semibold text-tone">
                {item.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-tone-subtle">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#sobre"
            aria-label="Ir para a seção sobre"
            className="flex h-11 w-11 items-center justify-center rounded-full border surface-muted text-tone-secondary transition hover:text-tone"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </Container>
    </section>
  );
}
