import { useEffect, useState } from "react";

export type RouteName = "home" | "contacto" | "terminos" | "privacidad" | "notfound";

export interface ParsedRoute {
  name: RouteName;
}

function normalizarPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "");
  return clean || "/";
}

export function parsePath(pathname: string): ParsedRoute {
  const path = normalizarPath(pathname).split("?")[0];

  if (path === "/" || path === "") return { name: "home" };
  if (path === "/contacto") return { name: "contacto" };
  if (path === "/terminos") return { name: "terminos" };
  if (path === "/privacidad") return { name: "privacidad" };
  return { name: "notfound" };
}

/** Genera URLs limpias (/contacto) en lugar de hash (#/contacto) */
export function href(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function useRoute(): ParsedRoute {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    typeof window === "undefined" ? { name: "home" } : parsePath(window.location.pathname),
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
export const PAGE_META: Record<RouteName, { title: string; desc: string }> = {
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
};

export const SITE_URL = "https://somcar.mx";
const OG_IMAGE = `${SITE_URL}/og-cover.webp`;

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

function setHreflang(url: string) {
  ["es-MX", "x-default"].forEach((lang) => {
    let link = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  });
}

export function usePageMeta(name: RouteName) {
  useEffect(() => {
    const base = PAGE_META[name];
    const path = window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/+$/, "");
    const canonical = `${SITE_URL}${path}`;

    document.title = base.title;
    setMeta("name", "description", base.desc);
    setMeta("name", "robots", name === "notfound" ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("name", "author", "SOMCAR");
    setMeta("name", "publisher", "SOMCAR");
    setMeta("name", "theme-color", "#111827");

    setMeta("property", "og:title", base.title);
    setMeta("property", "og:description", base.desc);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:site_name", "SOMCAR");
    setMeta("property", "og:locale", "es_MX");
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:image:alt", base.title);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", base.title);
    setMeta("name", "twitter:description", base.desc);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "twitter:image:alt", base.title);

    setCanonical(canonical);
    setHreflang(canonical);
  }, [name]);
}
