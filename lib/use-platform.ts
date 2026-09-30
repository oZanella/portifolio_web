'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/** `null` durante o SSR/hidratação; depois, se o usuário está num Apple. */
export function useIsApple() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),
    () => null,
  );
}
