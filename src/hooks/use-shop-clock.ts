import { useEffect, useState } from "react";
import { getOpenStatus, shopNow, type OpenStatus, type ShopDay } from "@/lib/opening-hours";

/**
 * Situação atual da barbearia (aberta/fechada e dia de hoje), atualizada a cada minuto.
 * Fica `null` até montar no navegador, para o HTML do servidor não divergir do cliente.
 */
export function useShopClock() {
  const [clock, setClock] = useState<{ status: OpenStatus; today: ShopDay } | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock({ status: getOpenStatus(now), today: shopNow(now).today });
    };
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
}
