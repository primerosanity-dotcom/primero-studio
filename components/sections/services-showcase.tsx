import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";
import { SERVICES } from "@/lib/services";

function Arrow() {
  return (
    <svg
      width="24"
      height="11"
      viewBox="0 0 26 12"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
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

export function ServicesShowcase({ index = "03" }: { index?: string }) {
  return (
    <section
      id="pakiety"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={index} tone="ink">
              Pakiety
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.1rem,5vw,4.5rem)] text-ink"
            >
              Pakiet dopasowany do twojego auta.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Pięć kompleksowych pakietów — od regularnej pielęgnacji po pełną
              renowację i ochronę ceramiczną. Zobacz zakres i orientacyjną cenę.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 + i * 0.06}>
              <Link
                href={`/pakiety/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-cream-soft/40 transition-colors duration-500 ease-lux hover:border-champagne/50"
              >
                <MediaSlot
                  src={s.image}
                  alt={`${s.name} — ${s.tagline}`}
                  tone="light"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 group-hover:text-champagne sm:text-xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                    {s.short}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="font-sans text-sm font-semibold text-ink">
                      {s.price}
                    </span>
                    <span className="flex items-center gap-2 font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-champagne">
                      Zobacz
                      <Arrow />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
