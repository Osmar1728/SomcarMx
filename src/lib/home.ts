import type { Locale } from "./router";

export interface Bloque {
  titulo: string;
  texto: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface HomeContent {
  kicker: string;
  heroSub: string;
  ctaBook: string;
  ctaServices: string;
  price: string;
  priceNote: string;
  stats: Bloque[];
  benefitsTitle: string;
  benefitsSub: string;
  benefits: Bloque[];
  servicesTitle: string;
  servicesSub: string;
  stepsTitle: string;
  steps: Bloque[];
  promoTitle: string;
  promoText: string;
  destTitle: string;
  destSub: string;
  dests: string[];
  testiTitle: string;
  testiSub: string;
  faqTitle: string;
  faqs: Faq[];
  contactTitle: string;
  contactSub: string;
}

export const WHATSAPP_URL = "https://wa.me/529981684805";
export const PHONE_LABEL = "+52 998 168 4805";
export const EMAIL = "contacto@somcar.mx";

export const HOME: Record<Locale, HomeContent> = {
  es: {
    kicker: "Soluciones Móviles del Caribe",
    heroSub: "Desde $750 al día. Sin tarjeta de crédito ni depósito, kilometraje ilimitado y atención 24/7.",
    ctaBook: "Reservar por WhatsApp",
    ctaServices: "Ver servicios",
    price: "Desde $750",
    priceNote: "MXN por día, todo incluido",
    stats: [
      { titulo: "24/7", texto: "Entrega y asistencia" },
      { titulo: "Ilimitado", texto: "Kilometraje libre" },
      { titulo: "0", texto: "Tarjeta o depósito" },
    ],
    benefitsTitle: "Rentar nunca fue tan fácil",
    benefitsSub: "Todo incluido, sin letras chicas.",
    benefits: [
      { titulo: "Todo incluido", texto: "Impuestos y seguros incluidos en el precio. Sin cargos sorpresa." },
      { titulo: "Kilometraje ilimitado", texto: "De Cancún a Tulum sin límite de kilómetros." },
      { titulo: "Entrega 24/7", texto: "Recoge y devuelve cualquier día, a cualquier hora." },
      { titulo: "Sin tarjeta de crédito", texto: "Sin depósito en garantía. Paga como prefieras." },
    ],
    servicesTitle: "Nuestros servicios",
    servicesSub: "Autos y traslados en el Caribe Mexicano.",
    stepsTitle: "Reserva en 4 pasos",
    steps: [
      { titulo: "Reserva en línea", texto: "Elige fechas y auto por WhatsApp o formulario." },
      { titulo: "Recoge donde quieras", texto: "Aeropuerto, Cancún o Playa del Carmen, 24/7." },
      { titulo: "Maneja sin límites", texto: "Km ilimitado, seguro incluido y asistencia 24/7." },
      { titulo: "Devuelve fácil", texto: "Entrégalo en el punto que prefieras." },
    ],
    promoTitle: "Renta 7 días y el 8vo va por nuestra cuenta",
    promoText: "En la renta de autos por semana, el octavo día es gratis.",
    destTitle: "¿A dónde quieres ir?",
    destSub: "Todo el Caribe a tu ritmo.",
    dests: ["Cancún", "Playa del Carmen", "Puerto Morelos", "Akumal", "Tulum", "Aeropuerto CUN"],
    testiTitle: "Lo que dicen nuestros clientes",
    testiSub: "Más de 85 recomendaciones positivas en Facebook.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesito tarjeta de crédito?", a: "No. Rentamos sin tarjeta de crédito ni depósito en garantía." },
      { q: "¿El precio incluye seguro?", a: "Sí. Impuestos y seguros ya van incluidos en el precio." },
      { q: "¿Hay límite de kilometraje?", a: "No. Todas las rentas incluyen kilometraje ilimitado." },
      { q: "¿Dónde recojo y devuelvo el auto?", a: "En Cancún, Playa del Carmen o el aeropuerto, las 24 horas." },
      { q: "¿Aceptan mascotas?", a: "Sí. Pregunta por nuestras unidades Pet Friendly." },
      { q: "¿Cómo reservo?", a: "Por WhatsApp o con el formulario de contacto. Te confirmamos de inmediato." },
    ],
    contactTitle: "Reserva tu auto hoy",
    contactSub: "Atención 24/7, todos los días.",
  },
  en: {
    kicker: "Soluciones Móviles del Caribe",
    heroSub: "From $750 MXN per day. No credit card or deposit, unlimited mileage and 24/7 support.",
    ctaBook: "Book on WhatsApp",
    ctaServices: "See services",
    price: "From $750",
    priceNote: "MXN per day, all-inclusive",
    stats: [
      { titulo: "24/7", texto: "Delivery & assistance" },
      { titulo: "Unlimited", texto: "Free mileage" },
      { titulo: "0", texto: "Card or deposit" },
    ],
    benefitsTitle: "Renting has never been this easy",
    benefitsSub: "All-inclusive, no fine print.",
    benefits: [
      { titulo: "All-inclusive", texto: "Taxes and insurance included. No surprise charges." },
      { titulo: "Unlimited mileage", texto: "From Cancun to Tulum with no mileage cap." },
      { titulo: "24/7 delivery", texto: "Pick up and return any day, any time." },
      { titulo: "No credit card", texto: "No security deposit. Pay your way." },
    ],
    servicesTitle: "Our services",
    servicesSub: "Cars and transfers in the Mexican Caribbean.",
    stepsTitle: "Book in 4 steps",
    steps: [
      { titulo: "Book online", texto: "Pick dates and car via WhatsApp or form." },
      { titulo: "Pick up anywhere", texto: "Airport, Cancun or Playa del Carmen, 24/7." },
      { titulo: "Drive freely", texto: "Unlimited mileage, insurance and 24/7 assistance." },
      { titulo: "Easy return", texto: "Drop it off wherever suits you." },
    ],
    promoTitle: "Rent 7 days and the 8th is on us",
    promoText: "On weekly rentals, the eighth day is free.",
    destTitle: "Where do you want to go?",
    destSub: "The whole Caribbean at your pace.",
    dests: ["Cancun", "Playa del Carmen", "Puerto Morelos", "Akumal", "Tulum", "CUN Airport"],
    testiTitle: "What our customers say",
    testiSub: "85+ positive recommendations on Facebook.",
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Do I need a credit card?", a: "No. We rent with no credit card or security deposit." },
      { q: "Does the price include insurance?", a: "Yes. Taxes and insurance are already included." },
      { q: "Is there a mileage limit?", a: "No. All rentals include unlimited mileage." },
      { q: "Where do I pick up and return?", a: "In Cancun, Playa del Carmen or the airport, 24 hours." },
      { q: "Are pets allowed?", a: "Yes. Ask for our Pet Friendly units." },
      { q: "How do I book?", a: "Via WhatsApp or the contact form. We confirm right away." },
    ],
    contactTitle: "Book your car today",
    contactSub: "24/7 support, every day.",
  },
  it: {
    kicker: "Soluciones Móviles del Caribe",
    heroSub: "Da $750 MXN al giorno. Senza carta di credito né deposito, chilometraggio illimitato e assistenza 24/7.",
    ctaBook: "Prenota su WhatsApp",
    ctaServices: "Vedi i servizi",
    price: "Da $750",
    priceNote: "MXN al giorno, tutto incluso",
    stats: [
      { titulo: "24/7", texto: "Consegna e assistenza" },
      { titulo: "Illimitato", texto: "Chilometraggio libero" },
      { titulo: "0", texto: "Carta o deposito" },
    ],
    benefitsTitle: "Noleggiare non è mai stato così facile",
    benefitsSub: "Tutto incluso, senza clausole nascoste.",
    benefits: [
      { titulo: "Tutto incluso", texto: "Tasse e assicurazione incluse. Nessun costo a sorpresa." },
      { titulo: "Chilometraggio illimitato", texto: "Da Cancún a Tulum senza limiti di chilometri." },
      { titulo: "Consegna 24/7", texto: "Ritira e riconsegna qualsiasi giorno, a qualsiasi ora." },
      { titulo: "Senza carta di credito", texto: "Nessun deposito cauzionale. Paga come preferisci." },
    ],
    servicesTitle: "I nostri servizi",
    servicesSub: "Auto e trasferimenti nei Caraibi messicani.",
    stepsTitle: "Prenota in 4 passi",
    steps: [
      { titulo: "Prenota online", texto: "Scegli date e auto via WhatsApp o modulo." },
      { titulo: "Ritira dove vuoi", texto: "Aeroporto, Cancún o Playa del Carmen, 24/7." },
      { titulo: "Guida libera", texto: "Chilometri illimitati, assicurazione e assistenza 24/7." },
      { titulo: "Riconsegna facile", texto: "Riconsegnala dove preferisci." },
    ],
    promoTitle: "Noleggia 7 giorni e l'8° è in omaggio",
    promoText: "Nei noleggi settimanali, l'ottavo giorno è gratis.",
    destTitle: "Dove vuoi andare?",
    destSub: "Tutti i Caraibi al tuo ritmo.",
    dests: ["Cancún", "Playa del Carmen", "Puerto Morelos", "Akumal", "Tulum", "Aeroporto CUN"],
    testiTitle: "Dicono di noi",
    testiSub: "Oltre 85 recensioni positive su Facebook.",
    faqTitle: "Domande frequenti",
    faqs: [
      { q: "Serve la carta di credito?", a: "No. Noleggiamo senza carta di credito né deposito cauzionale." },
      { q: "Il prezzo include l'assicurazione?", a: "Sì. Tasse e assicurazione sono già incluse." },
      { q: "C'è un limite di chilometraggio?", a: "No. Tutti i noleggi includono chilometraggio illimitato." },
      { q: "Dove ritiro e riconsegno?", a: "A Cancún, Playa del Carmen o in aeroporto, 24 ore su 24." },
      { q: "Gli animali sono ammessi?", a: "Sì. Chiedi delle nostre unità Pet Friendly." },
      { q: "Come prenoto?", a: "Via WhatsApp o con il modulo di contatto. Confermiamo subito." },
    ],
    contactTitle: "Prenota la tua auto oggi",
    contactSub: "Assistenza 24/7, tutti i giorni.",
  },
};

// Testimonios reales de la web (se conservan en español original en los 3 idiomas).
export const TESTIMONIOS = [
  { nombre: "Paola López", texto: "Excelente servicio, siempre están pendientes de ti y el tiempo de respuesta es súper rápido. La mejor opción que encontramos." },
  { nombre: "Diego Tobon", texto: "Excelente servicio. Lo recomiendo por honestidad, seriedad, comodidad y precio. Si vuelvo a Cancún son mi mejor opción." },
  { nombre: "Cesar Silva Ontiveros", texto: "Los requisitos son mínimos, los precios accesibles y el trato 100% confiable." },
];
