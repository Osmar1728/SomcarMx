# SOMCAR — Soluciones Móviles del Caribe

Renta de autos en Cancún desde $750/día — sin tarjeta ni depósito, km ilimitado, 24/7. Sitio moderno, muy visual, sin fotos de autos en el catálogo (fotos reales por WhatsApp), con sistema responsive completo y SEO trilingüe replicado de LS NEXOR.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Lenis (lerp 0.1, respeta `prefers-reduced-motion`) + Syne 800 / Inter / JetBrains Mono.

## Rutas — URLs limpias, 3 idiomas (es sin prefijo, /en/*, /it/*)

| Ruta | Página | Notas |
|---|---|---|
| `/`, `/en`, `/it` | Home — hero video + cotizador + ruta preview | Hero `fill-screen` full en todas las medidas |
| `/cotizador`, `/en/cotizador`, `/it/cotizador` | Cotizador Lexor 4 pasos | 9 ubicaciones, hora + lugar juntos, sin precio |
| `/ruta`, `/en/ruta`, `/it/ruta` | Ruta 90km White Desert inspired | Scrollytelling + horizontal muy visual |
| `/nosotros`, `/en/nosotros`, `/it/nosotros` | Nosotros — 9 años, historia real | Texto de tu captura |
| `/contacto` | Contacto |  |
| `/servicios` | Índice servicios |  |
| `/servicios/:slug` | Ficha (renta-de-autos, shuttle) | Plantilla única `src/lib/fichas.ts` |
| `/terminos`, `/privacidad` | Legales | |
| `/404` | Not found | `noindex` |

**Total sitemap:** 30 URLs (10 slugs × 3 idiomas) con `hreflang` es/en/it + `x-default`.

## Diseño — naranja #f97316 + azul #0a3d7a/#072c58, no cuadrado

- **Hero full-screen** en todas las medidas del proyecto: `xs 320` · `ms 375` · `ml 425` · `md 768` · `lg 1024` · `laptop-l 1440` (`src/index.css` `@theme` + `fill-screen` `100svh` con `pt` calibrado). Sin círculos decorativos; video de fondo Riviera (hotelera → cenote → atardecer) con overlay crema.
- **Mapa pirata** pergamino `#fdf6e3` con ruta punteada que se va pintando (`strokeDasharray` + `progress`), brújula y `↻` gap.
- **Cotizador** Lexor steps: ubicación + hora juntos en paso 1 y 2, sin precio, WhatsApp con mensaje predeterminado y Email.
- **Ruta** horizontal muy visual con `overflow-hidden` + `animate-[carousel]` infinito (sin pausa en hover, pausa sin info entre ciclos) y cards con imagen cenote predeterminada `public/img/cenote-default.jpg` (reemplazable por parada).
- **No fotos de autos** en catálogo — solo por WhatsApp. Todas las imágenes genéricas usan `cenote-default.jpg` hasta tu multimedia final.

## Video hero — `public/video/`

```
public/video/hero-riviera.mp4  # 640p 3.4M zona hotelera aérea (placeholder Pexels)
public/video/hero-cenote.mp4   # 640p 2.7M cenote
public/video/hero-sunset.mp4   # 640p 1.7M atardecer
public/video/hero-poster.jpg   # poster 1920
public/video/README.md         # specs: 1920x1080 h264 <6MB sin audio 12-15s
```

El hero cicla `hero-riviera → hero-cenote → hero-sunset` en loop. Reemplaza con tu grabación final (zona hotelera → salto cenote → atardecer) y mantén <6MB.

## Cotizador — 9 ubicaciones

`Aeropuerto CUN`, `Aeropuerto Tulum (TQO)`, `ADO Cancún`, `Puerto Morelos`, `Playa del Carmen`, `Tulum`, `Valladolid`, `Dentro de la ciudad`, `Otros` (+ texto). Fecha + hora en el mismo paso que el lugar. Paso 4 confirma con nombre/email/nota y dos CTAs: WhatsApp (con mensaje prellenado sin precio) y Email `mailto`.

## Scripts

```bash
npm run dev      # vite
npm run build    # sitemap (30 URLs) + tsc -b + vite build + prerender-meta (30 páginas con OG por ruta/idioma)
npm run lint     # oxlint
npm run preview  # preview dist
npm run sitemap  # solo sitemap
```

## SEO — qué mantener actualizado

- `index.html`: title/desc/robots/canonical/hreflang/OG/Twitter/JSON-LD Organization+WebSite, fonts Syne/Inter/JetBrains Mono.
- `src/lib/router.ts`: `PAGE_META` por ruta e idioma, `localize()` y `pageAlternates()`. `SLUGS` incluye `cotizador`, `ruta`, `nosotros`. `parsePath` soporta los 3.
- Cada página `usePageMeta` con `h1` único y `lang` dinámico.
- `public/sitemap.xml`: `scripts/generate-sitemap.mjs` lee `FICHAS` + 8 statics → 30 URLs.
- `scripts/prerender-meta.mjs`: inyecta metas por ruta para crawlers (sin JS) usando `PAGE_META` + `fichaMeta`.
- `public/.htaccess`: HTTPS + apex `somcar.mx` + URLs limpias (Hostinger/Apache).
- `public/llms.txt`: ficha para IAs — actualizada con 30 URLs y 9 ubicaciones.
- `public/robots.txt`: apunta a `https://somcar.mx/sitemap.xml`.

## Responsive

Tailwind `@theme` breakpoints `xs/ms/ml/md/lg/laptop-l` + `fill-screen` `100svh` para hero. Verificado en Chrome headless 320/375/425/768/1024/1440 para `/`, `/ruta`, `/cotizador` sin overflow ni scroll horizontal. Inputs a `16px` para no hacer zoom en iOS. Lenis deshabilitado con `prefers-reduced-motion`.

## Imágenes — predeterminadas

Todas las cards de Ruta usan `public/img/cenote-default.jpg` (copia de `alexandersix16-cenote-10225212_1920.jpg` 551K). Reemplaza por parada poniendo tus fotos en `public/img/ruta-*.jpg` y cambiando `STOPS[].img` en `src/pages/Ruta.tsx`.

## Publicación

1. Reemplaza `PAGE_META` y textos de `src/lib/home.ts` si cambian.
2. Sube `public/video/hero-*.mp4` finales y `public/img/*` finales, `public/og-cover.webp` si quieres portada 1920x1072 (cambia 3 refs en `index.html` + `prerender-meta.mjs`).
3. Verifica `contacto@somcar.mx` y `+52 998 168 4805` en `llms.txt` y `noscript` de `index.html`.
4. Pon `google-site-verification` en `index.html`, envía sitemap en Search Console.
