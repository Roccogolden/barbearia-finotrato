import type { Ref } from "react";

/**
 * Full-screen opening: gold scissors draw themselves stroke by stroke, the pivot
 * pops, the blades snip twice over a cut line, then the curtain lifts away.
 * Art and text start hidden in CSS (opacity-0) so the server-rendered markup never
 * flashes fully drawn; buildPreloaderTimeline() (@/lib/preloader-timeline) animates
 * everything in and out.
 */
export function BrandPreloader({ ref }: { ref?: Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className="site-loader" aria-hidden="true">
      <svg
        data-preloader-art
        viewBox="0 0 120 120"
        className="size-24 overflow-visible text-primary opacity-0 sm:size-28"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g data-preloader-blade="a">
            <circle data-preloader-draw cx="36" cy="95" r="13" />
            <path data-preloader-draw d="M45 85.5 L57 67 C70 47 84 27 96 10 C89 33 77 54 64 68" />
          </g>
          <g data-preloader-blade="b">
            <circle data-preloader-draw cx="84" cy="95" r="13" />
            <path data-preloader-draw d="M75 85.5 L63 67 C50 47 36 27 24 10 C31 33 43 54 56 68" />
          </g>
        </g>
        <circle data-preloader-pivot cx="60" cy="63" r="3.2" className="fill-gold-2" />
        <path
          data-preloader-cut
          d="M8 116 H112"
          className="stroke-primary/70"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      </svg>
      <p data-preloader-text className="loader-wordmark opacity-0">
        FINO TRATO
      </p>
      <span data-preloader-text className="loader-caption opacity-0">
        Um corte bem feito começa no detalhe
      </span>
    </div>
  );
}
