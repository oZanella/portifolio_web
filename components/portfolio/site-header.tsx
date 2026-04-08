import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/lib/portfolio-data';

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Educação', href: '#educacao' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
];

export function SiteHeader() {
  return (
    <header className="py-8 md:py-6">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-3">
          <div className="relative h-24 w-24 md:h-9 md:w-9 overflow-hidden rounded-3xl md:rounded-2xl border border-tone surface-card">
            <Image
              src="/eu2025.png"
              alt={profile.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-tone-subtle md:hidden mb-1">
              Portfólio
            </p>
            <p className="font-heading text-xl md:text-sm font-semibold text-tone">
              {profile.name}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-tone-secondary md:gap-5 md:font-normal">
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

        <div className="flex items-center gap-3">
          <Button
            tone="primary"
            variant="outline"
            size="sm"
            className="px-6 h-10 md:h-9 md:px-5"
            asChild
          >
            <a href="/Currículo%20Henrique%20Zanella%20Março.pdf" download>
              Baixar CV
            </a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
