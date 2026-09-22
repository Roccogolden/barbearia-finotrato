import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { galleryBase } from "@/lib/barbershop-data";
import cropImage from "@/assets/gallery-crop.jpg";
import classicImage from "@/assets/gallery-classic.jpg";
import beardImage from "@/assets/beard-service.jpg";
import facadeAsset from "@/assets/fachada-real.webp.asset.json";
import interiorAsset from "@/assets/interior-real.webp.asset.json";

const work = [
  { src: facadeAsset.url, alt: "Fachada real da barbearia à noite", label: "Nossa fachada", portrait: false },
  { src: interiorAsset.url, alt: "Interior real da barbearia com cadeiras e lavatório", label: "Nosso espaço", portrait: false },
  { src: cropImage, alt: "Corte texturizado com degradê baixo", label: "Textura + low fade", portrait: true },
  { src: classicImage, alt: "Corte clássico penteado para trás", label: "Clássico + taper", portrait: false },
  { ...galleryBase[0], portrait: false },
  { ...galleryBase[1], portrait: false },
  { src: beardImage, alt: "Acabamento preciso de barba", label: "Barba + contorno", portrait: true },
];
export const Route=createFileRoute("/galeria")({head:()=>({meta:[{title:"Galeria de cortes — Fino Trato Barbearia"},{name:"description",content:"Veja cortes, barbas e acabamentos realizados pela equipe Fino Trato Barbearia."},{property:"og:title",content:"Galeria de cortes — Fino Trato Barbearia"},{property:"og:description",content:"Trabalhos recentes e referências para seu próximo visual."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:GalleryPage});
function GalleryPage(){return <><PageHero eyebrow="Portfólio" title="Nosso espaço. Nosso trabalho." description="Conheça o ambiente real da barbearia e uma seleção de cortes, texturas e barbas."/><section className="py-12 sm:py-20"><div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:px-10">{work.map((item,index)=><figure key={`${item.label}-${index}`} className={item.portrait ? "group overflow-hidden md:row-span-2" : "group overflow-hidden"}><div className={item.portrait ? "aspect-[4/5]" : "aspect-[4/3]"}><img src={item.src} alt={item.alt} width={1200} height={item.portrait?1500:900} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"/></div><figcaption className="border-x border-b border-border bg-background px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</figcaption></figure>)}</div><div className="mt-14 flex justify-center"><Button asChild size="lg"><Link to="/agendamento">Quero renovar o visual <ArrowRight/></Link></Button></div></section></>}