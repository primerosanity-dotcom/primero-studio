import { COMPANY } from "@/lib/site-config";
import { cn } from "@/lib/cn";

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
 * Dark map of the studio's neighbourhood with a gold pin. OpenStreetMap tiles
 * laid out around the pin and darkened with a CSS filter, so it matches the
 * site without an interactive map script. With `href` the whole map is a link
 * (Google Maps); without it, it is a plain picture and the parent can lay its
 * own links over it. The pin sits in the centre unless the parent moves it
 * with the --pin-x / --pin-y CSS variables (e.g. away from an overlay card).
 */
function TileLayer({ zoom, className }: { zoom: number; className?: string }) {
  const { lat, lng } = COMPANY.geo;
  const p = toTile(lat, lng, zoom);
  const tx = Math.floor(p.x);
  const ty = Math.floor(p.y);
  // Pixel offset of the pin inside its own tile.
  const ox = (p.x - tx) * TILE;
  const oy = (p.y - ty) * TILE;

  // 5×5 tiles around the pin cover frames up to ~1000×1000 px.
  const tiles: { key: string; src: string; left: number; top: number }[] = [];
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      const x = tx + dx;
      const y = ty + dy;
      tiles.push({
        key: `${x}-${y}`,
        src: `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`,
        left: dx * TILE - ox,
        top: dy * TILE - oy,
      });
    }
  }

  return (
    // OSM tiles turned into a dark map with a CSS filter.
    <div
      aria-hidden
      className={cn(
        "absolute left-[var(--pin-x,50%)] top-[var(--pin-y,50%)] [filter:invert(1)_hue-rotate(180deg)_grayscale(0.9)_brightness(0.85)_contrast(1.2)]",
        className,
      )}
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
  );
}

export function StudioMap({
  href,
  className,
  zoom = 13,
  mobileZoom,
}: {
  href?: string;
  className?: string;
  zoom?: number;
  /** Zoom on phones (below lg) — lower shows the whole city. */
  mobileZoom?: number;
}) {
  const body = (
    <>
      {mobileZoom && mobileZoom !== zoom ? (
        <>
          {/* Hidden layers are not fetched: the tiles are lazy images. */}
          <TileLayer zoom={mobileZoom} className="lg:hidden" />
          <TileLayer zoom={zoom} className="hidden lg:block" />
        </>
      ) : (
        <TileLayer zoom={zoom} />
      )}

      {/* Warm tint and soft vignette so the map sits in the wine palette. */}
      <div className="pointer-events-none absolute inset-0 bg-wine-deep/25 mix-blend-multiply" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(18,6,9,0.75)_100%)]" />

      {/* Pin */}
      <span className="pointer-events-none absolute left-[var(--pin-x,50%)] top-[var(--pin-y,50%)] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/25" />
        <span className="relative block h-5 w-5 rounded-full border-[3px] border-wine-deep bg-gold shadow-[0_0_0_5px_rgba(222,196,140,0.22)]" />
      </span>
      <span className="pointer-events-none absolute left-[var(--pin-x,50%)] top-[var(--pin-y,50%)] ml-5 -translate-y-1/2 rounded-full border border-champagne/30 bg-wine-deep/90 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
        Primero Studio
      </span>

      {href && (
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-champagne/30 bg-wine-deep/85 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-cream/80 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
          Otwórz mapę
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M4 2h6v6M10 2 3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      )}

      <span className="pointer-events-none absolute right-2.5 top-2 font-sans text-[9px] text-cream/40">
        © OpenStreetMap
      </span>
    </>
  );

  const frame = cn("relative block overflow-hidden bg-[#141414]", className);

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Primero Studio na mapie Łodzi — otwórz w Mapach Google"
      className={cn("group", frame)}
    >
      {body}
    </a>
  ) : (
    <div className={frame}>{body}</div>
  );
}
