import { cn } from '@/lib/utils';
import { techCarousel } from '@/lib/portfolio-data';
import { TechIcon } from '@/components/portfolio/tech-icon';

function MarqueeRow({
  reverse = false,
  duration = '40s',
}: {
  reverse?: boolean;
  duration?: string;
}) {
  // Duplicamos a lista; cada item carrega o próprio espaçamento (margin),
  // então o deslocamento de -50% cai exatamente no início da 2ª cópia — ciclo sem emenda.
  const items = [...techCarousel, ...techCarousel];

  return (
    <div
      className="marquee-track"
      style={
        {
          '--marquee-dur': duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={cn(
            'mr-4 flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-2.5 tech-chip transition-colors duration-300 hover:border-tone-primary/40',
            item.tone,
          )}
        >
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border tech-icon',
              item.tone,
            )}
          >
            <TechIcon name={item.icon} label={item.label} className="h-4 w-4" />
          </span>
          <span className={cn('text-sm font-medium tech-label', item.tone)}>
            {item.shorthand}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TechMarquee({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <p className="text-xs uppercase tracking-[0.3em] text-tone-subtle">
        Linguagens e ferramentas
      </p>
      <div className="marquee-mask space-y-4 overflow-hidden py-1">
        <MarqueeRow duration="46s" />
        <MarqueeRow reverse duration="38s" />
      </div>
    </div>
  );
}
