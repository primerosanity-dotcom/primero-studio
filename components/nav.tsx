"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Monogram } from "@/components/ui/monogram";
import { cn } from "@/lib/cn";
import type { ContactConfig } from "@/lib/site-config";

const MotionLink = motion.create(Link);

const LINKS = [
  { n: "01", label: "Studio", href: "/" },
  { n: "02", label: "O nas", href: "/o-nas" },
  { n: "03", label: "Usługi", href: "/uslugi" },
  { n: "04", label: "Pakiety", href: "/pakiety" },
  { n: "05", label: "Realizacje", href: "/realizacje" },
  { n: "06", label: "Opinie", href: "/opinie" },
  { n: "07", label: "Kontakt", href: "/kontakt" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav({ contact }: { contact: ContactConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  const updateChrome = useCallback(() => {
    setScrolled(window.scrollY > 32);
    const probe = 72;
    const sections = document.querySelectorAll("[data-section-theme]");
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) {
        setTheme(
          s.getAttribute("data-section-theme") === "light" ? "light" : "dark",
        );
        return;
      }
    }
    setTheme("dark");
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateChrome);
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial probe
    updateChrome();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateChrome]);

  // Re-probe the nav theme after a client-side navigation (DOM swapped).
  // The menu itself closes via each link's onClick.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(updateChrome),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname, updateChrome]);

  useEffect(() => {
    const main = document.querySelector("main");

    if (!open) {
      main?.removeAttribute("inert");
      return;
    }

    if (lenis) lenis.stop();
    else document.documentElement.style.overflow = "hidden";

    main?.setAttribute("inert", "");
    const firstLink = overlayRef.current?.querySelector<HTMLAnchorElement>("a");
    requestAnimationFrame(() => firstLink?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key !== "Tab") return;
      const overlayLinks = Array.from(
        overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
      );
      const focusable = [menuButtonRef.current, ...overlayLinks].filter(
        (item): item is HTMLElement => Boolean(item),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (lenis) lenis.start();
      else document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  // Menu overlay is dark, so force the light-on-dark chrome while open.
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
            href="/"
            onClick={() => setOpen(false)}
            aria-label="PRIMERO.STUDIO — strona główna"
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

          <div className="flex items-center gap-6 xl:gap-8">
            {/* Desktop horizontal menu */}
            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {LINKS.filter((l) => l.href !== "/").map((l) => {
                const active = pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-gold",
                      active
                        ? "text-gold"
                        : dark
                          ? "text-cream/70"
                          : "text-ink/65",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              aria-controls="main-menu"
              className={cn(
                "relative z-50 -mr-2 grid h-11 w-11 place-items-center transition-colors duration-500 hover:text-gold lg:hidden",
                dark ? "text-cream" : "text-ink",
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
            ref={overlayRef}
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu główne"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 bg-wine-deep/95 backdrop-blur-2xl"
          >
            <div className="mx-auto flex h-full max-w-[1500px] flex-col justify-center overflow-y-auto px-6 pb-16 pt-24 lg:px-12">
              <nav className="flex flex-col">
                {LINKS.map((l, i) => {
                  const active =
                    l.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(l.href);
                  return (
                    <MotionLink
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      initial={{ y: 44, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.1 + i * 0.07,
                        ease: EASE,
                      }}
                      className="group flex items-baseline gap-5 border-b border-cream/10 py-3 lg:gap-8 lg:py-4"
                    >
                      <span className="font-sans text-[11px] tracking-[0.3em] text-gold/70">
                        {l.n}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[1.6rem] font-medium uppercase leading-none tracking-tight transition-colors duration-500 group-hover:text-gold sm:text-4xl lg:text-5xl",
                          active ? "text-gold" : "text-cream/80",
                        )}
                      >
                        {l.label}
                      </span>
                      <span
                        className={cn(
                          "ml-auto self-center text-gold transition-all duration-500 ease-lux",
                          active
                            ? "opacity-100"
                            : "-translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        )}
                      >
                        →
                      </span>
                    </MotionLink>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3 font-sans text-[11px] uppercase tracking-[0.22em] text-cream/45"
              >
                {contact.phoneHref && contact.phoneDisplay && (
                  <a href={contact.phoneHref} className="hover:text-gold">
                    {contact.phoneDisplay}
                  </a>
                )}
                {contact.phoneHref && <span className="text-cream/25">·</span>}
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold"
                >
                  {contact.instagramHandle}
                </a>
                <span className="text-cream/25">·</span>
                <span>Łódź</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
