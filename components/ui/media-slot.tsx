import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A drop-in image slot. Leave `src` empty to show a styled placeholder
 * (a glossy dark car-panel abstraction). To use a real photo, drop the file
 * in /public/images and pass e.g. src="/images/hero.jpg".
 */
export function MediaSlot({
  src,
  alt = "",
  caption,
  priority,
  sizes = "(max-width: 1024px) 100vw, 45vw",
  className,
  vignette = true,
  tone = "dark",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  vignette?: boolean;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        light ? "bg-cream-soft" : "bg-wine-deep",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            light ? "media-placeholder-light" : "media-placeholder",
          )}
        />
      )}

      {/* moving specular light */}
      <div aria-hidden className="media-sheen pointer-events-none absolute inset-0" />

      {vignette && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            light
              ? "bg-gradient-to-t from-cream/60 via-transparent to-cream/5"
              : "bg-gradient-to-t from-wine-deep/75 via-transparent to-wine-deep/10",
          )}
        />
      )}

      {caption && (
        <span
          className={cn(
            "absolute bottom-5 left-5 z-10 font-sans text-[10px] uppercase tracking-[0.3em]",
            light ? "text-ink/50" : "text-cream/60",
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
