import { useRouterState } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useScrolled } from "@/hooks/use-scrolled";
import { whatsappLink } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

const greeting = "Olá! Vim pelo site da Fino Trato e gostaria de mais informações.";

/** Atalho fixo para o WhatsApp e botão de voltar ao topo. */
export function FloatingActions() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showBackToTop = useScrolled(700);
  // No agendamento o próprio formulário termina no WhatsApp; o atalho só atrapalharia os botões.
  const showWhatsApp = pathname !== "/agendamento";

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        tabIndex={showBackToTop ? 0 : -1}
        aria-hidden={!showBackToTop}
        className={cn(
          // No celular fica só o WhatsApp: dois botões flutuantes cobririam conteúdo demais.
          "hidden size-11 place-items-center rounded-full border border-primary/40 bg-background/90 text-primary shadow-lg backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:grid",
          showBackToTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-5" />
      </button>
      {showWhatsApp && (
        <a
          href={whatsappLink(greeting)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="group pointer-events-auto relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-105"
        >
          <span
            className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 motion-safe:animate-[whatsapp-pulse_2.8s_ease-out_infinite]"
            aria-hidden="true"
          />
          <WhatsAppIcon className="relative size-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-background/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground opacity-0 shadow-lg ring-1 ring-border transition-all duration-300 group-hover:opacity-100 sm:block">
            Fale com a gente
          </span>
        </a>
      )}
    </div>
  );
}
