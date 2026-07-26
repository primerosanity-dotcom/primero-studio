"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { LeadForm } from "@/components/lead-form";

const EASE = [0.16, 1, 0.3, 1] as const;

export type BookingSummary = {
  /** Package name, e.g. CERAMIC */
  name: string;
  tagline: string;
  /** Display price, e.g. "od 2 990 zł" */
  price: string;
  cycle: string;
  duration: string;
  includes: string[];
  /** lead-form service value */
  prefill: string;
};

export function BookingModal({
  open,
  onClose,
  summary,
  deliveryEnabled,
  fallbackUrl,
}: {
  open: boolean;
  onClose: () => void;
  summary: BookingSummary;
  deliveryEnabled: boolean;
  fallbackUrl: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Freeze the page behind the modal. Lenis hijacks the wheel globally, so
    // stopping it (not overflow:hidden) is what actually locks the background.
    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";
    const t = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("input, button")?.focus(),
    );
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = "";
      cancelAnimationFrame(t);
    };
  }, [open, onClose, lenis]);

  const extraDetails = [
    `Wybrany pakiet: ${summary.name} — ${summary.tagline}`,
    `Cena: ${summary.price}`,
    "W pakiecie:",
    ...summary.includes.map((i) => `• ${i}`),
  ].join("\n");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Umów wizytę"
        >
          <div
            className="absolute inset-0 bg-wine-deep/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            data-lenis-prevent
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-champagne/30 bg-wine text-cream shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-cream/60 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-cream/50">
                Twoja wizyta
              </span>
              <h2 className="mt-3 font-sans text-2xl font-light uppercase tracking-[0.02em] text-gold">
                Umów wizytę
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream/60">
                Zostaw kontakt — potwierdzimy wycenę i zaproponujemy termin.
              </p>

              {/* Selection summary */}
              <div className="mt-6 rounded-xl border border-cream/10 bg-wine-deep/40 p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-gold">
                    {summary.name}
                  </span>
                  <span className="shrink-0 font-display text-xl font-semibold text-cream">
                    {summary.price}
                  </span>
                </div>
                <p className="mt-1.5 font-sans text-[13px] text-cream/60">
                  {summary.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-[11px] uppercase tracking-[0.14em] text-champagne/80">
                  <span>{summary.cycle}</span>
                  <span className="text-cream/30">·</span>
                  <span>{summary.duration}</span>
                </div>

                <ul className="mt-4 space-y-2 border-t border-cream/10 pt-4">
                  {summary.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-sm leading-snug text-cream/75">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead form — no service picker, package carried into details */}
              <div className="mt-7">
                <LeadForm
                  compact
                  hideService
                  presetService={summary.prefill}
                  extraDetails={extraDetails}
                  deliveryEnabled={deliveryEnabled}
                  fallbackUrl={fallbackUrl}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
