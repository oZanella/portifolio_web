import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { CopyEmail } from '@/components/portfolio/copy-email';
import { ProfileCard } from '@/components/portfolio/profile-card';
import { Accent } from '@/components/portfolio/section';
import { SectionLink } from '@/components/portfolio/section-link';
import { metrics, profile } from '@/lib/portfolio-data';

function delay(ms: number) {
  return { '--delay': `${ms}ms` } as React.CSSProperties;
}

export function Hero() {
  return (
    <section
      id="inicio"
      tabIndex={-1}
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden pb-8 pt-28 outline-none sm:pt-36 lg:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="brand-glow absolute left-1/2 top-0 h-144 w-[min(64rem,160vw)] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <Container>
        <p
          className="animate-enter inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-3.5 text-xs font-medium text-ink-muted backdrop-blur"
          style={delay(0)}
        >
          <span aria-hidden className="pulse-dot relative size-2 rounded-full bg-success" />
          {profile.availability}
        </p>

        <h1
          id="inicio-titulo"
          className="animate-enter text-balance-safe mt-7 max-w-[14ch] text-[clamp(2.4rem,6vw+0.6rem,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:max-w-[16ch] lg:max-w-none"
          style={delay(80)}
        >
          Software que parece <Accent>simples</Accent> porque cada detalhe foi
          pensado.
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="flex min-w-0 flex-col items-start">
            <p
              className="animate-enter max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg"
              style={delay(160)}
            >
              <strong className="font-medium text-ink">
                Olá, eu sou o {profile.firstName}.
              </strong>{' '}
              {profile.intro}
            </p>

            <div
              className="animate-enter mt-8 flex w-full flex-col gap-3 min-[480px]:w-auto min-[480px]:flex-row"
              style={delay(240)}
            >
              <Button size="lg" asChild>
                <SectionLink to="projetos">
                  Ver projetos
                  <ArrowRight
                    aria-hidden
                    className="transition-transform duration-300 group-hover/button:translate-x-0.5"
                  />
                </SectionLink>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href={profile.cv} download>
                  <Download aria-hidden />
                  Baixar currículo
                  <span className="font-mono text-[0.68rem] text-ink-subtle">PDF</span>
                </a>
              </Button>
            </div>

            <div
              className="animate-enter mt-5 flex max-w-full flex-wrap items-center gap-x-2 text-sm text-ink-subtle"
              style={delay(300)}
            >
              <span>ou copie meu e-mail:</span>
              <CopyEmail />
            </div>
          </div>

          <div className="animate-enter min-w-0" style={delay(220)}>
            <ProfileCard />
          </div>
        </div>

        <dl
          className="animate-enter mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 sm:grid-cols-3"
          style={delay(380)}
        >
          {metrics.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse gap-1 bg-surface/90 px-5 py-5 sm:px-6 sm:py-6"
            >
              <dt className="text-sm leading-snug text-ink-muted">{item.label}</dt>
              <dd className="text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.6rem]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
