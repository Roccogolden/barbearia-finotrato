import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { brand, whatsappLink } from "@/lib/barbershop-data";

const footerLinks = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-grain border-t border-border bg-surface-deep text-surface-deep-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr] lg:px-10">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={brand.logoImage}
              alt=""
              width={96}
              height={96}
              loading="lazy"
              className="size-12 shrink-0 rounded-full object-cover ring-1 ring-primary/40"
            />
            <span className="font-display text-xl uppercase tracking-[0.08em]">{brand.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-surface-deep-muted">
            Técnica, cuidado e conversa boa. Um corte à altura de quem você é.
          </p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={brand.instagramHref} label={`Instagram ${brand.instagramHandle}`}>
              <Instagram className="size-4" />
            </SocialLink>
            <SocialLink href={whatsappLink()} label="WhatsApp">
              <WhatsAppIcon className="size-4" />
            </SocialLink>
            <SocialLink href={brand.phoneHref} label={`Ligar para ${brand.phone}`} external={false}>
              <Phone className="size-4" />
            </SocialLink>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Navegue</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-surface-deep-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* No celular o endereço vai para o fim, em largura total; navegação e horários ficam lado a lado. */}
        <div className="col-span-2 max-sm:order-last sm:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Visite</p>
          <address className="mt-4 text-sm leading-6 not-italic">
            {brand.street}
            <br />
            {brand.neighborhood}, {brand.city} — {brand.state}
            <br />
            CEP {brand.postalCode}
          </address>
          <a
            href={brand.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold-2"
          >
            Como chegar <ArrowUpRight className="size-4" />
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Horários</p>
          <ul className="mt-4 grid gap-1.5 text-sm text-surface-deep-muted">
            <li>
              <span className="text-surface-deep-foreground">Seg a sáb:</span> 8h às 20h
            </li>
            <li>
              <span className="text-surface-deep-foreground">Feriados:</span> 8h às 14h
            </li>
            <li>
              <span className="text-surface-deep-foreground">Domingo:</span> fechado
            </li>
          </ul>
          <OpenStatus className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-surface-deep-foreground" />
        </div>
      </div>

      <div className="border-t border-surface-deep-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-surface-deep-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>
            © {new Date().getFullYear()} {brand.name} · {brand.city} — {brand.state}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            WhatsApp {brand.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  external = true,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid size-10 place-items-center rounded-full border border-surface-deep-border text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </a>
  );
}
