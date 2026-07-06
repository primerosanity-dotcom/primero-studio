import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

/**
 * All headings use the heavy display grotesque (Clash Bold), uppercase.
 * `variant` is kept only as a semantic hint for the section context
 * (gold-on-dark vs ink-on-cream); the actual color is supplied by the caller.
 */
export function Heading({
  variant: _variant,
  as: Tag = "h2",
  className,
  children,
}: {
  variant: "elegant" | "strong";
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-display font-bold uppercase leading-[0.94] tracking-[-0.01em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
