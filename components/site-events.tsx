"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/track";

/**
 * Remembers where the visitor came from (for the lead) and reports contact
 * clicks to GA4: phone, WhatsApp, directions and Instagram. One listener on the
 * document covers every link on the site, including ones added later.
 */
export function SiteEvents() {
  useEffect(() => {
    captureAttribution();

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const where = window.location.pathname;

      if (href.startsWith("tel:")) {
        trackEvent("click_phone", { link_url: href, page_path: where });
      } else if (/wa\.me|whatsapp\.com/i.test(href)) {
        trackEvent("click_whatsapp", { link_url: href, page_path: where });
      } else if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\./i.test(href)) {
        trackEvent("click_directions", { link_url: href, page_path: where });
      } else if (/instagram\.com/i.test(href)) {
        trackEvent("click_instagram", { link_url: href, page_path: where });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
