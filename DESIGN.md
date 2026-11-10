---
name: SOMCAR — Riviera Muy Visual
description: Naranja y azul sin cuadrados, video Riviera y mapa pirata para rentar sin prisa.
colors:
  ink: "#072c58"
  primary: "#0a3d7a"
  accent: "#f97316"
  accent-dark: "#c2410c"
  cream: "#f6f7f9"
  cream-deep: "#e8e0d0"
  turquoise: "#7dd3d8"
  parchment: "#fdf6e3"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "32px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  card-pirate:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: SOMCAR — Riviera Muy Visual

## Overview

**Creative North Star: "La Riviera se maneja, no se recorre en tour"**

Sistema no cuadrado, muy visual y sin fotos de autos en catálogo. Todo demuestra 90km sin prisa con video real de la Riviera, mapa pirata que se va pintando y carrusel infinito sin tope. Naranja #f97316 y azul #0a3d7a sobre crema #f6f7f9, Syne 800 para titulares, Inter para lectura y JetBrains Mono para datos. Cada viewport es una lámina con bordes orgánicos (28–32px) y sin círculos decorativos en el hero.

**Key Characteristics:**
- Video hero full-screen en las 6 medidas, overlay crema con cenote, no cuadrados
- Mapa pergamino con ruta punteada turquesa que progresa con scroll, sticky debajo del nav sin rebote
- Cotizador Lexor 4 pasos con hora + lugar juntos, sin precio
- Ruta scrollytelling pegada + horizontal muy visual con cenote a sangre

## Colors

Paleta SOMCAR original, usada como señales no como decoración.

### Primary
- **Ink Navy** (#072c58 / #0a3d7a): header, hero text, sticky Ruta, botones dark. Texto sobre crema ≥17:1.

### Secondary
- **Accent Orange** (#f97316): CTA principal, badge, progreso. Texto sobre naranja siempre en blanco o ink según contraste (≥4.5:1).

### Tertiary
- **Turquoise** (#7dd3d8): línea de ruta y acento White Desert.

### Neutral
- **Cream** (#f6f7f9): fondo base, cards. Texto sobre crema en ink.
- **Cream Deep** (#e8e0d0): bordes y scrollbar track.
- **Parchment** (#fdf6e3): mapa pirata, borde #d8c9a5.

### Named Rules
**The One Accent Rule.** Solo naranja o turquesa es lo más luminoso por sección.
**The Cream Is Paper Rule.** Nunca texto blanco sobre crema.

## Typography

**Display:** Syne 800, -0.04em, 0.9, balance.
**Body:** Inter 400/600, 1.6, 65–75ch.
**Label/Mono:** JetBrains Mono 700, 0.12em, uppercase.

### Hierarchy
- **Display** (800, clamp 38px→78px, 0.9): hero “Cancún es tuyo”, ruta 52px.
- **Headline** (700, 22–26px, 1): cards y fichas.
- **Title** (600, 15px): tickets.
- **Body** (400, 13–15px, 1.6): descripciones, max 56ch.
- **Label** (700, 10–11px, 0.12em mono, uppercase): datos, km, tag.

### Named Rules
**The Mono Is Data Rule.** Mono solo para datos/tags.
**The Balance Rule.** Todo display con `text-wrap: balance`.

## Layout

Grilla 12 cols, max 1440, gutters 20–32. Hero `fill-screen` 100svh con `pt` calibrado por breakpoint (320:72px → 1440:py-12). Ruta sticky `top-[64px] h-[calc(100vh-64px)]` con `-mt-[calc(100vh-64px)]` para que la primera parada aparezca con un scroll. Cotizador 1.7fr/0.9fr con resumen sticky. Breakpoints `xs/ms/ml/md/lg/laptop-l`. Densidad generosa entre secciones (48–64), compacta dentro de cards (12–16). Más espacio arriba del heading que debajo.

## Elevation & Depth

Plano por defecto, elevación solo en hover. Profundidad por tinta y overlay, no por blur.

### Shadow Vocabulary
- **Card Lift** (`0 16px 40px rgba(0,0,0,0.08)` → `0 24px 60px rgba(0,0,0,0.14)` hover): fichas y cards Ruta.
- **Hero Island** (`0 20px 60px rgba(11,15,26,0.12)`): booking card.

### Named Rules
**The Flat-By-Default Rule.** Sin sombras en reposo; solo en hover de card/island.

## Shapes

Orgánico, no cuadrado. `blob` 32px, `blob-soft` 24px 32px 28px 36px, `pill` 999px, cards Ruta 28–32px, hero island `blob-soft`. Sin círculos decorativos en hero (quitados). Bordes 1px black/10 o white/10, nunca 4px offset. Ruta usa pergamino con borde punteado y gap ↻ entre ciclos.

## Components

### Buttons
- **Primary:** naranja #f97316 texto blanco, 14px bold, 14px 28px, rounded 20px, hover #c2410c + -2px translate.
- **Dark:** ink #072c58 texto blanco, hover negro.
- **Focus:** outline 2px naranja offset 2px.

### Header
Sticky crema 80% blur, 64px, logo 32px rounded-full, nav pills (Inicio/Ruta/Nosotros/Servicios/Contacto) hover negro/blanco, CTA naranja `Cotizar` + dark `WhatsApp` + lang pill.

### Hero Video
`#hero-video` absolute cover, 3 mp4 640p que ciclan `riviera → cenote → sunset` en loop, poster, pausa con `prefers-reduced-motion`, overlay crema 72–78% + gradient.

### Cotizador
Steps 1–4 con progress naranja, inputs `rounded-2xl` 14px, select crema, resumen ink sticky. Sin precio.

### Ruta
Sticky mapa turquesa con mar de fondo 28% + línea sólida turquesa que se pinta (100→0 offset). Cards horizontales `380px` snap con gap ↻, imagen 300–360px a sangre + mini galería 3 sin duplicar (principal ≠ mini). 5 paradas ×4 webp 1280/q72: Cancún faro, Puerto Morelos letrero, Playa sirenas (4), Akumal tortuga (4), Tulum ruinas (4). Tour vs Auto 2 col sin precio.

### Cards
- **Beneficios:** imagen cenote a sangre a la izquierda (4 col) + 2×2 grid a la derecha, cada card 28px.
- **Destinos:** carrusel infinito `w-max` 28s sin pausa en hover, gap 16, pausa sin info entre ciclos.

## Do's and Don'ts

### Do:
- **Do** mantener hero full-screen en las 6 medidas con video real de Riviera.
- **Do** usar `*-ruta-1..4.webp` 1280/q72 por parada; `cenote-default.webp` solo fallback.
- **Do** tematizar selection naranja, focus naranja, scrollbar ink/cream.

### Don't:
- **Don't** poner kicker sobre heading ni fotos de autos en catálogo.
- **Don't** mostrar precio en cotizador ni en Ruta.
- **Don't** usar texto blanco sobre naranja 2.8:1 sin pasar a ink.
- **Don't** usar glass/blur decorativo fuera del hero ni bordes laterales de color >1px.
