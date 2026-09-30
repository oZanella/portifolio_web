'use client';

import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Accent } from '@/components/portfolio/section';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { contact, profile, socials } from '@/lib/portfolio-data';
import { useCopy } from '@/lib/use-copy';
import { cn } from '@/lib/utils';

export function Contact() {
  const { copied, copy } = useCopy();

  return (
    <section
      id="contato"
      tabIndex={-1}
      aria-labelledby="contato-titulo"
      className="relative py-20 outline-none sm:py-28"
    >
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface/80 px-5 py-14 text-center sm:px-10 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="brand-glow absolute left-1/2 top-0 h-96 w-[min(48rem,150%)] -translate-x-1/2 -translate-y-1/2" />
            <div className="bg-dots absolute inset-0 opacity-50 mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]" />
          </div>

          <p className="flex items-center justify-center gap-3 font-mono text-xs text-ink-subtle">
            <span className="text-brand">06</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span className="uppercase tracking-[0.14em]">Contato</span>
          </p>

          <h2
            id="contato-titulo"
            className="text-balance-safe mx-auto mt-6 max-w-3xl text-[clamp(2.1rem,4.5vw+0.8rem,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink"
          >
            Vamos construir algo <Accent>juntos</Accent>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
            {profile.availability}. Se você chegou até aqui, acho que temos
            bastante coisa para conversar.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <a href={`mailto:${contact.email}`}>
                <Mail aria-hidden />
                Enviar e-mail
              </a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => copy(contact.email, 'E-mail copiado')}
              aria-label={`Copiar e-mail ${contact.email}`}
            >
              <span className="relative size-[1.1rem]">
                <Copy
                  aria-hidden
                  className={cn(
                    'absolute inset-0 transition-all duration-300',
                    copied ? 'scale-50 opacity-0' : 'opacity-100',
                  )}
                />
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className={cn(
                    'absolute inset-0 text-brand transition-all duration-300 ease-[var(--ease-spring)]',
                    copied ? 'opacity-100' : 'scale-50 opacity-0',
                  )}
                />
              </span>
              <span className="inline-grid">
                <span
                  className={cn(
                    'col-start-1 row-start-1 transition-opacity',
                    copied && 'opacity-0',
                  )}
                >
                  Copiar e-mail
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'col-start-1 row-start-1 transition-opacity',
                    !copied && 'opacity-0',
                  )}
                >
                  Copiado!
                </span>
              </span>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                <TechIcon name="whatsapp" />
                WhatsApp
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Redes sociais">
            {socials
              .filter((social) => social.icon !== 'whatsapp')
              .map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-full border border-line bg-canvas/40 pl-3 pr-4 text-sm text-ink-muted transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
                  >
                    <TechIcon name={social.icon} className="size-4" />
                    {social.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 opacity-50 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                    <span className="sr-only">(abre em nova aba)</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
