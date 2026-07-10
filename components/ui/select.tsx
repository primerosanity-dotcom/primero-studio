"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export type SelectOption = { value: string; label: string };

/**
 * Custom editorial dropdown (listbox pattern) — gold-on-wine, animated,
 * keyboard accessible. Replaces the stock <select>.
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Wybierz…",
  id,
}: {
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = options.find((o) => o.value === value) ?? null;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const commit = (i: number) => {
    if (options[i]) onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(active);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-4 border-b bg-transparent pb-3 pt-1 text-left font-sans text-sm transition-colors duration-300",
          open
            ? "border-gold"
            : "border-cream/20 hover:border-cream/40 focus:border-gold",
          "focus:outline-none",
        )}
      >
        <span
          className={cn(
            "truncate uppercase tracking-[0.14em]",
            selected ? "text-cream" : "text-cream/40",
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
          className={cn(
            "shrink-0 text-champagne transition-transform duration-500 ease-lux",
            open && "rotate-180",
          )}
        >
          <path
            d="M1 1.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-xl border border-champagne/30 bg-wine-deep/95 py-2 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          >
            {options.map((o, i) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => commit(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-3 text-left font-sans text-[13px] uppercase tracking-[0.14em] transition-colors duration-200",
                      i === active
                        ? "bg-gold/[0.08] text-gold"
                        : "text-cream/75",
                    )}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3 shrink-0 text-gold"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M2 6.5 4.8 9 10 3.5" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
