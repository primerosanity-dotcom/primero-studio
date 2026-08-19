"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Gallery grid with a lightbox. Thumbnails open a full-size view that can be
 * paged with the arrow keys or the on-screen controls; Escape and a click on
 * the backdrop close it. Lenis hijacks the wheel globally, so it is stopped
 * while the lightbox is open — otherwise the page would scroll behind it.
 */
export function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const lenis = useLenis();

  const close = useCallback(() => {
    setOpenAt(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openAt === null) return;

    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [openAt, close, step, lenis]);

  if (images.length === 0) return null;

  // AnimatePresence stays mounted inside the portal so the exit fade plays;
  // during SSR there is no document, and both sides render nothing.
  const portalTarget = typeof document === "undefined" ? null : document.body;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setOpenAt(i);
            }}
            aria-label={`${alt} — powiększ zdjęcie ${i + 1}`}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-cream/10 bg-wine-deep transition-colors duration-500 ease-lux hover:border-champagne/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Image
              src={src}
              alt={`${alt} — kadr ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {portalTarget &&
        createPortal(
          <AnimatePresence>
            {openAt !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <div
              className="absolute inset-0 bg-wine-deep/92 backdrop-blur-md"
              onClick={close}
            />

            <motion.div
              key={openAt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-10 max-h-[88vh] w-full max-w-5xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                <Image
                  src={images[openAt]}
                  alt={`${alt} — kadr ${openAt + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="mt-4 block text-center font-sans text-[11px] uppercase tracking-[0.28em] text-cream/50">
                {openAt + 1} / {images.length}
              </span>
            </motion.div>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Zamknij"
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:right-8 sm:top-8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Poprzednie zdjęcie"
                  className="absolute left-3 z-20 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:left-6"
                >
                  <svg width="18" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
                    <path d="M26 6H2M7 1L2 6l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Następne zdjęcie"
                  className="absolute right-3 z-20 grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-300 hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:right-6"
                >
                  <svg width="18" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
                    <path d="M0 6h24M19 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
