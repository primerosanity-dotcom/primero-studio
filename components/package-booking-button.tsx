"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { BookingModal, type BookingSummary } from "@/components/booking-modal";

/** Gold "Zapytaj" button (same as the Usługi cards) that opens the booking popup. */
export function PackageBookingButton({
  summary,
  deliveryEnabled,
  fallbackUrl,
}: {
  summary: BookingSummary;
  deliveryEnabled: boolean;
  fallbackUrl: string;
}) {
  const [open, setOpen] = useState(false);
  // The card sits inside an animated (transformed) wrapper, which would trap a
  // position:fixed modal; render it on <body> once we're in the browser.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/btn inline-flex flex-1 items-center justify-between gap-6 bg-gold px-6 py-4 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-wine-deep shadow-[0_12px_32px_-12px_rgba(217,184,114,0.5)] transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:bg-cream-soft active:translate-y-0 active:scale-[0.99]"
      >
        <span>Zapytaj</span>
        <svg
          width="24"
          height="11"
          viewBox="0 0 26 12"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1"
        >
          <path
            d="M0 6h24M19 1l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {mounted &&
        createPortal(
          <BookingModal
            open={open}
            onClose={() => setOpen(false)}
            summary={summary}
            deliveryEnabled={deliveryEnabled}
            fallbackUrl={fallbackUrl}
          />,
          document.body,
        )}
    </>
  );
}
