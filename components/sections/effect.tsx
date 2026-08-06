import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { BeforeAfter } from "@/components/ui/before-after";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/projects";

const CASES = PROJECTS.slice(0, 3);

export function Effect() {
  return (
    <section
      id="efekty"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="texture-wine absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 85% 20%, rgba(124,32,48,0.35), transparent 55%), linear-gradient(180deg, #120306 0%, #180508 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        {/* Heading block */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="05">Efekty</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                variant="elegant"
                className="mt-8 text-[clamp(2.1rem,4.8vw,4.25rem)] text-gold"
              >
                Efekt, który mówi
                <br />
                sam za siebie.
              </Heading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-cream/65">
                Głęboki połysk, idealna gładkość i ochrona, która naprawdę
                działa. Przeciągnij suwak i zobacz różnicę.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Reveal delay={0.15}>
              <ArrowButton href="#galeria" tone="dark" className="w-full sm:w-auto">
                Zobacz realizacje
              </ArrowButton>
            </Reveal>
          </div>
        </div>

        {/* Before / after cases */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={0.1 + i * 0.1}>
              <figure className="flex h-full flex-col">
                {/* Podmień na własne kadry przed/po w lib/projects.ts */}
                <BeforeAfter
                  beforeSrc={c.beforeSrc}
                  afterSrc={c.afterSrc}
                  beforeAlt={`${c.car} — przed`}
                  afterAlt={`${c.car} — po`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/5] w-full rounded-xl"
                />
                <figcaption className="mt-5 flex flex-1 flex-col">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-gold/15 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                      {c.service}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/35">
                      0{i + 1}
                    </span>
                  </div>
                  <span className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.06em] text-cream">
                    {c.car}
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-snug text-cream/55">
                    {c.short}
                  </p>
                  <Link
                    href={`/realizacje/${c.slug}`}
                    className="group/link mt-4 inline-flex items-center gap-2.5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-champagne transition-colors duration-300 hover:text-gold"
                  >
                    Zobacz szczegóły
                    <svg
                      width="20"
                      height="10"
                      viewBox="0 0 26 12"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-500 ease-lux group-hover/link:translate-x-1"
                    >
                      <path
                        d="M0 6h24M19 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
