import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { contact, highlights, profile } from '@/lib/portfolio-data';

const contactItems = [
  { icon: MapPin, value: contact.address },
  { icon: Phone, value: contact.phone },
  { icon: Mail, value: contact.email },
];

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 pt-24">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="sobre mim"
          title="Quem faz acontecer"
        />

        <div className="reveal mt-12 grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            {profile.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-tone-secondary md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-3xl border surface-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                contato
              </p>
              <ul className="mt-4 space-y-3">
                {contactItems.map(({ icon: Icon, value }) => (
                  <li
                    key={value}
                    className="flex items-start gap-3 text-sm text-tone-secondary"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border surface-muted text-[hsl(var(--tone-primary))]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="wrap-break-word">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border surface-card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-tone-subtle">
                destaques
              </p>
              <ul className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-tone-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--tone-primary))]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
