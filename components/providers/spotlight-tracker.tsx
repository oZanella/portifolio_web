'use client';

import { useEffect } from 'react';

/**
 * Um único listener para a página toda (delegação): atualiza --mx/--my
 * no cartão `.spotlight` sob o ponteiro, no máximo uma vez por frame.
 * Desligado em telas de toque, onde não existe "hover".
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last || !(last.target instanceof Element)) return;
      const card = last.target.closest<HTMLElement>('.spotlight');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${last.clientX - rect.left}px`);
      card.style.setProperty('--my', `${last.clientY - rect.top}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return null;
}
