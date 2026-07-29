"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/reveal";
import { dispatchLeadPrefill } from "@/lib/lead-prefill";
import { POINT_SERVICES } from "@/lib/individual-services";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ServicesList() {
  const [openId, setOpenId] = useState<string | null>(POINT_SERVICES[0].id);

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
              Rozwiń usługę, aby poznać zakres prac i orientacyjny czas. Ceny
              zależą od rozmiaru i stanu auta. Szukasz gotowego zestawu?{" "}
              <Link
                href="/pakiety"
                className="text-champagne underline-offset-4 hover:underline"
              >
                Zobacz pakiety →
              </Link>
            </p>
          </Reveal>
        </div>

        {/* Accordion */}
        <div className="mt-10 border-t border-ink/12 lg:mt-14">
          {POINT_SERVICES.map((s) => {
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
                        <div className="grid gap-4 pb-6 pl-9 pr-2 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8 lg:pl-16">
                          <div className="max-w-xl">
                            <p className="font-sans text-sm leading-relaxed text-ink/65 sm:text-base">
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
                          <div className="flex items-center justify-between gap-6 sm:justify-end">
                            <span className="whitespace-nowrap font-sans text-base font-semibold text-ink sm:hidden">
                              {s.price}
                            </span>
                            <TextLink
                              href="#kontakt-form"
                              tone="light"
                              onClick={() =>
                                dispatchLeadPrefill({
                                  details: `Zainteresowany usługą: ${s.title} (${s.price})`,
                                })
                              }
                            >
                              Zapytaj o usługę
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
      </div>
    </section>
  );
}
