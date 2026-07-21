'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Palette, X } from 'lucide-react';
import { usePortfolioSettings, type Theme } from './settings-provider';
import { cn } from '@/lib/utils';

const themes: { id: Theme; name: string; from: string; to: string }[] = [
  { id: 'default', name: 'Esmeralda', from: '#10b981', to: '#06b6d4' },
  { id: 'sky', name: 'Céu', from: '#38bdf8', to: '#8b5cf6' },
  { id: 'violet', name: 'Violeta', from: '#8b5cf6', to: '#ec4899' },
  { id: 'rose', name: 'Rosa', from: '#f43f5e', to: '#a855f7' },
  { id: 'amber', name: 'Âmbar', from: '#f59e0b', to: '#f97316' },
  { id: 'cyan', name: 'Ciano', from: '#06b6d4', to: '#10b981' },
];

const SIZE = 56;
const MARGIN = 16;
const DRAG_THRESHOLD = 6;
const STORAGE_KEY = 'portfolio-fab-anchor';

type Point = { x: number; y: number };
type Side = 'left' | 'right';
// Posição salva de forma relativa (lado + % vertical) em vez de pixels
// absolutos: assim ela continua válida ao trocar de viewport (desktop/mobile).
type Anchor = { side: Side; yPercent: number };

function isAnchor(value: unknown): value is Anchor {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    (v.side === 'left' || v.side === 'right') &&
    typeof v.yPercent === 'number' &&
    Number.isFinite(v.yPercent)
  );
}

function clampYPercent(p: number) {
  return Math.min(1, Math.max(0, p));
}

function clampPoint(x: number, y: number, vw: number, vh: number): Point {
  const maxX = vw - SIZE - MARGIN;
  const maxY = vh - SIZE - MARGIN;
  return {
    x: Math.min(Math.max(x, MARGIN), Math.max(MARGIN, maxX)),
    y: Math.min(Math.max(y, MARGIN), Math.max(MARGIN, maxY)),
  };
}

function anchorToPoint(anchor: Anchor, vw: number, vh: number): Point {
  const maxY = Math.max(MARGIN, vh - SIZE - MARGIN);
  return {
    x: anchor.side === 'left' ? MARGIN : Math.max(MARGIN, vw - SIZE - MARGIN),
    y: MARGIN + anchor.yPercent * (maxY - MARGIN),
  };
}

export function SettingsPanel() {
  const { theme, setTheme } = usePortfolioSettings();
  const [mounted, setMounted] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>({ side: 'right', yPercent: 0.62 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [dragPos, setDragPos] = useState<Point | null>(null);
  const [dragging, setDragging] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);
  const applyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let initial: Anchor = { side: 'right', yPercent: 0.62 };
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved);
        if (isAnchor(parsed)) {
          initial = { side: parsed.side, yPercent: clampYPercent(parsed.yPercent) };
        }
      } catch {
        // ignora valor corrompido e usa o padrão
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnchor(initial);
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    setMounted(true);

    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (applyTimer.current) clearTimeout(applyTimer.current);
    };
  }, []);

  const handleTheme = (id: Theme) => {
    setTheme(id);
    setApplying(true);
    if (applyTimer.current) clearTimeout(applyTimer.current);
    applyTimer.current = setTimeout(() => setApplying(false), 900);
  };

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const origin = anchorToPoint(anchor, viewport.w, viewport.h);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: origin.x,
        originY: origin.y,
        moved: false,
      };
      setSnapping(false);
    },
    [anchor, viewport.w, viewport.h],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      const state = dragRef.current;
      if (!state) return;
      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      if (!state.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        state.moved = true;
        setDragging(true);
        setIsOpen(false);
      }
      if (state.moved) {
        setDragPos(
          clampPoint(
            state.originX + dx,
            state.originY + dy,
            window.innerWidth,
            window.innerHeight,
          ),
        );
      }
    },
    [],
  );

  const onPointerUp = useCallback(() => {
    const state = dragRef.current;
    dragRef.current = null;
    setDragging(false);

    if (!state) return;

    if (!state.moved) {
      setDragPos(null);
      setIsOpen((v) => !v);
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    setDragPos((current) => {
      const finalPoint = current ?? anchorToPoint(anchor, vw, vh);
      const goLeft = finalPoint.x + SIZE / 2 < vw / 2;
      const maxY = Math.max(MARGIN, vh - SIZE - MARGIN);
      const yPercent =
        maxY > MARGIN ? (finalPoint.y - MARGIN) / (maxY - MARGIN) : 0;
      const nextAnchor: Anchor = {
        side: goLeft ? 'left' : 'right',
        yPercent: clampYPercent(yPercent),
      };
      setAnchor(nextAnchor);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnchor));
      return null;
    });
    setSnapping(true);
    window.setTimeout(() => setSnapping(false), 400);
  }, [anchor]);

  if (!mounted) return null;

  const activeTheme = themes.find((t) => t.id === theme) ?? themes[0];
  const pos = dragPos ?? anchorToPoint(anchor, viewport.w, viewport.h);
  const side = anchor.side;

  const verticalAnchor: 'top' | 'center' | 'bottom' =
    pos.y < viewport.h * 0.28
      ? 'top'
      : pos.y > viewport.h * 0.72
        ? 'bottom'
        : 'center';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-65 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className="fixed z-70 touch-none select-none"
        style={{
          left: pos.x,
          top: pos.y,
          width: SIZE,
          height: SIZE,
          transition: snapping
            ? 'left 420ms cubic-bezier(0.34, 1.56, 0.64, 1), top 420ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            : undefined,
        }}
      >
        <button
          type="button"
          aria-label="Personalizar aparência"
          aria-expanded={isOpen}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={cn(
            'relative flex h-full w-full cursor-grab items-center justify-center rounded-full border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[transform,opacity] duration-200 ease-out active:cursor-grabbing',
            dragging ? 'scale-110 opacity-100' : 'opacity-90 hover:opacity-100',
          )}
          style={{
            background:
              'color-mix(in oklab, hsl(var(--tone-surface-strong)) 88%, transparent)',
          }}
        >
          <span
            className={cn(
              'absolute inset-0 rounded-full opacity-70 blur-md transition-opacity',
              dragging && 'opacity-100',
            )}
            style={{
              backgroundImage: `linear-gradient(135deg, ${activeTheme.from}, ${activeTheme.to})`,
            }}
          />
          <span
            className="absolute inset-0.75 rounded-full"
            style={{
              background:
                'color-mix(in oklab, hsl(var(--tone-surface-strong)) 92%, transparent)',
            }}
          />
          <Palette
            className={cn(
              'relative h-5 w-5 text-white transition-transform duration-500',
              isOpen && 'rotate-90',
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              'absolute z-70 w-72 animate-in overflow-hidden rounded-2xl border border-tone/10 surface-strong shadow-[0_20px_60px_rgba(0,0,0,0.55)] fade-in zoom-in duration-200',
              side === 'right' ? 'right-full mr-3' : 'left-full ml-3',
              verticalAnchor === 'top' && 'top-0',
              verticalAnchor === 'bottom' && 'bottom-0',
              verticalAnchor === 'center' && 'top-1/2 -translate-y-1/2',
              side === 'right' ? 'origin-right' : 'origin-left',
            )}
          >
            <div className="relative h-1 w-full overflow-hidden bg-[hsl(var(--tone-border)/0.4)]">
              {applying && <div className="absolute inset-0 shimmer" />}
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-heading font-semibold text-tone">
                  <Palette className="h-4 w-4 text-[hsl(var(--tone-primary))]" />
                  Personalização
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-tone-subtle transition-colors hover:text-tone"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <section>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-tone-subtle">
                  Cor de destaque
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((t, i) => {
                    const active = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleTheme(t.id)}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className={cn(
                          'animate-enter group relative flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-300',
                          active
                            ? 'border-tone/30 surface-card'
                            : 'border-transparent hover:surface-muted',
                        )}
                      >
                        <span className="relative flex h-10 w-10 items-center justify-center">
                          {active && (
                            <span
                              className="pulse-ring absolute inset-0 rounded-full"
                              style={{ background: t.from }}
                            />
                          )}
                          <span
                            className={cn(
                              'relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform duration-300',
                              active
                                ? 'scale-110'
                                : 'scale-90 opacity-70 group-hover:scale-100 group-hover:opacity-100',
                            )}
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                            }}
                          >
                            {active && (
                              <Check className="h-5 w-5 text-white drop-shadow" />
                            )}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'text-[10px] font-semibold transition-colors',
                            active ? 'text-tone' : 'text-tone-subtle',
                          )}
                        >
                          {t.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <p className="mt-5 text-center text-[10px] text-tone-subtle">
                Arraste o botão para qualquer lugar da tela
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
