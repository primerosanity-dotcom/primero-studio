"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

// Dev aid: expose the Lenis instance for programmatic scrolling in preview.
function LenisExpose() {
  const lenis = useLenis();
  useEffect(() => {
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 }}
    >
      <LenisExpose />
      {children}
    </ReactLenis>
  );
}
