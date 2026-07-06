import { cn } from "@/lib/cn";

// Angular "P" monogram — a folded-ribbon interpretation, geometric and sharp.
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="currentColor"
      className={cn("block", className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12H80L104 36V52L80 76H46V108H24V12ZM46 32H74L86 44V46L74 58H46V32Z"
      />
    </svg>
  );
}
