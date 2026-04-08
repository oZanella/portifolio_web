import { cn } from '@/lib/utils';
import { techIconMap, type TechIconKey } from '@/lib/tech-icons';

interface TechIconProps {
  name: TechIconKey;
  label: string;
  className?: string;
}

export function TechIcon({ name, label, className }: TechIconProps) {
  const icon = techIconMap[name];
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 24 24"
      className={cn('h-5 w-5', className)}
    >
      <title>{label}</title>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
