import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { useScrolled } from "@/hooks/use-scrolled";
import { whatsappGreeting, whatsappLink } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

const NUDGE_KEY = "fino-trato:whatsapp-nudge";

/** Atalho fixo para o WhatsApp e botão de voltar ao topo. */
export function FloatingActions() {
  const showBackToTop = useScrolled(700);
  const nudge = useWhatsAppNudge();

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
      <a
        href={whatsappLink(whatsappGreeting)}
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
        <span
          className={cn(
            "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-background/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground shadow-lg ring-1 ring-border transition-[opacity,translate] motion-reduce:translate-x-0",
            nudge
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "translate-x-2 opacity-0 duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100",
          )}
        >
          Fale com a gente
        </span>
      </a>
    </div>
  );
}

/**
 * Mostra o rótulo do WhatsApp sozinho por alguns segundos, uma vez por sessão,
 * depois que a abertura da home já terminou. Chama atenção sem ficar na tela.
 */
function useWhatsAppNudge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {
      // Sem armazenamento (ex.: navegação privada): o aviso aparece a cada visita, sem problema.
    }
    const show = window.setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {
        // Idem acima.
      }
    }, 6000);
    const hide = window.setTimeout(() => setVisible(false), 13000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return visible;
}
