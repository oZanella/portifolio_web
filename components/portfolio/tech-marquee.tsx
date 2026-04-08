import { cn } from '@/lib/utils';
import { techCarousel } from '@/lib/portfolio-data';
import { TechIcon } from '@/components/portfolio/tech-icon';

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...techCarousel, ...techCarousel];
  return (
    <div className="overflow-hidden">
      <div
        className={cn('flex w-[200%] min-w-[200%] items-center gap-6 flex-nowrap marquee')}
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className={cn(
              'flex min-w-[190px] items-center gap-3 rounded-2xl border px-4 py-2 tech-chip',
              item.tone
            )}
          >
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border tech-icon',
                item.tone
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
    </div>
  );
}

export function TechMarquee({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <p className="text-xs uppercase tracking-[0.3em] text-tone-subtle">
        Linguagens e ferramentas
      </p>
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  );
}
