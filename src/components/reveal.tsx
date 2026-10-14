import { useRef, type ReactNode } from "react";
import { FULL_MOTION, gsap, motion, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades and lifts children into place the first time they enter the viewport.
 * The hidden start state lives in CSS ([data-reveal]) so server-rendered markup
 * never flashes before hydration; reduced-motion users get the content as-is.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0, y: motion.rise },
          {
            autoAlpha: 1,
            y: 0,
            duration: motion.slow,
            delay: delay / 1000,
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal="" className={className}>
      {children}
    </div>
  );
}
