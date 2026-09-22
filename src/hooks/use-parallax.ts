import { useEffect, useRef } from "react";

/**
 * Shifts the ref'd element vertically as it crosses the viewport, based on
 * how far its center sits from the viewport center. Positive `speed` moves
 * the element with the scroll (slower than 1:1); negative moves it against.
 * No-ops under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(speed: number, maxOffset = 60) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, distance * speed));
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, maxOffset]);

  return ref;
}
