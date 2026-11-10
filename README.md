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
- **Ruta** horizontal muy visual con `overflow-hidden` + `animate-[carousel]` infinito (sin pausa en hover, pausa sin info entre ciclos) y cards con 4 imágenes reales por parada (`*-ruta-1..4.webp`).
- **No fotos de autos** en catálogo — solo por WhatsApp. Cada parada tiene 4 webp 1280/q72 en `public/img/`.

## Video hero — `public/video/`

```
public/video/hero-riviera.mp4  # 5.5M 640p zona hotelera→cenote→atardecer (actual)
public/video/hero-new-compressed.mp4 # 5.5M copia backup
public/video/hero-poster.jpg   # poster 1920
```

El hero usa `hero-riviera.mp4` single file 5.5M con `prefers-reduced-motion`. Mantén <6MB h264 sin audio.

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

## Imágenes — Ruta 4 por parada (webp 1280/q72)

`src/pages/Ruta.tsx:176` mapea `i→principal` y mini galería sin duplicar. Todas en `public/img/`:

- Cancún: `cancun-ruta-1..4.webp` (90K/178K/82K/174K) — principal faro (1) mini 2/3/4
- Puerto Morelos: `puerto-morelos-ruta-1..4.webp` (117K/105K/86K/152K) — principal letrero (1) mini 2/3/4
- Playa del Carmen: `playa-del-carmen-ruta-1..4.webp` (355K/163K/192K/95K) — principal sirenas al amanecer (4) mini 1/2/3
- Akumal: `akumal-ruta-1..4.webp` (426K/291K/60K/52K) — principal tortuga (4) mini 1/2/3
- Tulum: `tulum-ruta-1..4.webp` (382K/414K/489K/361K) — principal ruinas (4) mini 1/2/3

`public/img/cenote-default.webp` queda como fallback si `i` fuera de rango. Generar con `sharp` resize 1280 webp 72.

## Publicación

1. Reemplaza `PAGE_META` y textos de `src/lib/home.ts` si cambian.
2. Sube `public/video/hero-*.mp4` finales y `public/img/*` finales, `public/og-cover.webp` si quieres portada 1920x1072 (cambia 3 refs en `index.html` + `prerender-meta.mjs`).
3. Verifica `contacto@somcar.mx` y `+52 998 168 4805` en `llms.txt` y `noscript` de `index.html`.
4. Pon `google-site-verification` en `index.html`, envía sitemap en Search Console.
