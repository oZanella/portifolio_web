import { cn } from '@/lib/utils';
import { techIconMap, type TechIconKey } from '@/lib/tech-icons';

interface TechIconProps {
  name: TechIconKey;
  /** Sem label o ícone é decorativo e fica oculto para leitores de tela. */
  label?: string;
  className?: string;
}

export function TechIcon({ name, label, className }: TechIconProps) {
  const icon = techIconMap[name];
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-5 shrink-0', className)}
      {...(label
        ? { role: 'img', 'aria-label': label }
        : { 'aria-hidden': true, focusable: false })}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
