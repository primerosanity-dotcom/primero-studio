export function ScrollCue({ label = "Przewiń" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 text-cream/50">
      <span className="font-sans text-[10px] uppercase tracking-[0.34em]">
        {label}
      </span>
      <span className="relative block h-8 w-px overflow-hidden bg-cream/15">
        <span className="cue-line absolute inset-0 block bg-gold" />
      </span>
    </div>
  );
}
