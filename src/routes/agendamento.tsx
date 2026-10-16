import { createFileRoute, redirect } from "@tanstack/react-router";

// A barbearia não trabalha com agendamento (atende por ordem de chegada); links antigos
// do Google e do Instagram seguem para o contato, que tem WhatsApp, endereço e horários.
export const Route = createFileRoute("/agendamento")({
  beforeLoad: () => {
    throw redirect({ to: "/contato", statusCode: 301 });
  },
});
