import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "../components/Link";
import { localize, usePageMeta, type Locale } from "../lib/router";

const DEFAULT_IMG = "/img/cenote-default.webp";
const STOPS: Record<Locale, { place: string; km: string; time: string; tag: string; title: string; desc: string; tips: string[]; whyCar: string; best: string; bring: string; eat: string }[]> = {
  es: [
    { place: "Cancún", km: "0 km", time: "Salida", tag: "Zona Hotelera", title: "Despierta y arranca", desc: "Playa Delfines al amanecer sin esperar van. El mejor arranque de la ruta.", tips: ["Playa pública", "Mirador", "Desayuno"], whyCar: "Decides 20 min o 2 horas.", best: "6:30–8:00am luz suave, sin gente", bring: "Termo de café, bloqueador coral-friendly", eat: "Mercado 28 — tacos de cochinita" },
    { place: "Puerto Morelos", km: "36 km", time: "28 min", tag: "Arrecife", title: "Snorkel sin reloj", desc: "Arrecife Mesoamericano a 500m de la costa. Lancha 45 min.", tips: ["Snorkel", "Muelle", "Pueblo"], whyCar: "Te quedas a comer, no 1h del tour.", best: "9–11am mar calmo, visibilidad +15m", bring: "Snorkel propio o renta en muelle $150", eat: "El Pesquero — pescado zarandeado" },
    { place: "Playa del Carmen", km: "68 km", time: "55 min", tag: "Cenotes + 5ta", title: "Cenote a tu hora", desc: "Cenote Azul y Cristalino entre Playa y Tulum, sin grupos grandes.", tips: ["Cenote Azul", "5ta Av", "Helado"], whyCar: "Sin fila a las 9am.", best: "9–10am antes de tours 11am", bring: "Aqua shoes, toalla microfibra", eat: "5ta Av — marquesita + helado" },
    { place: "Akumal", km: "84 km", time: "1h 10m", tag: "Tortugas", title: "Nada con tortugas", desc: "Bahía protegida, agua a la cintura. Chaleco incluido.", tips: ["Tortugas", "Yal-kú", "Fotos"], whyCar: "Si hay sargazo, vas a la siguiente cala.", best: "8–10am tortugas activas", bring: "Gopro, chaleco (no aletas)", eat: "La Buena Vida — frente al mar" },
    { place: "Tulum", km: "122 km", time: "1h 30m", tag: "Ruinas · Cenotes", title: "Ruinas al atardecer", desc: "Castillo maya frente al Caribe. Luego Gran Cenote o Suytun.", tips: ["Ruinas", "Gran Cenote", "Laguna"], whyCar: "Ruinas + cenote + laguna en un día.", best: "5–6pm luz dorada, menos calor", bring: "Sombrero, agua, repelente natural", eat: "Taquería Honorio — lechón" },
  ],
  en: [
    { place: "Cancun", km: "0 km", time: "Start", tag: "Hotel Zone", title: "Wake and drive", desc: "Delfines beach at sunrise.", tips: ["Beach", "Lookout", "Breakfast"], whyCar: "20 min or 2 hours, you decide.", best: "6:30–8am soft light", bring: "Coffee flask, reef-safe sunscreen", eat: "Mercado 28" },
    { place: "Puerto Morelos", km: "36 km", time: "28 min", tag: "Reef", title: "Snorkel no rush", desc: "Reef 500m offshore, 45 min boat.", tips: ["Snorkel", "Pier", "Village"], whyCar: "Stay for lunch.", best: "9–11am calm sea", bring: "Own snorkel", eat: "El Pesquero" },
    { place: "Playa del Carmen", km: "68 km", time: "55 min", tag: "Cenotes", title: "Cenote on your time", desc: "Azul between Playa and Tulum.", tips: ["Cenote", "5th Ave", "Ice cream"], whyCar: "No line at 9am.", best: "9–10am", bring: "Water shoes", eat: "5th Ave" },
    { place: "Akumal", km: "84 km", time: "1h 10m", tag: "Turtles", title: "Swim with turtles", desc: "Calm bay.", tips: ["Turtles", "Yal-kú", "Photos"], whyCar: "Next cove if seaweed.", best: "8–10am", bring: "GoPro, vest", eat: "La Buena Vida" },
    { place: "Tulum", km: "122 km", time: "1h 30m", tag: "Ruins", title: "Ruins at sunset", desc: "8am or 5pm golden light.", tips: ["Ruins", "Cenote", "Lagoon"], whyCar: "Ruins + cenote + lagoon one day.", best: "5–6pm golden", bring: "Hat, water", eat: "Taquería Honorio" },
  ],
  it: [
    { place: "Cancún", km: "0 km", time: "Partenza", tag: "Zona Hotelera", title: "Sveglia e parti", desc: "Spiaggia all'alba.", tips: ["Spiaggia", "Mirador", "Colazione"], whyCar: "Decidi tu.", best: "6:30–8am", bring: "Borraccia, solare", eat: "Mercato 28" },
    { place: "Puerto Morelos", km: "36 km", time: "28 min", tag: "Barriera", title: "Snorkel senza fretta", desc: "Barriera vicina.", tips: ["Snorkel", "Molo", "Villaggio"], whyCar: "Resti a pranzo.", best: "9–11am", bring: "Snorkel", eat: "El Pesquero" },
    { place: "Playa del Carmen", km: "68 km", time: "55 min", tag: "Cenotes", title: "Cenote a tua ora", desc: "Azul tra Playa e Tulum.", tips: ["Cenote", "5ta", "Gelato"], whyCar: "Senza fila alle 9.", best: "9–10am", bring: "Scarpette", eat: "5ta" },
    { place: "Akumal", km: "84 km", time: "1h 10m", tag: "Tartarughe", title: "Nuota con tartarughe", desc: "Baia calma.", tips: ["Tartarughe", "Caletta", "Foto"], whyCar: "Prossima cala.", best: "8–10am", bring: "GoPro", eat: "La Buena Vida" },
    { place: "Tulum", km: "122 km", time: "1h 30m", tag: "Rovine", title: "Rovine al tramonto", desc: "8am o 5pm.", tips: ["Rovine", "Cenote", "Laguna"], whyCar: "Auto = tutto in un giorno.", best: "5–6pm", bring: "Cappello", eat: "Honorio" },
  ],
};

export default function RutaPage({ locale }: { locale: Locale }) {
  usePageMeta("ruta", locale);
  const switchPath = (l: Locale) => localize("ruta", l);
  const stops = STOPS[locale];
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // progreso para la línea curva
  const progress = (active + 1) / stops.length;

  return (
    <div className="bg-[#05070a] text-white">
      <Header locale={locale} switchPath={switchPath} />

      {/* HERO */}
      <section className="mx-auto max-w-[1440px] px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
        <h1 className="display mt-3 max-w-[16ch] text-[28px] leading-[0.9] sm:text-[42px] lg:text-[48px]">
          {locale === "es" ? <>De Cancún a Tulum, <span className="font-light italic text-white/70">sin prisa y en tu auto.</span></> : locale === "en" ? <>From Cancun to Tulum, <span className="font-light italic text-white/70">on your time.</span></> : <>Da Cancún a Tulum, <span className="font-light italic text-white/70">senza fretta, con la tua auto.</span></>}
        </h1>
        <p className="mt-2 max-w-[56ch] text-[13px] leading-relaxed text-white/60">{locale === "es" ? "Baja y la ruta se dibuja. Cada parada aparece a su tiempo — sin tours, sin reloj. Un scroll y ya estás en la primera." : locale === "en" ? "Scroll and the route unfolds. Each stop appears on time — no tours, no clock." : "Scorri e il percorso si disegna. Ogni tappa al suo tempo — senza tour."}</p>
      </section>

      {/* SCROLLYTELLING — mar turquesa de fondo + más imágenes */}
      <div className="relative">
        {/* sticky mapa — mar turquesa */}
        <div className="pointer-events-none sticky top-[64px] z-0 hidden h-[calc(100vh-64px)] w-full overflow-hidden bg-[#05070a] lg:block" aria-hidden>
          <img src="/video/hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.28]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-[#05070a]/70 to-[#05070a]" />
          <svg viewBox="0 0 800 1000" className="absolute inset-0 h-full w-full">
            {/* línea que se va pintando conforme bajas — sin trazo inicial */}
            <path
              d="M400 80 C 420 220, 380 360, 410 520 C 440 680, 380 840, 400 960"
              fill="none"
              stroke="#7dd3d8"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100 - progress * 100}
              style={{ transition: "stroke-dashoffset 0.7s ease-out" }}
            />
            {/* puntos */}
            {stops.map((_, i) => {
              const y = 120 + i * 170;
              const x = i % 2 === 0 ? 400 + (i === 0 ? 0 : i === 2 ? -18 : 12) : 400 + (i === 1 ? 14 : -12);
              const isActive = i === active;
              const isPast = i < active;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={isActive ? 9 : 6} fill={isActive ? "#7dd3d8" : isPast ? "white" : "rgba(255,255,255,0.35)"} className="transition-all duration-500" />
                  <circle cx={x} cy={y} r={18} fill="none" stroke="#7dd3d8" strokeWidth={isActive ? 1 : 0} opacity={isActive ? 0.35 : 0} className="transition-all" />
                </g>
              );
            })}
          </svg>

          {/* etiquetas extremas como white-desert */}
          <div className="absolute left-1/2 top-[68px] -translate-x-1/2 text-center">
            <p className="mono text-[10px] tracking-[0.14em] text-white/50">Starting point</p>
            <p className="text-[11px] font-bold tracking-[0.08em]">CANCÚN, QUINTANA ROO</p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="font-serif text-[14px] italic text-white/80">Tulum Ruins</p>
            <p className="mono text-[10px] font-bold tracking-[0.12em] text-white/50">RIVIERA MAYA</p>
          </div>
        </div>

        {/* sección mobile: línea vertical sutil */}
        <div className="pointer-events-none absolute inset-0 hidden lg:hidden" aria-hidden>
          <div className="absolute left-5 top-0 h-full w-px bg-white/10" />
        </div>

        {/* stops — arrancan arriba, sin pegarse al nav */}
        <div className="relative z-10 lg:-mt-[calc(100vh-64px)]">
          {stops.map((s, i) => (
            <section
              key={s.place}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="flex min-h-[70vh] items-center px-5 py-8 sm:px-6 lg:min-h-[78vh] lg:px-8"
            >
              <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6">
                {/* panel info izquierda */}
                <div className="col-span-12 lg:col-span-4">
                  <div className={`rounded-[16px] border bg-[#0f131a] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition duration-700 ${active === i ? "border-white/15 opacity-100 translate-y-0" : "border-white/5 opacity-60 translate-y-2 lg:opacity-40"}`}>
                    <p className="mono text-[10px] tracking-[0.14em] text-white/40">
                      0{i + 1} — {s.km} • {s.time}
                    </p>
                    <h2 className="mt-2 text-[22px] font-bold leading-tight">
                      {s.place} — {s.title}
                    </h2>
                    <p className="mono mt-1 text-[10px] font-bold tracking-[0.1em] text-[#7dd3d8]">{s.tag}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/60">{s.desc}</p>

                    <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      <div className="flex justify-between gap-3 text-[11px]">
                        <span className="mono shrink-0 text-white/40">{locale === "es" ? "Mejor hora" : locale === "en" ? "Best time" : "Orario migliore"}</span>
                        <span className="max-w-[20ch] text-right font-medium">{s.best}</span>
                      </div>
                      <div className="flex justify-between gap-3 text-[11px]">
                        <span className="mono shrink-0 text-white/40">{locale === "es" ? "Lleva" : locale === "en" ? "Bring" : "Porta"}</span>
                        <span className="max-w-[20ch] text-right font-medium">{s.bring}</span>
                      </div>
                      <div className="flex justify-between gap-3 text-[11px]">
                        <span className="mono shrink-0 text-white/40">{locale === "es" ? "Dónde comer" : locale === "en" ? "Where to eat" : "Dove mangiare"}</span>
                        <span className="max-w-[20ch] text-right font-medium">{s.eat}</span>
                      </div>
                      <div className="flex justify-between gap-3 border-t border-white/5 pt-2 text-[11px]">
                        <span className="mono shrink-0 text-white/40">{locale === "es" ? "Por qué en auto" : locale === "en" ? "Why by car" : "Perché in auto"}</span>
                        <span className="max-w-[20ch] text-right font-medium text-[#7dd3d8]">{s.whyCar}</span>
                      </div>
                      <div className="flex gap-1.5 pt-2">
                        {s.tips.map((tip) => (
                          <span key={tip} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold">
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* imágenes derecha */}
                <div className={`col-span-12 lg:col-span-5 lg:col-start-8 ${active === i ? "opacity-100" : "opacity-70 lg:opacity-40"} transition duration-700`}>
                  <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0f131a]">
                    <div className="relative h-[300px] overflow-hidden sm:h-[360px]">
                      <img src={i === 0 ? "/img/cancun-ruta-1.webp" : i === 1 ? "/img/puerto-morelos-ruta-1.webp" : i === 2 ? "/img/playa-del-carmen-ruta-4.webp" : i === 3 ? "/img/akumal-ruta-4.webp" : i === 4 ? "/img/tulum-ruta-4.webp" : DEFAULT_IMG} alt={`${s.place} cenote`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                      {i !== 0 && i !== 1 && i !== 2 && i !== 3 && i !== 4 && <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold">PREDETERMINADA</span>}
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">{s.place.toUpperCase()}</span>
                    </div>
                    {/* mini galería */}
                    <div className="grid grid-cols-3 gap-2 p-3">
                      {i === 0 ? (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/cancun-ruta-2.webp" alt="Cancún 2" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/cancun-ruta-3.webp" alt="Cancún 3" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/cancun-ruta-4.webp" alt="Cancún 4" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                        </>
                      ) : i === 1 ? (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/puerto-morelos-ruta-2.webp" alt="Puerto Morelos 2" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/puerto-morelos-ruta-3.webp" alt="Puerto Morelos 3" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/puerto-morelos-ruta-4.webp" alt="Puerto Morelos 4" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                        </>
                      ) : i === 2 ? (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/playa-del-carmen-ruta-1.webp" alt="Playa 1" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/playa-del-carmen-ruta-2.webp" alt="Playa 2" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/playa-del-carmen-ruta-3.webp" alt="Playa 3" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                        </>
                      ) : i === 3 ? (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/akumal-ruta-1.webp" alt="Akumal 1" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/akumal-ruta-2.webp" alt="Akumal 2" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/akumal-ruta-3.webp" alt="Akumal 3" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                        </>
                      ) : i === 4 ? (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/tulum-ruta-1.webp" alt="Tulum 1" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/tulum-ruta-2.webp" alt="Tulum 2" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/img/tulum-ruta-3.webp" alt="Tulum 3" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src="/video/hero-poster.jpg" alt="Mar turquesa" className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
                            <span className="absolute bottom-1 left-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-white">MAR</span>
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] bg-black/20">
                            <img src={DEFAULT_IMG} alt="Cenote detalle" className="absolute inset-0 h-full w-full object-cover object-bottom opacity-90" loading="lazy" />
                            <span className="absolute bottom-1 left-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-white">CENOTE</span>
                          </div>
                          <div className="relative h-[72px] overflow-hidden rounded-[12px] border border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                            <span className="mono text-center text-[9px] font-bold leading-tight text-white/50">+ TU<br />FOTO AQUÍ</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="px-4 pb-3">
                      <p className="mono text-[10px] tracking-[0.08em] text-white/40">{i === 0 ? "Cancún — 4 imágenes reales" : i === 1 ? "Puerto Morelos — 4 imágenes reales" : i === 2 ? "Playa del Carmen — 4 imágenes reales" : i === 3 ? "Akumal — 4 imágenes reales" : i === 4 ? "Tulum — 4 imágenes reales" : "3 imágenes por parada — reemplaza con tu multimedia"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* TOUR vs AUTO — sin precio, solo libertad */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="mono text-[11px] font-bold tracking-[0.12em] text-white/40">{locale === "es" ? "TOUR TÍPICO" : locale === "en" ? "TYPICAL TOUR" : "TOUR TIPICO"}</p>
            <h3 className="mt-2 text-[18px] font-bold text-white/90">{locale === "es" ? "Corriendo y con fila" : locale === "en" ? "Rushed and crowded" : "Di corsa e in fila"}</h3>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-white/60">
              <li className="flex gap-2"><span className="text-white/30">✕</span> {locale === "es" ? "Horario fijo 7am–3pm" : locale === "en" ? "Fixed 7am–3pm schedule" : "Orario fisso 7–15"}</li>
              <li className="flex gap-2"><span className="text-white/30">✕</span> {locale === "es" ? "1 cenote con 40 personas" : locale === "en" ? "1 cenote with 40 people" : "1 cenote con 40 persone"}</li>
              <li className="flex gap-2"><span className="text-white/30">✕</span> {locale === "es" ? "Buffet turístico, sin opción" : locale === "en" ? "Tourist buffet, no choice" : "Buffet turistico"}</li>
              <li className="flex gap-2"><span className="text-white/30">✕</span> {locale === "es" ? "Si hay sargazo, no hay plan B" : locale === "en" ? "If seaweed, no plan B" : "Se c'è alga, nessun piano B"}</li>
              <li className="flex gap-2"><span className="text-white/30">✕</span> {locale === "es" ? "Foto rápida y al bus" : locale === "en" ? "Quick photo and back to bus" : "Foto veloce e via"}</li>
            </ul>
          </div>
          <div className="rounded-[24px] bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
            <p className="mono text-[11px] font-bold tracking-[0.12em] text-black/40">{locale === "es" ? "CON SOMCAR • SIN PRISA" : locale === "en" ? "WITH SOMCAR • NO RUSH" : "CON SOMCAR • SENZA FRETTA"}</p>
            <h3 className="mt-2 text-[18px] font-bold">{locale === "es" ? "Tú mandas, el mar espera" : locale === "en" ? "You lead, the sea waits" : "Decidi tu, il mare aspetta"}</h3>
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-black/60">
              <li className="flex gap-2"><span className="text-[var(--color-accent)]">✓</span> {locale === "es" ? "Sales a la hora que quieres" : locale === "en" ? "Leave when you want" : "Parti quando vuoi"}</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]">✓</span> {locale === "es" ? "2–3 cenotes sin fila a las 9am" : locale === "en" ? "2–3 cenotes no line at 9am" : "2–3 cenotes senza fila alle 9"}</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]">✓</span> {locale === "es" ? "Tacos en el pueblo, sin prisa" : locale === "en" ? "Tacos in town, no rush" : "Tacos in paese"}</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]">✓</span> {locale === "es" ? "Cambias de playa si hay sargazo" : locale === "en" ? "Switch beach if seaweed" : "Cambi spiaggia se serve"}</li>
              <li className="flex gap-2"><span className="text-[var(--color-accent)]">✓</span> {locale === "es" ? "Atardecer en Tulum a tu ritmo" : locale === "en" ? "Sunset in Tulum on your time" : "Tramonto a Tulum con calma"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* cierre */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-[var(--color-accent)] p-6 text-white sm:p-8">
          <h3 className="display text-[24px]">{locale === "es" ? "Sin tour: todo en un día, a tu hora." : locale === "en" ? "No tour: all in one day, on your time." : "Senza tour: tutto in un giorno."}</h3>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-white/90">{locale === "es" ? "Con SOMCAR paras donde quieres. Cotiza la ruta completa y te damos el auto sin tarjeta ni depósito." : locale === "en" ? "With SOMCAR you stop where you want. Quote the full route — no card, no deposit." : "Con SOMCAR ti fermi dove vuoi. Preventivo senza carta né deposito."}</p>
          <Link to={localize("cotizador", locale)} className="mt-4 inline-flex rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black hover:bg-black hover:text-white">
            {locale === "es" ? "Cotizar ruta completa" : locale === "en" ? "Quote full route" : "Preventivo completo"}
          </Link>
        </div>
      </section>
      <Footer locale={locale} />
    </div>
  );
}
