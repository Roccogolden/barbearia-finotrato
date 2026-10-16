import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { AnimatedLogo } from "@/components/animated-logo";
import { WhatsAppIcon } from "@/components/icons";
import { Lightbox } from "@/components/lightbox";
import { PageHero } from "@/components/page-hero";
import { PhotoCarousel } from "@/components/photo-carousel";
import { PhotoTile } from "@/components/photo-tile";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  brand,
  inaugurationPhotos,
  instagramPosts,
  siteUrl,
  spacePhotos,
  whatsappLink,
  workPhotos,
  type Photo,
} from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de cortes e do espaço — Fino Trato Barbearia" },
      {
        name: "description",
        content:
          "Fotos reais da Fino Trato Barbearia em Senador Canedo: o salão, a equipe, cortes feitos por aqui, a inauguração e o dia a dia no Instagram.",
      },
      { property: "og:title", content: "Galeria — Fino Trato Barbearia" },
      {
        property: "og:description",
        content: "Trabalhos recentes e referências para o seu próximo visual.",
      },
      { property: "og:url", content: `${siteUrl}/galeria` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/galeria` }],
  }),
  component: GalleryPage,
});

// Mosaico do espaço: fachada e equipe à esquerda, a foto vertical da recepção ocupa a coluna da direita.
const spaceLayout = [
  { className: "md:col-span-2", imageClassName: "aspect-[3/2] md:aspect-auto" },
  {
    className: "md:col-start-3 md:row-span-2 md:row-start-1",
    imageClassName: "aspect-[4/5] md:aspect-auto",
  },
  { className: "md:col-span-2", imageClassName: "aspect-[4/3] md:aspect-auto" },
];

function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ items: Photo[]; index: number } | null>(null);
  const open = (items: Photo[], index: number) => setLightbox({ items, index });

  return (
    <>
      <PageHero
        eyebrow="Portfólio real"
        title="Nosso espaço. Nosso trabalho."
        description="Fotos reais da Fino Trato: o salão, a equipe, cortes de clientes e a festa de inauguração."
        media={<AnimatedLogo />}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow">A barbearia</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Por dentro da Fino Trato.
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-4 md:h-168 md:grid-cols-3 md:grid-rows-2">
            {spacePhotos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 100}
                className={cn("min-h-0", spaceLayout[index]?.className)}
              >
                <PhotoTile
                  photo={photo}
                  onOpen={() => open(spacePhotos, index)}
                  className="h-full"
                  imageClassName={spaceLayout[index]?.imageClassName}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Carrosséis: muitas fotos sem alongar a página. */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <PhotoCarousel
              label="Cortes feitos na Fino Trato"
              photos={workPhotos}
              onOpen={(index) => open(workPhotos, index)}
              itemClassName="basis-[72%] sm:basis-[40%] md:basis-1/3 lg:basis-1/4"
              imageClassName="aspect-[4/5]"
              header={
                <>
                  <p className="eyebrow">Resultados reais</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                    Cortes feitos por aqui.
                  </h2>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <PhotoCarousel
              label="Fotos da inauguração da Fino Trato"
              photos={inaugurationPhotos}
              onOpen={(index) => open(inaugurationPhotos, index)}
              itemClassName="basis-[86%] sm:basis-[60%] lg:basis-1/3"
              imageClassName="aspect-[3/2]"
              header={
                <>
                  <p className="eyebrow">Inauguração</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                    A festa de inauguração.
                  </h2>
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <PhotoCarousel
              label="Fotos do Instagram da Fino Trato"
              photos={instagramPosts}
              onOpen={(index) => open(instagramPosts, index)}
              itemClassName="basis-[62%] sm:basis-[34%] md:basis-1/4 lg:basis-1/5"
              imageClassName="aspect-[9/16]"
              hideLabels
              header={
                <>
                  <p className="eyebrow">{brand.instagramHandle}</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                    No dia a dia.
                  </h2>
                  <a
                    href={brand.instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
                  >
                    <Instagram className="size-4" /> Seguir no Instagram
                  </a>
                </>
              }
            />
          </Reveal>
          <div className="mt-14 flex justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={whatsappLink(
                  "Olá! Vi a galeria no site da Fino Trato e quero renovar o visual.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Quero renovar o visual
              </a>
            </Button>
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) =>
            setLightbox((previous) => (previous ? { ...previous, index } : null))
          }
        />
      )}
    </>
  );
}
