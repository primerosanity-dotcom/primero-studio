import Link from "next/link";
import { cn } from "@/lib/cn";

export function NextCue({
  index,
  label,
  href,
  tone = "dark",
}: {
  index: string;
  label: string;
  href: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group mx-auto flex max-w-[1500px] items-center justify-between border-t px-6 py-6 transition-colors duration-300 lg:px-12",
        tone === "dark"
          ? "border-cream/10 text-cream/55 hover:text-gold"
          : "border-ink/10 text-ink/55 hover:text-champagne",
      )}
    >
      <span className="font-sans text-[11px] uppercase tracking-[0.3em]">
        <span className="text-champagne">{index}</span>
        <span className="mx-2 opacity-40">/</span>
        {label}
      </span>
      <svg
        width="30"
        height="12"
        viewBox="0 0 30 12"
        fill="none"
        className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
        aria-hidden
      >
        <path
          d="M0 6h28M23 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
