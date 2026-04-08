import Image from 'next/image';
import { Container } from '@/components/ui/container';

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
  return (
    <footer className="pt-16">
      <Container className="border-t border-tone py-8">
        <div className="flex justify-center items-center gap-6">
          {footerLinks.map(({ label, href, iconSrc }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="
                group
                flex items-center justify-center
                w-12 h-12
                rounded-full
                transition-all duration-500
                hover:bg-white/10
                hover:scale-110
              "
            >
              <Image
                src={iconSrc}
                alt={label}
                width={20}
                height={20}
                className={label === 'GitHub' ? 'invert brightness-200' : ''}
              />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
