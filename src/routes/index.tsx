import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AirVent,
  ArrowRight,
  Award,
  Beer,
  MapPin,
  Navigation,
  Quote,
  Star,
  Wifi,
} from "lucide-react";
import { BrandPreloader } from "@/components/brand-preloader";
import { WhatsAppIcon } from "@/components/icons";
import { Lightbox } from "@/components/lightbox";
import { Marquee } from "@/components/marquee";
import { OpenStatus } from "@/components/open-status";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { PhotoTile } from "@/components/photo-tile";
import { Reveal } from "@/components/reveal";
import { ScrollThread } from "@/components/scroll-thread";
import { ServiceList } from "@/components/service-list";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { FULL_MOTION, REDUCED_MOTION, SplitText, gsap, motion, useGSAP } from "@/lib/gsap";
import { buildPreloaderTimeline } from "@/lib/preloader-timeline";
import { cn } from "@/lib/utils";
import {
  brand,
  experiencePhotos,
  featuredWorkPhotos,
  siteUrl,
  testimonials,
  whatsappGreeting,
  whatsappLink,
} from "@/lib/barbershop-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fino Trato Barbearia — Barbearia em Senador Canedo, GO" },
      {
        name: "description",
        content:
          "Cortes masculinos, barba completa, sobrancelha, progressiva, barbaterapia e pigmentação em Senador Canedo — GO. Ambiente climatizado e atendimento por ordem de chegada.",
      },
      { property: "og:title", content: "Fino Trato Barbearia — Senador Canedo, GO" },
      {
        property: "og:description",
        content: "Seu estilo. Nosso ofício. Sem agendamento: é só chegar.",
      },
      { property: "og:url", content: `${siteUrl}/` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/` }],
  }),
  component: Index,
});

const amenities = [
  {
    icon: AirVent,
    title: "Ambiente climatizado",
    text: "Conforto do começo ao fim, mesmo nos dias mais quentes.",
  },
  {
    icon: Beer,
    title: "Cerveja gelada",
    text: "Bebidas para você aproveitar enquanto espera a sua vez.",
  },
  { icon: Wifi, title: "Wi-Fi liberado", text: "Fique conectado durante a visita." },
  {
    icon: Award,
    title: "Profissionais qualificados",
    text: "Técnica, atenção aos detalhes e conversa boa na cadeira.",
  },
];

const INTRO_KEY = "fino-trato:intro";
/** Vira `true` depois da primeira montagem; voltar ao início pelo menu não repete a abertura. */
let introPlayed = false;

function Index() {
  // A foto nítida fica emoldurada (só o zoom da intro); o parallax vai para o fundo desfocado.
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroBackdropRef = useParallax<HTMLImageElement>(0.12, 50);
  const interiorImageRef = useParallax<HTMLImageElement>(0.06, 28);
  const loaderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  // "full" na primeira visita da sessão, "short" ao recarregar, "none" ao voltar navegando pelo site.
  const [intro] = useState<"full" | "short" | "none">(() => {
    if (introPlayed) return "none";
    if (typeof window === "undefined") return "full";
    try {
      return sessionStorage.getItem(INTRO_KEY) ? "short" : "full";
    } catch {
      return "full";
    }
  });

  // Intro: the scissors opening lifts away, the facade settles, then the title rises line by line and the rest follows.
  useGSAP(
    () => {
      introPlayed = true;
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // Sem armazenamento (ex.: navegação privada): a abertura completa toca de novo, sem problema.
      }
      const mm = gsap.matchMedia();
      mm.add({ full: FULL_MOTION, reduced: REDUCED_MOTION }, (context) => {
        if (context.conditions?.["reduced"]) {
          gsap.set(loaderRef.current, { autoAlpha: 0 });
          return;
        }
        const timeline = gsap.timeline({ delay: intro === "none" ? 0 : 0.15 });
        if (loaderRef.current) {
          timeline.add(buildPreloaderTimeline(loaderRef.current, { quick: intro === "short" }));
        }
        // The hero starts while the opening's curtain is still lifting.
        timeline
          .addLabel("hero", loaderRef.current ? "-=0.6" : 0)
          .from(heroImageRef.current, { scale: 1.08, duration: 1.8, ease: "power2.out" }, "hero")
          .from(
            "[data-hero-item]",
            { autoAlpha: 0, y: 24, duration: motion.base, stagger: 0.08 },
            "hero+=0.5",
          );
        // autoSplit re-splits once a late web font (Gelasio on Android) lands; onSplit re-inserts the lines tween.
        const split = SplitText.create(".hero-title", {
          type: "lines",
          mask: "lines",
          linesClass: "hero-line",
          autoSplit: true,
          onSplit: (self) => {
            const lines = gsap.from(self.lines, {
              yPercent: 110,
              duration: 1,
              stagger: 0.12,
              ease: "power4.out",
            });
            timeline.add(lines, "hero+=0.15");
            return lines;
          },
        });
        timeline.eventCallback("onComplete", () => split.revert());
      });
      return () => mm.revert();
    },
    { scope: heroRef },
  );

  return (
    <>
      {intro !== "none" && <BrandPreloader ref={loaderRef} />}

      <section
        ref={heroRef}
        className="bg-grain relative overflow-hidden bg-surface-deep pt-18 text-surface-deep-foreground lg:min-h-[92svh]"
      >
        {/* Fundo: a própria fachada bem desfocada — dá o clima dourado sem expor a baixa resolução da foto. */}
        <img
          ref={heroBackdropRef}
          src={brand.heroBackdrop}
          alt=""
          aria-hidden="true"
          width={640}
          height={427}
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-deep via-surface-deep/85 to-surface-deep/35" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-deep to-transparent" />
        <div
          className="hero-scanline absolute inset-x-0 top-0 h-px bg-primary/70"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-[12%] hidden w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent lg:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-12 pb-20 sm:px-8 lg:min-h-[calc(92svh-4.5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p data-hero-item className="eyebrow">
              Barbearia em Senador Canedo — GO
            </p>
            <h1 className="hero-title mt-5 font-display font-semibold">
              Seu estilo.
              <br />
              <span className="text-primary">Nosso ofício.</span>
            </h1>
            <p
              data-hero-item
              className="mt-7 max-w-lg text-base leading-7 text-surface-deep-muted sm:text-lg"
            >
              Técnica, cuidado e conversa boa. Um corte à altura de quem você é.
            </p>
            <div data-hero-item className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="shine-button">
                <a href={whatsappLink(whatsappGreeting)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Chamar no WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-surface-deep-muted bg-transparent text-surface-deep-foreground hover:bg-surface-deep-foreground hover:text-surface-deep"
              >
                <Link to="/servicos">Ver serviços</Link>
              </Button>
            </div>
            <div
              data-hero-item
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-surface-deep-muted"
            >
              <OpenStatus className="text-surface-deep-foreground" />
              <span>Seg a sáb · 8h às 20h</span>
              <span>Por ordem de chegada</span>
            </div>
            <div
              data-hero-item
              className="mt-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-surface-deep-muted sm:flex"
            >
              <span className="h-px w-10 bg-primary/70" />
              Corte, barba e estilo pessoal
            </div>
          </div>

          {/* A foto aparece num tamanho em que a resolução dela continua nítida. */}
          <div data-hero-item className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-primary/35 sm:translate-x-5 sm:translate-y-5"
              aria-hidden="true"
            />
            <figure className="relative overflow-hidden rounded-2xl border border-primary/40 bg-surface-deep shadow-2xl shadow-black/60">
              {/* Foto e selo no mesmo bloco: o zoom da intro move os dois e o selo não sai do letreiro. */}
              <div ref={heroImageRef} className="relative">
                <img
                  src={brand.heroImage}
                  alt="Fachada da Fino Trato Barbearia à noite, com o letreiro dourado iluminado"
                  width={980}
                  height={653}
                  fetchPriority="high"
                  className="aspect-[4/3] w-full object-cover"
                />
                {/* Em % da foto 4:3: centro e tamanho medidos para cobrir a logo do letreiro em qualquer largura. */}
                <HeroSeal className="absolute top-[20.4%] left-[33.1%] w-[22%] -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:inset-x-6 sm:bottom-5">
                <MapPin className="size-4 shrink-0 text-gold-2" aria-hidden="true" />
                Vila Santa Rosa · Senador Canedo
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Fino Trato Barbearia",
          "Cortes com técnica",
          "Barba na navalha",
          "Ambiente climatizado",
        ]}
      />

      <ScrollThread>
        <section className="overflow-hidden py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-10">
            <Reveal className="relative pb-10 sm:pb-0">
              <figure className="overflow-hidden rounded-2xl border border-border">
                {/* Foto vertical num quadro 4:3: o recorte fica na faixa da moto, da TV e da porta. */}
                <img
                  ref={interiorImageRef}
                  src={experiencePhotos.space.src}
                  alt={experiencePhotos.space.alt}
                  width={experiencePhotos.space.width}
                  height={experiencePhotos.space.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full scale-110 object-cover object-[50%_62%] will-change-transform"
                />
              </figure>
              <figure className="stat-float absolute -bottom-2 right-3 w-[38%] overflow-hidden rounded-2xl border-4 border-background shadow-2xl sm:-bottom-10 sm:-right-4 lg:-right-10">
                <img
                  src={experiencePhotos.service.src}
                  alt={experiencePhotos.service.alt}
                  width={experiencePhotos.service.width}
                  height={experiencePhotos.service.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">Experiência Fino Trato</p>
              <h2 className="mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">
                Cuidado profissional, do corte ao ambiente.
              </h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Cortes profissionais em um ambiente climatizado, com atendimento cuidadoso e cerveja
                gelada para você aproveitar cada momento.
              </p>
              <ul className="mt-9 grid gap-x-6 gap-y-7 sm:grid-cols-2">
                {amenities.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.1em]">{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-muted py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal>
              <SectionTitle
                eyebrow="Serviços"
                title="O cuidado certo, sem atalhos."
                link="/servicos"
                linkLabel="Todos os serviços"
              />
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <ServiceList variant="compact" />
            </Reveal>
            <MobileMoreLink to="/servicos" label="Ver todos os serviços" />
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal>
              <SectionTitle
                eyebrow="Nosso trabalho"
                title="Detalhes que fazem diferença."
                link="/galeria"
                linkLabel="Ver galeria"
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featuredWorkPhotos.map((photo, index) => (
                <Reveal
                  key={photo.src}
                  delay={index * 90}
                  className={cn(index % 2 === 1 && "lg:mt-12")}
                >
                  <PhotoTile
                    photo={photo}
                    onOpen={() => setOpenPhoto(index)}
                    imageClassName="aspect-[4/5]"
                  />
                </Reveal>
              ))}
            </div>
            <MobileMoreLink to="/galeria" label="Ver galeria completa" />
          </div>
        </section>

        <section className="bg-muted/35 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal>
              <div className="flex flex-col gap-7 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Experiências reais</p>
                  <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold sm:text-5xl">
                    Quem conhece, recomenda.
                  </h2>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                    Avaliações espontâneas de quem já passou pela cadeira da Fino Trato.
                  </p>
                </div>
                <a
                  href={brand.reviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  aria-label={`Nota ${brand.googleRating} de 5 no Google, com ${brand.googleReviewsCount} avaliações`}
                >
                  <strong className="font-display text-4xl text-foreground">
                    {brand.googleRating}
                  </strong>
                  <span className="flex text-primary" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-4 fill-current" />
                    ))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {brand.googleReviewsCount} avaliações
                  </span>
                </a>
              </div>
            </Reveal>
            {/* No celular os depoimentos viram um carrossel horizontal para não empilhar três cards longos. */}
            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-2 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
              {testimonials.map((item, index) => (
                <Reveal
                  key={item.name}
                  delay={index * 100}
                  className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto"
                >
                  <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-background p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl sm:p-9">
                    <div className="flex items-center justify-between">
                      <Quote className="size-7 text-primary" aria-hidden="true" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        Google
                      </span>
                    </div>
                    <div className="mt-5 flex text-primary" role="img" aria-label="5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star key={star} className="size-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="mt-5 font-display text-2xl leading-snug">“{item.quote}”</p>
                    <footer className="mt-auto pt-7 text-xs font-bold uppercase tracking-[0.12em]">
                      {item.name}
                      <span className="mt-1 block font-normal normal-case tracking-normal text-muted-foreground">
                        {item.detail}
                      </span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={brand.reviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
              >
                Ler todas as avaliações no Google <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
            <Reveal>
              <p className="eyebrow">Visite a Fino Trato</p>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Venha nos visitar.
              </h2>
              <address className="mt-5 text-base leading-7 text-muted-foreground not-italic">
                {brand.street}
                <br />
                {brand.neighborhood} · {brand.city} — {brand.state}
              </address>
              <OpenStatus className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground" />
              <div className="mt-6 rounded-2xl border border-border bg-muted/40 px-5 py-2 sm:px-6">
                <OpeningHoursList />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={brand.directionsHref} target="_blank" rel="noopener noreferrer">
                    <Navigation /> Como chegar
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal
              delay={120}
              className="min-h-88 overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <iframe
                src={brand.mapsEmbedSrc}
                title="Mapa com a localização da Fino Trato Barbearia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-88 w-full border-0"
              />
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-primary py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/70">
                  Sem agendamento
                </p>
                <h2 className="mt-2 font-display text-4xl font-semibold text-primary-foreground">
                  É só chegar.
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/80">
                  Atendimento por ordem de chegada. Ficou com alguma dúvida? A equipe responde pelo
                  WhatsApp.
                </p>
              </div>
              <Button asChild size="lg" variant="ink">
                <a href={whatsappLink(whatsappGreeting)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Chamar no WhatsApp
                </a>
              </Button>
            </Reveal>
          </div>
        </section>
      </ScrollThread>

      {openPhoto !== null && (
        <Lightbox
          items={featuredWorkPhotos}
          index={openPhoto}
          onClose={() => setOpenPhoto(null)}
          onNavigate={setOpenPhoto}
        />
      )}
    </>
  );
}

/**
 * Selo com o emblema da marca, por cima da logo do letreiro. O tamanho vem de fora (largura);
 * o anel de texto gira devagar (parado com movimento reduzido).
 */
function HeroSeal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid aspect-square place-items-center rounded-full shadow-xl shadow-black/50",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full text-gold-2 motion-safe:animate-[logo-spin_30s_linear_infinite]"
      >
        <circle cx="60" cy="60" r="58" className="fill-surface-deep stroke-primary/60" />
        <path id="hero-seal-ring" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" fill="none" />
        <text className="fill-current text-[8px] font-bold uppercase">
          <textPath href="#hero-seal-ring" textLength="292" lengthAdjust="spacing">
            Barbearia · Fino Trato · Senador Canedo ·
          </textPath>
        </text>
      </svg>
      <img
        src={brand.logoImage}
        alt=""
        width={96}
        height={96}
        className="relative aspect-square w-[58%] rounded-full object-cover ring-1 ring-primary/50"
      />
    </div>
  );
}

type SectionLink = "/servicos" | "/galeria";

function SectionTitle({
  eyebrow,
  title,
  link,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  link: SectionLink;
  linkLabel: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      <Link
        to={link}
        className="group hidden shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary sm:flex"
      >
        {linkLabel}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/** No celular o link do título some; este botão aparece no fim da seção. */
function MobileMoreLink({ to, label }: { to: SectionLink; label: string }) {
  return (
    <Button asChild size="lg" variant="outline" className="mt-8 w-full sm:hidden">
      <Link to={to}>
        {label} <ArrowRight />
      </Link>
    </Button>
  );
}
