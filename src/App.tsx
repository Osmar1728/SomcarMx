import type { MouseEvent, ReactNode } from "react";
import { LOCALES, href, localize, navigate, usePageMeta, useRoute, type Locale, type StaticPage } from "./lib/router";
import { FICHAS, getFicha } from "./lib/fichas";

const UI: Record<Locale, { nav: { page: StaticPage; label: string }[]; homeBody: string; contactCta: string; contactoBody: string; legalBody: string; notFoundBody: string; backTo: string }> = {
  es: {
    nav: [
      { page: "home", label: "Inicio" },
      { page: "servicios", label: "Servicios" },
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
  },
  en: {
    nav: [
      { page: "home", label: "Home" },
      { page: "servicios", label: "Services" },
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
  },
  it: {
    nav: [
      { page: "home", label: "Home" },
      { page: "servicios", label: "Servizi" },
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
  },
};

const H1: Record<Locale, Record<StaticPage, string>> = {
  es: { home: "SOMCAR", contacto: "Contacto", servicios: "Servicios", terminos: "Términos y condiciones", privacidad: "Aviso de privacidad" },
  en: { home: "SOMCAR", contacto: "Contact", servicios: "Services", terminos: "Terms and conditions", privacidad: "Privacy notice" },
  it: { home: "SOMCAR", contacto: "Contatti", servicios: "Servizi", terminos: "Termini e condizioni", privacidad: "Informativa sulla privacy" },
};

function Link({ to, children }: { to: string; children: ReactNode }) {
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

function Shell({ title, locale, switchPath, children }: { title: string; locale: Locale; switchPath: (l: Locale) => string; children: ReactNode }) {
  const t = UI[locale];
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <nav className="mb-8 flex flex-wrap gap-4 text-sm">
        {t.nav.map((n) => (
          <Link key={n.page} to={localize(n.page, locale)}>
            {n.label}
          </Link>
        ))}
        <span className="ml-auto flex gap-2" aria-label="Language">
          {LOCALES.map((l) => (
            <Link key={l} to={switchPath(l)}>
              <span className={l === locale ? "font-semibold" : ""}>{l.toUpperCase()}</span>
            </Link>
          ))}
        </span>
      </nav>
      <main>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {children}
      </main>
    </div>
  );
}

function Home({ locale }: { locale: Locale }) {
  usePageMeta("home", locale);
  const t = UI[locale];
  return (
    <Shell title={H1[locale].home} locale={locale} switchPath={(l) => localize("home", l)}>
      <p className="mt-4">{t.homeBody}</p>
      <p className="mt-2">
        <Link to={localize("contacto", locale)}>{t.contactCta}</Link>
      </p>
    </Shell>
  );
}

function Contacto({ locale }: { locale: Locale }) {
  usePageMeta("contacto", locale);
  return (
    <Shell title={H1[locale].contacto} locale={locale} switchPath={(l) => localize("contacto", l)}>
      <p className="mt-4">{UI[locale].contactoBody}</p>
    </Shell>
  );
}

function Servicios({ locale }: { locale: Locale }) {
  usePageMeta("servicios", locale);
  return (
    <Shell title={H1[locale].servicios} locale={locale} switchPath={(l) => localize("servicios", l)}>
      <ul className="mt-4 space-y-2">
        {FICHAS.map((f) => (
          <li key={f.slug}>
            <Link to={localize("ficha", locale, f.slug)}>{f.datos[locale].nombre}</Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Ficha({ locale, slug }: { locale: Locale; slug: string }) {
  usePageMeta("ficha", locale, slug);
  const f = getFicha(slug);
  if (!f) return <NotFound locale={locale} />;
  return (
    <Shell title={f.datos[locale].nombre} locale={locale} switchPath={(l) => localize("ficha", l, slug)}>
      <p className="mt-4">{f.datos[locale].resumen}</p>
      <p className="mt-2">
        <Link to={localize("contacto", locale)}>{UI[locale].contactCta}</Link>
      </p>
    </Shell>
  );
}

function Legal({ name, locale }: { name: "terminos" | "privacidad"; locale: Locale }) {
  usePageMeta(name, locale);
  return (
    <Shell title={H1[locale][name]} locale={locale} switchPath={(l) => localize(name, l)}>
      <p className="mt-4">{UI[locale].legalBody}</p>
    </Shell>
  );
}

const PAGE_NOT_FOUND: Record<Locale, string> = {
  es: "Página no encontrada",
  en: "Page not found",
  it: "Pagina non trovata",
};

function NotFound({ locale }: { locale: Locale }) {
  usePageMeta("notfound", locale);
  const t = UI[locale];
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <main>
        <h1 className="text-3xl font-semibold">{PAGE_NOT_FOUND[locale]}</h1>
        <p className="mt-4">
          {t.notFoundBody} <Link to={localize("home", locale)}>{t.backTo}</Link>.
        </p>
      </main>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  switch (route.name) {
    case "home":
      return <Home locale={route.locale} />;
    case "contacto":
      return <Contacto locale={route.locale} />;
    case "servicios":
      return <Servicios locale={route.locale} />;
    case "ficha":
      return <Ficha locale={route.locale} slug={route.param ?? ""} />;
    case "terminos":
      return <Legal name="terminos" locale={route.locale} />;
    case "privacidad":
      return <Legal name="privacidad" locale={route.locale} />;
    default:
      return <NotFound locale={route.locale} />;
  }
}
