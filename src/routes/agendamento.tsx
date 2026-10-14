import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Phone } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { ServiceIcon } from "@/components/service-list";
import { Button } from "@/components/ui/button";
import { brand, services, siteUrl, whatsappLink, type Service } from "@/lib/barbershop-data";
import {
  availableSlots,
  dayLabel,
  formatDayLong,
  monthLabel,
  upcomingDays,
  type ShopDay,
} from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

interface BookingSearch {
  /** Slug do serviço vindo da página de serviços, já marcado no passo 1. */
  servico?: string;
}

export const Route = createFileRoute("/agendamento")({
  validateSearch: (search: Record<string, unknown>): BookingSearch =>
    typeof search["servico"] === "string" ? { servico: search["servico"] } : {},
  head: () => ({
    meta: [
      { title: "Agendar horário — Fino Trato Barbearia" },
      {
        name: "description",
        content:
          "Escolha os serviços, o dia e o horário e confirme seu atendimento na Fino Trato Barbearia pelo WhatsApp.",
      },
      { property: "og:title", content: "Agendar horário — Fino Trato Barbearia" },
      { property: "og:description", content: "Reserve seu próximo atendimento em poucos passos." },
      { property: "og:url", content: `${siteUrl}/agendamento` },
    ],
    links: [{ rel: "canonical", href: `${siteUrl}/agendamento` }],
  }),
  component: BookingPage,
});

const steps = ["Serviços", "Dia e horário", "Seus dados"] as const;
const BOOKING_DAYS = 14;

/** Máscara de celular brasileiro: (62) 99999-9999. */
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function BookingPage() {
  const { servico } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(() =>
    servico && services.some((service) => service.slug === servico) ? [servico] : [],
  );
  const [dayKey, setDayKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const previousStep = useRef(step);

  // Recalculado a cada render para "hoje" e os horários restantes nunca ficarem desatualizados.
  // O passo 2 só aparece depois de interação, então isso nunca entra no HTML do servidor.
  const days = upcomingDays(BOOKING_DAYS);
  const selectedServices = services.filter((service) => selected.includes(service.slug));
  const selectedDay = days.find((day) => day.key === dayKey);
  const slots = selectedDay ? availableSlots(selectedDay) : [];
  const phoneDigits = phone.replace(/\D/g, "");

  const errors = {
    services: selected.length === 0 ? "Escolha pelo menos um serviço." : "",
    day: selectedDay ? "" : "Escolha um dia.",
    time: time && slots.includes(time) ? "" : "Escolha um horário.",
    name: name.trim().length >= 2 ? "" : "Informe seu nome.",
    phone: phoneDigits.length >= 10 ? "" : "Informe um celular com DDD.",
  };
  const stepErrors =
    [[errors.services], [errors.day, errors.time], [errors.name, errors.phone]][step] ?? [];
  const stepValid = stepErrors.every((error) => !error);

  const message = [
    `Olá! Gostaria de agendar um horário na ${brand.name}.`,
    "",
    `*${selectedServices.length > 1 ? "Serviços" : "Serviço"}:* ${selectedServices.map((service) => service.name).join(", ")}`,
    selectedDay ? `*Data:* ${formatDayLong(selectedDay)}` : "",
    time ? `*Horário:* ${time}` : "",
    `*Nome:* ${name.trim()}`,
    `*Celular:* ${phone}`,
    notes.trim() ? `*Observações:* ${notes.trim()}` : "",
  ]
    .filter((line, index) => line || index === 1)
    .join("\n");
  const whatsappUrl = whatsappLink(message);

  // Ao trocar de passo, leva a tela ao formulário e o foco ao título do passo (útil para leitores de tela).
  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (sent) window.scrollTo({ top: 0 });
  }, [sent]);

  const goTo = (target: number) => {
    setShowErrors(false);
    setStep(target);
  };

  const toggleService = (slug: string) =>
    setSelected((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );

  const chooseDay = (day: ShopDay) => {
    setDayKey(day.key);
    if (!availableSlots(day).includes(time)) setTime("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!stepValid) {
      setShowErrors(true);
      if (step === 2) (errors.name ? nameRef : phoneRef).current?.focus();
      return;
    }
    if (step < steps.length - 1) {
      goTo(step + 1);
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const restart = () => {
    setSelected([]);
    setDayKey("");
    setTime("");
    setNotes("");
    setSent(false);
    goTo(0);
  };

  if (sent) {
    return (
      <section className="bg-grain min-h-[75vh] bg-surface-deep px-5 pt-36 pb-20 text-surface-deep-foreground">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="size-7" />
          </span>
          <p className="eyebrow mt-7">Quase lá</p>
          <h1 className="mt-3 font-display text-5xl font-semibold">Confirme pelo WhatsApp.</h1>
          <p className="mt-5 leading-7 text-surface-deep-muted">
            Abrimos o WhatsApp com sua solicitação pronta. É só enviar a mensagem — a equipe
            confirma o horário por lá.
          </p>
          <dl className="mt-8 grid gap-3 rounded-2xl border border-surface-deep-border p-6 text-left text-sm">
            <SummaryRow label={selectedServices.length > 1 ? "Serviços" : "Serviço"}>
              {selectedServices.map((service) => service.name).join(", ")}
            </SummaryRow>
            <SummaryRow label="Quando">
              {selectedDay ? formatDayLong(selectedDay) : ""} às {time}
            </SummaryRow>
          </dl>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Abrir o WhatsApp de novo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-surface-deep-muted bg-transparent text-surface-deep-foreground hover:bg-surface-deep-foreground hover:text-surface-deep"
              onClick={restart}
            >
              Fazer outro pedido
            </Button>
          </div>
          <Link
            to="/"
            className="mt-8 inline-block text-sm text-surface-deep-muted transition-colors hover:text-primary"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted pt-18 pb-20">
      <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
        <p className="eyebrow">Agendamento online</p>
        <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">
          Escolha seu momento.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          Monte seu pedido em três passos e confirme pelo WhatsApp — sem cadastro e sem burocracia.
        </p>

        <ol className="mt-10 grid grid-cols-3 gap-2" aria-label="Etapas do agendamento">
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={index === step ? "step" : undefined}
              className={cn(
                "border-t-2 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors sm:text-xs",
                index <= step
                  ? "border-primary text-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              <span className="mr-2 text-primary">0{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="scroll-mt-24 rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-9"
          >
            {step === 0 && (
              <div>
                <StepHeading
                  ref={headingRef}
                  title="O que vamos fazer?"
                  hint="Escolha um ou mais serviços."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <ServiceOption
                      key={service.slug}
                      service={service}
                      selected={selected.includes(service.slug)}
                      onToggle={() => toggleService(service.slug)}
                    />
                  ))}
                </div>
                {showErrors && errors.services && <FieldError>{errors.services}</FieldError>}
              </div>
            )}

            {step === 1 && (
              <div>
                <StepHeading
                  ref={headingRef}
                  title="Quando fica melhor para você?"
                  hint="Segunda a sábado, das 8h às 20h. Em feriados, das 8h às 14h."
                />
                <p id="booking-day" className="mt-7 text-xs font-bold uppercase tracking-[0.12em]">
                  Dia
                </p>
                <div
                  role="group"
                  aria-labelledby="booking-day"
                  className="-mx-5 mt-3 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-7 sm:overflow-visible sm:px-0 sm:pb-0"
                >
                  {days.map((day) => {
                    const today = days[0] ?? day;
                    const closed = availableSlots(day).length === 0;
                    const isSelected = day.key === dayKey;
                    const note = closed
                      ? day.range
                        ? "Encerrado"
                        : "Fechado"
                      : day.holiday
                        ? "Feriado"
                        : monthLabel(day);
                    return (
                      <button
                        key={day.key}
                        type="button"
                        disabled={closed}
                        aria-pressed={isSelected}
                        aria-label={`${formatDayLong(day)}${closed ? ", sem horários" : ""}`}
                        onClick={() => chooseDay(day)}
                        className={cn(
                          "flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-xl border px-2 py-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/60",
                          closed && "cursor-not-allowed opacity-40 hover:border-border",
                        )}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-[0.12em]">
                          {dayLabel(day, today)}
                        </span>
                        <span className="mt-1 font-display text-2xl leading-none">{day.day}</span>
                        <span
                          className={cn(
                            "mt-1 text-[11px]",
                            isSelected ? "text-primary-foreground/75" : "text-muted-foreground",
                          )}
                        >
                          {note}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {showErrors && errors.day && <FieldError>{errors.day}</FieldError>}

                {selectedDay && (
                  <>
                    <p
                      id="booking-time"
                      className="mt-8 text-xs font-bold uppercase tracking-[0.12em]"
                    >
                      Horário{" "}
                      <span className="font-normal normal-case tracking-normal text-muted-foreground">
                        · {formatDayLong(selectedDay)}
                      </span>
                    </p>
                    <div
                      role="group"
                      aria-labelledby="booking-time"
                      className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6"
                    >
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={time === slot}
                          onClick={() => setTime(slot)}
                          className={cn(
                            "h-11 rounded-lg border text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            time === slot
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/60",
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {showErrors && errors.time && <FieldError>{errors.time}</FieldError>}
                  </>
                )}

                <p className="mt-7 flex gap-2 text-xs leading-5 text-muted-foreground">
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  O horário é uma solicitação: a equipe confirma a disponibilidade pelo WhatsApp.
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <StepHeading
                  ref={headingRef}
                  title="Como falamos com você?"
                  hint="Usamos estes dados só para confirmar o horário."
                />
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <Field id="booking-name" label="Nome" error={showErrors ? errors.name : ""}>
                    <input
                      ref={nameRef}
                      id="booking-name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Seu nome"
                      aria-invalid={Boolean(showErrors && errors.name)}
                      aria-describedby={
                        showErrors && errors.name ? "booking-name-error" : undefined
                      }
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    id="booking-phone"
                    label="Celular (WhatsApp)"
                    error={showErrors ? errors.phone : ""}
                  >
                    <input
                      ref={phoneRef}
                      id="booking-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={phone}
                      onChange={(event) => setPhone(formatPhone(event.target.value))}
                      placeholder="(62) 99999-9999"
                      aria-invalid={Boolean(showErrors && errors.phone)}
                      aria-describedby={
                        showErrors && errors.phone ? "booking-phone-error" : undefined
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field id="booking-notes" label="Observações (opcional)" className="mt-6">
                  <textarea
                    id="booking-notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Preferência de barbeiro, referência de corte, algo que devemos saber…"
                    className={cn(inputClass, "min-h-28 resize-y py-3")}
                  />
                </Field>
                <div className="mt-8 lg:hidden">
                  <BookingSummary services={selectedServices} day={selectedDay} time={time} />
                </div>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between gap-3 border-t border-border pt-6">
              {step > 0 ? (
                <Button type="button" variant="ghost" onClick={() => goTo(step - 1)}>
                  <ArrowLeft /> Voltar
                </Button>
              ) : (
                <span />
              )}
              {step < steps.length - 1 ? (
                <Button type="submit" size="lg">
                  Continuar <ArrowRight />
                </Button>
              ) : (
                <Button type="submit" size="lg">
                  <WhatsAppIcon /> Enviar pelo WhatsApp
                </Button>
              )}
            </div>
          </form>

          <aside className="hidden gap-4 lg:sticky lg:top-24 lg:grid">
            <BookingSummary services={selectedServices} day={selectedDay} time={time} />
            <div className="rounded-2xl border border-border bg-background p-6 text-sm">
              <p className="font-display text-xl font-semibold">Prefere conversar?</p>
              <p className="mt-2 leading-6 text-muted-foreground">Fale direto com a equipe.</p>
              <div className="mt-4 grid gap-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-foreground"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <a
                  href={brand.phoneHref}
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-foreground"
                >
                  <Phone className="size-4" /> {brand.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-input bg-background px-4 text-sm font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-danger";

function StepHeading({
  ref,
  title,
  hint,
}: {
  ref: Ref<HTMLHeadingElement>;
  title: string;
  hint: string;
}) {
  return (
    <>
      <h2 ref={ref} tabIndex={-1} className="font-display text-3xl font-semibold outline-none">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </>
  );
}

function ServiceOption({
  service,
  selected,
  onToggle,
}: {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={cn(
        "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5",
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/60",
      )}
    >
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full ring-1 transition-colors",
          selected
            ? "bg-primary text-primary-foreground ring-primary"
            : "bg-primary/10 text-primary ring-primary/20",
        )}
      >
        {selected ? (
          <Check className="size-5" aria-hidden="true" />
        ) : (
          <ServiceIcon slug={service.slug} className="size-5" />
        )}
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline justify-between gap-3">
          <strong className="font-semibold">{service.name}</strong>
          {service.price && <span className="text-sm text-primary">{service.price}</span>}
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          {service.description}
        </span>
      </span>
    </button>
  );
}

function Field({
  id,
  label,
  error = "",
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.12em]">
        {label}
      </label>
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-danger"
    >
      <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function BookingSummary({
  services: chosen,
  day,
  time,
}: {
  services: Service[];
  day: ShopDay | undefined;
  time: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Seu pedido</p>
      <dl className="mt-4 grid gap-4 text-sm">
        <SummaryRow label={chosen.length > 1 ? "Serviços" : "Serviço"}>
          {chosen.length ? chosen.map((service) => service.name).join(", ") : "—"}
        </SummaryRow>
        <SummaryRow label="Dia">{day ? formatDayLong(day) : "—"}</SummaryRow>
        <SummaryRow label="Horário">{time || "—"}</SummaryRow>
      </dl>
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-semibold">{children}</dd>
    </div>
  );
}
