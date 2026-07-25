"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { LeadForm } from "@/components/lead-form";

const EASE = [0.16, 1, 0.3, 1] as const;
const zl = (n: number) => n.toLocaleString("pl-PL");

export type BookingSummary = {
  sizeLabel: string;
  items: { name: string; price: number }[];
  discount: number;
  total: number;
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
    "Wycena z konfiguratora:",
    `• Typ auta: ${summary.sizeLabel}`,
    ...summary.items.map((i) => `• ${i.name} — ${zl(i.price)} zł`),
    summary.discount > 0 ? `• Rabat pakietowy: −${zl(summary.discount)} zł` : null,
    `Razem od: ${zl(summary.total)} zł`,
  ]
    .filter(Boolean)
    .join("\n");

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
                <div className="flex items-center justify-between gap-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/45">
                    Twój wybór
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-champagne">
                    {summary.sizeLabel}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {summary.items.length === 0 ? (
                    <li className="font-sans text-sm text-cream/50">
                      Nie wybrano usług — doradzimy zakres prac.
                    </li>
                  ) : (
                    summary.items.map((i) => (
                      <li
                        key={i.name}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <span className="font-sans text-sm text-cream/80">
                          {i.name}
                        </span>
                        <span className="shrink-0 font-sans text-sm text-cream/60">
                          {zl(i.price)} zł
                        </span>
                      </li>
                    ))
                  )}
                  {summary.discount > 0 && (
                    <li className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-sm text-gold">
                        Rabat pakietowy −10%
                      </span>
                      <span className="shrink-0 font-sans text-sm text-gold">
                        −{zl(summary.discount)} zł
                      </span>
                    </li>
                  )}
                </ul>

                <div className="mt-4 flex items-baseline justify-between border-t border-cream/10 pt-4">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/45">
                    Razem od
                  </span>
                  <span className="font-display text-3xl font-semibold text-gold">
                    {zl(summary.total)}
                    <span className="ml-1 font-sans text-sm uppercase tracking-[0.2em] text-gold/70">
                      zł
                    </span>
                  </span>
                </div>
              </div>

              {/* Lead form — no service picker, summary carried into details */}
              <div className="mt-7">
                <LeadForm
                  compact
                  hideService
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
