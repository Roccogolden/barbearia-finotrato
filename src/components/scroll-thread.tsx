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
  const margin = Math.max(0, (width - CONTENT_WIDTH) / 2) + CONTENT_PADDING;
  const left = Math.max(14, margin - GUTTER_GAP);
  const right = width - left;
  const tops = Array.from(root.children)
    .filter((el): el is HTMLElement => el.tagName === "SECTION")
    .map((section) => section.offsetTop);

  const origin = width * 0.88; // the hero's `right-[12%]` vertical rule
  let x = right;
  let y = SWEEP_BELOW;
  const pieces: Piece[] = [
    { d: `M${origin} 0 C${origin} ${y * 0.6} ${x} ${y * 0.4} ${x} ${y}`, y0: 0, y1: y },
  ];

  for (let i = 1; i < tops.length; i++) {
    const boundary = tops[i]!;
    const isLast = i === tops.length - 1;
    const runEnd = boundary - (isLast ? 48 : SWEEP_ABOVE);
    pieces.push({ d: `M${x} ${y} V${runEnd}`, y0: y, y1: runEnd });
    y = runEnd;
    if (isLast) break;
    const next = x === right ? left : right;
    const sweepEnd = boundary + SWEEP_BELOW;
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
 * Wraps a page's sections with a gold thread that draws itself as the page scrolls
 * (desktop only), each stretch scrubbed to its own scroll range so the tip follows
 * the reader, finishing with a knot that pops just before the last section.
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
      mm.add(`${FULL_MOTION} and (min-width: 1024px)`, () => {
        let layout = layoutThread(root);
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
                scrub: 0.6,
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
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block"
        aria-hidden="true"
      />
      <span
        ref={knotRef}
        className="pointer-events-none absolute z-0 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background opacity-0 shadow-[0_0_16px_var(--color-primary)] after:absolute after:inset-[3px] after:rounded-full after:bg-gold-2 lg:block"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
