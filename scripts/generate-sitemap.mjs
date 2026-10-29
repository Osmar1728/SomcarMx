import { statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "sitemap.xml");

const SITE = "https://somcar.mx";
const today = new Date().toISOString().slice(0, 10);

// lastmod real por URL: fecha de modificación del archivo más reciente
// entre los que generan esa página. Si falta alguno, se usa hoy.
function lastmodOf(...relPaths) {
  let latest = 0;
  for (const rel of relPaths) {
    try {
      latest = Math.max(latest, statSync(join(root, rel)).mtimeMs);
    } catch {
      return today;
    }
  }
  return latest ? new Date(latest).toISOString().slice(0, 10) : today;
}

const LOCALES = ["es", "en", "it"];
const pathOf = (slug, locale) => (locale === "es" ? slug || "/" : `/${locale}${slug}`);

// Una sola fuente de verdad: misma lista de páginas que src/lib/router.ts.
const pages = [
  { slug: "", priority: "1.0", changefreq: "weekly", src: ["index.html", "src/App.tsx", "src/main.tsx"] },
  { slug: "/contacto", priority: "0.9", changefreq: "monthly", src: ["src/App.tsx"] },
  { slug: "/terminos", priority: "0.3", changefreq: "yearly", src: ["src/App.tsx"] },
  { slug: "/privacidad", priority: "0.3", changefreq: "yearly", src: ["src/App.tsx"] },
];

const urls = pages
  .map((p) =>
    LOCALES.map((locale) => {
      const loc = `${SITE}${pathOf(p.slug, locale)}`;
      const alternates = [
        ...LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${pathOf(p.slug, l)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${pathOf(p.slug, "es")}"/>`,
      ].join("\n");
      return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n    <lastmod>${lastmodOf(...p.src)}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority>\n  </url>`;
    }).join("\n"),
  )
  .join("\n");

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls +
  `\n</urlset>\n`;

writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap generado: ${pages.length * LOCALES.length} URLs -> ${outPath}`);
