"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";
import { dispatchLeadPrefill } from "@/lib/lead-prefill";
import { POINT_SERVICES } from "@/lib/individual-services";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="11"
      viewBox="0 0 26 12"
      fill="none"
      aria-hidden
      className={className}
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

export function ServicesList() {
  return (
    <section
      id="uslugi"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="03" tone="ink">
              Usługi
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.1rem,5vw,4.5rem)] text-ink"
            >
              Pojedyncze usługi detailingowe.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Ceny zależą od rozmiaru i stanu auta. Szukasz gotowego zestawu?{" "}
              <Link
                href="/pakiety"
                className="text-champagne underline-offset-4 hover:underline"
              >
                Zobacz pakiety →
              </Link>
            </p>
          </Reveal>
        </div>

        {/* Horizontal cards: photo | text + price + CTA */}
        <div className="mt-12 space-y-5 lg:mt-16">
          {POINT_SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={0.05 + Math.min(i, 4) * 0.04}>
              <article className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-ink/12 bg-cream-soft/40 transition-colors duration-500 ease-lux hover:border-champagne/50 md:grid-cols-[minmax(0,380px)_1fr]">
                {/* Photo — drop the real file in /public/images/uslugi/<id>.png */}
                <MediaSlot
                  src={s.image}
                  alt={s.title}
                  tone="light"
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="aspect-[16/9] w-full md:aspect-auto md:h-full md:min-h-[230px]"
                />

                <div className="flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 group-hover:text-champagne sm:text-2xl">
                        {s.title}
                      </h3>
                      <span className="hidden shrink-0 font-sans text-[11px] tracking-[0.3em] text-champagne sm:block">
                        {s.n}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink/60 sm:text-base">
                      {s.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-ink/40">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="8" />
                        <path
                          d="M12 8v4.2l2.8 1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {s.duration}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-6 border-t border-ink/10 pt-5">
                    <span className="font-display text-2xl font-semibold text-ink">
                      {s.price}
                    </span>
                    <Link
                      href="#kontakt-form"
                      onClick={() =>
                        dispatchLeadPrefill({
                          details: `Zainteresowany usługą: ${s.title} (${s.price})`,
                        })
                      }
                      className="group/btn inline-flex shrink-0 items-center gap-4 bg-gold px-6 py-3.5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-wine-deep transition-colors duration-500 ease-lux hover:bg-champagne sm:px-7"
                    >
                      Zapytaj
                      <Arrow className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
