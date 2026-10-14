import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Fino Trato motion identity ("Premium" personality): one signature ease,
 * three durations and one entrance distance, shared by every animation.
 */
export const motion = {
  ease: "power3.out",
  easeExit: "power2.in",
  quick: 0.35,
  base: 0.7,
  slow: 1.1,
  rise: 32,
} as const;

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";

// GSAP only ever runs inside useGSAP (client-side), so plugins are registered in the browser only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger, SplitText);
  gsap.defaults({ ease: motion.ease, duration: motion.base });
}

export { DrawSVGPlugin, gsap, ScrollTrigger, SplitText, useGSAP };
