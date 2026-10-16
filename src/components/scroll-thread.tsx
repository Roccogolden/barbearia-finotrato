import { useRef, type ReactNode } from "react";
import { FULL_MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const SVG_NS = "http://www.w3.org/2000/svg";
/** Page content column: max-w-7xl (1280px) with lg:px-10 (40px) side padding. */
const CONTENT_WIDTH = 1280;
const CONTENT_PADDING = 40;
/** Distance between the thread and the content edge. */
const GUTTER_GAP = 28;
/** Vertical reach of each side-to-side sweep, kept inside the sections' py-28 padding. */
const SWEEP_ABOVE = 90;
const SWEEP_BELOW = 100;
/** Phones (< 640px) have py-20 between sections, so the sweeps shrink to fit inside it. */
const PHONE_SWEEP_ABOVE = 58;
const PHONE_SWEEP_BELOW = 66;
/** Below 1024px the thread hugs the screen edge, clear of the content's side padding. */
const COMPACT_WIDTH = 1024;
/** The thread's tip tracks this line of the viewport while scrolling. */
const TIP_LINE = "72%";

interface Piece {
  d: string;
  y0: number;
  y1: number;
}

/**
 * Lays the thread out for the current size: it leaves the hero's vertical rule,
 * runs down one gutter per section, sweeps to the other gutter through the padding
 * between sections, and ends just above the last section (the call to action).
 */
function layoutThread(root: HTMLElement) {
  const width = root.clientWidth;
  const height = root.clientHeight;
  const compact = width < COMPACT_WIDTH;
  const phone = width < 640;
  const sweepAbove = phone ? PHONE_SWEEP_ABOVE : SWEEP_ABOVE;
  const sweepBelow = phone ? PHONE_SWEEP_BELOW : SWEEP_BELOW;
  // Content side padding: px-5 on phones, sm:px-8 on tablets, lg:px-10 (+ centering) on desktop.
  const padding = phone ? 20 : compact ? 32 : CONTENT_PADDING;
  const margin = Math.max(0, (width - CONTENT_WIDTH) / 2) + padding;
  const left = compact ? Math.max(6, Math.round(margin * 0.35)) : Math.max(14, margin - GUTTER_GAP);
  const right = width - left;
  const tops = Array.from(root.children)
    .filter((el): el is HTMLElement => el.tagName === "SECTION")
    .map((section) => section.offsetTop);

  // Desktop: leaves the hero's `right-[12%]` vertical rule (hidden on smaller screens).
  const origin = compact ? right : width * 0.88;
  let x = right;
  let y = sweepBelow;
  const pieces: Piece[] = [
    { d: `M${origin} 0 C${origin} ${y * 0.6} ${x} ${y * 0.4} ${x} ${y}`, y0: 0, y1: y },
  ];

  for (let i = 1; i < tops.length; i++) {
    const boundary = tops[i]!;
    const isLast = i === tops.length - 1;
    const runEnd = boundary - (isLast ? 48 : sweepAbove);
    pieces.push({ d: `M${x} ${y} V${runEnd}`, y0: y, y1: runEnd });
    y = runEnd;
    if (isLast) break;
    const next = x === right ? left : right;
    const sweepEnd = boundary + sweepBelow;
    pieces.push({
      d: `M${x} ${y} C${x} ${boundary} ${next} ${boundary} ${next} ${sweepEnd}`,
      y0: y,
      y1: sweepEnd,
    });
    x = next;
    y = sweepEnd;
  }

  return { pieces, end: { x, y }, width, height };
}

/**
 * Wraps a page's sections with a gold thread that draws itself as the page scrolls,
 * each stretch scrubbed to its own scroll range so the tip follows the reader,
 * finishing with a knot that pops just before the last section. Phones and tablets
 * get the same thread, hugging the screen edge with shorter sweeps.
 */
export function ScrollThread({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const knotRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const svg = svgRef.current;
      const knot = knotRef.current;
      if (!root || !svg || !knot) return;

      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        let layout = layoutThread(root);
        // On touch screens the tip catches up a little faster with the finger.
        const scrub = window.innerWidth < COMPACT_WIDTH ? 0.4 : 0.6;
        // Each stretch is a soft wide glow under a fine line, drawn together.
        const strands = layout.pieces.map(() => {
          const glow = document.createElementNS(SVG_NS, "path");
          const line = document.createElementNS(SVG_NS, "path");
          glow.setAttribute(
            "class",
            "fill-none stroke-primary/15 [stroke-linecap:round] [stroke-width:6]",
          );
          line.setAttribute(
            "class",
            "fill-none stroke-primary/80 [stroke-linecap:round] [stroke-width:1.5]",
          );
          svg.append(glow, line);
          return [glow, line];
        });

        // Re-measured before every ScrollTrigger refresh (resize, late layout shifts).
        const applyLayout = () => {
          layout = layoutThread(root);
          svg.setAttribute("viewBox", `0 0 ${layout.width} ${layout.height}`);
          layout.pieces.forEach((piece, i) =>
            strands[i]?.forEach((path) => path.setAttribute("d", piece.d)),
          );
          gsap.set(knot, { left: layout.end.x, top: layout.end.y });
        };
        applyLayout();
        ScrollTrigger.addEventListener("refreshInit", applyLayout);

        strands.forEach((strand, i) => {
          gsap.fromTo(
            strand,
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: () => `top+=${layout.pieces[i]?.y0 ?? 0} ${TIP_LINE}`,
                end: () => `top+=${layout.pieces[i]?.y1 ?? 0} ${TIP_LINE}`,
                scrub,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        gsap.fromTo(
          knot,
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            ease: "elastic.out(1, 0.35)",
            scrollTrigger: {
              trigger: root,
              start: () => `top+=${layout.end.y} ${TIP_LINE}`,
              toggleActions: "play none none reverse",
            },
          },
        );

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", applyLayout);
          strands.flat().forEach((path) => path.remove());
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative">
      {/* First child at z-0: above section backgrounds, below the content that follows. */}
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
        aria-hidden="true"
      />
      <span
        ref={knotRef}
        className="pointer-events-none absolute z-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background opacity-0 shadow-[0_0_16px_var(--color-primary)] after:absolute after:inset-[3px] after:rounded-full after:bg-gold-2 lg:size-4"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
