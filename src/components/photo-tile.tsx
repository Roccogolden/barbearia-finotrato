import { Expand } from "lucide-react";
import type { Photo } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

interface PhotoTileProps {
  photo: Photo;
  onOpen: () => void;
  className?: string | undefined;
  /** Classes da imagem — use para definir a proporção (ex.: `aspect-[4/5]`). */
  imageClassName?: string | undefined;
  /** Esconde a legenda sobreposta (ex.: fotos que já trazem texto escrito). */
  hideLabel?: boolean;
}

/** Foto clicável com legenda sobreposta; abre o lightbox. */
export function PhotoTile({
  photo,
  onOpen,
  className,
  imageClassName,
  hideLabel = false,
}: PhotoTileProps) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-muted transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-xl",
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar foto: ${photo.label}`}
        className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]",
            imageClassName,
          )}
        />
      </button>
      {hideLabel ? (
        <Expand
          className="pointer-events-none absolute right-4 bottom-4 size-4 text-gold-2 opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      ) : (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pt-14 pb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:text-xs">
          {photo.label}
          <Expand
            className="size-4 shrink-0 text-gold-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </figcaption>
      )}
    </figure>
  );
}
