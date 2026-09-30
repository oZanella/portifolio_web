'use client';

import { useSyncExternalStore } from 'react';
import {
  ACCENTS,
  ACCENT_KEY,
  DEFAULT_ACCENT,
  MODE_KEY,
  type Accent,
  type Mode,
} from '@/lib/theme-config';

export { ACCENTS, type Accent, type Mode } from '@/lib/theme-config';

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function readSaved(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Sincroniza entre abas abertas do portfólio.
  const onStorage = (event: StorageEvent) => {
    if (event.key === MODE_KEY && isMode(event.newValue)) {
      document.documentElement.dataset.mode = event.newValue;
      emit();
    }
    if (event.key === ACCENT_KEY && isAccent(event.newValue)) {
      document.documentElement.dataset.accent = event.newValue;
      emit();
    }
  };

  // Sem escolha manual, acompanha o tema do sistema em tempo real.
  const system = window.matchMedia('(prefers-color-scheme: light)');
  const onSystemChange = () => {
    if (isMode(readSaved(MODE_KEY))) return;
    document.documentElement.dataset.mode = system.matches ? 'light' : 'dark';
    emit();
  };

  window.addEventListener('storage', onStorage);
  system.addEventListener('change', onSystemChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
    system.removeEventListener('change', onSystemChange);
  };
}

function isMode(value: unknown): value is Mode {
  return value === 'light' || value === 'dark';
}

function isAccent(value: unknown): value is Accent {
  return ACCENTS.some((accent) => accent.id === value);
}

function readMode(): Mode {
  const mode = document.documentElement.dataset.mode;
  return isMode(mode) ? mode : 'dark';
}

function readAccent(): Accent {
  const accent = document.documentElement.dataset.accent;
  return isAccent(accent) ? accent : DEFAULT_ACCENT;
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Modo privado / storage bloqueado: a troca vale só para esta visita.
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function setAccent(accent: Accent) {
  if (readAccent() === accent) return;
  document.documentElement.dataset.accent = accent;
  persist(ACCENT_KEY, accent);
  emit();
}

/**
 * Troca claro/escuro. Quando há coordenadas (clique), a nova paleta se
 * expande em círculo a partir do ponto clicado via View Transitions API.
 */
export function setMode(mode: Mode, origin?: { x: number; y: number }) {
  if (readMode() === mode) return;

  const apply = () => {
    document.documentElement.dataset.mode = mode;
    persist(MODE_KEY, mode);
    emit();
  };

  const canAnimate =
    typeof document.startViewTransition === 'function' &&
    !prefersReducedMotion();

  if (!canAnimate) {
    apply();
    return;
  }

  const root = document.documentElement;
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);
  root.style.setProperty('--vt-r', `${radius}px`);

  document.startViewTransition(apply);
}

export function toggleMode(origin?: { x: number; y: number }) {
  setMode(readMode() === 'dark' ? 'light' : 'dark', origin);
}

export function usePreferences() {
  const mode = useSyncExternalStore(subscribe, readMode, () => null);
  const accent = useSyncExternalStore(subscribe, readAccent, () => null);
  return { mode, accent };
}

export function accentSwatch(hue: number, chroma: number) {
  return `linear-gradient(135deg, oklch(0.78 ${chroma} ${hue}), oklch(0.66 ${chroma} ${hue + 60}))`;
}

export function originFromEvent(event: { currentTarget: EventTarget | null }) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return undefined;
  const rect = target.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
