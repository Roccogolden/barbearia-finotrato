import { Link } from "@tanstack/react-router";
import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/galeria", label: "Galeria" },
  { to: "/equipe", label: "Equipe" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-9 shrink-0 place-items-center border border-primary text-primary"><Scissors className="size-4" /></span>
          <span className="truncate font-display text-xl font-semibold uppercase tracking-[0.08em] text-foreground">Fino Trato Barbearia</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map((link) => <Link key={link.to} to={link.to} className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{link.label}</Link>)}
          <Button asChild size="lg"><Link to="/agendamento">Agendar horário</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</Button>
      </div>
      <div className={cn("border-t border-border bg-background px-5 pb-6 pt-3 lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-7xl flex-col" aria-label="Navegação móvel">
          {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="border-b border-border py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground">{link.label}</Link>)}
          <Button asChild size="lg" className="mt-5"><Link to="/agendamento" onClick={() => setOpen(false)}>Agendar horário</Link></Button>
        </nav>
      </div>
    </header>
  );
}