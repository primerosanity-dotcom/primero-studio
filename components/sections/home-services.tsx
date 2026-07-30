import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import { POINT_SERVICES } from "@/lib/individual-services";
import { cn } from "@/lib/cn";

// The 5 most popular point services shown on the home page.
// The first one is the featured (tall) card in the mosaic.
const POPULAR_IDS = [
  "powloka-ceramiczna",
  "mycie-detailingowe",
  "pranie-wnetrza",
  "polerowanie",
  "twardy-wosk",
];

const POPULAR = POPULAR_IDS.map(
  (id) => POINT_SERVICES.find((s) => s.id === id)!,
).filter(Boolean);

export function HomeServices() {
  const [featured, ...rest] = POPULAR;

  return (
    <section
      id="uslugi-home"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 12% 12%, rgba(124,32,48,0.28), transparent 55%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="03">Usługi</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading
                variant="elegant"
                className="mt-8 text-[clamp(2rem,4.6vw,3.8rem)] text-gold"
              >
                Najczęściej wybierane usługi.
              </Heading>
            </Reveal>
          </div>
        </div>

        {/* Mosaic: tall featured card + 2×2 grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured */}
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link
              href="/uslugi"
              className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-gold/40 bg-gold/[0.06] p-7 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/70 hover:bg-gold/[0.09] sm:p-9 lg:min-h-[520px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-14 select-none font-display text-[14rem] font-bold leading-none text-gold/[0.07] transition-transform duration-700 ease-lux group-hover:-translate-y-2"
              >
                01
              </span>
              <div className="relative">
                <span className="inline-flex rounded-full border border-gold/40 px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Bestseller
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-gold sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/65 sm:text-base">
                  {featured.desc}
                </p>
              </div>
              <div className="relative mt-10 flex items-end justify-between gap-6">
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-[0.24em] text-cream/45">
                    Cena od
                  </span>
                  <span className="mt-1 block font-display text-4xl font-bold text-cream">
                    {featured.price.replace("od ", "")}
                  </span>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-all duration-500 ease-lux group-hover:bg-gold group-hover:text-wine-deep">
                  <svg
                    width="22"
                    height="11"
                    viewBox="0 0 26 12"
                    fill="none"
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
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Four compact cards */}
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={0.06 + i * 0.05}>
              <Link
                href="/uslugi"
                className={cn(
                  "group relative flex h-full min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl border border-cream/12 bg-wine/40 p-6 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-champagne/50 sm:p-7 lg:min-h-[250px]",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-5 -top-9 select-none font-display text-[7.5rem] font-bold leading-none text-cream/[0.04] transition-transform duration-700 ease-lux group-hover:-translate-y-1"
                >
                  0{i + 2}
                </span>
                <div className="relative">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 max-w-xs font-sans text-[13px] leading-relaxed text-cream/50">
                    {s.desc}
                  </p>
                </div>
                <div className="relative mt-6 flex items-center justify-between gap-4 border-t border-cream/10 pt-4">
                  <span className="font-sans text-sm font-medium text-cream/80">
                    {s.price}
                  </span>
                  <svg
                    width="22"
                    height="11"
                    viewBox="0 0 26 12"
                    fill="none"
                    aria-hidden
                    className="text-gold opacity-0 transition-all duration-500 ease-lux group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    <path
                      d="M0 6h24M19 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ArrowButton
            href="/uslugi"
            tone="dark"
            className="mt-10 w-full justify-between lg:mt-12"
          >
            Wszystkie usługi
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
