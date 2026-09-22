import { Link } from "@tanstack/react-router";
import { Instagram, Scissors } from "lucide-react";
import { brand } from "@/lib/barbershop-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-deep text-surface-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10">
        <div><div className="flex items-center gap-3 text-primary"><Scissors className="size-5" /><span className="font-display text-xl uppercase tracking-[0.08em]">Fino Trato Barbearia</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-surface-deep-muted">Técnica, cuidado e conversa boa. Um corte à altura de quem você é.</p></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Visite</p><p className="mt-4 text-sm leading-6">{brand.address}</p><p className="mt-2 text-sm text-surface-deep-muted">{brand.hours}</p></div>
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Fale conosco</p><a href={brand.whatsappHref} target="_blank" rel="noreferrer" className="mt-4 block text-sm transition-colors hover:text-primary">WhatsApp · {brand.phone}</a><a className="mt-5 inline-flex items-center gap-2 text-sm text-primary" href={brand.instagramHref} target="_blank" rel="noreferrer"><Instagram className="size-4" /> {brand.instagramHandle}</a></div>
      </div>
      <div className="border-t border-surface-deep-border"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-surface-deep-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><p>© 2026 Fino Trato Barbearia. Conteúdo demonstrativo.</p><div className="flex gap-5"><Link to="/servicos">Serviços</Link><Link to="/contato">Contato</Link></div></div></div>
    </footer>
  );
}