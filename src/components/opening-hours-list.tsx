import { useShopClock } from "@/hooks/use-shop-clock";
import { holidayHours, weeklyHours, type TimeRange } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

const formatSpan = (range: TimeRange | null) =>
  range ? `${range.open}–${range.close}` : "Fechado";

/** Tabela de horários com o dia de hoje em destaque. */
export function OpeningHoursList({ className }: { className?: string }) {
  const clock = useShopClock();
  const today = clock?.today;
  // Em feriados com expediente, o destaque vai para a linha de feriados.
  const holidayToday = Boolean(today?.holiday && today.range);

  return (
    <dl className={cn("divide-y divide-border", className)}>
      {weeklyHours.map(({ weekday, day, range }) => {
        const isToday = today !== undefined && !today.holiday && today.weekday === weekday;
        return (
          <div key={day} className="flex items-center justify-between gap-4 py-3 text-sm">
            <dt
              className={cn(
                "flex items-center gap-2",
                isToday ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              {day}
              {isToday && <TodayBadge />}
            </dt>
            <dd
              className={cn(
                "font-semibold tabular-nums",
                range ? "text-foreground" : "text-primary",
              )}
            >
              {formatSpan(range)}
            </dd>
          </div>
        );
      })}
      <div className="flex items-center justify-between gap-4 py-3 text-sm">
        <dt
          className={cn(
            "flex items-center gap-2",
            holidayToday ? "font-semibold text-foreground" : "text-muted-foreground",
          )}
        >
          Feriados
          {holidayToday && <TodayBadge />}
        </dt>
        <dd className="font-semibold text-foreground tabular-nums">{formatSpan(holidayHours)}</dd>
      </div>
    </dl>
  );
}

function TodayBadge() {
  return (
    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
      Hoje
    </span>
  );
}
