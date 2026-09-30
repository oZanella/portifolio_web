'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/dom';
import { useToast } from '@/components/providers/toast-provider';

/** Copia um texto, mostra feedback local (copied) e global (toast). */
export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const notify = useToast();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string, successMessage = 'Copiado para a área de transferência') => {
      const ok = await copyText(text);
      if (timer.current) clearTimeout(timer.current);
      if (ok) {
        setCopied(true);
        notify(successMessage);
        timer.current = setTimeout(() => setCopied(false), resetAfter);
      } else {
        notify(`Não consegui copiar. Aqui está: ${text}`, 'error');
      }
      return ok;
    },
    [notify, resetAfter],
  );

  return { copied, copy };
}
