import { About } from '@/components/portfolio/about';
import { Contact } from '@/components/portfolio/contact';
import { Hero } from '@/components/portfolio/hero';
import { Journey } from '@/components/portfolio/journey';
import { Lab } from '@/components/portfolio/lab';
import { Projects } from '@/components/portfolio/projects';
import { SiteFooter } from '@/components/portfolio/site-footer';
import { SiteHeader } from '@/components/portfolio/site-header';
import { Skills } from '@/components/portfolio/skills';

export default function Home() {
  return (
    <>
      <div
        aria-hidden
        className="scroll-progress fixed inset-x-0 top-0 z-[60] hidden h-0.5 origin-left bg-linear-to-r from-brand to-brand-2"
      />
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Journey />
        <Lab />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
