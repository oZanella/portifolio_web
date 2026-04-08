import { About } from '@/components/portfolio/about';
import { Contact } from '@/components/portfolio/contact';
import { Hero } from '@/components/portfolio/hero';
import { PageBackground } from '@/components/portfolio/page-background';
import { Projects } from '@/components/portfolio/projects';
import { SiteFooter } from '@/components/portfolio/site-footer';
import { SiteHeader } from '@/components/portfolio/site-header';
import { Skills } from '@/components/portfolio/skills';
import { Experience } from '@/components/portfolio/experience';
import { Education } from '@/components/portfolio/education';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative">
        <SiteHeader />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
        <SiteFooter />
      </div>
    </main>
  );
}
