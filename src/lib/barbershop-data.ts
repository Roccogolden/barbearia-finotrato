import facadeAsset from "@/assets/fachada-real.webp.asset.json";
import interiorAsset from "@/assets/interior-real.webp.asset.json";
import serviceInteriorAsset from "@/assets/interior-atendimento.jpg.asset.json";
import socialCutAsset from "@/assets/corte-social.jpg.asset.json";
import fadeAsset from "@/assets/degrade-baixo.jpg.asset.json";
import fadePortraitAsset from "@/assets/corte-degrade.jpg.asset.json";
import beardCutAsset from "@/assets/corte-barba.jpg.asset.json";
import identityAsset from "@/assets/identidade-fino-trato.jpg.asset.json";
import hoursAsset from "@/assets/horario-endereco.jpg.asset.json";
import servicesAsset from "@/assets/servicos-fino-trato.jpg.asset.json";
import beardCampaignAsset from "@/assets/barba-campanha.jpg.asset.json";

export const siteUrl = "https://barbearia-finotrato.vercel.app";

export const brand = {
  name: "Fino Trato Barbearia",
  phone: "(62) 99464-1575",
  phoneHref: "tel:+5562994641575",
  whatsappNumber: "5562994641575",
  instagramHandle: "@barbeariafinotrato",
  instagramHref: "https://www.instagram.com/barbeariafinotrato/",
  street: "R. Esperança, Qd. 27, Lote 03, Sala 02",
  neighborhood: "Vila Santa Rosa",
  city: "Senador Canedo",
  state: "GO",
  postalCode: "75250-000",
  address:
    "R. Esperança, Qd. 27, Lote 03, Sala 02 — Vila Santa Rosa, Senador Canedo — GO, 75250-000",
  // Buscar pelo nome + rua abre a ficha da barbearia no Google (pino, nota e avaliações), não só o endereço.
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Fino+Trato+Barbearia,+R.+Esperan%C3%A7a,+Vila+Santa+Rosa,+Senador+Canedo+-+GO&output=embed",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Fino+Trato+Barbearia%2C+R.+Esperan%C3%A7a%2C+Vila+Santa+Rosa%2C+Senador+Canedo+-+GO",
  /** Abre a rota até a barbearia (no celular, direto no app de mapas). */
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Fino+Trato+Barbearia%2C+R.+Esperan%C3%A7a%2C+Vila+Santa+Rosa%2C+Senador+Canedo+-+GO",
  reviewsHref: "https://www.google.com/search?q=fino+trato+barbearia+senador+canedo",
  hours: "Seg a sáb, 8h às 20h · Feriados, 8h às 14h",
  /**
   * A foto original da fachada tem só 1360px e fica borrada esticada na tela inteira.
   * No topo da home ela aparece recortada e emoldurada (tamanho em que continua nítida);
   * o fundo usa uma versão bem desfocada da mesma foto, só para dar o clima dourado.
   */
  heroImage: "/images/hero-fachada.webp",
  heroBackdrop: "/images/hero-ambiente.webp",
  /** Recorte do emblema oficial, usado no cabeçalho, rodapé e abertura. */
  logoImage: "/images/logo-emblema.webp",
  googleRating: "4,8",
  googleReviewsCount: "62",
};

/** Link do WhatsApp da barbearia, opcionalmente com a mensagem já escrita. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${brand.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensagem padrão dos botões de WhatsApp. A barbearia não trabalha com agendamento. */
export const whatsappGreeting = "Olá! Vim pelo site da Fino Trato e gostaria de mais informações.";

export interface Service {
  slug: string;
  name: string;
  description: string;
  /** Preencha com o valor real (ex.: "R$ 45") para exibi-lo no site. */
  price?: string;
}

/** Serviços divulgados no Instagram oficial. Valores são informados pela equipe no WhatsApp. */
export const services: Service[] = [
  {
    slug: "corte",
    name: "Cortes especiais",
    description:
      "Degradê, social, na tesoura ou na máquina: o corte é pensado para o seu rosto, seu estilo e sua rotina.",
  },
  {
    slug: "barba",
    name: "Barba completa",
    description:
      "Toalha quente, desenho preciso e hidratação para a barba ficar alinhada por mais tempo.",
  },
  {
    slug: "sobrancelha",
    name: "Sobrancelha",
    description: "Limpeza e alinhamento na medida certa, sem perder a naturalidade do rosto.",
  },
  {
    slug: "progressiva",
    name: "Progressiva",
    description:
      "Reduz o volume e alinha os fios, deixando o cabelo mais fácil de arrumar no dia a dia.",
  },
  {
    slug: "barbaterapia",
    name: "Barbaterapia",
    description: "Um ritual de cuidado para barba e pele, com limpeza, hidratação e relaxamento.",
  },
  {
    slug: "pigmentacao",
    name: "Pigmentação",
    description: "Disfarça falhas e realça o desenho do corte e da barba, com acabamento natural.",
  },
];

export interface Photo {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}

export const spacePhotos: Photo[] = [
  {
    src: facadeAsset.url,
    alt: "Fachada da Fino Trato Barbearia à noite, com o letreiro iluminado",
    label: "Nossa fachada",
    width: 1360,
    height: 907,
  },
  {
    src: serviceInteriorAsset.url,
    alt: "Barbeiro atendendo um cliente no salão da Fino Trato",
    label: "Em atendimento",
    width: 361,
    height: 640,
  },
  {
    src: interiorAsset.url,
    alt: "Interior da Fino Trato com parede de tijolos decorada com discos de vinil",
    label: "Nosso espaço",
    width: 1360,
    height: 1020,
  },
];

/** Seção "Experiência Fino Trato" da home: o salão em destaque e um atendimento por cima. */
export const experiencePhotos = {
  space: {
    // Recortada sem a marca d'água do Instagram que ficava no rodapé da foto.
    src: "/images/salao-entrada.webp",
    alt: "Salão da Fino Trato com uma moto em exposição, poltronas e a porta de vidro aberta para a rua",
    label: "Nosso espaço",
    width: 900,
    height: 1410,
  },
  service: {
    src: "/images/atendimento-barba.webp",
    alt: "Barbeiro da Fino Trato sorrindo enquanto apara a barba de um cliente",
    label: "Barba completa",
    width: 900,
    height: 1199,
  },
} satisfies Record<string, Photo>;

export const workPhotos: Photo[] = [
  {
    src: fadeAsset.url,
    alt: "Cliente da Fino Trato com corte degradê baixo",
    label: "Degradê baixo",
    width: 544,
    height: 640,
  },
  {
    src: fadePortraitAsset.url,
    alt: "Cliente da Fino Trato com degradê e acabamento natural",
    label: "Degradê + acabamento",
    width: 480,
    height: 640,
  },
  {
    src: socialCutAsset.url,
    alt: "Cliente da Fino Trato com corte social e barba alinhada",
    label: "Corte social",
    width: 546,
    height: 640,
  },
  {
    src: beardCutAsset.url,
    alt: "Cliente da Fino Trato com cabelo penteado para trás e barba cheia alinhada",
    label: "Corte + barba",
    width: 481,
    height: 640,
  },
];

export const instagramPosts: Photo[] = [
  {
    src: identityAsset.url,
    alt: "Publicação com o emblema da Fino Trato Barbearia",
    label: "Identidade Fino Trato",
    width: 512,
    height: 640,
  },
  {
    src: hoursAsset.url,
    alt: "Publicação com o horário de funcionamento e o endereço da barbearia",
    label: "Horário e endereço",
    width: 512,
    height: 640,
  },
  {
    src: servicesAsset.url,
    alt: "Publicação com a lista de serviços da Fino Trato",
    label: "Nossos serviços",
    width: 512,
    height: 640,
  },
  {
    src: beardCampaignAsset.url,
    alt: "Publicação da Fino Trato sobre cuidados com a barba",
    label: "Cuidados com a barba",
    width: 512,
    height: 640,
  },
];

export const testimonials = [
  {
    quote:
      "Excelente atendimento, com profissionais qualificados, ambiente climatizado, organizado com higiene. A melhor barbearia da região, com preço justo.",
    name: "Adriano Pereira",
    detail: "Google Review · 5 estrelas",
  },
  {
    quote:
      "Profissionais de alto nível. Atendimento cordial e acolhedor. Alto astral nas resenhas dos clientes. Altamente recomendável.",
    name: "Carlos de Brito Lacerda",
    detail: "Google Review · 5 estrelas",
  },
  {
    quote:
      "Barbearia excelente, ambiente agradável, climatizado, opções de bebidas enquanto espera sua vez, wi-fi, super indico.",
    name: "Lucas Nery",
    detail: "Google Review · 5 estrelas",
  },
];
