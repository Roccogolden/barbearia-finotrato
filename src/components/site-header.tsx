import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, MapPin, Menu, Navigation, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Button } from "@/components/ui/button";
import { useScrolled } from "@/hooks/use-scrolled";
import { brand, whatsappGreeting, whatsappLink } from "@/lib/barbershop-data";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Fecha o menu ao trocar de página (inclusive pelo voltar do navegador).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg transition-shadow duration-300",
        (scrolled || open) && "shadow-sm",
        open && "bg-background",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[height] duration-300 sm:px-8 lg:px-10",
          scrolled ? "h-14" : "h-18",
        )}
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          aria-label={`${brand.name} — página inicial`}
        >
          <img
            src={brand.logoImage}
            alt=""
            width={112}
            height={112}
            className={cn(
              "shrink-0 rounded-full object-cover ring-1 ring-primary/40 transition-all duration-300",
              scrolled ? "size-10" : "size-12",
            )}
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-lg font-semibold uppercase tracking-[0.08em] text-foreground sm:text-xl">
              Fino Trato
            </span>
            <span className="mt-1 text-[0.625rem] font-bold uppercase tracking-[0.34em] text-primary">
              Barbearia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
          <Button asChild size="lg">
            <a href={whatsappLink(whatsappGreeting)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Chamar no WhatsApp
            </a>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="size-11 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-movel"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5!" /> : <Menu className="size-5!" />}
        </Button>
      </div>

      {open && (
        <div
          id="menu-movel"
          className={cn(
            // Ocupa a tela toda abaixo do cabeçalho (que encolhe ao rolar), escondendo a página por trás.
            "overflow-y-auto border-t border-border bg-background px-5 pb-8 pt-2 duration-200 animate-in fade-in slide-in-from-top-2 sm:px-8 lg:hidden",
            scrolled ? "h-[calc(100dvh-3.5rem)]" : "h-[calc(100dvh-4.5rem)]",
          )}
        >
          <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Navegação móvel">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-4 font-display text-2xl text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {link.label}
                <ArrowRight className="size-5 text-primary" />
              </Link>
            ))}
          </nav>
          <div className="mx-auto mt-6 grid max-w-7xl gap-3 sm:grid-cols-2">
            <Button asChild size="lg">
              <a href={whatsappLink(whatsappGreeting)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Chamar no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={brand.directionsHref} target="_blank" rel="noopener noreferrer">
                <Navigation /> Como chegar
              </a>
            </Button>
          </div>
          <div className="mx-auto mt-8 grid max-w-7xl gap-3 text-sm text-muted-foreground">
            <OpenStatus className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground" />
            <p>{brand.hours}</p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {brand.address}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
