# SOMCAR

Base Vite + React 19 + TypeScript + Tailwind CSS v4 con el sistema SEO replicado de LS NEXOR.

## Rutas (URLs limpias)

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/contacto` | Contacto |
| `/terminos`, `/privacidad` | Textos legales |

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # sitemap + tsc + build + prerender de metas OG
npm run lint     # oxlint
npm run preview  # vista previa del build
```

## SEO (qué mantener actualizado)

- `index.html`: title, description, robots, canonical, hreflang, Open Graph, Twitter y JSON-LD.
- `src/lib/router.ts`: `PAGE_META` (título y descripción por ruta) y `SITE_URL`. `/404` se marca `noindex`.
- Cada página renderiza un solo `<h1>`.
- `public/sitemap.xml`: se regenera solo con `npm run build` y `npm run sitemap`.
- `public/robots.txt`: revisa que el `Sitemap:` apunte al dominio final.
- `public/llms.txt`: ficha para IAs; complétala con servicios, cobertura y contacto reales.
- `public/.htaccess`: fuerza HTTPS + apex (`somcar.mx`) y sirve las URLs limpias (requerido en Hostinger/Apache).
- `scripts/prerender-meta.mjs`: genera un `index.html` por ruta en `dist/` para que WhatsApp/Facebook lean el OG sin JS.

### Pendiente antes de publicar

1. Textos reales en `PAGE_META` (`src/lib/router.ts`) y en cada página.
2. Subir `public/favicon.svg` y `public/og-cover.webp` (1920x1072).
3. Datos de contacto reales en `public/llms.txt` y el `<noscript>` de `index.html`.
4. Etiqueta de `google-site-verification` en `index.html`, enviar el sitemap en Search Console y pedir indexación de las 4 URLs.
