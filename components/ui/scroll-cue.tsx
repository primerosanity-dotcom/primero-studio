export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  return (
    <span className="flex flex-col items-center gap-2 text-cream/60">
      <span className="font-sans text-[10px] uppercase tracking-[0.34em]">
        {label}
      </span>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        aria-hidden
        className="cue-bounce"
      >
        <path
          d="M1 1l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
