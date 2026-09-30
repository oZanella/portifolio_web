'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Download, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Kbd } from '@/components/ui/kbd';
import {
  AccentMenu,
  AccentPicker,
  ModeToggle,
} from '@/components/portfolio/appearance-controls';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { useCommandMenu } from '@/components/providers/command-menu';
import { goToSection } from '@/lib/dom';
import { navItems, profile, socials } from '@/lib/portfolio-data';
import { useActiveSection } from '@/lib/use-active-section';
import { useIsApple } from '@/lib/use-platform';
import { cn } from '@/lib/utils';

const sectionIds = navItems.map((item) => item.id);

function onNavClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  // Mantém o href para "abrir em nova aba"/copiar link, mas o clique
  // normal usa a rolagem suave com foco acessível.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  goToSection(id);
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <a
      href="#inicio"
      onClick={(event) => {
        onNavigate?.();
        onNavClick(event, 'inicio');
      }}
      className="group flex min-w-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
    >
      <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-line bg-elevated">
        <Image
          src={profile.photo}
          alt=""
          fill
          loading="eager"
          sizes="36px"
          className="object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-110"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-semibold text-ink">
          {profile.shortName}
        </span>
        <span className="truncate font-mono text-[0.68rem] text-ink-subtle">
          {profile.role.toLowerCase()}
        </span>
      </span>
    </a>
  );
}

function DesktopNav() {
  const active = useActiveSection(sectionIds);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Posiciona o indicador direto no DOM (sem re-render a cada medição).
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const place = () => {
      const link = active
        ? nav.querySelector<HTMLElement>(`[data-id="${active}"]`)
        : null;
      if (!link) {
        indicator.style.opacity = '0';
        return;
      }
      indicator.style.opacity = '1';
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    document.fonts?.ready.then(place).catch(() => {});
    return () => observer.disconnect();
  }, [active]);

  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <div ref={navRef} className="relative flex items-center">
        <span
          ref={indicatorRef}
          aria-hidden
          className="absolute left-0 top-0 h-full rounded-full bg-elevated opacity-0 transition-[transform,width,opacity] duration-500 ease-[var(--ease-out-expo)]"
        />
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              data-id={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(event) => onNavClick(event, item.id)}
              className={cn(
                'relative rounded-full px-3 py-2 text-sm transition-colors duration-200 xl:px-3.5',
                isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink',
              )}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function SearchButton() {
  const openCommandMenu = useCommandMenu();
  const isApple = useIsApple();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={openCommandMenu}
        aria-label="Abrir paleta de comandos"
        aria-keyshortcuts="Control+K Meta+K"
        title="Buscar (Ctrl K)"
        className="max-[379px]:hidden xl:hidden"
      >
        <Search aria-hidden />
      </Button>
      <button
        type="button"
        onClick={openCommandMenu}
        aria-keyshortcuts="Control+K Meta+K"
        className="hidden h-10 items-center gap-2 rounded-full border border-line bg-canvas/50 pl-3 pr-2 text-sm text-ink-subtle transition-colors hover:border-line-strong hover:text-ink xl:flex"
      >
        <Search className="size-4" aria-hidden />
        <span className="pr-4">Buscar</span>
        <span
          aria-hidden
          className={cn(
            'flex gap-1 transition-opacity duration-300',
            isApple === null ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Kbd>{isApple ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>
    </>
  );
}

function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openCommandMenu = useCommandMenu();
  const active = useActiveSection(sectionIds);

  // Se a tela crescer até o layout desktop (ex.: girar o tablet), fecha o menu.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="lg:hidden"
      >
        <Menu aria-hidden />
      </Button>

      <dialog
        ref={dialogRef}
        data-lock-scroll
        aria-label="Menu"
        className="fixed inset-0 m-0 h-dvh w-full bg-canvas/95 p-0 backdrop-blur-xl backdrop:bg-transparent backdrop:backdrop-blur-none open:flex open:flex-col open:[animation:fade-in_200ms_ease-out]"
      >
        <Container className="flex min-h-0 flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex h-14 shrink-0 items-center justify-between gap-2 pl-2 pr-2">
            <Brand onNavigate={close} />
            <Button variant="ghost" size="icon" aria-label="Fechar menu" onClick={close}>
              <X aria-hidden />
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-2 pt-4">
            <nav aria-label="Principal (mobile)">
              <ol className="flex flex-col">
                {navItems.map((item, index) => (
                  <li
                    key={item.id}
                    className="[animation:enter-up_600ms_var(--ease-out-expo)_both]"
                    style={{ animationDelay: `${60 + index * 40}ms` }}
                  >
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? 'location' : undefined}
                      onClick={(event) => {
                        close();
                        onNavClick(event, item.id);
                      }}
                      className="group flex items-baseline gap-4 border-b border-line py-3 text-2xl font-medium leading-tight tracking-tight text-ink-muted transition-colors aria-[current]:text-ink hover:text-ink"
                    >
                      <span className="w-6 font-mono text-xs text-ink-subtle group-aria-[current]:text-brand">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <AccentPicker showLabel size="sm" className="min-w-0 flex-1" />
                <ModeToggle className="border border-line" />
              </div>

              <div className="grid gap-3 min-[420px]:grid-cols-2">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    close();
                    openCommandMenu();
                  }}
                >
                  <Search aria-hidden />
                  Buscar
                </Button>
                <Button size="lg" asChild>
                  <a href={profile.cv} download onClick={close}>
                    <Download aria-hidden />
                    Baixar CV
                  </a>
                </Button>
              </div>

              <ul className="flex gap-2" aria-label="Redes sociais">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (abre em nova aba)`}
                      className="flex size-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                    >
                      <TechIcon name={social.icon} className="size-[1.1rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </dialog>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <Container>
        <div className="glass flex h-14 items-center justify-between gap-2 rounded-full border border-line/80 pl-1.5 pr-1.5 shadow-soft">
          <Brand />
          <DesktopNav />
          <div className="flex shrink-0 items-center gap-1">
            <SearchButton />
            <div className="hidden md:block">
              <AccentMenu />
            </div>
            <ModeToggle />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
