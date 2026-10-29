import type { MouseEvent, ReactNode } from "react";
import { LOCALES, href, localize, navigate, usePageMeta, useRoute, type Locale, type Page } from "./lib/router";

const UI: Record<Locale, { nav: { page: Page; label: string }[]; homeBody: string; contactCta: string; contactoBody: string; legalBody: string; notFoundBody: string; backTo: string; inicio: string }> = {
  es: {
    nav: [
      { page: "home", label: "Inicio" },
      { page: "contacto", label: "Contacto" },
      { page: "terminos", label: "Términos" },
      { page: "privacidad", label: "Privacidad" },
    ],
    homeBody: "Página de inicio. Reemplaza este contenido con el real.",
    contactCta: "Contáctanos",
    contactoBody: "Agrega aquí tu formulario o datos de contacto.",
    legalBody: "Publica aquí el texto legal correspondiente.",
    notFoundBody: "Vuelve al",
    backTo: "inicio",
    inicio: "inicio",
  },
  en: {
    nav: [
      { page: "home", label: "Home" },
      { page: "contacto", label: "Contact" },
      { page: "terminos", label: "Terms" },
      { page: "privacidad", label: "Privacy" },
    ],
    homeBody: "Home page. Replace this content with the real one.",
    contactCta: "Contact us",
    contactoBody: "Add your contact form or contact details here.",
    legalBody: "Publish the corresponding legal text here.",
    notFoundBody: "Back to the",
    backTo: "home page",
    inicio: "home page",
  },
  it: {
    nav: [
      { page: "home", label: "Home" },
      { page: "contacto", label: "Contatti" },
      { page: "terminos", label: "Termini" },
      { page: "privacidad", label: "Privacy" },
    ],
    homeBody: "Pagina iniziale. Sostituisci questo contenuto con quello reale.",
    contactCta: "Contattaci",
    contactoBody: "Aggiungi qui il modulo o i dati di contatto.",
    legalBody: "Pubblica qui il testo legale corrispondente.",
    notFoundBody: "Torna alla",
    backTo: "home page",
    inicio: "home page",
  },
};

const H1: Record<Locale, Record<Page, string>> = {
  es: { home: "SOMCAR", contacto: "Contacto", terminos: "Términos y condiciones", privacidad: "Aviso de privacidad" },
  en: { home: "SOMCAR", contacto: "Contact", terminos: "Terms and conditions", privacidad: "Privacy notice" },
  it: { home: "SOMCAR", contacto: "Contatti", terminos: "Termini e condizioni", privacidad: "Informativa sulla privacy" },
};

function Link({ page, children }: { page: Page; children: ReactNode }) {
  const { locale } = useRoute();
  const to = localize(page, locale);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href(to)} onClick={onClick} className="underline">
      {children}
    </a>
  );
}

function Shell({ page, locale, children }: { page: Page; locale: Locale; children: ReactNode }) {
  const t = UI[locale];
  const switchPage: Page = page;
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <nav className="mb-8 flex flex-wrap gap-4 text-sm">
        {t.nav.map((n) => (
          <Link key={n.page} page={n.page}>
            {n.label}
          </Link>
        ))}
        <span className="ml-auto flex gap-2" aria-label="Language">
          {LOCALES.map((l) => (
            <a
              key={l}
              href={href(localize(switchPage, l))}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                navigate(localize(switchPage, l));
              }}
              aria-current={l === locale ? "true" : undefined}
              className={l === locale ? "font-semibold" : "underline"}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </span>
      </nav>
      <main>
        <h1 className="text-3xl font-semibold">{H1[locale][page]}</h1>
        {children}
      </main>
    </div>
  );
}

function Home({ locale }: { locale: Locale }) {
  usePageMeta("home", locale);
  const t = UI[locale];
  return (
    <Shell page="home" locale={locale}>
      <p className="mt-4">{t.homeBody}</p>
      <p className="mt-2">
        <Link page="contacto">{t.contactCta}</Link>
      </p>
    </Shell>
  );
}

function Contacto({ locale }: { locale: Locale }) {
  usePageMeta("contacto", locale);
  return (
    <Shell page="contacto" locale={locale}>
      <p className="mt-4">{UI[locale].contactoBody}</p>
    </Shell>
  );
}

function Legal({ name, locale }: { name: "terminos" | "privacidad"; locale: Locale }) {
  usePageMeta(name, locale);
  return (
    <Shell page={name} locale={locale}>
      <p className="mt-4">{UI[locale].legalBody}</p>
    </Shell>
  );
}

function NotFound({ locale }: { locale: Locale }) {
  usePageMeta("notfound", locale);
  const t = UI[locale];
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <main>
        <h1 className="text-3xl font-semibold">{PAGE_NOT_FOUND[locale]}</h1>
        <p className="mt-4">
          {t.notFoundBody} <Link page="home">{t.backTo}</Link>.
        </p>
      </main>
    </div>
  );
}

const PAGE_NOT_FOUND: Record<Locale, string> = {
  es: "Página no encontrada",
  en: "Page not found",
  it: "Pagina non trovata",
};

export default function App() {
  const route = useRoute();
  switch (route.name) {
    case "home":
      return <Home locale={route.locale} />;
    case "contacto":
      return <Contacto locale={route.locale} />;
    case "terminos":
      return <Legal name="terminos" locale={route.locale} />;
    case "privacidad":
      return <Legal name="privacidad" locale={route.locale} />;
    default:
      return <NotFound locale={route.locale} />;
  }
}
