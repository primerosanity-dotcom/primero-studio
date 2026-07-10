"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { ArrowButton } from "@/components/ui/arrow-button";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Data ─────────────────────────────────────────────────── */

type SizeId = "s" | "m" | "l" | "xl";

const SIZES: { id: SizeId; label: string; hint: string }[] = [
  { id: "s", label: "Kompakt", hint: "np. Golf, Mini" },
  { id: "m", label: "Sedan / Kombi", hint: "np. A6, E-Klasa" },
  { id: "l", label: "SUV / Crossover", hint: "np. Cayenne, X5" },
  { id: "xl", label: "Van / XL", hint: "np. V-Klasa" },
];

const SIZE_INDEX: Record<SizeId, number> = { s: 0, m: 1, l: 2, xl: 3 };

const SERVICES = [
  {
    id: "mycie",
    name: "Mycie detailingowe",
    desc: "Dokładne mycie i bezpieczne przygotowanie auta.",
    prices: [300, 350, 400, 500],
  },
  {
    id: "korekta",
    name: "Korekta lakieru",
    desc: "Usuwanie zmatowień, hologramów i drobnych rys.",
    prices: [1200, 1400, 1700, 2000],
  },
  {
    id: "ceramika",
    name: "Powłoka ceramiczna",
    desc: "Ochrona lakieru i głębia koloru na lata.",
    prices: [2200, 2500, 2900, 3400],
  },
  {
    id: "ppf",
    name: "Ochrona PPF — przód",
    desc: "Folia ochronna na najbardziej narażone elementy.",
    prices: [4500, 5200, 6000, 7000],
  },
  {
    id: "wnetrze",
    name: "Detailing wnętrza",
    desc: "Czyszczenie, pielęgnacja skóry i dopracowanie detali.",
    prices: [600, 700, 850, 1000],
  },
];

const PACKAGE_MIN = 3;
const PACKAGE_DISCOUNT = 0.1;

const zl = (n: number) => n.toLocaleString("pl-PL");

/* ── Thin line-art car silhouettes ────────────────────────── */

function CarIcon({ type, className }: { type: SizeId; className?: string }) {
  const bodies: Record<SizeId, { body: string; window: string; w: [number, number] }> = {
    s: {
      body: "M9 33v-5c0-4 4-6 12-7l12-9c6-4 18-4 25-2l10 5c8 2 14 6 16 11v7",
      window: "M31 20l6-7 17-1 8 4",
      w: [27, 71],
    },
    m: {
      body: "M5 33v-4c0-4 3-6 10-7l14-9c6-4 20-5 28-3l10 5 12 3c8 2 12 6 12 11v4",
      window: "M27 21l6-7 20-2 11 5",
      w: [25, 75],
    },
    l: {
      body: "M8 33v-6c0-5 4-8 11-9l9-8c5-4 25-4 33-2l10 5c9 2 15 6 17 12v8",
      window: "M26 17l5-7 25-1 9 5",
      w: [27, 71],
    },
    xl: {
      body: "M9 33V14c0-4 3-6 9-6h40c8 0 16 2 21 7 4 4 7 10 8 18",
      window: "M62 9c7 2 13 6 17 11M40 8v10",
      w: [27, 71],
    },
  };
  const { body, window: win, w } = bodies[type];
  return (
    <svg
      viewBox="0 0 96 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={body} />
      <path d={win} />
      <circle cx={w[0]} cy="33" r="5.5" />
      <circle cx={w[1]} cy="33" r="5.5" />
    </svg>
  );
}

/* ── Step header ──────────────────────────────────────────── */

function StepHeader({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-base font-semibold text-champagne">
        {n}
      </span>
      <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/70">
        {children}
      </span>
      <span className="h-px flex-1 bg-cream/10" />
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────── */

export function Pricing() {
  const [size, setSize] = useState<SizeId>("m");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(["mycie", "ceramika"]),
  );

  const idx = SIZE_INDEX[size];
  const chosen = SERVICES.filter((s) => selected.has(s.id));
  const subtotal = chosen.reduce((acc, s) => acc + s.prices[idx], 0);
  const hasDiscount = chosen.length >= PACKAGE_MIN;
  const discountValue = hasDiscount
    ? Math.round(subtotal * PACKAGE_DISCOUNT)
    : 0;
  const total = subtotal - discountValue;

  // Animated count-up for the total
  const mv = useMotionValue(0);
  const totalText = useTransform(mv, (v) => zl(Math.round(v)));
  useEffect(() => {
    const controls = animate(mv, total, { duration: 0.8, ease: EASE });
    return () => controls.stop();
  }, [total, mv]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id="wycena"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 12% 10%, rgba(124,32,48,0.3), transparent 55%), radial-gradient(80% 60% at 90% 90%, rgba(76,22,34,0.35), transparent 60%), linear-gradient(180deg, #140406 0%, #100305 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-6 pb-10 pt-20 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-12 lg:pt-28">
        {/* ── Left: configurator ─────────────────────────── */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index="06">Wycena</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-5 text-[clamp(1.7rem,3.2vw,2.6rem)] text-gold"
            >
              Skomponuj swoją wycenę.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-cream/60">
              Wybierz typ auta i usługi, które Cię interesują. Ceny są
              orientacyjne — ostateczną wycenę potwierdzamy po ocenie stanu
              auta.
            </p>
          </Reveal>

          {/* Step 1 — car type */}
          <Reveal delay={0.15}>
            <div className="mt-8">
              <StepHeader n="01">Typ auta</StepHeader>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SIZES.map((s) => {
                  const active = size === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      data-size={s.id}
                      onClick={() => setSize(s.id)}
                      aria-pressed={active}
                      className={cn(
                        "group flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 transition-all duration-500 ease-lux",
                        active
                          ? "border-gold/70 bg-gold/[0.07] text-gold"
                          : "border-cream/12 text-cream/60 hover:border-cream/30 hover:text-cream/90",
                      )}
                    >
                      <CarIcon type={s.id} className="h-8 w-16" />
                      <span className="font-sans text-[9.5px] font-medium uppercase tracking-[0.16em]">
                        {s.label}
                      </span>
                      <span
                        className={cn(
                          "font-sans text-[8.5px] tracking-[0.06em] transition-colors duration-500",
                          active ? "text-gold/60" : "text-cream/35",
                        )}
                      >
                        {s.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Step 2 — services */}
          <Reveal delay={0.2}>
            <div className="mt-8">
              <StepHeader n="02">Usługi</StepHeader>
              <div className="mt-1">
                {SERVICES.map((s) => {
                  const active = selected.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      data-service={s.id}
                      onClick={() => toggle(s.id)}
                      aria-pressed={active}
                      className="group flex w-full items-center gap-4 border-b border-cream/10 py-3 text-left transition-colors duration-300 hover:bg-cream/[0.02]"
                    >
                      {/* toggle indicator */}
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-lux",
                          active
                            ? "border-gold bg-gold text-wine-deep"
                            : "border-cream/25 text-cream/40 group-hover:border-cream/50",
                        )}
                      >
                        {active ? (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-2.5 w-2.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 6.5 4.8 9 10 3.5" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-2.5 w-2.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          >
                            <path d="M6 2v8M2 6h8" />
                          </svg>
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-sans text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                            active ? "text-gold" : "text-cream/85",
                          )}
                        >
                          {s.name}
                        </span>
                        <span className="mt-0.5 block font-sans text-[11px] leading-snug text-cream/45">
                          {s.desc}
                        </span>
                      </span>

                      <motion.span
                        key={size}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className={cn(
                          "shrink-0 font-sans text-xs tracking-[0.12em]",
                          active ? "text-gold" : "text-cream/55",
                        )}
                      >
                        od {zl(s.prices[idx])} zł
                      </motion.span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Right: sticky summary ──────────────────────── */}
        <div className="lg:col-span-5">
          <Reveal delay={0.2} className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-champagne/25 bg-wine px-6 py-6 sm:px-8 sm:py-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-cream/50">
                  Twoja wycena
                </span>
                <motion.span
                  key={size}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-sans text-[11px] uppercase tracking-[0.2em] text-champagne"
                >
                  {SIZES.find((s) => s.id === size)?.label}
                </motion.span>
              </div>

              <div className="mt-4 h-px w-full bg-cream/10" />

              {/* Selected services */}
              <div className="mt-4 min-h-[5.5rem]">
                {chosen.length === 0 ? (
                  <p className="font-sans text-sm leading-relaxed text-cream/45">
                    Zaznacz usługi po lewej stronie, aby zobaczyć wycenę.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    <AnimatePresence initial={false}>
                      {chosen.map((s) => (
                        <motion.li
                          key={s.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span className="font-sans text-sm text-cream/80">
                            {s.name}
                          </span>
                          <span className="shrink-0 font-sans text-sm text-cream/60">
                            {zl(s.prices[idx])} zł
                          </span>
                        </motion.li>
                      ))}
                      {hasDiscount && (
                        <motion.li
                          key="discount"
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <span className="font-sans text-sm text-gold">
                            Rabat pakietowy −10%
                          </span>
                          <span className="shrink-0 font-sans text-sm text-gold">
                            −{zl(discountValue)} zł
                          </span>
                        </motion.li>
                      )}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              <div className="mt-4 h-px w-full bg-cream/10" />

              {/* Total */}
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-cream/50">
                  Razem od
                </span>
                <span className="flex items-baseline gap-2" data-total>
                  <motion.span className="font-display text-3xl font-bold text-gold sm:text-4xl">
                    {totalText}
                  </motion.span>
                  <span className="font-sans text-sm uppercase tracking-[0.2em] text-gold/70">
                    zł
                  </span>
                </span>
              </div>

              <p className="mt-3 font-sans text-[10px] leading-relaxed text-cream/40">
                Ceny orientacyjne brutto. Ostateczna wycena po ocenie stanu
                auta w studio.
              </p>

              <ArrowButton
                href="#kontakt"
                variant="solid"
                className="mt-5 w-full"
              >
                Umów wizytę
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </div>

      <NextCue index="07" label="Opinie" href="#opinie" tone="dark" />
    </section>
  );
}
