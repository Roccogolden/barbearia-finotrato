import { useShopClock } from "@/hooks/use-shop-clock";
import { formatHour } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

/** "Aberto agora · até 20h" / "Fechado · abre amanhã às 8h", calculado no fuso de Goiás. */
export function OpenStatus({ className }: { className?: string }) {
  const clock = useShopClock();

  if (!clock) {
    // Reserva o espaço até o navegador calcular o status, evitando que o layout pule.
    return (
      <span
        className={cn("invisible inline-flex items-center gap-2", className)}
        aria-hidden="true"
      >
        <span className="size-2" />
        Aberto agora · até 20h
      </span>
    );
  }

  const { status } = clock;
  const label = status.isOpen
    ? `Aberto agora · até ${formatHour(status.closesAt)}`
    : status.opensAt
      ? `Fechado agora · abre ${status.opensOn} às ${formatHour(status.opensAt)}`
      : "Fechado agora";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex size-2 shrink-0" aria-hidden="true">
        {status.isOpen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70 motion-reduce:animate-none" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            status.isOpen ? "bg-success" : "bg-muted-foreground",
          )}
        />
      </span>
      {label}
    </span>
  );
}
