import type { Locale } from "./router";

export interface FichaDatos {
  nombre: string;
  resumen: string;
}

export interface Ficha {
  slug: string;
  datos: Record<Locale, FichaDatos>;
}

// shortcut: sección de ejemplo. Renombra la base "/servicios" en router.ts y sustituye estas fichas por las reales.
export const FICHAS: Ficha[] = [
  {
    slug: "ejemplo-de-servicio-1",
    datos: {
      es: { nombre: "Servicio de ejemplo 1", resumen: "Resumen del servicio de ejemplo 1. Sustitúyelo por el real." },
      en: { nombre: "Sample service 1", resumen: "Sample service 1 summary. Replace it with the real one." },
      it: { nombre: "Servizio di esempio 1", resumen: "Riepilogo del servizio di esempio 1. Sostituiscilo con quello reale." },
    },
  },
  {
    slug: "ejemplo-de-servicio-2",
    datos: {
      es: { nombre: "Servicio de ejemplo 2", resumen: "Resumen del servicio de ejemplo 2. Sustitúyelo por el real." },
      en: { nombre: "Sample service 2", resumen: "Sample service 2 summary. Replace it with the real one." },
      it: { nombre: "Servizio di esempio 2", resumen: "Riepilogo del servizio di esempio 2. Sostituiscilo con quello reale." },
    },
  },
];

export function getFicha(slug: string | undefined): Ficha | undefined {
  return FICHAS.find((f) => f.slug === slug);
}
