import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  /** Elemento visual exibido ao lado do texto (ex.: a logo animada da galeria). */
  media?: ReactNode;
}

// A entrada é feita só com CSS para o título aparecer mesmo antes do JavaScript carregar.
export function PageHero({ eyebrow, title, description, action, media }: PageHeroProps) {
  return (
    <section className="bg-grain relative overflow-hidden border-b border-border bg-surface-deep pt-18 text-surface-deep-foreground">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {media ? (
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="page-hero-enter">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-5 font-display text-5xl leading-[0.98] font-semibold text-balance sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-surface-deep-muted">
                {description}
              </p>
              {action && <div className="mt-7">{action}</div>}
            </div>
            <div className="page-hero-enter flex justify-center [animation-delay:150ms] md:justify-end">
              {media}
            </div>
          </div>
        ) : (
          <div className="page-hero-enter">
            <p className="eyebrow">{eyebrow}</p>
            <div className="mt-5 grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-end">
              <h1 className="font-display text-5xl leading-[0.98] font-semibold text-balance sm:text-6xl lg:text-7xl">
                {title}
              </h1>
              <div>
                <p className="max-w-lg text-base leading-7 text-surface-deep-muted">
                  {description}
                </p>
                {action && <div className="mt-6">{action}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
