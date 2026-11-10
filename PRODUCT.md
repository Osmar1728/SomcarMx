# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primarios:** Turistas extranjeros (mercado principal ES/EN/IT) + nacionales/locales de Quintana Roo que llegan a CUN/TQO o ya están en la Riviera y necesitan auto sin fricción financiera. Reservan vía WhatsApp (+52 998 168 4805) o Email, o cotizan en `/cotizador` sin precio. Esperan respuesta en minutos y entrega donde estén.

**Secundarios:** Quien ya conoce SOMCAR y quiere revivir la ruta (Cancún→Tulum) sin reloj.

**No prioritario:** Shuttle como producto principal — se mantiene como extra de 2 fichas, no como flujo core.

**Job:** Rentar auto confiable desde $750 MXN/día, sin tarjeta ni depósito, km ilimitado, 24/7, para recorrer la Riviera (playa 8am, cenote 11am, Tulum atardecer) sin presión de tour.

## Product Purpose

SOMCAR (Soluciones Móviles del Caribe) renta autos en Cancún y Riviera Maya. Existe para que el visitante maneje la Riviera a su ritmo, no al del tour. Desde 2016 (9 años de experiencia) entrega en Aeropuerto CUN, Aeropuerto Tulum (TQO), ADO Cancún, Puerto Morelos, Playa del Carmen, Tulum, Valladolid, dentro de la ciudad u otros puntos, con fecha y hora exactas.

**Éxito:** Cotización completada en 3 pasos sin precio (solo días), reserva por WhatsApp/Email, y viaje realizado con paradas (Cancún, Puerto Morelos, Playa, Akumal, Tulum) sin regresar a la agencia.

## Positioning

**Mecanismo diferencial:** 9 años en Cancún + renta sin tarjeta ni depósito + km ilimitado + 9 ubicaciones con hora exacta. Competidores retienen depósito y limitan km o solo entregan en aeropuerto; SOMCAR combina 9 años probados con entrega donde estés y sin fricción financiera.

**Prueba:** Ruta 90km (122km real) con qué hacer en cada parada y por qué en auto (sin fila 9am, cambio de cala si sargazo, atardecer sin prisa), video hero de la Riviera y mapa pirata que se va pintando.

## Operating Context

- **Flujo core Home:** Hero full-screen con video Riviera (hotelera → salto cenote → atardecer) + cotizador 30 seg + mapa pirata + beneficios con imagen + road 5 stops + carrusel infinito sin tope + servicios + proceso 4 pasos + testimonios + FAQ + contacto.
- **Cotizador Lexor 4 pasos:** 1) ¿Dónde y cuándo recogemos? (9 locaciones + fecha/hora) → 2) ¿Dónde y cuándo entregas? (+ mismo que recogida) → 3) ¿Cuándo valida días → 4) Confirma nombre/email/nota → WhatsApp prellenado sin precio o Email. Sin precio hasta cotización humana.
- **Ruta White Desert inspired:** Scrollytelling pegado bajo nav (sticky 100vh-64px sin rebote) con línea turquesa punteada que se pinta conforme bajas. En desktop info izquierda / foto derecha (no intercalado); en móvil apilado. Cada card tiene 4 imágenes reales (principal + 3 mini sin duplicar) y bloque Tour vs Auto sin precio.
- **Idiomas:** ES sin prefijo `/`, EN `/en/*`, IT `/it/*` con `hreflang` + `lang` dinámico, `noindex` en 404, sitemap 30 URLs (10 slugs ×3) y prerender OG por ruta.
- **Soporte:** WhatsApp wa.me/529981684805 con mensajes predeterminados por contexto (cotizador, promociones), Email contacto@somcar.mx, teléfono.

## Capabilities and Constraints

**Capacidades confirmadas:**
- Flota compactos, sedanes, vans sanitizadas, sin foto en catálogo (solo por WhatsApp), Pet Friendly, 9 puntos de entrega con hora, km ilimitado, seguro e impuestos incluidos, 24/7.
- Video hero que cicla 3 mp4 640p (heros), poster, pausa con `prefers-reduced-motion`.
- Mapa pirata pergamino con ruta punteada progresiva y carrusel infinito con gap ↻ que no se detiene en hover.
- SEO: `PAGE_META` por ruta/idioma, `fichaMeta`, `localize`, `pageAlternates`, sitemap + prerender.

**Restricciones:**
- No mostrar precio hasta cotización humana; no mostrar fotos de autos en catálogo.
- No usar Covid como argumento; mantener naranja #f97316 + azul #0a3d7a/#072c58, no cuadrados perfectos, hero full-screen en las 6 medidas.
- Preservar SEO técnico (hreflang, canonical, OG, JSON-LD).
- No inventar flota exacta, precios distintos a $750, o testimonios falsos.

**Indecisos explícitos:** Video final de Riviera grabado in situ, integración de pagos, programa fidelidad. Fotos por parada ya resueltas (20 webp).

## Brand Commitments

- **Nombre:** SOMCAR / Soluciones Móviles del Caribe — 9 años, preservar.
- **Colores:** Naranja #f97316 / #c2410c + Azul #0a3d7a / #072c58 + Crema #f6f7f9 — preservar.
- **Tipografías:** Syne 800 display, Inter body, JetBrains Mono labels — self-host via Google Fonts link.
- **Voz:** Directa, sin letras chicas, “#RentaUnAutoConSOMCAR”.
- **Imaginería:** Cenote turquesa como predeterminada hasta tu multimedia; mar turquesa de fondo en Ruta.

## Evidence on Hand

- Código vivo: `src/pages/Home.tsx` (hero video + mapa pirata + carrusel), `src/pages/Cotizador.tsx` (9 locaciones), `src/pages/Ruta.tsx` (scrollytelling con 4 webp por parada + principal sin duplicar), `src/pages/Nosotros.tsx` (texto real de la captura + 9 años), `src/components/Header.tsx` (Ruta+Nuevos), `public/video/hero-riviera.mp4` (5.5M) + poster, `public/img/*-ruta-1..4.webp` (20 imágenes 52K–489K 1280/q72) + `cenote-default.webp` fallback, `scripts/*`.
- Copy real: `src/lib/home.ts` HOME trilingüe, `TESTIMONIOS` 3, `PAGE_META` 10 rutas ×3, `FICHAS` 2.
- No fabricar: modelos de autos, fotos flota, reseñas nuevas, precios distintos.

## Product Principles

1. **Sin fricción primero.** Tarjeta/depósito/hora exacta sin sorpresas, visible en 3s.
2. **Precio solo al cotizar.** El sitio cotiza sin mostrar total; el humano cierra.
3. **La Ruta manda.** Demostrar 90km sin prisa vale más que listar autos.
4. **Video prueba, no decora.** Riviera real, no stock de auto.
5. **Turista extranjero como default.** Todo trilingüe y 24/7 desde CUN.

## Accessibility & Inclusion

- `html lang` dinámico, `prefers-reduced-motion` pausa Lenis y videos, inputs 16px, `focus-visible` naranja, `selection` naranja, scrollbar ink/cream. Sin estándar formal, WCAG AA práctico.
