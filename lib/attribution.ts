"use client";

/**
 * Where a visitor came from, attached to the lead they send.
 *
 * On every page load we look at the UTM tags, ad click ids and the referrer.
 * A visit that brings a source (a tagged link, an ad click, another website)
 * replaces the stored one; a direct visit keeps it, so someone who first came
 * from Google Maps and returns two days later by typing the address is still
 * reported as Google Maps. The value lives 30 days and is only read when the
 * visitor submits the form themselves.
 */

const KEY = "primero-source";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Touch = {
  source: string;
  medium?: string;
  campaign?: string;
  landing: string;
  at: number;
};

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function currentTouch(): Touch | null {
  const params = new URLSearchParams(window.location.search);
  const landing = window.location.pathname;
  const at = Date.now();
  const utmSource = params.get("utm_source")?.trim().toLowerCase();

  if (utmSource) {
    return {
      source: utmSource,
      medium: params.get("utm_medium")?.trim().toLowerCase() || undefined,
      campaign: params.get("utm_campaign")?.trim().toLowerCase() || undefined,
      landing,
      at,
    };
  }
  if (params.has("gclid") || params.has("gbraid") || params.has("wbraid")) {
    return { source: "google", medium: "cpc", landing, at };
  }
  if (params.has("fbclid")) {
    return { source: "facebook", medium: "social", landing, at };
  }

  const ref = host(document.referrer);
  if (ref && ref !== window.location.hostname.replace(/^www\./, "")) {
    return { source: ref, medium: "referral", landing, at };
  }
  return null;
}

/** Call once per page load. */
export function captureAttribution(): void {
  try {
    const touch = currentTouch();
    if (touch) localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    // Storage blocked: the lead simply goes out without a source.
  }
}

function stored(): Touch | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const touch = JSON.parse(raw) as Touch;
    if (!touch?.source || Date.now() - touch.at > TTL_MS) return null;
    return touch;
  } catch {
    return null;
  }
}

function label(t: Touch): string {
  const s = t.source;
  const m = t.medium ?? "";
  const c = t.campaign ?? "";
  const paid = /cpc|ppc|paid|ads?$/.test(m);

  if (s === "google" && c.startsWith("gbp")) {
    return c === "gbp" ? "Google Maps — profil firmy" : `Google Maps — profil firmy (${c})`;
  }
  if (s === "google" && paid) return "Google Ads";
  if (/(^|\.)google\./.test(s) || s === "google") return "Google — wyszukiwarka";
  if (/bing\.|duckduckgo|yahoo/.test(s)) return `Wyszukiwarka (${s})`;
  if (/instagram|^ig$/.test(s)) return paid ? "Instagram — reklama" : "Instagram";
  if (/facebook|^fb$|fb\.com|messenger/.test(s)) {
    return paid ? "Facebook — reklama" : "Facebook";
  }
  if (/booksy/.test(s)) return "Booksy";
  if (m === "referral") return `Strona: ${s}`;
  return [s, m, c].filter(Boolean).join(" / ");
}

/** Human-readable source for the lead, e.g. "Google Maps — profil firmy · strona: /pakiety". */
export function leadSource(): string {
  const touch = stored();
  if (!touch) return "Wejście bezpośrednie";
  const page = touch.landing && touch.landing !== "/" ? ` · strona: ${touch.landing}` : "";
  return `${label(touch)}${page}`;
}
