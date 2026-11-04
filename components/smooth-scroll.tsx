"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Lenis drives the document scroll, so after a client-side navigation it can
 * keep (or animate back to) the previous position. Jump to the top on every
 * route change unless the URL targets an anchor.
 */
function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.085,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          // Smoothly scroll in-page anchor links, offset for the fixed header.
          anchors: { offset: -88 },
        }}
      >
        <ScrollToTopOnRouteChange />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
