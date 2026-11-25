"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Monogram } from "@/components/ui/monogram";
import { Wordmark } from "@/components/ui/wordmark";
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
  { n: "07", label: "FAQ", href: "/#faq" },
  { n: "08", label: "Kontakt", href: "/kontakt" },
];

// Official brand glyphs (Simple Icons), filled with the current text colour.
const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
const INSTAGRAM_PATH =
  "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden fill="currentColor">
      <path d={INSTAGRAM_PATH} />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden fill="currentColor">
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

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
            <Monogram gradient className="h-8 w-8" />
            <Wordmark tone={dark ? "dark" : "light"} />
          </Link>

          <div className="flex items-center gap-6 xl:gap-8">
            {/* Desktop horizontal menu */}
            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {LINKS.filter((l) => l.href !== "/").map((l) => {
                const active = !l.href.includes("#") && pathname.startsWith(l.href);
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

            {/* Social shortcuts — desktop only; on mobile they sit in the menu */}
            <div
              className={cn(
                "hidden items-center gap-4 border-l pl-6 lg:flex xl:pl-8",
                dark ? "border-cream/15" : "border-ink/15",
              )}
            >
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={cn(
                  "transition-colors duration-300 hover:text-gold",
                  dark ? "text-cream/70" : "text-ink/65",
                )}
              >
                <InstagramIcon />
              </a>
              {contact.whatsappUrl && (
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className={cn(
                    "transition-colors duration-300 hover:text-gold",
                    dark ? "text-cream/70" : "text-ink/65",
                  )}
                >
                  <WhatsAppIcon />
                </a>
              )}
            </div>

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
                      : !l.href.includes("#") && pathname.startsWith(l.href);
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
                  className="inline-flex items-center gap-2.5 hover:text-gold"
                >
                  <InstagramIcon />
                  {contact.instagramHandle}
                </a>
                {contact.whatsappUrl && (
                  <>
                    <span className="text-cream/25">·</span>
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2.5 hover:text-gold"
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                  </>
                )}
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
