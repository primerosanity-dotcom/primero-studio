"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

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
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
