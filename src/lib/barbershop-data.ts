import facadeAsset from "@/assets/fachada-real.webp.asset.json";

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

/** Frente do salão, com a moto em exposição. Recortada sem a marca d'água do Instagram do rodapé. */
const entrancePhoto: Photo = {
  src: "/images/salao-entrada.webp",
  alt: "Salão da Fino Trato com uma moto em exposição, poltronas e a porta de vidro aberta para a rua",
  label: "Recepção",
  width: 900,
  height: 1410,
};

export const spacePhotos: Photo[] = [
  {
    src: facadeAsset.url,
    alt: "Fachada da Fino Trato Barbearia à noite, com o letreiro iluminado",
    label: "Nossa fachada",
    width: 1360,
    height: 907,
  },
  entrancePhoto,
  {
    src: "/images/equipe-salao.webp",
    alt: "Equipe da Fino Trato reunida no salão, ao lado de clientes sentados nas cadeiras",
    label: "Nossa equipe",
    width: 1600,
    height: 1200,
  },
];

/** Seção "Experiência Fino Trato" da home: o salão em destaque e um atendimento por cima. */
export const experiencePhotos = {
  space: entrancePhoto,
  service: {
    src: "/images/atendimento-barba.webp",
    alt: "Barbeiro da Fino Trato sorrindo enquanto apara a barba de um cliente",
    label: "Barba completa",
    width: 900,
    height: 1199,
  },
} satisfies Record<string, Photo>;

/** Foto 4:5 de um corte, recortada de dentro da moldura dos posts #EstiloFinoTrato. */
const cut = (id: string, label: string, alt: string): Photo => ({
  src: `/images/cortes/corte-${id}.webp`,
  alt: `${alt}, feito na Fino Trato`,
  label,
  width: 830,
  height: 1038,
});

/** Cortes recentes do Instagram. Os quatro primeiros aparecem na home; a galeria mostra todos. */
export const workPhotos: Photo[] = [
  cut("40", "Degradê com risco", "Cliente com degradê e risco em forma de raio na lateral"),
  cut("47", "Degradê", "Cliente com degradê nas laterais e cabelo penteado para cima"),
  cut("44", "Corte + barba", "Cliente com corte curto e barba desenhada"),
  cut("37", "Corte texturizado", "Cliente com franja texturizada e laterais baixas"),
  cut("23", "Degradê", "Cliente com degradê nas laterais e topo curto"),
  cut("27", "Degradê", "Cliente com degradê bem baixo nas laterais"),
  cut("43", "Degradê + penteado", "Cliente com degradê e topo penteado para o lado"),
  cut("31", "Corte com volume", "Cliente com volume no topo e laterais aparadas"),
  cut("26", "Corte social", "Cliente com corte social curto"),
  cut("38", "Corte + barba", "Cliente com laterais curtas e barba aparada"),
  cut("46", "Corte + barba", "Cliente sorrindo, com corte curto e barba rente"),
  cut("30", "Corte social", "Cliente com corte social e barba rente"),
  cut("35", "Corte social", "Cliente grisalho com corte social penteado"),
];

export const featuredWorkPhotos = workPhotos.slice(0, 4);

const inauguration = (n: number, label: string, alt: string): Photo => ({
  src: `/images/inauguracao/inauguracao-${n}.webp`,
  alt,
  label,
  width: 1280,
  height: 853,
});

/** Festa de inauguração da barbearia. */
export const inaugurationPhotos: Photo[] = [
  inauguration(
    1,
    "Noite de inauguração",
    "Fachada da Fino Trato iluminada na noite de inauguração, com convidados na calçada",
  ),
  inauguration(2, "Música ao vivo", "Músicos tocando e cantando na inauguração da Fino Trato"),
  inauguration(3, "Casa cheia", "Convidados dentro da barbearia acompanhando a roda de música"),
  inauguration(4, "Chope", "Casal servindo chope na chopeira durante a inauguração"),
  inauguration(5, "Cavaquinho", "Cavaquinho sendo tocado na roda de música da inauguração"),
  inauguration(6, "Brinde", "Convidado sorrindo ao lado da chopeira com um copo de chope"),
  inauguration(7, "Chope", "Convidada servindo chope na chopeira da barbearia"),
  inauguration(8, "Chope", "Convidado servindo chope durante a inauguração"),
];

/** Fotos descontraídas do Instagram (capas de reels 9:16); a legenda já vem escrita na foto. */
export const instagramPosts: Photo[] = [
  {
    src: "/images/instagram/dia-a-dia-20.webp",
    alt: "Cliente na cadeira da Fino Trato, com a legenda “Vou pedir ela em casamento”",
    label: "Resenha na cadeira",
    width: 640,
    height: 1136,
  },
  {
    src: "/images/instagram/dia-a-dia-24.webp",
    alt: "Barbeiro da Fino Trato com a toalha na mão, com a legenda “Tá precisando daquele corte?”",
    label: "Tá precisando daquele corte?",
    width: 640,
    height: 1136,
  },
  {
    src: "/images/instagram/dia-a-dia-28.webp",
    alt: "Fachada da Fino Trato durante o dia, com a legenda “Já passei na frente mas nunca entrei”",
    label: "Já passei na frente",
    width: 640,
    height: 1136,
  },
  {
    src: "/images/instagram/dia-a-dia-32.webp",
    alt: "Salão da Fino Trato visto por trás do guidão da moto em exposição, com um barbeiro atendendo",
    label: "Por dentro",
    width: 640,
    height: 1136,
  },
  {
    src: "/images/instagram/dia-a-dia-36.webp",
    alt: "Mensagem “E aí mano, sabe me dizer onde tem uma barbearia top no Canedo?” sobre um corte desfocado",
    label: "Barbearia top no Canedo",
    width: 720,
    height: 1280,
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
