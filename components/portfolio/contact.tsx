import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { socials } from '@/lib/portfolio-data';

export function Contact() {
  return (
    <section id="contato" className="pt-24">
      <Container>
        <div className="rounded-3xl border surface-strong bg-section-fade p-10">
          <SectionHeading
            eyebrow="contato"
            title=""
            description="Estou aberto a novos projetos e parcerias. Me conte sobre seu desafio e vamos criar algo memorável juntos."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button tone="primary" size="lg" asChild>
              <a href={socials[2].href}>Enviar e-mail</a>
            </Button>
            {socials.slice(0, 2).map((item) => (
              <Button
                key={item.label}
                tone="neutral"
                variant="outline"
                size="lg"
                asChild
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
