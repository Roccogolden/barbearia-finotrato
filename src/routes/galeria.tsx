import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";
import facadeAsset from "@/assets/fachada-real.webp.asset.json";
import interiorAsset from "@/assets/interior-real.webp.asset.json";
import serviceInteriorAsset from "@/assets/interior-atendimento.jpg.asset.json";
import fadeAsset from "@/assets/degrade-baixo.jpg.asset.json";
import fadePortraitAsset from "@/assets/corte-degrade.jpg.asset.json";
import socialCutAsset from "@/assets/corte-social.jpg.asset.json";
import beardCutAsset from "@/assets/corte-barba.jpg.asset.json";
import identityAsset from "@/assets/identidade-fino-trato.jpg.asset.json";
import hoursAsset from "@/assets/horario-endereco.jpg.asset.json";
import servicesAsset from "@/assets/servicos-fino-trato.jpg.asset.json";
import beardCampaignAsset from "@/assets/barba-campanha.jpg.asset.json";
import specialHoursAsset from "@/assets/horario-especial.jpg.asset.json";

const spaces = [
  { src: facadeAsset.url, alt: "Fachada da Fino Trato Barbearia à noite", label: "Nossa fachada", wide: true, parallax: true },
  { src: interiorAsset.url, alt: "Interior da Fino Trato com cadeiras e lavatório", label: "Nosso espaço", wide: true, parallax: true },
  { src: serviceInteriorAsset.url, alt: "Atendimento acontecendo no interior da Fino Trato", label: "Em atendimento", wide: false },
];
const results = [
  { src: fadeAsset.url, alt: "Cliente com corte degradê baixo", label: "Degradê baixo" },
  { src: fadePortraitAsset.url, alt: "Cliente com degradê e acabamento natural", label: "Degradê + acabamento" },
  { src: socialCutAsset.url, alt: "Cliente com corte social e barba alinhada", label: "Corte social" },
  { src: beardCutAsset.url, alt: "Cliente com cabelo e barba alinhados", label: "Corte + barba" },
];
const instagramPosts = [
  { src: identityAsset.url, alt: "Publicação com a identidade visual Fino Trato", label: "Identidade Fino Trato" },
  { src: hoursAsset.url, alt: "Publicação com horário e endereço da barbearia", label: "Horário e endereço" },
  { src: servicesAsset.url, alt: "Publicação com os serviços da Fino Trato", label: "Nossos serviços" },
  { src: beardCampaignAsset.url, alt: "Publicação da Fino Trato sobre cuidados com a barba", label: "Cuidados com a barba" },
  { src: specialHoursAsset.url, alt: "Publicação de horário especial de fim de ano", label: "Comunicado especial" },
];
export const Route=createFileRoute("/galeria")({head:()=>({meta:[{title:"Galeria de cortes — Fino Trato Barbearia"},{name:"description",content:"Veja cortes, barbas e acabamentos realizados pela equipe Fino Trato Barbearia."},{property:"og:title",content:"Galeria de cortes — Fino Trato Barbearia"},{property:"og:description",content:"Trabalhos recentes e referências para seu próximo visual."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:GalleryPage});
function GalleryFigure({src,alt,label,wide=false,parallax=false}:{src:string;alt:string;label:string;wide?:boolean;parallax?:boolean}){const parallaxRef=useParallax<HTMLImageElement>(0.08,30);return <figure className={wide?"group overflow-hidden md:col-span-2":"group overflow-hidden"}><div className={wide?"aspect-[4/3] sm:aspect-[16/9]":"aspect-[4/5]"}><img ref={parallax?parallaxRef:undefined} src={src} alt={alt} width={wide?1400:800} height={wide?788:1000} loading="lazy" className={cn("h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]",parallax&&"scale-110 will-change-transform")}/></div><figcaption className="border-x border-b border-border bg-background px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</figcaption></figure>}
function GalleryPage(){return <><PageHero eyebrow="Portfólio real" title="Nosso espaço. Nosso trabalho." description="Fotos reais da Fino Trato, organizadas entre o ambiente, resultados de clientes e publicações do Instagram."/><section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><p className="eyebrow">A barbearia</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Por dentro da Fino Trato.</h2></Reveal><div className="mt-9 grid gap-4 md:grid-cols-2">{spaces.map((item,index)=><Reveal key={item.label} delay={index*100}><GalleryFigure {...item}/></Reveal>)}</div></div></section><section className="bg-muted py-14 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><p className="eyebrow">Resultados reais</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Cortes feitos por aqui.</h2></Reveal><div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{results.map((item,index)=><Reveal key={item.label} delay={index*80}><GalleryFigure {...item}/></Reveal>)}</div></div></section><section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><Reveal><p className="eyebrow">@barbeariafinotrato</p><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Do nosso Instagram.</h2><a href="https://www.instagram.com/barbeariafinotrato/" target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">Ver perfil oficial</a></div></Reveal><div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">{instagramPosts.map((item,index)=><Reveal key={item.label} delay={index*80}><GalleryFigure {...item}/></Reveal>)}</div><div className="mt-14 flex justify-center"><Button asChild size="lg"><Link to="/agendamento">Quero renovar o visual <ArrowRight/></Link></Button></div></div></section></>}