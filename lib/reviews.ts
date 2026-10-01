export type Review = {
  name: string;
  date: string;
  text: string;
  /** avatar colour pairing */
  tone: string;
};

/** The studio's Google Business Profile — canonical cid link. */
export const GOOGLE_URL = "https://maps.google.com/?cid=4122063228309782347";

/**
 * Deliberately empty. Reviews shown to visitors must be real ones the studio
 * actually received, entered in Studio → Opinie (or pulled from the Business
 * Profile). Inventing them is both dishonest and, in the EU, unlawful — the
 * Omnibus directive bans presenting fabricated reviews as genuine.
 *
 * With no reviews the section still renders: the Google rating and a link to
 * the profile, and nothing made up.
 */
export const REVIEWS: Review[] = [];
export const RATING: string | null = null;
export const REVIEW_COUNT: number | null = null;
