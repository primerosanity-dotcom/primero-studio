import Image from "next/image";
import Link from "next/link";

export type RelatedItem = {
  href: string;
  title: string;
  image?: string;
  /** Short line under the title — price or type of work. */
  meta?: string;
};

/**
 * "Other packages / related services / other projects" block at the bottom
 * of detail pages: a grid of small photo cards instead of a bare list of
 * names, so every item is easy to tap on a phone.
 */
export function RelatedLinks({
  label,
  items,
  headingAs = "h2",
}: {
  label: string;
  items: RelatedItem[];
  headingAs?: "h2" | "span";
}) {
  if (items.length === 0) return null;
  const Label = headingAs;

  return (
    <div className="mt-16 border-t border-cream/10 pt-12">
      <div className="flex items-baseline justify-between gap-4">
        <Label className="font-sans text-[11px] font-normal uppercase tracking-[0.3em] text-cream/45">
          {label}
        </Label>
        <span className="font-sans text-[11px] tracking-[0.2em] text-cream/30">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-cream/10 bg-cream/[0.03] transition-colors duration-500 ease-lux hover:border-champagne/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-wine-deep">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(222,196,140,0.18),transparent_60%)]" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:p-4">
                <span className="font-display text-[0.85rem] font-semibold uppercase leading-snug tracking-[0.02em] text-cream transition-colors duration-300 group-hover:text-gold sm:text-[0.95rem]">
                  {item.title}
                </span>
                <span className="flex items-center justify-between gap-2">
                  {item.meta ? (
                    <span className="truncate font-display text-sm font-semibold text-gold sm:text-base">
                      {item.meta}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/60 transition-colors duration-300 group-hover:border-gold group-hover:text-gold"
                  >
                    <svg width="12" height="8" viewBox="0 0 26 12" fill="none">
                      <path
                        d="M0 6h24M19 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
