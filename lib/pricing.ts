/**
 * Winter price list.
 *
 * Until WINTER_LAST_DAY (inclusive, Warsaw time) the site shows the winter
 * package prices from Sanity's "Cena" field together with WINTER_NOTE. From
 * the next day it switches on its own to the "Cena sezonowa" field of every
 * package that has one, and the note disappears — no deploy needed.
 *
 * The winter price is the current price, not a discount: never show the
 * seasonal price crossed out next to it (Omnibus 30-day rule).
 */
export const WINTER_LAST_DAY = "2027-03-31";

/** Short label, e.g. for a badge. */
export const WINTER_BADGE = "Cena zimowa · do 31.03";

/** Full sentence shown with the package prices. */
export const WINTER_NOTE = "Cennik zimowy — ceny ważne do 31.03.2027.";

/** Today's date in Warsaw as YYYY-MM-DD. */
function warsawToday(now: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isWinterPricing(now: Date = new Date()): boolean {
  return warsawToday(now) <= WINTER_LAST_DAY;
}
