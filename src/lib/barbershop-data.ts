import heroImage from "@/assets/barbershop-hero.jpg";
import beardImage from "@/assets/beard-service.jpg";
import rafaelImage from "@/assets/barber-rafael.jpg";
import mateusImage from "@/assets/barber-mateus.jpg";
import andreImage from "@/assets/barber-andre.jpg";

export const brand = {
  name: "Fino Trato Barbearia",
  phone: "(62) 99464-1575",
  phoneHref: "tel:+5562994641575",
  email: "contato@finotrato.com.br",
  address: "R. Esperança, Qd. 27, Lote 03, Sala 02 — Vila Santa Rosa, Senador Canedo — GO, 75250-000",
  arrivalTime: "15 min",
  hours: "Seg–Sáb, 8h–20h · Domingo fechado",
  heroImage,
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
  { name: "Rafael Lima", role: "Fundador · Cortes clássicos", image: rafaelImage, bio: "Há 12 anos traduz personalidade em cortes precisos e atemporais." },
  { name: "Mateus Rocha", role: "Barbeiro · Fades e textura", image: mateusImage, bio: "Especialista em degradês limpos, texturas e visuais contemporâneos." },
  { name: "André Martins", role: "Barbeiro · Barbas", image: andreImage, bio: "Domina o ritual da navalha e o desenho de barba sob medida." },
];

export const galleryBase = [
  { src: beardImage, alt: "Barbeiro desenhando uma barba com navalha", label: "Barba desenhada" },
  { src: heroImage, alt: "Corte masculino sendo finalizado na barbearia", label: "Clássico contemporâneo" },
  { src: rafaelImage, alt: "Profissional da equipe Fino Trato Barbearia", label: "Precisão em cada detalhe" },
];

export const testimonials = [
  { quote: "O atendimento é pontual, o ambiente é impecável e o corte fica exatamente como eu imagino.", name: "Bruno S.", detail: "Cliente há 3 anos" },
  { quote: "Não é só cortar o cabelo. Eles entendem seu estilo e explicam como manter o resultado em casa.", name: "Caio M.", detail: "Avaliação demonstrativa" },
  { quote: "Profissionais cuidadosos e uma experiência tranquila do começo ao fim. Virei cliente na primeira visita.", name: "Felipe R.", detail: "Avaliação demonstrativa" },
];