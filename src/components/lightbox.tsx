import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  label: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index];
  const hasMultiple = items.length > 1;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const next = (index + 1) % items.length;
  const previous = (index - 1 + items.length) % items.length;

  // Ao abrir: foco no botão fechar e página travada; ao fechar, o foco volta para a foto clicada.
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (hasMultiple && event.key === "ArrowRight") onNavigate(next);
      else if (hasMultiple && event.key === "ArrowLeft") onNavigate(previous);
      else if (event.key === "Tab" && dialogRef.current) {
        const buttons = Array.from(dialogRef.current.querySelectorAll("button"));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMultiple, next, previous, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (!hasMultiple || start == null || end == null || Math.abs(end - start) < 50) return;
        onNavigate(end < start ? next : previous);
      }}
      className="fixed inset-0 z-100 grid place-items-center bg-background/95 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-8"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <X className="size-5" />
      </button>
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(previous);
            }}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(next);
            }}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-primary hover:text-primary-foreground sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
      <figure className="max-h-[85vh] max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className="max-h-[78vh] w-full rounded-2xl object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        />
        <figcaption className="mt-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {item.label}
          {hasMultiple && (
            <span
              className="tabular-nums text-primary"
              aria-label={`Foto ${index + 1} de ${items.length}`}
            >
              {index + 1} / {items.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
