// Prerender de metadatos por ruta e idioma (Open Graph para WhatsApp/Facebook/X).
// Los crawlers sociales NO ejecutan JS: leen el HTML tal como lo sirve Apache.
// Este script corre DESPUÉS de `vite build` y genera un index.html por ruta
// en dist/ con sus metas ya inyectadas (lang, título, descripción, canonical,
// hreflang, OG). Apache sirve esos archivos directo (existen en disco);
// el bundle React arranca igual encima, así que el humano no nota diferencia.
// Fuente única de verdad: PAGE_META + FICHAS (sin duplicar textos).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { LOCALES, PAGE_META, SITE_URL, fichaMeta, pageAlternates } from "../src/lib/router.ts";
import { FICHAS } from "../src/lib/fichas.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const OG_LOCALE = { es: "es_ES", en: "en_US", it: "it_IT" };

const setTitle = (html, v) => html.replace(/<title>.*?<\/title>/, `<title>${v}</title>`);
const setLang = (html, v) => html.replace(/<html lang="[^"]*">/, `<html lang="${v}">`);
const setContent = (html, attr, key, v) =>
  html.replace(
    new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
    `<meta ${attr}="${key}" content="${v}" />`,
  );
const setHref = (html, rel, v, extra = "") =>
  html.replace(
    new RegExp(`<link rel="${rel}"${extra} href="[^"]*" />`),
    `<link rel="${rel}"${extra} href="${v}" />`,
  );

const STATIC_KEY = { "": "home", "/contacto": "contacto", "/servicios": "servicios", "/terminos": "terminos", "/privacidad": "privacidad" };
const slugs = [...Object.keys(STATIC_KEY), ...FICHAS.map((f) => `/servicios/${f.slug}`)];

function renderPage({ slug, locale }) {
  const path = locale === "es" ? slug || "/" : `/${locale}${slug}`;
  const meta = slug.startsWith("/servicios/")
    ? fichaMeta(slug.slice("/servicios/".length), locale)
    : PAGE_META[locale][STATIC_KEY[slug]];
  const name = slug.startsWith("/servicios/") ? "ficha" : STATIC_KEY[slug];
  const param = slug.startsWith("/servicios/") ? slug.slice("/servicios/".length) : "";
  const canonical = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/og-cover.webp`;
  let html = template;
  html = setLang(html, locale);
  html = setTitle(html, meta.title);
  html = setContent(html, "name", "description", meta.desc);
  html = setContent(html, "name", "keywords", "somcar");
  html = setHref(html, "canonical", canonical);
  for (const [lang, url] of Object.entries(pageAlternates(name, param))) {
    html = setHref(html, "alternate", url, ` hreflang="${lang}"`);
  }
  html = setContent(html, "property", "og:title", meta.title);
  html = setContent(html, "property", "og:description", meta.desc);
  html = setContent(html, "property", "og:url", canonical);
  html = setContent(html, "property", "og:locale", OG_LOCALE[locale]);
  html = setContent(html, "property", "og:image", image);
  html = setContent(html, "property", "og:image:alt", meta.title);
  html = setContent(html, "name", "twitter:title", meta.title);
  html = setContent(html, "name", "twitter:description", meta.desc);
  html = setContent(html, "name", "twitter:image", image);
  html = setContent(html, "name", "twitter:image:alt", meta.title);
  const outDir = join(dist, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  return canonical;
}

const done = [];
for (const locale of LOCALES) {
  for (const slug of slugs) {
    done.push(renderPage({ slug, locale }));
  }
}
console.log(`Prerender OG: ${done.length} páginas -> dist/*/index.html`);
