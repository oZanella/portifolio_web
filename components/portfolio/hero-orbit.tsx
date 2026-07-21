import { TechIcon } from '@/components/portfolio/tech-icon';
import { profile } from '@/lib/portfolio-data';
import type { TechIconKey } from '@/lib/tech-icons';

type OrbitItem = {
  icon: TechIconKey;
  label: string;
  ring: 'inner' | 'outer';
  angle: number;
};

const items: OrbitItem[] = [
  { icon: 'react', label: 'React', ring: 'outer', angle: 0 },
  { icon: 'next', label: 'Next.js', ring: 'outer', angle: 90 },
  { icon: 'typescript', label: 'TypeScript', ring: 'outer', angle: 180 },
  { icon: 'tailwind', label: 'Tailwind', ring: 'outer', angle: 270 },
  { icon: 'node', label: 'Node.js', ring: 'inner', angle: 45 },
  { icon: 'prisma', label: 'Prisma', ring: 'inner', angle: 225 },
];

const RINGS = {
  outer: { r: 150, dur: '26s' },
  inner: { r: 92, dur: '18s' },
} as const;

export function HeroOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      {/* halo */}
      <div className="absolute inset-8 rounded-full bg-glow-primary opacity-60 blur-3xl" />

      {/* anéis */}
      <div className="orbit-ring orbit-spin inset-0" />
      <div className="orbit-ring orbit-spin-rev inset-[19%]" />
      <div className="orbit-ring inset-[38%] opacity-60" />

      {/* núcleo */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border surface-strong shadow-[0_0_40px_hsl(var(--tone-primary)/0.35)]">
        <span className="font-heading text-3xl font-bold text-gradient">
          {profile.initials}
        </span>
      </div>

      {/* ícones em órbita */}
      {items.map((item) => {
        const ring = RINGS[item.ring];
        const delay = `-${(item.angle / 360) * parseInt(ring.dur)}s`;
        return (
          <div
            key={`${item.ring}-${item.label}`}
            className="orbit-item"
            style={
              {
                '--orbit-r': `${ring.r}px`,
                '--orbit-dur': ring.dur,
                '--orbit-delay': delay,
                marginLeft: '-24px',
                marginTop: '-24px',
              } as React.CSSProperties
            }
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border surface-strong text-tone-secondary">
              <TechIcon name={item.icon} label={item.label} className="h-5 w-5" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
