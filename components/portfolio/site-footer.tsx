'use client';

import { ArrowUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Kbd } from '@/components/ui/kbd';
import { useCommandMenu } from '@/components/providers/command-menu';
import { goToSection } from '@/lib/dom';
import { profile } from '@/lib/portfolio-data';
import { useIsApple } from '@/lib/use-platform';

export function SiteFooter() {
  const openCommandMenu = useCommandMenu();
  const isApple = useIsApple();

  return (
    <footer className="border-t border-line pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
      <Container className="flex flex-col gap-6 text-sm text-ink-subtle md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-ink-muted">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{' '}
            {profile.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCommandMenu}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 transition-colors hover:border-line-strong hover:text-ink [@media(hover:none)]:hidden"
          >
            <span className="flex gap-1" aria-hidden>
              <Kbd>{isApple ? '⌘' : 'Ctrl'}</Kbd>
              <Kbd>K</Kbd>
            </span>
            para navegar
          </button>
          <button
            type="button"
            onClick={() => goToSection('inicio')}
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 transition-colors hover:border-line-strong hover:text-ink"
          >
            Voltar ao topo
            <ArrowUp
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </Container>
    </footer>
  );
}
