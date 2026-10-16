import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Button } from "@/components/ui/button";
import { FloatingActions } from "@/components/floating-actions";
import { WhatsAppIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { brand, siteUrl, whatsappGreeting, whatsappLink } from "@/lib/barbershop-data";

/** Dados estruturados para o Google mostrar endereço, telefone e horário da barbearia. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: brand.name,
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  logo: `${siteUrl}${brand.logoImage}`,
  telephone: "+55-62-99464-1575",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${brand.street}, ${brand.neighborhood}`,
    addressLocality: brand.city,
    addressRegion: brand.state,
    postalCode: brand.postalCode,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  hasMap: brand.mapsHref,
  sameAs: [brand.instagramHref],
};

// Sem JavaScript o GSAP não roda: mostra o conteúdo que começa escondido e tira a tela de abertura.
const noScriptStyles =
  "<style>[data-reveal],.logo-ring,.logo-core{opacity:1!important;transform:none!important}.site-loader{display:none!important}</style>";

function NotFoundComponent() {
  return (
    <section className="bg-grain flex min-h-[80vh] items-center bg-surface-deep px-5 pt-18 text-surface-deep-foreground">
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">
          Página não encontrada.
        </h1>
        <p className="mt-5 text-base leading-7 text-surface-deep-muted">
          O endereço pode ter mudado ou não existe mais. Que tal voltar ao início ou falar com a
          gente no WhatsApp?
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/">Voltar ao início</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-surface-deep-muted bg-transparent text-surface-deep-foreground hover:bg-surface-deep-foreground hover:text-surface-deep"
          >
            <a href={whatsappLink(whatsappGreeting)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado do nosso lado. Tente atualizar a página ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fino Trato Barbearia — Barbearia em Senador Canedo, GO" },
      {
        name: "description",
        content:
          "Barbearia em Senador Canedo — GO: cortes, barba, sobrancelha, progressiva, barbaterapia e pigmentação. Sem agendamento: é só chegar.",
      },
      { name: "author", content: brand.name },
      { name: "theme-color", content: "#090807" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: brand.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: `${siteUrl}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Fachada da Fino Trato Barbearia à noite" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${siteUrl}/og-image.jpg` },
      { "script:ld+json": localBusiness },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Gelasio é a alternativa à Georgia (fonte dos títulos) para Android, que não tem Georgia instalada.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Gelasio:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingActions />
    </QueryClientProvider>
  );
}
