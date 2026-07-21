export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-glow-primary opacity-70 blur-3xl" />
      <div className="absolute -right-40 top-40 h-105 w-105 rounded-full bg-glow-accent opacity-60 blur-3xl" />
      <div className="absolute -left-40 top-180 h-105 w-105 rounded-full bg-glow-warm opacity-50 blur-3xl" />
    </div>
  );
}
