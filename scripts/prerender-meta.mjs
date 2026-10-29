// Prerender de metadatos por ruta (Open Graph para WhatsApp/Facebook/X).
// Los crawlers sociales NO ejecutan JS: leen el HTML tal como lo sirve Apache.
// Este script corre DESPUÉS de `vite build` y genera un index.html por ruta
// en dist/ con sus metas ya inyectadas (título, descripción, canonical, OG).
// Apache sirve esos archivos directo (existen en disco); el bundle React
// arranca igual encima, así que el humano no nota diferencia.
// Fuente única de verdad: PAGE_META (sin duplicar textos).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PAGE_META, SITE_URL } from "../src/lib/router.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");

const setTitle = (html, v) => html.replace(/<title>.*?<\/title>/, `<title>${v}</title>`);
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

function renderPage({ path, title, desc, image, keywords }) {
  const canonical = `${SITE_URL}${path}`;
  let html = template;
  html = setTitle(html, title);
  html = setContent(html, "name", "description", desc);
  html = setContent(html, "name", "keywords", keywords);
  html = setHref(html, "canonical", canonical);
  html = setHref(html, "alternate", canonical, ` hreflang="es-MX"`);
  html = setHref(html, "alternate", canonical, ` hreflang="x-default"`);
  html = setContent(html, "property", "og:title", title);
  html = setContent(html, "property", "og:description", desc);
  html = setContent(html, "property", "og:url", canonical);
  html = setContent(html, "property", "og:image", image);
  html = setContent(html, "property", "og:image:alt", title);
  html = setContent(html, "name", "twitter:title", title);
  html = setContent(html, "name", "twitter:description", desc);
  html = setContent(html, "name", "twitter:image", image);
  html = setContent(html, "name", "twitter:image:alt", title);
  const outDir = join(dist, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  return canonical;
}

const OG_DEFAULT = `${SITE_URL}/og-cover.webp`;
const KW_DEFAULT = "somcar";
const pages = [
  { path: "/contacto", meta: "contacto", image: OG_DEFAULT },
  { path: "/terminos", meta: "terminos", image: OG_DEFAULT },
  { path: "/privacidad", meta: "privacidad", image: OG_DEFAULT },
];

const done = [];
for (const p of pages) {
  done.push(
    renderPage({ path: p.path, title: PAGE_META[p.meta].title, desc: PAGE_META[p.meta].desc, image: p.image, keywords: KW_DEFAULT }),
  );
}
console.log(`Prerender OG: ${done.length} páginas -> dist/*/index.html`);
