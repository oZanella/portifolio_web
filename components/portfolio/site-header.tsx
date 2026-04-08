import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/lib/portfolio-data';

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Educação', href: '#educacao' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

export function SiteHeader() {
  return (
    <header className="py-6">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-tone surface-card text-lg font-semibold text-tone">
            {profile.initials}
          </span>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.35em] text-tone-subtle">
              Portfólio
            </p>
            <p className="font-heading text-base font-semibold text-tone">
              {profile.name}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-5 text-sm text-tone-secondary">
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
          <Button tone="neutral" variant="outline" size="sm" asChild>
            <a href="#contato">Baixar CV</a>
          </Button>
          <Button tone="primary" size="sm" asChild>
            <a href="#contato">Contato</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
