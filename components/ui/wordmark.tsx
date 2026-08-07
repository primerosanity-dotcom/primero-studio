import { cn } from "@/lib/cn";

const TAGLINE = "AUTO DETAILING · ŁÓDŹ";

/**
 * Brand lockup. The tagline is laid out character-by-character and stretched
 * with `justify-between`, so it always ends exactly where the wordmark ends —
 * no hand-tuned letter-spacing that drifts when the font or size changes.
 * The wordmark's negative right margin cancels the trailing letter-space, so
 * the shared width is the wordmark's *visible* width.
 */
export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "-mr-[0.2em] whitespace-nowrap font-sans text-[15px] font-light uppercase tracking-[0.2em]",
          tone === "dark" ? "gold-metallic" : "gold-metallic-deep",
        )}
      >
        PRIMERO.STUDIO
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-1.5 flex justify-between font-sans text-[8.5px] uppercase transition-colors duration-500",
          tone === "dark" ? "text-cream/45" : "text-ink/45",
        )}
      >
        {[...TAGLINE].map((ch, i) => (
          <span key={`${ch}-${i}`}>{ch === " " ? " " : ch}</span>
        ))}
      </span>
    </span>
  );
}
