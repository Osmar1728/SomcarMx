import { useEffect, useState } from "react";

export const LOCALES = ["es", "en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export type RouteName = "home" | "contacto" | "terminos" | "privacidad" | "notfound";
export type Page = Exclude<RouteName, "notfound">;

export interface ParsedRoute {
  name: RouteName;
  locale: Locale;
}

const SLUGS: Record<Page, string> = {
  home: "",
  contacto: "/contacto",
  terminos: "/terminos",
  privacidad: "/privacidad",
};

/** URL de una página en un idioma (es va sin prefijo: /contacto, en/it con prefijo: /en/contacto). */
export function localize(name: Page, locale: Locale): string {
  const slug = SLUGS[name];
  if (locale === DEFAULT_LOCALE) return slug || "/";
  return `/${locale}${slug}`;
}

function normalizarPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean || "/";
}

export function parsePath(pathname: string): ParsedRoute {
  const clean = normalizarPath(pathname).split("?")[0];

  let locale: Locale = DEFAULT_LOCALE;
  let rest = clean;
  const m = clean.match(/^\/(en|it)(\/|$)/);
  if (m) {
    locale = m[1] as Locale;
    rest = clean.slice(m[0].length) || "/";
  }

  for (const [name, slug] of Object.entries(SLUGS)) {
    if (rest === (slug || "/")) return { name: name as RouteName, locale };
  }
  return { name: "notfound", locale };
}

/** Genera URLs limpias (/contacto) en lugar de hash (#/contacto) */
export function href(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function useRoute(): ParsedRoute {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window === "undefined" ? { name: "home", locale: DEFAULT_LOCALE } : parsePath(window.location.pathname),
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(parsePath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    onChange();
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  history.pushState(null, "", href(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// shortcut: textos neutros de arranque; reemplázalos con el copy real del negocio.
export const PAGE_META: Record<Locale, Record<RouteName, { title: string; desc: string }>> = {
  es: {
    home: {
      title: "SOMCAR | Sitio oficial",
      desc: "Sitio oficial de SOMCAR. Conoce nuestros servicios y contáctanos.",
    },
    contacto: {
      title: "Contacto | SOMCAR",
      desc: "Contáctanos: SOMCAR. Escríbenos y te respondemos a la brevedad.",
    },
    terminos: {
      title: "Términos y condiciones | SOMCAR",
      desc: "Términos y condiciones del servicio de SOMCAR.",
    },
    privacidad: {
      title: "Aviso de privacidad | SOMCAR",
      desc: "Aviso de privacidad de SOMCAR conforme a la LFPDPPP.",
    },
    notfound: {
      title: "Página no encontrada | SOMCAR",
      desc: "La página que buscas no existe. Vuelve al inicio de SOMCAR.",
    },
  },
  en: {
    home: {
      title: "SOMCAR | Official site",
      desc: "SOMCAR official website. Explore our services and get in touch.",
    },
    contacto: {
      title: "Contact | SOMCAR",
      desc: "Contact us: SOMCAR. Send us a message and we'll get back to you shortly.",
    },
    terminos: {
      title: "Terms and conditions | SOMCAR",
      desc: "SOMCAR service terms and conditions.",
    },
    privacidad: {
      title: "Privacy notice | SOMCAR",
      desc: "SOMCAR privacy notice.",
    },
    notfound: {
      title: "Page not found | SOMCAR",
      desc: "The page you're looking for doesn't exist. Back to the SOMCAR home page.",
    },
  },
  it: {
    home: {
      title: "SOMCAR | Sito ufficiale",
      desc: "Sito ufficiale di SOMCAR. Scopri i nostri servizi e contattaci.",
    },
    contacto: {
      title: "Contatti | SOMCAR",
      desc: "Contattaci: SOMCAR. Scrivici e ti risponderemo al più presto.",
    },
    terminos: {
      title: "Termini e condizioni | SOMCAR",
      desc: "Termini e condizioni del servizio SOMCAR.",
    },
    privacidad: {
      title: "Informativa sulla privacy | SOMCAR",
      desc: "Informativa sulla privacy di SOMCAR.",
    },
    notfound: {
      title: "Pagina non trovata | SOMCAR",
      desc: "La pagina che cerchi non esiste. Torna alla home page di SOMCAR.",
    },
  },
};

export const SITE_URL = "https://somcar.mx";
const OG_IMAGE = `${SITE_URL}/og-cover.webp`;
const OG_LOCALE: Record<Locale, string> = { es: "es_ES", en: "en_US", it: "it_IT" };

type MetaAttr = "name" | "property";

function setMeta(attr: MetaAttr, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function setHreflang(alternates: Record<string, string>) {
  for (const [lang, url] of Object.entries(alternates)) {
    let link = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }
}

/** Altern alternates hreflang de una página en los 3 idiomas + x-default (apunta al español). */
export function pageAlternates(name: Page): Record<string, string> {
  return {
    es: `${SITE_URL}${localize(name, "es")}`,
    en: `${SITE_URL}${localize(name, "en")}`,
    it: `${SITE_URL}${localize(name, "it")}`,
    "x-default": `${SITE_URL}${localize(name, "es")}`,
  };
}

export function usePageMeta(name: RouteName, locale: Locale) {
  useEffect(() => {
    const base = PAGE_META[locale][name];
    const path =
      name === "notfound"
        ? window.location.pathname.replace(/\/+$/, "") || "/"
        : localize(name, locale);
    const canonical = `${SITE_URL}${path}`;

    document.title = base.title;
    document.documentElement.lang = locale;
    setMeta("name", "description", base.desc);
    setMeta("name", "robots", name === "notfound" ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("name", "author", "SOMCAR");
    setMeta("name", "publisher", "SOMCAR");
    setMeta("name", "theme-color", "#111827");

    setMeta("property", "og:title", base.title);
    setMeta("property", "og:description", base.desc);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "SOMCAR");
    setMeta("property", "og:locale", OG_LOCALE[locale]);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:alt", base.title);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", base.title);
    setMeta("name", "twitter:description", base.desc);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "twitter:image:alt", base.title);

    setCanonical(canonical);
    if (name !== "notfound") setHreflang(pageAlternates(name));
  }, [name, locale]);
}
