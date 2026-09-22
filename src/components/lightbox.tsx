import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem { src: string; alt: string; label: string }

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index];
  const hasMultiple = items.length > 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (hasMultiple && event.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (hasMultiple && event.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [index, items.length, hasMultiple, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
      className="fixed inset-0 z-100 grid place-items-center bg-background/95 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-accent/70"
      >
        <X className="size-5" />
      </button>
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onNavigate((index - 1 + items.length) % items.length); }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-accent/70 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onNavigate((index + 1) % items.length); }}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-accent/70 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
      <figure className="max-h-[85vh] max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl" />
        <figcaption className="mt-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</figcaption>
      </figure>
    </div>
  );
}
