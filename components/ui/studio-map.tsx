import { COMPANY } from "@/lib/site-config";
import { cn } from "@/lib/cn";

/**
 * Small, non-interactive map of Łódź with the studio pinned, so people see
 * which part of the city we are in. OpenStreetMap embed (no tracking
 * cookies), recoloured to the site's dark palette; the whole map links to
 * Google Maps for directions.
 */
export function StudioMap({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const { lat, lng } = COMPANY.geo;
  // Wide enough to show the whole city around the pin; the pin is the centre.
  const dLng = 0.16;
  const dLat = 0.065;
  const bbox = [lng - dLng, lat - dLat, lng + dLng, lat + dLat]
    .map((n) => n.toFixed(4))
    .join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Primero Studio na mapie Łodzi — otwórz w Mapach Google"
      className={cn(
        "group relative block h-44 overflow-hidden rounded-xl border border-cream/10 bg-wine-deep transition-colors duration-500 hover:border-champagne/50",
        className,
      )}
    >
      {/* Oversized and offset so the embed's own zoom buttons and credits sit
          outside the frame; the centre (the studio) stays in the middle. */}
      <iframe
        src={src}
        title="Mapa: Primero Studio w Łodzi"
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute -left-[60px] -top-[60px] h-[calc(100%+120px)] w-[calc(100%+120px)] border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.45)_brightness(0.85)_contrast(1.05)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-wine-deep/20 mix-blend-multiply" />

      {/* Pin */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/30" />
        <span className="relative block h-4 w-4 rounded-full border-2 border-wine-deep bg-gold shadow-[0_0_0_4px_rgba(222,196,140,0.25)]" />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-1/2 ml-4 -translate-y-1/2 rounded-full bg-wine-deep/85 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-sm">
        Primero Studio
      </span>

      <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-wine-deep/70 px-1.5 py-0.5 font-sans text-[9px] text-cream/50">
        © OpenStreetMap
      </span>
    </a>
  );
}
