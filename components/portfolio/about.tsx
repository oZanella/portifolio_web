import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { profile } from '@/lib/portfolio-data';

export function About() {
  return (
    <section id="sobre" className="pt-24">
      <Container className="grid gap-10 md:grid-cols-1">
        <div>
          <SectionHeading
            eyebrow="sobre mim"
            title={`Eu me chamo ${profile.name}`}
            description={profile.about[0]}
          />
          <p className="mt-4 text-base text-tone-secondary">
            {profile.about[1]}
          </p>
        </div>
      </Container>
    </section>
  );
}
