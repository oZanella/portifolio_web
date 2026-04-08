export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-glow-primary blur-3xl" />
      <div className="absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-glow-accent blur-3xl" />
      <div className="absolute -left-40 top-[720px] h-[420px] w-[420px] rounded-full bg-glow-warm blur-3xl" />
    </div>
  );
}
