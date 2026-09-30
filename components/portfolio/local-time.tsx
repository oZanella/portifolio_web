'use client';

import { useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

const formatters = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'short',
      hourCycle: 'h23',
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 10_000);
  return () => window.clearInterval(id);
}

function useLocalClock(timeZone: string) {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => {
      const parts = getFormatter(timeZone).formatToParts(new Date());
      const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
      const hour = Number(get('hour'));
      const weekend = get('weekday') === 'Sat' || get('weekday') === 'Sun';
      const working = !weekend && hour >= 8 && hour < 18;
      return `${get('hour')}:${get('minute')}|${working ? 1 : 0}`;
    },
    () => null,
  );

  if (!snapshot) return { time: '--:--', working: null };
  const [time, working] = snapshot.split('|');
  return { time, working: working === '1' };
}

/** Horário local (ou status de expediente) de quem está sendo apresentado. */
export function LocalTime({
  timeZone,
  display = 'time',
  className,
}: {
  timeZone: string;
  display?: 'time' | 'status';
  className?: string;
}) {
  const { time, working } = useLocalClock(timeZone);

  return (
    <span className={cn('inline-flex items-center gap-1.5 tabular-nums', className)}>
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full transition-colors',
          working === null ? 'bg-transparent' : working ? 'bg-success' : 'bg-ink-subtle',
        )}
      />
      {display === 'time' ? (
        <span>
          <span className="sr-only">Horário local: </span>
          {time}
        </span>
      ) : (
        <span className={cn('transition-opacity', working === null && 'opacity-0')}>
          {working ? 'em horário comercial' : 'fora do expediente'}
        </span>
      )}
    </span>
  );
}
