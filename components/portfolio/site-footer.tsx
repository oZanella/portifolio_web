import { Container } from "@/components/ui/container";
import { profile } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="pt-16">
      <Container className="flex flex-col gap-3 border-t border-tone py-8 text-sm text-tone-subtle md:flex-row md:items-center md:justify-between">
        <span>© 2026 {profile.name}. Todos os direitos reservados.</span>
        <span className="font-mono text-xs uppercase tracking-[0.3em]">
          Feito com Next.js
        </span>
      </Container>
    </footer>
  );
}
