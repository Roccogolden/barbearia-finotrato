import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { ServiceList } from "@/components/service-list";
import { TeamGrid } from "@/components/team-grid";
import { useParallax } from "@/hooks/use-parallax";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { brand, galleryBase, testimonials } from "@/lib/barbershop-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Fino Trato Barbearia — Barbearia contemporânea" },
    { name: "description", content: "Cortes masculinos e barbas com técnica, personalidade e atendimento cuidadoso." },
    { property: "og:title", content: "Fino Trato Barbearia — Barbearia contemporânea" },
    { property: "og:description", content: "Um corte à altura de quem você é." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const heroImageRef = useParallax<HTMLImageElement>(0.12, 50);
  const heroLogoRef = useParallax<HTMLImageElement>(-0.2, 40);
  const showBackToTop = useScrolled(700);
  return <>
    <section className="relative min-h-[88svh] overflow-hidden bg-surface-deep pt-18 text-surface-deep-foreground">
      <img ref={heroImageRef} src={brand.heroImage} alt="Fachada iluminada da Fino Trato Barbearia" width={1004} height={525} className="absolute inset-0 h-full w-full scale-110 object-cover object-center will-change-transform" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-deep via-surface-deep/75 to-transparent" />
      <img ref={heroLogoRef} src={brand.logoImage} alt="Emblema da Fino Trato Barbearia" width={280} height={280} className="pointer-events-none absolute -right-8 bottom-12 hidden size-40 animate-[spin_60s_linear_infinite] rounded-full object-cover shadow-2xl ring-4 ring-surface-deep-foreground/15 will-change-transform motion-reduce:animate-none sm:block sm:size-48 lg:right-14 lg:size-56" />
      <div className="relative mx-auto flex min-h-[calc(88svh-4.5rem)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
        <Reveal className="max-w-2xl"><p className="eyebrow">Barbearia contemporânea</p><h1 className="mt-5 font-display text-6xl leading-[0.9] font-semibold sm:text-7xl lg:text-8xl">Seu estilo.<br/><span className="text-primary">Nosso ofício.</span></h1><p className="mt-7 max-w-lg text-base leading-7 text-surface-deep-muted sm:text-lg">Técnica, cuidado e conversa boa. Um corte à altura de quem você é.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/agendamento">Agendar horário <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-surface-deep-muted bg-transparent text-surface-deep-foreground hover:bg-surface-deep-foreground hover:text-surface-deep"><Link to="/servicos">Ver serviços</Link></Button></div></Reveal>
      </div>
    </section>
    <Marquee items={["Fino Trato Barbearia", "Cortes com técnica", "Barba na navalha", "Ambiente climatizado"]} />
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo" className={cn("fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90", showBackToTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")}><ArrowUp className="size-5" /></button>
    <section className="py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-center lg:px-10"><Reveal><p className="eyebrow">Experiência Fino Trato</p><h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">Cuidado profissional, do corte ao ambiente.</h2></Reveal><Reveal delay={120}><p className="text-base leading-8 text-muted-foreground">Cortes profissionais em um ambiente climatizado, com atendimento cuidadoso e cerveja gelada para você aproveitar cada momento.</p><div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-7"><Stat value="01" label="cortes profissionais"/><Stat value="02" label="ambiente climatizado"/><Stat value="03" label="cerveja gelada"/></div></Reveal></div></section>
    <section className="bg-muted py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><SectionTitle eyebrow="Serviços" title="O cuidado certo, sem atalhos." link="/servicos"/></Reveal><Reveal delay={120} className="mt-10"><ServiceList limit={4}/></Reveal></div></section>
    <section className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><SectionTitle eyebrow="Nosso trabalho" title="Detalhes que fazem diferença." link="/galeria"/></Reveal><div className="mt-10 grid auto-rows-[260px] gap-4 md:grid-cols-3 md:auto-rows-[420px]">{galleryBase.map((item, index) => <Reveal key={item.label} delay={index * 100} className={index === 0 ? "overflow-hidden md:col-span-2" : "overflow-hidden"}><figure className="h-full"><img src={item.src} alt={item.alt} width={index === 1 ? 1920 : 1200} height={index === 1 ? 1200 : 900} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"/><figcaption className="sr-only">{item.label}</figcaption></figure></Reveal>)}</div></div></section>
    <section className="bg-surface-deep py-20 text-surface-deep-foreground sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><SectionTitle eyebrow="A equipe" title="Mãos experientes. Olhar atento." link="/equipe" dark/></Reveal><Reveal delay={120} className="mt-10"><TeamGrid/></Reveal></div></section>
    <section className="py-20 sm:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Avaliações do Google</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Quem conhece, recomenda.</h2></div><div className="flex items-center gap-3" aria-label="Nota 4,8 de 5, com 62 avaliações"><strong className="font-display text-4xl text-foreground">4,8</strong><span className="flex text-primary" aria-hidden="true">{Array.from({length:5}).map((_,index)=><Star key={index} className="size-4 fill-current"/>)}</span><span className="text-sm text-muted-foreground">62 avaliações</span></div></div></Reveal><div className="mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">{testimonials.map((item, index) => <Reveal key={item.name} delay={index * 100}><blockquote className="h-full bg-background p-7 sm:p-9"><Quote className="size-7 text-primary"/><div className="mt-5 flex text-primary" aria-label={item.detail}>{Array.from({length:5}).map((_,index)=><Star key={index} className="size-4 fill-current" aria-hidden="true"/>)}</div><p className="mt-5 font-display text-2xl leading-snug">“{item.quote}”</p><footer className="mt-7 text-xs font-bold uppercase tracking-[0.12em]">{item.name}<span className="mt-1 block font-normal normal-case tracking-normal text-muted-foreground">{item.detail}</span></footer></blockquote></Reveal>)}</div></div></section>
    <section className="border-y border-border bg-primary py-16"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/70">Sua próxima visita</p><h2 className="mt-2 font-display text-4xl font-semibold text-primary-foreground">Reserve seu horário.</h2></div><Button asChild size="lg" className="bg-surface-deep text-surface-deep-foreground hover:bg-surface-deep/90"><Link to="/agendamento">Escolher dia e horário <ArrowRight/></Link></Button></Reveal></div></section>
  </>;
}

function Stat({ value, label }: { value: string; label: string }) { return <div><strong className="font-display text-3xl text-primary">{value}</strong><span className="mt-1 block text-xs text-muted-foreground">{label}</span></div>; }
function SectionTitle({ eyebrow, title, link, dark = false }: { eyebrow: string; title: string; link: "/servicos" | "/galeria" | "/equipe"; dark?: boolean }) { return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5"><div className="min-w-0"><p className="eyebrow">{eyebrow}</p><h2 className={`mt-3 font-display text-4xl font-semibold sm:text-5xl ${dark ? "text-surface-deep-foreground" : "text-foreground"}`}>{title}</h2></div><Link to={link} className="hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary sm:flex">Conhecer <ArrowRight className="size-4"/></Link></div>; }
