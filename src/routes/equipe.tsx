import { createFileRoute, redirect } from "@tanstack/react-router";

// A página de equipe foi retirada do site; links antigos seguem direto para o contato.
export const Route = createFileRoute("/equipe")({
  beforeLoad: () => {
    throw redirect({ to: "/contato", statusCode: 301 });
  },
});
