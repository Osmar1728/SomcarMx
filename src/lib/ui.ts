import type { Locale, StaticPage } from "./router";

interface UiStrings {
  nav: { page: StaticPage; label: string }[];
  contactoTitle: string;
  contactoBody: string;
  serviciosTitle: string;
  terminosTitle: string;
  privacidadTitle: string;
  legalBody: string;
  contactCta: string;
  notFoundBody: string;
  backTo: string;
}

export const UI: Record<Locale, UiStrings> = {
  es: {
    nav: [
      { page: "home", label: "Inicio" },
      { page: "servicios", label: "Servicios" },
      { page: "contacto", label: "Contacto" },
      { page: "terminos", label: "Términos" },
      { page: "privacidad", label: "Privacidad" },
    ],
    contactoTitle: "Contacto",
    contactoBody: "Agrega aquí tu formulario o datos de contacto.",
    serviciosTitle: "Servicios",
    terminosTitle: "Términos y condiciones",
    privacidadTitle: "Aviso de privacidad",
    legalBody: "Publica aquí el texto legal correspondiente.",
    contactCta: "Contáctanos",
    notFoundBody: "Vuelve al",
    backTo: "inicio",
  },
  en: {
    nav: [
      { page: "home", label: "Home" },
      { page: "servicios", label: "Services" },
      { page: "contacto", label: "Contact" },
      { page: "terminos", label: "Terms" },
      { page: "privacidad", label: "Privacy" },
    ],
    contactoTitle: "Contact",
    contactoBody: "Add your contact form or contact details here.",
    serviciosTitle: "Services",
    terminosTitle: "Terms and conditions",
    privacidadTitle: "Privacy notice",
    legalBody: "Publish the corresponding legal text here.",
    contactCta: "Contact us",
    notFoundBody: "Back to the",
    backTo: "home page",
  },
  it: {
    nav: [
      { page: "home", label: "Home" },
      { page: "servicios", label: "Servizi" },
      { page: "contacto", label: "Contatti" },
      { page: "terminos", label: "Termini" },
      { page: "privacidad", label: "Privacy" },
    ],
    contactoTitle: "Contatti",
    contactoBody: "Aggiungi qui il modulo o i dati di contatto.",
    serviciosTitle: "Servizi",
    terminosTitle: "Termini e condizioni",
    privacidadTitle: "Informativa sulla privacy",
    legalBody: "Pubblica qui il testo legale corrispondente.",
    contactCta: "Contattaci",
    notFoundBody: "Torna alla",
    backTo: "home page",
  },
};
