"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Monogram } from "@/components/ui/monogram";
import { cn } from "@/lib/cn";

const LINKS = [
  { n: "01", label: "Studio", href: "#studio" },
  { n: "02", label: "O nas", href: "#o-nas" },
  { n: "03", label: "Proces", href: "#proces" },
  { n: "04", label: "Efekty", href: "#efekty" },
  { n: "05", label: "Usługi", href: "#uslugi" },
  { n: "06", label: "Wycena", href: "#wycena" },
  { n: "07", label: "Opinie", href: "#opinie" },
  { n: "08", label: "Kontakt", href: "#kontakt" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrolled(window.scrollY > 32);
      const probe = 72;
      const sections = document.querySelectorAll("[data-section-theme]");
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTheme(
            s.getAttribute("data-section-theme") === "light" ? "light" : "dark",
          );
          break;
        }
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // When the menu is open the overlay is dark, so force the light-on-dark look.
  const dark = open || theme === "dark";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-lux",
          scrolled && !open
            ? dark
              ? "border-cream/10 bg-wine-deep/70 backdrop-blur-xl"
              : "border-ink/10 bg-cream/70 backdrop-blur-xl"
            : "border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-12">
          <Link
            href="#studio"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 transition-colors duration-500",
              dark ? "text-cream" : "text-ink",
            )}
          >
            <Monogram className="h-8 w-8 text-gold" />
            <span className="leading-none">
              <span className="block font-display text-sm font-semibold tracking-[0.2em]">
                PRIMERO.STUDIO
              </span>
              <span
                className={cn(
                  "mt-1.5 block font-sans text-[9px] tracking-[0.34em] transition-colors duration-500",
                  dark ? "text-cream/45" : "text-ink/45",
                )}
              >
                PREMIUM AUTO DETAILING
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="#kontakt"
              className={cn(
                "hidden font-sans text-[11px] uppercase tracking-[0.28em] transition-colors duration-300 hover:text-gold md:block",
                dark ? "text-cream/70" : "text-ink/70",
              )}
            >
              Umów wizytę
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              className={cn(
                "relative z-50 grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 hover:border-gold/50",
                dark ? "border-cream/15 text-cream" : "border-ink/15 text-ink",
              )}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-5 bg-current transition-all duration-500 ease-lux",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-current transition-opacity duration-300",
                    open ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px w-5 bg-current transition-all duration-500 ease-lux",
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 bg-wine-deep/95 backdrop-blur-2xl"
          >
            <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center overflow-y-auto px-6 pb-16 pt-24 lg:px-12">
              <nav className="flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: 44, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + i * 0.07,
                      ease: EASE,
                    }}
                    className="group flex items-baseline gap-5 border-b border-cream/10 py-3.5 lg:gap-8 lg:py-4"
                  >
                    <span className="font-sans text-[11px] tracking-[0.3em] text-gold/70">
                      {l.n}
                    </span>
                    <span className="font-display text-4xl font-medium uppercase leading-none tracking-tight text-cream/80 transition-colors duration-500 group-hover:text-gold sm:text-5xl lg:text-6xl">
                      {l.label}
                    </span>
                    <span className="ml-auto -translate-x-3 self-center text-gold opacity-0 transition-all duration-500 ease-lux group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 font-sans text-[11px] uppercase tracking-[0.22em] text-cream/45"
              >
                <span>+48 123 456 789</span>
                <span className="text-cream/25">·</span>
                <span>@primero.studio</span>
                <span className="text-cream/25">·</span>
                <span>Warszawa</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
