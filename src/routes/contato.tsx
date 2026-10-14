import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, Instagram, MapPin, Phone } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { OpeningHoursList } from "@/components/opening-hours-list";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { brand, siteUrl, whatsappLink } from "@/lib/barbershop-data";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e localização — Fino Trato Barbearia" },
      {
        name: "description",
        content:
          "Endereço, WhatsApp e horários da Fino Trato Barbearia na Vila Santa Rosa, em Senador Canedo — GO.",
      },
      { property: "og:title", content: "Contato e localização — Fino Trato Barbearia" },
      {
        property: "og:description",
        content: "Venha conhecer a Fino Trato Barbearia em Senador Canedo.",
      },
      { property: "og:url", content: `${siteUrl}/contato` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/contato` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="A cadeira está à sua espera."
        description="Veja como chegar, confira os horários e fale com a equipe — a resposta vem pelo WhatsApp."
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chamar no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-surface-deep-muted bg-transparent text-surface-deep-foreground hover:bg-surface-deep-foreground hover:text-surface-deep"
            >
              <a href={brand.phoneHref}>
                <Phone /> Ligar
              </a>
            </Button>
          </div>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:px-10">
          <div className="grid content-start gap-4">
            <Reveal>
              <InfoCard icon={MapPin} title="Endereço">
                <address className="not-italic">
                  {brand.street}
                  <br />
                  {brand.neighborhood}, {brand.city} — {brand.state}
                  <br />
                  CEP {brand.postalCode}
                </address>
                <a
                  href={brand.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-foreground"
                >
                  Abrir rota no Google Maps <ArrowUpRight className="size-4" />
                </a>
              </InfoCard>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={80} className="h-full">
                <InfoCard icon={WhatsAppIcon} title="WhatsApp e telefone">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {brand.phone}
                  </a>
                  <span className="mt-1 block text-xs">Mensagens e ligações</span>
                </InfoCard>
              </Reveal>
              <Reveal delay={160} className="h-full">
                <InfoCard icon={Instagram} title="Instagram">
                  <a
                    href={brand.instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    {brand.instagramHandle}
                  </a>
                  <span className="mt-1 block text-xs">Novidades e trabalhos recentes</span>
                </InfoCard>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock3 className="size-5 text-primary" aria-hidden="true" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.14em]">
                      Horário de funcionamento
                    </h2>
                  </div>
                  <OpenStatus className="text-xs font-semibold text-muted-foreground" />
                </div>
                <OpeningHoursList className="mt-3" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:sticky lg:top-24 lg:self-start">
            <figure className="overflow-hidden rounded-2xl border border-border bg-muted">
              <iframe
                src={brand.mapsEmbedSrc}
                title="Mapa com a localização da Fino Trato Barbearia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96 w-full border-0 lg:h-136"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-3 bg-surface-deep px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <span>Vila Santa Rosa · Senador Canedo</span>
                <a
                  href={brand.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 normal-case tracking-normal text-surface-deep-foreground underline-offset-2 hover:underline"
                >
                  Abrir no Google Maps <ArrowUpRight className="size-3.5" />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="h-full rounded-2xl border border-border bg-background p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.14em]">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-muted-foreground">{children}</div>
    </article>
  );
}
