import Link from "next/link";
import { cn } from "@/lib/cn";

export function TextLink({
  href = "#",
  children,
  tone = "dark",
  className,
}: {
  href?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.28em] transition-colors duration-300",
        tone === "dark"
          ? "text-champagne hover:text-gold"
          : "text-champagne hover:text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <svg
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
        className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
        aria-hidden
      >
        <path
          d="M0 5h20M15.5 1l4.5 4-4.5 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
