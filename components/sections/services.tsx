"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { TextLink } from "@/components/ui/text-link";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";
import { dispatchLeadPrefill } from "@/lib/lead-prefill";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    id: "mycie",
    n: "01",
    title: "Mycie detailingowe",
    desc: "Dokładne mycie zewnętrzne, dekontaminacja i bezpieczne przygotowanie auta do dalszych prac.",
    price: "od 300 zł",
  },
  {
    id: "korekta",
    n: "02",
    title: "Korekta lakieru",
    desc: "Usuwanie zmatowień, hologramów i drobnych rys. Przywracamy głęboki, lustrzany połysk.",
    price: "od 1 200 zł",
  },
  {
    id: "ceramika",
    n: "03",
    title: "Powłoki ceramiczne",
    desc: "Ochrona lakieru na lata, głębia koloru, efekt hydrofobowy i łatwiejsza pielęgnacja.",
    price: "od 2 200 zł",
  },
  {
    id: "ppf",
    n: "04",
    title: "Ochrona PPF",
    desc: "Bezbarwna folia ochronna na najbardziej narażone elementy — chroni przed odpryskami i rysami.",
    price: "od 4 500 zł",
  },
  {
    id: "wnetrze",
    n: "05",
    title: "Detailing wnętrza",
    desc: "Czyszczenie, pielęgnacja skóry i tworzyw oraz dopracowanie każdego detalu w kabinie.",
    price: "od 600 zł",
  },
];

const PACKAGE = {
  title: "Pakiet PRIMERO",
  tagline: "Kompleksowa metamorfoza auta w jednym terminie.",
  price: "od 4 490 zł",
  includes: [
    "Mycie detailingowe i dekontaminacja",
    "Korekta lakieru — jednoetapowa",
    "Powłoka ceramiczna z gwarancją",
    "Detailing i odświeżenie wnętrza",
  ],
};

export function Services() {
  const [openId, setOpenId] = useState<string | null>("mycie");

  return (
    <section
      id="uslugi"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-12 pt-20 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="05" tone="ink">
              Usługi
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.1rem,5vw,4.5rem)] text-ink"
            >
              Wybierz usługę, której potrzebuje twoje auto.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Rozwiń usługę, aby poznać zakres prac i orientacyjną cenę. Ceny
              zależą od rozmiaru i stanu auta.
            </p>
          </Reveal>
        </div>

        {/* ── Accordion ─────────────────────────────────── */}
        <div className="mt-10 border-t border-ink/12 lg:mt-14">
          {SERVICES.map((s) => {
            const isOpen = openId === s.id;
            return (
              <Reveal key={s.id}>
                <div className="border-b border-ink/12">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : s.id)}
                      aria-expanded={isOpen}
                      aria-controls={`svc-${s.id}`}
                      className="group flex w-full items-center gap-4 py-5 text-left lg:gap-8 lg:py-7"
                    >
                      <span
                        className={cn(
                          "font-display text-xl font-semibold transition-colors duration-300 sm:text-2xl",
                          isOpen ? "text-champagne" : "text-ink/25",
                        )}
                      >
                        {s.n}
                      </span>
                      <span className="flex-1 font-sans text-base font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 group-hover:text-champagne sm:text-xl">
                        {s.title}
                      </span>
                      <span className="hidden shrink-0 font-sans text-sm tracking-[0.1em] text-ink/45 sm:block">
                        {s.price}
                      </span>
                      <span
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 text-ink/50 transition-all duration-500 ease-lux group-hover:border-champagne group-hover:text-champagne",
                          isOpen && "rotate-45 border-champagne text-champagne",
                        )}
                        aria-hidden
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        >
                          <path d="M6.5 1v11M1 6.5h11" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-${s.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-4 pb-7 pl-9 pr-2 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 lg:pl-16">
                          <p className="max-w-xl font-sans text-sm leading-relaxed text-ink/65 sm:text-base">
                            {s.desc}
                          </p>
                          <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
                            <span className="font-display text-2xl font-semibold text-ink sm:hidden">
                              {s.price}
                            </span>
                            <TextLink
                              href="#kontakt"
                              tone="light"
                              onClick={() =>
                                dispatchLeadPrefill({ service: s.id })
                              }
                            >
                              Wybierz usługę
                            </TextLink>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Package (always expanded) ─────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-champagne/30 bg-wine text-cream lg:mt-16">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-gold">
                  Pakiet · oszczędzasz
                </span>
                <Heading
                  variant="elegant"
                  className="mt-5 text-[clamp(1.7rem,3vw,2.6rem)] text-gold"
                >
                  {PACKAGE.title}
                </Heading>
                <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/70">
                  {PACKAGE.tagline}
                </p>
                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-display text-4xl font-semibold text-cream">
                    {PACKAGE.price}
                  </span>
                </div>
              </div>

              <div className="lg:border-l lg:border-cream/10 lg:pl-12">
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
                  W pakiecie
                </span>
                <ul className="mt-5 space-y-3.5">
                  {PACKAGE.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8.5 6.5 12 13 4.5" />
                      </svg>
                      <span className="font-sans text-sm leading-snug text-cream/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  onClick={() =>
                    dispatchLeadPrefill({
                      service: "ceramika",
                      details: `Zainteresowany pakietem: ${PACKAGE.title} (${PACKAGE.price})`,
                    })
                  }
                  className="group mt-8 inline-flex w-full items-center justify-between gap-8 bg-gold px-7 py-4 font-sans text-[0.7rem] font-medium uppercase tracking-[0.26em] text-wine-deep transition-colors duration-300 hover:bg-cream-soft"
                >
                  <span>Zapytaj o pakiet</span>
                  <svg
                    width="24"
                    height="12"
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
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <NextCue index="06" label="Wycena" href="#wycena" tone="light" />
    </section>
  );
}
