import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { contact, profile } from '@/lib/portfolio-data';

const footerLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/554996714548',
    iconSrc: '/whatsapp-svgrepo-com.svg',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/zanella_03/',
    iconSrc: '/instagram-1-svgrepo-com.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/henrique-zanella-74b9a9205/',
    iconSrc: '/linkedin-svgrepo-com.svg',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/oZanella',
    iconSrc: '/github-svgrepo-com.svg',
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="scroll-mt-24 pt-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border surface-card px-6 py-14 text-center md:px-12 md:py-20">
          <div className="absolute -top-24 left-1/2 h-95 w-95 -translate-x-1/2 bg-glow-primary opacity-50 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6">
            <p className="section-index text-xs uppercase tracking-[0.3em]">
              vamos trabalhar juntos
            </p>
            <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-tone md:text-5xl">
              Gostaria de saber mais do meu trabalho?
            </h2>
            <p className="max-w-lg text-base text-tone-secondary">
              Entre em contato e vamos conversar!
            </p>
            <Button tone="primary" variant="solid" size="lg" asChild>
              <a href={`mailto:${contact.email}`}>
                {contact.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>

            <div className="mt-4 flex items-center gap-3">
              {footerLinks.map(({ label, href, iconSrc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border surface-muted transition-all duration-300 hover:scale-110 hover:border-tone-primary/40"
                >
                  <Image
                    src={iconSrc}
                    alt={label}
                    width={18}
                    height={18}
                    className={
                      label === 'GitHub' ? 'invert brightness-200' : ''
                    }
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-tone-subtle md:flex-row">
          <p>
            © | {year} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
