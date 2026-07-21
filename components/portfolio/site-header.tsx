'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Educação', href: '#educacao' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors duration-300',
        scrolled
          ? 'border-tone/10 surface-strong'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-3">
        <a href="#" className="flex items-center gap-3 md:gap-4">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border-2 border-tone-primary/30 surface-card md:h-12 md:w-12">
            <Image
              src="/eu2025.png"
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="max-w-40 truncate font-heading text-sm font-bold leading-tight text-tone md:max-w-none md:text-base">
              {profile.name.split(' ').slice(0, 2).join(' ')}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-tone-subtle md:text-xs">
              Software Engineer
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-tone-secondary lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="link-underline transition hover:text-tone"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-tone/20 surface-muted text-tone-secondary transition hover:text-tone lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="absolute inset-x-0 top-full z-50 border-b border-tone/10 surface-strong">
            <Container className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-tone/5 py-3 text-base font-medium text-tone-secondary transition hover:text-tone"
                >
                  {item.label}
                </a>
              ))}
              <Button
                tone="primary"
                variant="solid"
                size="md"
                className="mt-4"
                asChild
              >
                <a href="/CurriculoHenrique2026.pdf" download>
                  Baixar CV
                </a>
              </Button>
            </Container>
          </nav>
        </div>
      )}
    </header>
  );
}
