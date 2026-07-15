import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

/**
 * One heading voice across the whole site: the thin neutral grotesque
 * (Satoshi Light), uppercase — same as the hero on screen 01.
 * `variant` is kept as a semantic hint for the section context
 * (gold-on-dark vs ink-on-cream); color + size come from `className`.
 */
export function Heading({
  variant,
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
      data-variant={variant}
      className={cn(
        "font-sans font-light uppercase leading-[1.06] tracking-[0.015em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
