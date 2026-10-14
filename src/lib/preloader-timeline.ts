import { gsap } from "@/lib/gsap";

// Pivot of the <BrandPreloader> scissors art (120×120 box); both blades rotate around it.
const PIVOT = "60 63";

/**
 * Builds the opening for a mounted <BrandPreloader>. `quick` (a reload within the
 * same session) skips the drawing and keeps only a short snip and the reveal.
 */
export function buildPreloaderTimeline(root: HTMLElement, { quick = false } = {}) {
  const q = gsap.utils.selector(root);
  const art = q("[data-preloader-art]");
  const strokes = q("[data-preloader-draw]");
  const [bladeA, bladeB] = [q('[data-preloader-blade="a"]'), q('[data-preloader-blade="b"]')];
  const cut = q("[data-preloader-cut]");
  const timeline = gsap.timeline().set(cut, { drawSVG: "0%" }, 0);

  if (quick) {
    timeline.fromTo(
      [art, q("[data-preloader-text]")],
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.25, ease: "none" },
      0,
    );
  } else {
    timeline
      .addLabel("draw", 0)
      .fromTo(
        art,
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.inOut" },
        "draw",
      )
      .fromTo(
        strokes,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 1, ease: "power1.inOut", stagger: 0.08 },
        "draw",
      )
      .fromTo(
        q("[data-preloader-pivot]"),
        { scale: 0, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.3)" },
        "draw+=0.85",
      )
      .fromTo(
        q("[data-preloader-text]"),
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "draw+=0.5",
      );
  }

  // Two quick snips while the cut line runs underneath.
  timeline
    .addLabel("snip", quick ? 0.15 : "draw+=1.05")
    .to(
      bladeA,
      { rotation: -10, svgOrigin: PIVOT, duration: 0.14, ease: "power2.in", yoyo: true, repeat: 3 },
      "snip",
    )
    .to(
      bladeB,
      { rotation: 10, svgOrigin: PIVOT, duration: 0.14, ease: "power2.in", yoyo: true, repeat: 3 },
      "snip",
    )
    .to(cut, { drawSVG: "100%", duration: 0.5, ease: "power2.out" }, "snip")
    // Exit: the content lifts and fades, then the curtain slides up to reveal the page.
    .to(
      [art, q("[data-preloader-text]")],
      { autoAlpha: 0, y: -24, duration: 0.4, ease: "power2.in", stagger: 0.04 },
      ">0.1",
    )
    .to(root, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "-=0.15")
    .set(root, { autoAlpha: 0 });

  return timeline;
}
