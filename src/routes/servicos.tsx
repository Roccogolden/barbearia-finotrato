import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AirVent,
  ArrowRight,
  CalendarCheck,
  Clock3,
  MessageCircle,
  Scissors,
  Wifi,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ServiceList } from "@/components/service-list";
import { Button } from "@/components/ui/button";
import { services, siteUrl, whatsappLink } from "@/lib/barbershop-data";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Fino Trato Barbearia em Senador Canedo" },
      {
        name: "description",
        content:
          "Cortes especiais, barba completa, sobrancelha, progressiva, barbaterapia e pigmentação na Fino Trato Barbearia, em Senador Canedo — GO.",
      },
      { property: "og:title", content: "Serviços — Fino Trato Barbearia" },
      { property: "og:description", content: "Escolha o cuidado ideal para o seu estilo." },
      { property: "og:url", content: `${siteUrl}/servicos` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/servicos` }],
  }),
  component: ServicesPage,
});

const steps = [
  {
    icon: Scissors,
    title: "Escolha o serviço",
    text: "Um ou mais: dá para combinar corte, barba e o que mais quiser.",
  },
  {
    icon: CalendarCheck,
    title: "Sugira dia e horário",
    text: "Veja os horários de funcionamento e escolha o melhor para você.",
  },
  {
    icon: MessageCircle,
    title: "Confirme no WhatsApp",
    text: "Sua solicitação chega pronta e a equipe confirma a disponibilidade.",
  },
];

const goodToKnow = [
  { icon: Clock3, title: "Seg a sáb, 8h às 20h", text: "Feriados das 8h às 14h. Domingo fechado." },
  {
    icon: AirVent,
    title: "Ambiente climatizado",
    text: "Conforto do começo ao fim do atendimento.",
  },
  { icon: Wifi, title: "Wi-Fi e bebidas", text: "Para aproveitar enquanto espera a sua vez." },
];

function ServicesPage() {
  // Enquanto os valores não forem cadastrados em barbershop-data.ts, a página orienta a consultar pelo WhatsApp.
  const allPriced = services.every((service) => service.price);

  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Técnica em cada detalhe."
        description="Do corte à barbaterapia, todo atendimento começa com uma conversa para entender seu estilo e sua rotina."
        action={
          <Button asChild size="lg">
            <Link to="/agendamento">
              Agendar agora <ArrowRight />
            </Link>
          </Button>
        }
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <ServiceList />
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="font-display text-2xl font-semibold">E muito mais.</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {allPriced
                    ? "Procurando outro serviço? Fale com a equipe pelo WhatsApp."
                    : "Valores e outros serviços sob consulta — a equipe responde rapidinho pelo WhatsApp."}
                </p>
              </div>
              <Button asChild size="lg" variant="outline" className="shrink-0">
                <a
                  href={whatsappLink(
                    "Olá! Gostaria de saber os valores dos serviços da Fino Trato.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> {allPriced ? "Falar no WhatsApp" : "Consultar valores"}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <p className="eyebrow">Como agendar</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
              Três passos, sem cadastro.
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title}>
                <Reveal delay={index * 100} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-background p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-4xl text-primary/40" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={150} className="mt-10 flex justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/agendamento">
                Começar agendamento <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
          {goodToKnow.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 100}>
              <div className="flex gap-4">
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
