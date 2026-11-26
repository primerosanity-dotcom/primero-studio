"use client";

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * Sends a GA4 event. gtag exists only after the visitor accepted cookies and a
 * GA4 id is set in Sanity, so without consent this does nothing.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}
