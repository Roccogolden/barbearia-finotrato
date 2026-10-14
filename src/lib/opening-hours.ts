/**
 * Horário oficial da Fino Trato (publicado no Instagram @barbeariafinotrato):
 * segunda a sábado, das 8h às 20h; feriados, das 8h às 14h; domingo fechado.
 * Natal e Ano-Novo ficam fechados.
 *
 * Todas as contas usam o fuso de Goiás, independentemente do fuso do visitante.
 */
const TIME_ZONE = "America/Sao_Paulo";
const DAY_MS = 86_400_000;

export interface TimeRange {
  open: string;
  close: string;
}

const regularHours: TimeRange = { open: "08:00", close: "20:00" };
export const holidayHours: TimeRange = { open: "08:00", close: "14:00" };

/** Semana na ordem de exibição; `weekday` segue Date#getDay (0 = domingo). */
export const weeklyHours: ReadonlyArray<{ weekday: number; day: string; range: TimeRange | null }> =
  [
    { weekday: 1, day: "Segunda-feira", range: regularHours },
    { weekday: 2, day: "Terça-feira", range: regularHours },
    { weekday: 3, day: "Quarta-feira", range: regularHours },
    { weekday: 4, day: "Quinta-feira", range: regularHours },
    { weekday: 5, day: "Sexta-feira", range: regularHours },
    { weekday: 6, day: "Sábado", range: regularHours },
    { weekday: 0, day: "Domingo", range: null },
  ];

/** Feriados nacionais de data fixa (MM-DD). A Sexta-feira Santa é calculada à parte. */
const fixedHolidays = new Set(["04-21", "05-01", "09-07", "10-12", "11-02", "11-15", "11-20"]);
/** Datas em que a barbearia não abre. */
const closedDates = new Set(["01-01", "12-25"]);

const weekdayNames = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const weekdayLongNames = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
const weekdayShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const monthShort = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

export interface ShopDay {
  /** AAAA-MM-DD */
  key: string;
  /** Meia-noite UTC do dia, usada para somar dias sem depender do fuso local. */
  utc: number;
  day: number;
  month: number;
  weekday: number;
  holiday: boolean;
  range: TimeRange | null;
}

const pad = (value: number) => String(value).padStart(2, "0");

function toMinutes(time: string) {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(total: number) {
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

/** Sexta-feira Santa (MM-DD), dois dias antes da Páscoa (algoritmo de Meeus/Jones/Butcher). */
function goodFriday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const friday = new Date(Date.UTC(year, month - 1, day) - 2 * DAY_MS);
  return `${pad(friday.getUTCMonth() + 1)}-${pad(friday.getUTCDate())}`;
}

function makeShopDay(utc: number): ShopDay {
  const date = new Date(utc);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const weekday = date.getUTCDay();
  const monthDay = `${pad(month)}-${pad(day)}`;
  const closed = closedDates.has(monthDay);
  const holiday = closed || fixedHolidays.has(monthDay) || monthDay === goodFriday(year);
  let range = weeklyHours.find((entry) => entry.weekday === weekday)?.range ?? null;
  if (closed) range = null;
  else if (holiday && range) range = holidayHours;
  return { key: `${year}-${monthDay}`, utc, day, month, weekday, holiday, range };
}

let shopClockFormat: Intl.DateTimeFormat | undefined;

/** Dia e minuto atuais no horário da barbearia. */
export function shopNow(now = new Date()) {
  shopClockFormat ??= new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const parts = shopClockFormat.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  return {
    today: makeShopDay(Date.UTC(get("year"), get("month") - 1, get("day"))),
    minutes: get("hour") * 60 + get("minute"),
  };
}

export function upcomingDays(count: number, now = new Date()) {
  const { today } = shopNow(now);
  return Array.from({ length: count }, (_, index) => makeShopDay(today.utc + index * DAY_MS));
}

/** Horários de início a cada `step` minutos; hoje, só a partir de `lead` minutos à frente. */
export function availableSlots(day: ShopDay, now = new Date(), step = 30, lead = 30) {
  if (!day.range) return [];
  const { today, minutes } = shopNow(now);
  if (day.utc < today.utc) return [];
  const earliest = day.utc === today.utc ? minutes + lead : 0;
  const slots: string[] = [];
  for (
    let time = toMinutes(day.range.open);
    time + step <= toMinutes(day.range.close);
    time += step
  ) {
    if (time >= earliest) slots.push(fromMinutes(time));
  }
  return slots;
}

export type OpenStatus =
  { isOpen: true; closesAt: string } | { isOpen: false; opensAt: string | null; opensOn: string };

export function getOpenStatus(now = new Date()): OpenStatus {
  const { today, minutes } = shopNow(now);
  if (today.range) {
    if (minutes >= toMinutes(today.range.open) && minutes < toMinutes(today.range.close)) {
      return { isOpen: true, closesAt: today.range.close };
    }
    if (minutes < toMinutes(today.range.open)) {
      return { isOpen: false, opensAt: today.range.open, opensOn: "hoje" };
    }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const next = makeShopDay(today.utc + offset * DAY_MS);
    if (next.range) {
      const opensOn = offset === 1 ? "amanhã" : (weekdayNames[next.weekday] ?? "");
      return { isOpen: false, opensAt: next.range.open, opensOn };
    }
  }
  return { isOpen: false, opensAt: null, opensOn: "" };
}

/** "08:00" → "8h", "13:30" → "13h30". */
export function formatHour(time: string) {
  const [hours = "0", minutes = "00"] = time.split(":");
  return `${Number(hours)}h${minutes === "00" ? "" : minutes}`;
}

export function formatRange(range: TimeRange) {
  return `${formatHour(range.open)} às ${formatHour(range.close)}`;
}

/** "Hoje", "Amanhã" ou o dia da semana abreviado. */
export function dayLabel(day: ShopDay, today: ShopDay) {
  if (day.utc === today.utc) return "Hoje";
  if (day.utc === today.utc + DAY_MS) return "Amanhã";
  return weekdayShort[day.weekday] ?? "";
}

export function monthLabel(day: ShopDay) {
  return monthShort[day.month - 1] ?? "";
}

/** "quinta-feira, 15/10" */
export function formatDayLong(day: ShopDay) {
  return `${weekdayLongNames[day.weekday] ?? ""}, ${pad(day.day)}/${pad(day.month)}`;
}
