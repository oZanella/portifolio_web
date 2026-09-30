import { TechIcon } from '@/components/portfolio/tech-icon';
import { techCarousel } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

type Item = (typeof techCarousel)[number];

function Group({ items, hidden = false }: { items: readonly Item[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-3 pr-3 [@media(prefers-reduced-motion:reduce)]:flex-wrap [@media(prefers-reduced-motion:reduce)]:justify-center"
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="flex h-12 shrink-0 items-center gap-2.5 rounded-full border border-line bg-surface/70 pl-2 pr-4 text-sm text-ink-muted transition-colors duration-300 hover:border-brand/40 hover:text-ink"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-elevated">
            <TechIcon name={item.icon} className="size-4" />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function Row({
  items,
  duration,
  reverse = false,
}: {
  items: readonly Item[];
  duration: string;
  reverse?: boolean;
}) {
  // Duas cópias idênticas: ao deslocar -50% a segunda assume o lugar da
  // primeira sem emenda. A cópia é invisível para leitores de tela.
  return (
    <div className="marquee overflow-hidden py-1">
      <div
        className="marquee-track"
        style={
          {
            '--duration': duration,
            '--direction': reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        <Group items={items} />
        <Group items={items} hidden />
      </div>
    </div>
  );
}

export function TechMarquee({ className }: { className?: string }) {
  const half = Math.ceil(techCarousel.length / 2);
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Row items={techCarousel.slice(0, half)} duration="42s" />
      <Row items={techCarousel.slice(half)} duration="36s" reverse />
    </div>
  );
}
