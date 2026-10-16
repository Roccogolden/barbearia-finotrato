import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PhotoTile } from "@/components/photo-tile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Photo } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

interface PhotoCarouselProps {
  photos: Photo[];
  onOpen: (index: number) => void;
  /** Título da seção, à esquerda das setas. */
  header: ReactNode;
  /** Nome do carrossel para leitores de tela. */
  label: string;
  /** Largura de cada foto por tamanho de tela (ex.: `basis-[78%] sm:basis-1/3 lg:basis-1/4`). */
  itemClassName: string;
  /** Proporção das fotos (ex.: `aspect-[4/5]`). */
  imageClassName: string;
  hideLabels?: boolean;
}

/**
 * Faixa de fotos que corre para o lado: setas no computador, arrastar no celular e setas do
 * teclado. Mostra muitas fotos sem alongar a página; cada foto abre o lightbox.
 */
export function PhotoCarousel({
  photos,
  onOpen,
  header,
  label,
  itemClassName,
  imageClassName,
  hideLabels = false,
}: PhotoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  // Com movimento reduzido as setas pulam direto para a próxima foto, sem deslizar.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start" }} aria-label={label}>
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">{header}</div>
        {/* Quando todas as fotos cabem na tela, as setas somem (mas guardam o espaço). */}
        <div className={cn("hidden shrink-0 gap-2 sm:flex", !canPrev && !canNext && "invisible")}>
          <ArrowButton
            label="Fotos anteriores"
            disabled={!canPrev}
            onClick={() => api?.scrollPrev(reducedMotion)}
          >
            <ArrowLeft className="size-5" />
          </ArrowButton>
          <ArrowButton
            label="Próximas fotos"
            disabled={!canNext}
            onClick={() => api?.scrollNext(reducedMotion)}
          >
            <ArrowRight className="size-5" />
          </ArrowButton>
        </div>
      </div>
      {/* O respiro vertical deixa a foto subir no hover sem ser cortada pela faixa. */}
      <CarouselContent className="mt-7 py-2 sm:mt-9">
        {photos.map((photo, index) => (
          <CarouselItem
            key={photo.src}
            aria-label={`${index + 1} de ${photos.length}`}
            className={itemClassName}
          >
            <PhotoTile
              photo={photo}
              onOpen={() => onOpen(index)}
              imageClassName={imageClassName}
              hideLabel={hideLabels}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-primary/40 text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}
