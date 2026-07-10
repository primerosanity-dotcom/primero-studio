"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Draggable before/after image comparison. Drag the handle (mouse, touch,
 * or arrow keys) to wipe between the two layers. Leave src props empty to
 * show styled placeholders (matte "before" vs glossy "after").
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = "",
  afterAlt = "",
  beforeLabel = "Przed",
  afterLabel = "Po",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  sizes?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Pointer capture is best-effort — guard against NotFoundError when the
    // pointer is no longer active (some devices / rapid gestures).
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClientX(e.clientX);
  };
  const stop = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      className={cn(
        "relative touch-pan-y select-none overflow-hidden rounded-[1.5rem] bg-wine-deep",
        dragging ? "cursor-ew-resize" : "cursor-pointer",
        className,
      )}
    >
      {/* AFTER — full, behind */}
      <div className="absolute inset-0">
        {afterSrc ? (
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <div aria-hidden className="media-placeholder absolute inset-0" />
        )}
        <div aria-hidden className="media-sheen pointer-events-none absolute inset-0" />
      </div>

      {/* BEFORE — clipped to the left of the handle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {beforeSrc ? (
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <div aria-hidden className="ba-before absolute inset-0" />
        )}
      </div>

      {/* Labels */}
      <span
        className={cn(
          "pointer-events-none absolute left-4 top-4 rounded-full border border-cream/20 bg-wine-deep/50 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-cream/80 backdrop-blur-sm transition-opacity duration-300",
          pos < 12 && "opacity-0",
        )}
      >
        {beforeLabel}
      </span>
      <span
        className={cn(
          "pointer-events-none absolute right-4 top-4 rounded-full border border-gold/30 bg-wine-deep/50 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-gold backdrop-blur-sm transition-opacity duration-300",
          pos > 88 && "opacity-0",
        )}
      >
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-gold/70 shadow-[0_0_18px_rgba(217,184,114,0.5)]" />
        <button
          type="button"
          role="slider"
          aria-label="Przeciągnij, aby porównać przed i po"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-gold/60 bg-wine-deep/80 text-gold backdrop-blur-md transition-transform duration-300 ease-lux hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-95",
            dragging && "scale-105",
          )}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
            <path
              d="M6 1 1 6l5 5M16 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
