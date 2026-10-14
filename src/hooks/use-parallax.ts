import { useRef } from "react";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

/**
 * Shifts the ref'd element vertically while its container crosses the viewport,
 * scrubbed to the scroll position by ScrollTrigger. The travel is `speed` times
 * the distance covered, capped at `maxOffset` px each way; negative `speed`
 * reverses the direction. No-ops under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(speed: number, maxOffset = 60) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      // Track the container, not the moving element, so trigger positions stay stable.
      const trigger = node.parentElement ?? node;
      const travel = () =>
        Math.sign(speed) *
        Math.min(maxOffset, ((window.innerHeight + trigger.offsetHeight) / 2) * Math.abs(speed));

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          node,
          { y: () => travel() },
          {
            y: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [speed, maxOffset], revertOnUpdate: true },
  );

  return ref;
}
