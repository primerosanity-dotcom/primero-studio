"use client";

import dynamic from "next/dynamic";

/**
 * Both components decide what to render from localStorage, which exists only
 * in the browser. Prerendering them makes React hydrate a tree the server
 * could never have produced, so the whole subtree is thrown away and
 * re-rendered — `ssr: false` is the supported way to say "client only", and it
 * is allowed here because this wrapper is itself a Client Component.
 */
const CookieConsent = dynamic(
  () => import("./cookie-consent").then((m) => m.CookieConsent),
  { ssr: false },
);

const Analytics = dynamic(
  () => import("./analytics").then((m) => m.Analytics),
  { ssr: false },
);

export function Tracking(props: {
  gtmId?: string;
  gaId?: string;
  metaPixelId?: string;
}) {
  return (
    <>
      <Analytics {...props} />
      <CookieConsent />
    </>
  );
}
