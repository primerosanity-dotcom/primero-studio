import Link from "next/link";
import { cn } from "@/lib/cn";
import type { MouseEventHandler } from "react";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      className={cn(
        "transition-transform duration-500 ease-lux group-hover:translate-x-1",
        className,
      )}
      aria-hidden
    >
      <path
        d="M0 6h24M19 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  href?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  variant?: "outline" | "solid";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Reference-style CTA: a thin rectangular frame, wide-tracked caps label and a
 * long thin arrow. `tone` adapts to the section background; `solid` fills gold.
 */
export function ArrowButton({
  href = "#",
  children,
  tone = "dark",
  variant = "solid",
  className,
  onClick,
}: Props) {
  const base =
    "group inline-flex items-center justify-between gap-10 px-8 py-5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] transition-all duration-500 ease-lux";

  if (variant === "solid") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          base,
          "bg-gold text-wine-deep shadow-[0_14px_38px_-14px_rgba(217,184,114,0.55)] hover:-translate-y-0.5 hover:bg-cream-soft hover:shadow-[0_18px_44px_-14px_rgba(217,184,114,0.7)] active:translate-y-0 active:scale-[0.99]",
          className,
        )}
      >
        <span>{children}</span>
        <Arrow />
      </Link>
    );
  }

  const outline =
    tone === "dark"
      ? "border border-champagne/40 text-cream hover:border-gold hover:text-gold"
      : "border border-ink/20 text-ink hover:border-champagne hover:text-champagne";

  return (
    <Link href={href} onClick={onClick} className={cn(base, outline, className)}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
