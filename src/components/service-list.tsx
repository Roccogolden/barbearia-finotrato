import { ArrowRight, Eye, Flame, Paintbrush, Scissors, Wind } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { MustacheIcon, WhatsAppIcon } from "@/components/icons";
import { services, whatsappLink, type Service } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

const serviceIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  corte: Scissors,
  barba: MustacheIcon,
  sobrancelha: Eye,
  progressiva: Wind,
  barbaterapia: Flame,
  pigmentacao: Paintbrush,
};

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = serviceIcons[slug] ?? Scissors;
  return <Icon className={className} aria-hidden="true" />;
}

interface ServiceListProps {
  /** `compact` mostra os serviços em três colunas, para a página inicial. */
  variant?: "full" | "compact";
}

export function ServiceList({ variant = "full" }: ServiceListProps) {
  const compact = variant === "compact";
  return (
    <div
      className={cn(
        "gap-4",
        compact
          ? // Na home, no celular os cartões viram uma faixa de arrastar (como as avaliações) para não empilhar seis cartões.
            "-mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pt-2 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pt-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
          : "grid md:grid-cols-2",
      )}
    >
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} compact={compact} />
      ))}
    </div>
  );
}

function ServiceCard({ service, compact }: { service: Service; compact: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-background transition-[translate,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-muted hover:shadow-xl",
        compact ? "w-[82%] shrink-0 snap-center p-6 sm:w-[60%] sm:p-7 md:w-auto" : "p-6 sm:p-8",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <ServiceIcon slug={service.slug} className="size-5" />
        </span>
        {service.price && (
          <span className="font-display text-xl font-semibold text-primary">{service.price}</span>
        )}
      </div>
      <h3
        className={cn(
          "mt-6 font-display font-semibold text-foreground",
          compact ? "text-2xl" : "text-3xl",
        )}
      >
        {service.name}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{service.description}</p>
      <div className="mt-auto pt-6">
        {/* O link cobre o card inteiro: qualquer toque abre o WhatsApp já perguntando sobre o serviço. */}
        <a
          href={whatsappLink(
            `Olá! Vi no site o serviço ${service.name} e gostaria de ${service.price ? "mais informações" : "saber o valor"}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${service.price ? "Tirar dúvidas sobre" : "Consultar o valor de"} ${service.name} no WhatsApp`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          <WhatsAppIcon className="size-4" />
          {service.price ? "Tirar dúvidas" : "Consultar valor"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
