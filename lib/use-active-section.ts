'use client';

import { useEffect, useState } from 'react';

/**
 * Scrollspy: a seção ativa é a última cujo topo já passou de 35% da
 * altura da tela. No fim da página, a última seção sempre fica ativa
 * (seções curtas no final nunca alcançariam a linha de corte).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0) current = ids[ids.length - 1];

      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids]);

  return active;
}
