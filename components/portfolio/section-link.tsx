'use client';

import type { ComponentProps } from 'react';
import { goToSection } from '@/lib/dom';

type SectionLinkProps = Omit<ComponentProps<'a'>, 'href'> & { to: string };

/** Link de âncora com rolagem suave + foco, sem perder o comportamento de link. */
export function SectionLink({ to, onClick, ...props }: SectionLinkProps) {
  return (
    <a
      href={`#${to}`}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        goToSection(to);
      }}
      {...props}
    />
  );
}
