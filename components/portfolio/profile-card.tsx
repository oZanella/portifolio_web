'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { LocalTime } from '@/components/portfolio/local-time';
import { TechIcon } from '@/components/portfolio/tech-icon';
import { prefersReducedMotion } from '@/lib/dom';
import { mainStack, profile } from '@/lib/portfolio-data';

const MAX_TILT = 6;

/**
 * Cartão de apresentação do hero. No desktop inclina levemente seguindo
 * o ponteiro; em toque ou com "reduzir movimento" fica estático.
 */
export function ProfileCard() {
  const cardRef = useRef<HTMLElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (
      !card ||
      event.pointerType !== 'mouse' ||
      prefersReducedMotion() ||
      !window.matchMedia('(min-width: 1024px)').matches
    ) {
      return;
    }
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--ry', `${(x * MAX_TILT * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    cardRef.current?.style.setProperty('--rx', '0deg');
    cardRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="relative w-full [perspective:900px] lg:w-[27rem]">
      <div
        aria-hidden
        className="brand-glow pointer-events-none absolute -inset-10 -z-10 opacity-80"
      />

      <figure
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group/card relative flex items-stretch gap-4 rounded-[1.5rem] border border-line bg-surface/85 p-3 shadow-lift backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-expo)] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
      >
        <div className="relative w-24 shrink-0 overflow-hidden rounded-2xl bg-elevated sm:w-28">
          <Image
            src={profile.photo}
            alt={`Foto de ${profile.shortName}`}
            fill
            loading="eager"
            sizes="112px"
            className="object-cover object-[45%_25%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-105"
          />
        </div>

        <figcaption className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-1 pr-1">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <p className="truncate text-base font-semibold leading-tight text-ink sm:text-lg">
                {profile.shortName}
              </p>
              <span className="hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.62rem] leading-none text-ink-subtle min-[400px]:inline">
                {profile.initials}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {profile.role}
            </p>
          </div>

          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-subtle">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {profile.location}
            </span>
            <LocalTime timeZone={profile.timeZone} />
          </p>

          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <ul className="flex items-center -space-x-1.5" aria-label="Stack principal">
              {mainStack.map((item) => (
                <li
                  key={item.label}
                  title={item.label}
                  className="relative flex size-7 items-center justify-center rounded-full border border-line bg-elevated text-ink-muted ring-2 ring-surface transition-transform duration-300 hover:z-10 hover:-translate-y-0.5"
                >
                  <TechIcon name={item.icon} label={item.label} className="size-3.5" />
                </li>
              ))}
            </ul>
            <LocalTime
              timeZone={profile.timeZone}
              display="status"
              className="font-mono text-[0.66rem] text-ink-subtle"
            />
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
