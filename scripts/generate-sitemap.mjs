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

// Una sola fuente de verdad: misma lista de rutas que src/lib/router.ts.
const urls = [
  { path: "/", priority: "1.0", changefreq: "weekly", src: ["index.html", "src/App.tsx", "src/main.tsx"] },
  { path: "/contacto", priority: "0.9", changefreq: "monthly", src: ["src/App.tsx"] },
  { path: "/terminos", priority: "0.3", changefreq: "yearly", src: ["src/App.tsx"] },
  { path: "/privacidad", priority: "0.3", changefreq: "yearly", src: ["src/App.tsx"] },
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${SITE}${u.path}</loc><lastmod>${lastmodOf(...u.src)}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(outPath, xml, "utf8");
console.log(`Sitemap generado: ${urls.length} URLs -> ${outPath}`);
