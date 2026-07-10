"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { ArrowButton } from "@/components/ui/arrow-button";
import { ScrollCue } from "@/components/ui/scroll-cue";

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.95, delay: 0.35 + i * 0.12, ease: EASE },
  }),
};

const KEYWORDS = ["Korekta lakieru", "Ceramika", "PPF", "Wnętrza"];

export function Hero() {
  return (
    <section
      id="studio"
      data-section-theme="dark"
      className="relative min-h-[100dvh] overflow-hidden bg-wine-deep text-cream"
    >
      {/* ── Full-bleed background photo ────────────────────── */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.png"
          alt="Auto klasy premium po detailingu w Primero Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
      </motion.div>

      {/* Readability scrims: darken the left (text) and the bottom */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(16,3,6,0.94) 0%, rgba(16,3,6,0.6) 34%, rgba(16,3,6,0.08) 66%, rgba(16,3,6,0) 100%), linear-gradient(to top, rgba(16,3,6,0.92) 0%, rgba(16,3,6,0) 42%)",
        }}
      />

      {/* Vertical edge label */}
      <span className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-180 font-sans text-[10px] uppercase tracking-[0.5em] text-cream/40 [writing-mode:vertical-rl] xl:block">
        Premium Auto Detailing
      </span>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1500px] items-center px-6 pb-32 pt-28 lg:px-12">
        <div className="max-w-3xl">
          <motion.div custom={0} variants={rise} initial="hidden" animate="show">
            <SectionLabel index="01">Studio · Warszawa</SectionLabel>
          </motion.div>

          <Heading
            as="h1"
            variant="elegant"
            className="mt-8 text-[clamp(1.6rem,7.4vw,4.25rem)] text-gold"
          >
            <motion.span
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="block whitespace-nowrap"
            >
              Pielęgnacja aut
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="block whitespace-nowrap"
            >
              klasy premium.
            </motion.span>
          </Heading>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 h-px w-14 bg-champagne/60"
          />

          <motion.p
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md font-sans text-base leading-relaxed text-cream/75"
          >
            Profesjonalny detailing, ochrona lakieru i pielęgnacja wnętrz
            w&nbsp;Warszawie. Traktujemy Twoje auto jak własne — z obsesją na
            punkcie każdego detalu.
          </motion.p>

          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-10"
          >
            <ArrowButton href="#kontakt" tone="dark" className="w-full sm:w-auto">
              Umów wizytę
            </ArrowButton>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: counter + scroll, then keyword strip ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto flex max-w-[1500px] items-center justify-between px-6 pb-4 lg:px-12"
        >
          <span className="font-sans text-[11px] tracking-[0.3em] text-cream/60">
            01 <span className="text-cream/30">/ 08</span>
          </span>
          <ScrollCue label="Scroll" />
          <span className="hidden w-16 sm:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="border-t border-cream/10"
        >
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4 font-sans text-[10px] uppercase tracking-[0.3em] text-cream/55 lg:px-12">
            {KEYWORDS.map((k, i) => (
              <span key={k} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/60" />}
                {k}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
