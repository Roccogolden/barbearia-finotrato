import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { AnimatedLogo } from "@/components/animated-logo";
import { WhatsAppIcon } from "@/components/icons";
import { Lightbox } from "@/components/lightbox";
import { PageHero } from "@/components/page-hero";
import { PhotoTile } from "@/components/photo-tile";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  brand,
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
          "Fotos reais da Fino Trato Barbearia em Senador Canedo: o espaço, cortes e barbas feitos por aqui e publicações do Instagram.",
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

// Mosaico do espaço: fachada e salão à esquerda, a foto vertical do atendimento ocupa a coluna da direita.
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
        description="Fotos reais da Fino Trato: o ambiente, resultados de clientes e publicações do nosso Instagram."
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

      <section className="bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow">Resultados reais</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              Cortes feitos por aqui.
            </h2>
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {workPhotos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 80}>
                <PhotoTile
                  photo={photo}
                  onOpen={() => open(workPhotos, index)}
                  imageClassName="aspect-[4/5]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow">{brand.instagramHandle}</p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
                Do nosso Instagram.
              </h2>
              <a
                href={brand.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
              >
                <Instagram className="size-4" /> Seguir no Instagram
              </a>
            </div>
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {instagramPosts.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 80}>
                <PhotoTile
                  photo={photo}
                  onOpen={() => open(instagramPosts, index)}
                  imageClassName="aspect-[4/5]"
                />
              </Reveal>
            ))}
          </div>
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
