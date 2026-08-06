import { useId } from "react";
import { cn } from "@/lib/cn";

// The PRIMERO mark — vectorized from the client's brand asset
// (angular "P" with 45° facet cuts). Tintable via currentColor,
// or metallic gold via the `gradient` prop (brand lockups).
export function Monogram({
  className,
  gradient = false,
}: {
  className?: string;
  gradient?: boolean;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      fill="currentColor"
      className={cn("block", className)}
      aria-hidden
    >
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eedaa2" />
            <stop offset="0.5" stopColor="#d9b872" />
            <stop offset="1" stopColor="#a37c42" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={gradient ? `url(#${id})` : "currentColor"}
        d="M35.3 0L11.4 23.9L48.1 23.9L27.8 53.7L27.5 120L53.9 93.3L53.4 23.7L85.9 23.2L69.4 40.4L69 78.6L108.6 39.1L108.6 14.8L93.5 0Z"
      />
    </svg>
  );
}
