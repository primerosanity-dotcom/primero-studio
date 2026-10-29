"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { setConsent, useConsent } from "@/lib/consent";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Consent gate for the analytics cookies. Accept and reject are the same size
 * and weight on purpose — EU rules require refusing to be as easy as agreeing,
 * and a dimmed "reject" is the single most common way these banners fail.
 *
 * No portal needed: <ReactLenis root> scrolls the document itself rather than
 * wrapping children in a transformed element, so position:fixed resolves
 * against the viewport exactly as the fixed header already does.
 */
export function CookieConsent() {
  const consent = useConsent();

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
          role="dialog"
          aria-live="polite"
          aria-label="Zgoda na pliki cookies"
        >
          <div className="mx-auto flex max-w-[1100px] flex-col gap-5 rounded-2xl border border-cream/12 bg-wine-deep/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-7 lg:flex-row lg:items-center lg:gap-8">
            <p className="font-sans text-sm leading-relaxed text-cream/75">
              Używamy plików cookies, żeby mierzyć ruch na stronie i skuteczność
              reklam. Bez Twojej zgody nie uruchamiamy żadnych narzędzi
              analitycznych. Szczegóły opisaliśmy w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-gold underline underline-offset-2 transition-opacity duration-300 hover:opacity-75"
              >
                polityce prywatności
              </Link>
              .
            </p>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:ml-auto">
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="rounded-full border border-cream/25 px-7 py-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.24em] text-cream/80 transition-colors duration-300 hover:border-cream/45 hover:text-cream"
              >
                Odrzucam
              </button>
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="rounded-full bg-gold px-7 py-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.24em] text-wine-deep transition-opacity duration-300 hover:opacity-85"
              >
                Akceptuję
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
