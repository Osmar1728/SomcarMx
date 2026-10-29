import type { Locale } from "./router";

export interface FichaDatos {
  nombre: string;
  resumen: string;
}

export interface Ficha {
  slug: string;
  datos: Record<Locale, FichaDatos>;
}

export const FICHAS: Ficha[] = [
  {
    slug: "renta-de-autos",
    datos: {
      es: {
        nombre: "Renta de autos",
        resumen: "Compactos, sedanes y vans en perfectas condiciones, sanitizadas y con seguro incluido. Desde $750 por día, sin tarjeta de crédito ni depósito.",
      },
      en: {
        nombre: "Car rental",
        resumen: "Compacts, sedans and vans in top condition, sanitized and with insurance included. From $750 MXN per day, no credit card or deposit.",
      },
      it: {
        nombre: "Noleggio auto",
        resumen: "Compatte, berline e van in perfette condizioni, sanificate e con assicurazione inclusa. Da $750 MXN al giorno, senza carta di credito né deposito.",
      },
    },
  },
  {
    slug: "shuttle",
    datos: {
      es: {
        nombre: "Shuttle / Transportación",
        resumen: "Traslados aeropuerto-hotel en Cancún y la Riviera Maya, con asistencia 24/7 durante tu viaje.",
      },
      en: {
        nombre: "Shuttle / Transportation",
        resumen: "Airport-hotel transfers in Cancun and the Riviera Maya, with 24/7 assistance during your trip.",
      },
      it: {
        nombre: "Navetta / Trasporti",
        resumen: "Trasferimenti aeroporto-hotel a Cancún e in Riviera Maya, con assistenza 24/7 durante il viaggio.",
      },
    },
  },
];

export function getFicha(slug: string | undefined): Ficha | undefined {
  return FICHAS.find((f) => f.slug === slug);
}
