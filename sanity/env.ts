/**
 * Sanity is optional: until the project is provisioned (and while it is being
 * populated) the site falls back to the content bundled in /lib. That keeps
 * every page rendering if the CMS is unreachable or empty.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-02-01";

export const sanityConfigured = Boolean(projectId);
