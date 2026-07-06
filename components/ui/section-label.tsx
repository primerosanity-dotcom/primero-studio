import { cn } from "@/lib/cn";

export function SectionLabel({
  index,
  children,
  className,
  tone = "cream",
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "ink";
}) {
  const base = tone === "cream" ? "text-cream" : "text-ink";
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-sans text-[11px] font-medium uppercase tracking-[0.34em]",
        base,
        className,
      )}
    >
      <span className="text-gold">{index}</span>
      <span
        className={cn(
          "h-px w-10",
          tone === "cream" ? "bg-cream/30" : "bg-ink/25",
        )}
      />
      <span className={tone === "cream" ? "text-cream/70" : "text-ink/60"}>
        {children}
      </span>
    </div>
  );
}
