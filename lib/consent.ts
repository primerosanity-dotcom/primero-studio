"use client";

import { useSyncExternalStore } from "react";

export type Consent = "granted" | "denied";

const KEY = "primero-consent";
const EVENT = "primero:consent";

/**
 * Reading is wrapped because browsers set to block site data throw on
 * localStorage access rather than returning null.
 */
function read(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Private mode: the choice holds for this page view and is asked again.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * null = not asked yet. The server snapshot is always null, so no tracking
 * script is ever part of the first paint — consent is a client-side fact.
 */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, read, () => null);
}
