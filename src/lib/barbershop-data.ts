import heroAsset from "@/assets/fachada-fino-trato-recente.png.asset.json";
import socialCutAsset from "@/assets/corte-social.jpg.asset.json";
import fadeAsset from "@/assets/degrade-baixo.jpg.asset.json";
import beardCutAsset from "@/assets/corte-barba.jpg.asset.json";

export const brand = {
  name: "Fino Trato Barbearia",
  phone: "(62) 99464-1575",
  phoneHref: "tel:+5562994641575",
  whatsappHref: "https://wa.me/5562994641575",
  instagramHandle: "@barbeariafinotrato",
  instagramHref: "https://www.instagram.com/barbeariafinotrato/",
  address: "R. Esperança, Qd. 27, Lote 03, Sala 02 — Vila Santa Rosa, Senador Canedo — GO, 75250-000",
  mapsEmbedSrc: "https://www.google.com/maps?q=R.+Esperan%C3%A7a,+Qd.+27,+Lote+03,+Sala+02,+Vila+Santa+Rosa,+Senador+Canedo+-+GO,+75250-000&output=embed",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=R.+Esperan%C3%A7a%2C+Qd.+27%2C+Lote+03%2C+Sala+02%2C+Vila+Santa+Rosa%2C+Senador+Canedo+-+GO%2C+75250-000",
  arrivalTime: "15 min",
  hours: "Seg–Sáb, 8h–20h · Domingo fechado",
  heroImage: heroAsset.url,
  googleRating: "4,8",
  googleReviewsCount: "62",
};

export const openingHours = [
  { day: "Segunda-feira", hours: "08:00–20:00" },
  { day: "Terça-feira", hours: "08:00–20:00" },
  { day: "Quarta-feira", hours: "08:00–20:00" },
  { day: "Quinta-feira", hours: "08:00–20:00" },
  { day: "Sexta-feira", hours: "08:00–20:00" },
  { day: "Sábado", hours: "08:00–20:00" },
  { day: "Domingo", hours: "Fechado" },
];

export const services = [
  { name: "Corte assinatura", description: "Consulta de estilo, corte personalizado e finalização.", price: "R$ 65", duration: "45 min" },
  { name: "Barba completa", description: "Toalha quente, desenho preciso e hidratação.", price: "R$ 50", duration: "35 min" },
  { name: "Corte + barba", description: "O ritual completo, pensado para você sair renovado.", price: "R$ 105", duration: "75 min" },
  { name: "Acabamento", description: "Contornos, costeletas e nuca alinhados entre cortes.", price: "R$ 30", duration: "20 min" },
  { name: "Camuflagem", description: "Disfarce natural de fios brancos no cabelo ou barba.", price: "R$ 55", duration: "30 min" },
  { name: "Dia do noivo", description: "Atendimento reservado e experiência para o grande dia.", price: "Sob consulta", duration: "120 min" },
];

export const barbers = [
  { name: "Rafael Lima", role: "Fundador · Cortes clássicos", bio: "Há 12 anos traduz personalidade em cortes precisos e atemporais." },
  { name: "Mateus Rocha", role: "Barbeiro · Fades e textura", bio: "Especialista em degradês limpos, texturas e visuais contemporâneos." },
  { name: "André Martins", role: "Barbeiro · Barbas", bio: "Domina o ritual da navalha e o desenho de barba sob medida." },
];

export const galleryBase = [
  { src: fadeAsset.url, alt: "Cliente da Fino Trato com corte degradê baixo", label: "Degradê baixo" },
  { src: socialCutAsset.url, alt: "Cliente da Fino Trato com corte social e barba alinhada", label: "Corte social" },
  { src: beardCutAsset.url, alt: "Cliente da Fino Trato com cabelo e barba alinhados", label: "Corte + barba" },
];

export const testimonials = [
  {
    quote: "Excelente atendimento, com profissionais qualificados, ambiente climatizado, organizado com higiene. A melhor barbearia da região, com preço justo.",
    name: "Adriano Pereira",
    detail: "Google Review · 5 estrelas"
  },
  {
    quote: "Profissionais de alto nível. Atendimento cordial e acolhedor. Alto astral nas resenhas dos clientes. Altamente recomendável.",
    name: "Carlos de Brito Lacerda",
    detail: "Google Review · 5 estrelas"
  },
  {
    quote: "Barbearia excelente, ambiente agradável, climatizado, opções de bebidas enquanto espera sua vez, wi-fi, super indico.",
    name: "Lucas Nery",
    detail: "Google Review · 5 estrelas"
  }
];
