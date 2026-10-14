import { createFileRoute, redirect } from "@tanstack/react-router";

// A página de equipe foi retirada do site; links antigos seguem direto para o agendamento.
export const Route = createFileRoute("/equipe")({
  beforeLoad: () => {
    throw redirect({ to: "/agendamento", statusCode: 301 });
  },
});
