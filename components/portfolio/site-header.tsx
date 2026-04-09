import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/lib/portfolio-data';
import { SettingsPanel } from './settings-panel';

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Educação', href: '#educacao' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-tone/10 surface-card">
      <Container className="flex items-center justify-between py-3 md:py-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-11 md:w-11 overflow-hidden rounded-xl md:rounded-2xl border border-tone surface-card shrink-0">
            <Image
              src="/eu2025.png"
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-heading text-sm md:text-base font-semibold text-tone truncate max-w-30 md:max-w-none">
            {profile.name}
          </p>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-tone-secondary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="transition hover:text-tone"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <SettingsPanel />
          <Button
            tone="primary"
            variant="outline"
            size="sm"
            className="px-4 h-9 md:h-10 md:px-6"
            asChild
          >
            <a href="/Currículo%20Henrique%20Zanella%20Março.pdf" download>
              <span className="md:hidden">CV</span>
              <span className="hidden md:inline">Baixar CV</span>
            </a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
