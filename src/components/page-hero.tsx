import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

interface PageHeroProps { eyebrow: string; title: string; description: string; action?: ReactNode }

export function PageHero({ eyebrow, title, description, action }: PageHeroProps) {
  return <section className="border-b border-border bg-surface-deep pt-18 text-surface-deep-foreground"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10"><Reveal><p className="eyebrow">{eyebrow}</p><div className="mt-5 grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-end"><h1 className="font-display text-5xl leading-[0.98] font-semibold sm:text-6xl lg:text-7xl">{title}</h1><div><p className="max-w-lg text-base leading-7 text-surface-deep-muted">{description}</p>{action && <div className="mt-6">{action}</div>}</div></div></Reveal></div></section>;
}