import { Clock3, Combine, Crown, Droplet, Feather, Flame, Scissors } from "lucide-react";
import { services } from "@/lib/barbershop-data";

const serviceIcons: Record<string, typeof Scissors> = {
  "Corte assinatura": Scissors,
  "Barba completa": Flame,
  "Corte + barba": Combine,
  "Acabamento": Feather,
  "Camuflagem": Droplet,
  "Dia do noivo": Crown,
};

interface ServiceListProps { limit?: number }
export function ServiceList({ limit }: ServiceListProps) {
  const items = typeof limit === "number" ? services.slice(0, limit) : services;
  return <div className="grid gap-4 md:grid-cols-2">{items.map((service) => {
    const Icon = serviceIcons[service.name] ?? Scissors;
    return <article key={service.name} className="group relative rounded-2xl border border-border bg-background p-6 transition-[transform,box-shadow,background-color] duration-300 hover:z-10 hover:-translate-y-2 hover:border-primary/40 hover:bg-muted hover:shadow-xl sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5" /></span>
          <div><h3 className="font-display text-2xl font-semibold text-foreground">{service.name}</h3><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{service.description}</p></div>
        </div>
        <span className="shrink-0 font-display text-xl font-semibold text-primary">{service.price}</span>
      </div>
      <div className="mt-5 flex items-center gap-2 pl-15 text-xs uppercase tracking-[0.12em] text-muted-foreground"><Clock3 className="size-4 text-primary" />{service.duration}</div>
    </article>;
  })}</div>;
}
