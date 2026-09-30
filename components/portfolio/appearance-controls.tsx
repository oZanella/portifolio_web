'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, Moon, Palette, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ACCENTS,
  accentSwatch,
  originFromEvent,
  setAccent,
  toggleMode,
  usePreferences,
  type Accent,
} from '@/lib/preferences';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
  const { mode } = usePreferences();

  return (
    <Button
      variant="ghost"
      size="icon"
      role="switch"
      aria-checked={mode === null ? undefined : mode === 'dark'}
      aria-label="Tema escuro"
      title={mode === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
      onClick={(event) => toggleMode(originFromEvent(event))}
      className={cn('overflow-hidden', className)}
    >
      {/* Ícone decidido por CSS: correto já no primeiro paint, sem esperar o JS. */}
      <Sun
        aria-hidden
        className="transition-transform duration-500 ease-[var(--ease-spring)] light:-translate-y-8 light:rotate-90"
      />
      <Moon
        aria-hidden
        className="absolute transition-transform duration-500 ease-[var(--ease-spring)] dark:translate-y-8 dark:-rotate-90"
      />
    </Button>
  );
}

interface AccentPickerProps {
  className?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

/**
 * Radiogroup com "roving tabindex": Tab entra/sai do grupo inteiro e as
 * setas trocam a cor, como um grupo de rádio nativo.
 */
export function AccentPicker({
  className,
  size = 'md',
  showLabel = false,
}: AccentPickerProps) {
  const { accent } = usePreferences();
  const labelId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = accent ?? ACCENTS[0].id;
  const currentIndex = ACCENTS.findIndex((item) => item.id === current);
  const currentName = ACCENTS[currentIndex]?.name;

  const select = (index: number) => {
    const next = ACCENTS[(index + ACCENTS.length) % ACCENTS.length];
    setAccent(next.id as Accent);
    refs.current[(index + ACCENTS.length) % ACCENTS.length]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: currentIndex + 1,
      ArrowDown: currentIndex + 1,
      ArrowLeft: currentIndex - 1,
      ArrowUp: currentIndex - 1,
      Home: 0,
      End: ACCENTS.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {showLabel ? (
        <p id={labelId} className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium text-ink">Cor de destaque</span>
        </p>
      ) : null}
      <div
        role="radiogroup"
        aria-label={showLabel ? undefined : 'Cor de destaque'}
        aria-labelledby={showLabel ? labelId : undefined}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {ACCENTS.map((item, index) => {
          const checked = item.id === current;
          return (
            <button
              key={item.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={accent === null ? undefined : checked}
              aria-label={item.name}
              title={item.name}
              tabIndex={checked ? 0 : -1}
              onClick={() => setAccent(item.id)}
              className={cn(
                'relative flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-110 active:scale-95',
                size === 'sm' ? 'size-8' : 'size-10',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-surface transition-[box-shadow,opacity] duration-300',
                  checked && accent !== null ? 'opacity-100 ring-ink/70' : 'opacity-0 ring-transparent',
                )}
              />
              <span
                aria-hidden
                className={cn('rounded-full shadow-soft', size === 'sm' ? 'size-6' : 'size-8')}
                style={{ backgroundImage: accentSwatch(item.hue, item.chroma) }}
              />
              {checked && accent !== null ? (
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className="absolute size-3.5 text-white drop-shadow-[0_1px_1px_rgb(0_0_0/0.5)]"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Botão do header que abre um pequeno painel com as cores. */
export function AccentMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    rootRef.current
      ?.querySelector<HTMLButtonElement>('[role="radio"][tabindex="0"]')
      ?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        // Fecha quando o foco sai do componente (Tab para fora).
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-label="Escolher cor de destaque"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        title="Cor de destaque"
        onClick={() => setOpen((value) => !value)}
        className={cn(open && 'bg-elevated text-ink')}
      >
        <Palette aria-hidden />
      </Button>

      {open ? (
        <div
          id={panelId}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-10 w-64 origin-top-right rounded-2xl border border-line bg-surface p-4 shadow-lift [animation:pop-in_220ms_var(--ease-out-expo)]"
        >
          <AccentPicker showLabel size="sm" />
          <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
            Use as setas do teclado para trocar. A escolha fica salva.
          </p>
        </div>
      ) : null}
    </div>
  );
}
