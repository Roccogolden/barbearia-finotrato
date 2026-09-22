import { Clock3 } from "lucide-react";
import { services } from "@/lib/barbershop-data";

interface ServiceListProps { limit?: number }
export function ServiceList({ limit }: ServiceListProps) {
  const items = typeof limit === "number" ? services.slice(0, limit) : services;
  return <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">{items.map((service) => <article key={service.name} className="group bg-background p-6 transition-colors hover:bg-muted sm:p-8"><div className="flex items-start justify-between gap-5"><div><h3 className="font-display text-2xl font-semibold text-foreground">{service.name}</h3><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{service.description}</p></div><span className="shrink-0 font-display text-xl font-semibold text-primary">{service.price}</span></div><div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground"><Clock3 className="size-4 text-primary" />{service.duration}</div></article>)}</div>;
}