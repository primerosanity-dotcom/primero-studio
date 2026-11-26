import { COMPANY } from "@/lib/site-config";
import { cn } from "@/lib/cn";

const ZOOM = 13;
const TILE = 256;

/** Web-Mercator position of a point, in tile units at the given zoom. */
function toTile(lat: number, lng: number, z: number) {
  const n = 2 ** z;
  const x = ((lng + 180) / 360) * n;
  const r = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  return { x, y };
}

/**
 * Small dark map of the studio's neighbourhood with a gold pin. Built from
 * OpenStreetMap tiles laid out around the pin and darkened with a CSS filter,
 * so it matches the site without an interactive map script; the whole map links
 * to Google Maps for directions.
 */
export function StudioMap({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const { lat, lng } = COMPANY.geo;
  const p = toTile(lat, lng, ZOOM);
  const tx = Math.floor(p.x);
  const ty = Math.floor(p.y);
  // Pixel offset of the pin inside its own tile.
  const ox = (p.x - tx) * TILE;
  const oy = (p.y - ty) * TILE;

  const tiles: { key: string; src: string; left: number; top: number }[] = [];
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const x = tx + dx;
      const y = ty + dy;
      tiles.push({
        key: `${x}-${y}`,
        src: `https://tile.openstreetmap.org/${ZOOM}/${x}/${y}.png`,
        left: dx * TILE - ox,
        top: dy * TILE - oy,
      });
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Primero Studio na mapie Łodzi — otwórz w Mapach Google"
      className={cn(
        "group relative block h-48 overflow-hidden rounded-xl border border-cream/10 bg-[#141414] transition-colors duration-500 hover:border-champagne/50",
        className,
      )}
    >
      {/* Tiles positioned around the centre of the frame (the pin). */}
      {/* OSM tiles turned into a dark map with a CSS filter. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 [filter:invert(1)_hue-rotate(180deg)_grayscale(0.9)_brightness(0.8)_contrast(1.2)]"
      >
        {tiles.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={t.key}
            src={t.src}
            alt=""
            width={TILE}
            height={TILE}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{ left: t.left, top: t.top, width: TILE, height: TILE }}
          />
        ))}
      </div>

      {/* Warm tint and soft vignette so the map sits in the wine palette. */}
      <div className="pointer-events-none absolute inset-0 bg-wine-deep/25 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(18,6,9,0.7)_100%)]" />

      {/* Pin */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/30" />
        <span className="relative block h-4 w-4 rounded-full border-2 border-wine-deep bg-gold shadow-[0_0_0_4px_rgba(222,196,140,0.25)]" />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-1/2 ml-4 -translate-y-1/2 rounded-full border border-champagne/30 bg-wine-deep/90 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
        Primero Studio
      </span>

      <span className="pointer-events-none absolute bottom-1.5 right-2 font-sans text-[9px] text-cream/40">
        © OpenStreetMap
      </span>
    </a>
  );
}
