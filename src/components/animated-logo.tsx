import { useRef } from "react";
import { brand } from "@/lib/barbershop-data";
import { FULL_MOTION, gsap, useGSAP } from "@/lib/gsap";

export function AnimatedLogo() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Entrance plays once the stage scrolls into view; the ambient loops (spin, glow, sparks) stay in CSS.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: stageRef.current, start: "top 85%", once: true } })
          .fromTo(
            ".logo-ring",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.9, stagger: 0.15, ease: "sine.out" },
          )
          .fromTo(
            ".logo-core",
            { autoAlpha: 0, scale: 0.55, rotation: -160, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              filter: "blur(0px)",
              duration: 1.4,
              ease: "expo.out",
            },
            "<0.1",
          );
      });
      return () => mm.revert();
    },
    { scope: stageRef },
  );

  return (
    <div ref={stageRef} className="logo-stage" aria-hidden="true">
      <span className="logo-glow" />
      <span className="logo-ring logo-ring--gold" />
      <span className="logo-ring logo-ring--dash" />
      <span className="logo-float">
        <img src={brand.logoImage} alt="" width={280} height={280} className="logo-core" />
        <span className="logo-sheen" />
      </span>
      <span className="logo-spark logo-spark--a" />
      <span className="logo-spark logo-spark--b" />
      <span className="logo-spark logo-spark--c" />
    </div>
  );
}
