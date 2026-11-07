import { useEffect } from "react";
import Header from "../components/Header";
import Link from "../components/Link";
import { HOME, TESTIMONIOS, WHATSAPP_URL, PHONE_LABEL, EMAIL } from "../lib/home";
import { FICHAS } from "../lib/fichas";
import { localize, usePageMeta, type Locale } from "../lib/router";

export default function HomePage({ locale }: { locale: Locale }) {
  usePageMeta("home", locale);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("video").forEach((v) => v.pause());
      return;
    }
    const v = document.getElementById("hero-video") as HTMLVideoElement | null;
    if (!v) return;
    const playlist = ["/video/hero-riviera.mp4", "/video/hero-cenote.mp4", "/video/hero-sunset.mp4"];
    let idx = 0;
    const next = () => {
      idx = (idx + 1) % playlist.length;
      v.src = playlist[idx];
      v.play().catch(() => {});
    };
    v.addEventListener("ended", next);
    return () => v.removeEventListener("ended", next);
  }, []);
  const t = HOME[locale];
  const switchPath = (l: Locale) => localize("home", l);

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      {/* HERO — full screen + video fondo Riviera: hotelera → cenote → atardecer */}
      <section className="fill-screen relative flex flex-col justify-center overflow-hidden pb-8 pt-[72px] xs:pb-10 xs:pt-[76px] ms:pt-[80px] ml:pt-[84px] md:pb-10 md:pt-[88px] lg:pb-10 lg:pt-[96px] laptop-l:py-12">
        {/* VIDEO fondo — secuencia: hotelera → cenote → atardecer (grabado con stock Pexels, reemplazar con tu grabación) */}
        <video
          id="hero-video"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/hero-riviera.mp4" type="video/mp4" />
        </video>
        {/* overlay para legibilidad — naranja/azul no compite con video */}
        <div className="absolute inset-0 bg-[var(--color-cream)]/78 backdrop-blur-[1px] md:bg-[var(--color-cream)]/72" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[var(--color-cream)]" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-5 px-5 xs:gap-6 xs:px-5 ms:px-6 ml:px-6 md:gap-6 md:px-8 lg:gap-6 lg:px-8 laptop-l:gap-8">
          {/* Copy */}
          <div className="col-span-12 lg:col-span-7">
            <p className="mono inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-coral)]" />
              {t.kicker}
            </p>

            <h1 className="display mt-5 text-[38px] xs:text-[42px] ms:text-[46px] ml:text-[50px] md:text-[58px] lg:text-[72px] laptop-l:text-[78px]">
              {locale === "es" ? (
                <>
                  Cancún
                  <br />
                  <span className="font-light italic tracking-[-0.05em]">es tuyo.</span>
                </>
              ) : locale === "en" ? (
                <>
                  Cancún
                  <br />
                  <span className="font-light italic">is yours.</span>
                </>
              ) : (
                <>
                  Cancún
                  <br />
                  <span className="font-light italic">è tua.</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-black/60 sm:text-[18px]">{t.heroSub}</p>
            <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-black/45">
              {locale === "es"
                ? "La Riviera no se visita en tour. Se maneja."
                : locale === "en"
                  ? "The Riviera isn’t a tour. You drive it."
                  : "La Riviera non è un tour. Si guida."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={localize("cotizador", locale)} className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-4 text-[15px] font-extrabold tracking-[-0.01em] text-white shadow-[0_10px_24px_rgba(249,115,22,0.28)] transition hover:translate-y-[-2px] hover:bg-[var(--color-accent-dark)] hover:shadow-[0_16px_32px_rgba(249,115,22,0.36)]">
                {locale === "es" ? "Cotizar ahora" : locale === "en" ? "Get quote" : "Richiedi preventivo"}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            {/* Proof bar — no cuadrado, pills con rotación leve */}
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="pill inline-flex items-center gap-2 bg-white px-4 py-2 text-[13px] font-bold shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--color-lime)]" /> {t.price}
                <span className="font-normal text-black/50">· {t.priceNote}</span>
              </span>
              {t.stats.filter((s) => s.titulo !== "0").map((s) => (
                <span key={s.titulo} className="pill inline-flex items-center gap-1.5 border border-black/10 bg-[var(--color-cream)] px-4 py-2 text-[13px]">
                  <strong>{s.titulo}</strong>
                  <span className="text-black/50">{s.texto}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Booking island — con hover + mapa pirata */}
          <div className="col-span-12 lg:col-span-5">
            <div className="group relative mx-auto max-w-[420px] transition duration-500 hover:-translate-y-1 lg:ml-auto">
              {/* floating badge */}
              <div className="absolute -right-2 -top-3 z-10 rotate-3 rounded-2xl bg-[var(--color-coral)] px-3 py-2 text-[11px] font-bold tracking-[0.08em] text-white shadow-lg transition group-hover:rotate-0 group-hover:scale-105 sm:right-0">
                {locale === "es" ? "SIN TARJETA • SIN DEPÓSITO" : "NO CARD • NO DEPOSIT"}
              </div>

              <div className="blob-soft relative overflow-hidden border border-black/10 bg-white p-5 shadow-[0_20px_60px_rgba(11,15,26,0.12)] transition duration-500 group-hover:shadow-[0_28px_80px_rgba(11,15,26,0.18)] group-hover:border-black/15 sm:p-6">
                <div className="mono flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-black/40">
                  <span>COTIZA EN 30 SEG • WHATSAPP</span>
                  <span className="rounded-full bg-[var(--color-lime)] px-2 py-1 text-black transition group-hover:bg-[var(--color-accent-dark)] group-hover:text-white">24/7</span>
                </div>

                {/* Mapa pirata — pergamino, brújula y tesoro */}
                <div className="relative mt-4 overflow-hidden rounded-[20px] border border-[#d8c9a5] bg-[#fdf6e3] p-4 text-[#3b2f1a] shadow-inner">
                  {/* textura pergamino */}
                  <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")" }} aria-hidden />
                  {/* bordes quemados */}
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-[#c9b896] opacity-60" aria-hidden />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mono text-[10px] tracking-[0.16em] text-[#8a7355]">MAPA • RIVIERA MAYA</p>
                      <p className="display mt-1 text-[19px] leading-none text-[#1a1205]">90 km de tesoros</p>
                      <p className="mono mt-1 text-[10px] text-[#8a7355]">Cancún → Tulum en 1:30h</p>
                    </div>
                    {/* brújula */}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#c9b896] bg-white text-[#3b2f1a] shadow-sm transition duration-500 group-hover:rotate-45">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                        <circle cx="12" cy="12" r="8" />
                        <path d="M12 2 L13.5 9 L12 12 L10.5 9 Z" fill="currentColor" />
                        <path d="M12 22 L10.5 15 L12 12 L13.5 15 Z" opacity="0.35" />
                        <path d="M2 12 L9 10.5 L12 12 L9 13.5 Z" opacity="0.35" />
                        <path d="M22 12 L15 13.5 L12 12 L15 10.5 Z" opacity="0.35" />
                      </svg>
                    </span>
                  </div>

                  {/* ruta tesoro — siempre moviéndose */}
                  <svg viewBox="0 0 360 90" className="mt-4 h-[84px] w-full" aria-hidden>
                    <path
                      d="M12 72 C 70 14, 130 18, 178 48 S 270 88, 348 28"
                      fill="none"
                      stroke="#8a5a1f"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeDasharray="7 7"
                      opacity="0.9"
                      style={{ animation: "dash 1.1s linear infinite" }}
                    />
                    {/* puntos tesoro */}
                    <g className="transition duration-500 group-hover:scale-[1.03]" style={{ transformOrigin: "180px 45px" }}>
                      <text x="10" y="58" fontSize="14" textAnchor="middle">⚓</text>
                      <text x="108" y="18" fontSize="11">✦</text>
                      <text x="183" y="42" fontSize="12">◎</text>
                      <text x="263" y="70" fontSize="11">⬢</text>
                      <text x="342" y="22" fontSize="14">✕</text>
                    </g>
                  </svg>
                  <div className="mono flex justify-between px-1 text-[8px] font-bold tracking-[0.1em] text-[#6b5a3a]">
                    <span>CANCÚN</span>
                    <span>P.MORELOS</span>
                    <span>PLAYA</span>
                    <span>AKUMAL</span>
                    <span>TULUM ✕</span>
                  </div>
                  <p className="mono mt-2 text-center text-[9px] tracking-[0.1em] text-[#8a7355]">— SIGUE LA RUTA —</p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-[var(--color-cream)] p-3 text-center">
                    <p className="text-[11px] font-bold tracking-[0.08em]">Aeropuerto</p>
                    <p className="mono text-[11px] text-black/50">CUN 06 min</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-ink)] p-3 text-center text-white">
                    <p className="text-[11px] font-bold">Kilometraje</p>
                    <p className="mono text-[11px] text-white/60">Ilimitado</p>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-white p-3 text-center">
                    <p className="text-[11px] font-bold">Pet Friendly</p>
                    <p className="mono text-[11px] text-black/50">Consulta</p>
                  </div>
                </div>

                <p className="mono mt-3 text-center text-[10px] leading-relaxed text-black/40">Sin letras chicas. Entrega donde estés.</p>
              </div>

              {/* shadow blob */}
              <div className="pointer-events-none absolute -bottom-6 left-6 right-6 -z-10 h-10 rounded-[32px] bg-black/10 blur-xl" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE — destinos, rompe la cuadrícula */}
      <div className="overflow-hidden border-y border-black/10 bg-[var(--color-lime)] py-3">
        <div className="mono flex animate-[marquee_22s_linear_infinite] whitespace-nowrap text-[12px] font-bold tracking-[0.14em]">
          <span className="mx-6">CANCÚN • PLAYA DEL CARMEN • PUERTO MORELOS • CENOTE • AKUMAL • TULUM • AEROPUERTO CUN •</span>
          <span className="mx-6" aria-hidden>
            CANCÚN • PLAYA DEL CARMEN • PUERTO MORELOS • CENOTE • AKUMAL • TULUM • AEROPUERTO CUN •
          </span>
          <span className="mx-6" aria-hidden>
            CANCÚN • PLAYA DEL CARMEN • PUERTO MORELOS • CENOTE • AKUMAL • TULUM • AEROPUERTO CUN •
          </span>
        </div>
      </div>

      {/* RENTAR FÁCIL — Motors specs × Spyker (solo acomodo, fondo claro como al inicio) */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display mt-3 max-w-[16ch] text-[32px] leading-[0.9] text-[#050a14] sm:text-[42px]">{t.benefitsTitle}</h2>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-12 gap-4">
          <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
            <article className="flex flex-1 flex-col gap-3 rounded-[28px] bg-[var(--color-ink)] p-6 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-lime)] text-black">✓</span>
              <h3 className="text-[17px] font-bold leading-tight">{t.benefits[0].titulo}</h3>
              <p className="text-[13px] leading-relaxed text-white/70">{t.benefits[0].texto}</p>
            </article>
            <article className="flex flex-1 flex-col gap-2 rounded-[28px] bg-[var(--color-cream)] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ink)] text-white">24</span>
              <h3 className="text-[17px] font-bold">{t.benefits[2].titulo}</h3>
              <p className="text-[13px] leading-relaxed text-black/60">{t.benefits[2].texto}</p>
            </article>
          </div>

          <div className="col-span-12 overflow-hidden rounded-[28px] bg-black lg:col-span-4 lg:row-span-1 lg:min-h-[440px]">
            <div className="relative h-[280px] lg:h-full lg:min-h-[440px]">
              <img src="/img/cenote-default.jpg" alt="Riviera Maya cenote" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold">DESDE $750</span>
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
            <article className="flex flex-1 flex-col gap-2 rounded-[28px] bg-[var(--color-cream)] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ink)] text-white">∞</span>
              <h3 className="text-[17px] font-bold">{t.benefits[1].titulo}</h3>
              <p className="text-[13px] leading-relaxed text-black/60">{t.benefits[1].texto}</p>
            </article>
            <article className="flex flex-1 flex-col gap-2 rounded-[28px] bg-[#f97316] p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white">0</span>
              <h3 className="text-[17px] font-bold">{t.benefits[3].titulo}</h3>
              <p className="text-[13px] leading-relaxed text-black/70">{t.benefits[3].texto}</p>
            </article>
          </div>
        </div>
      </section>

      {/* INFO AÑADIDA de tu captura — sin Covid, como extra debajo */}
      <section className="relative overflow-hidden bg-[#0a1930]">
        <img src="/img/cenote-default.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.14]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1930]/50 to-[#0a1930]" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-6 lg:px-8">
          <h2 className="text-center text-[22px] font-extrabold tracking-tight text-white sm:text-[26px]">Satisfacción Garantizada</h2>
          <div className="mx-auto mt-5 grid max-w-[720px] grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { title: "Sin tarjeta de crédito", icon: "◫" },
              { title: "Distintas formas de pago", icon: "$" },
              { title: "Cobertura amplia de seguro", icon: "♡" },
              { title: "Pet-Friendly", icon: "🐾" },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[14px] text-white">{b.icon}</span>
                <p className="mono mt-2 text-[11px] font-bold leading-tight tracking-[0.06em] text-white">{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7f9] py-10">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-6">
          <div className="text-center sm:text-left">
            <p className="mono text-[11px] font-bold tracking-[0.14em] text-[#f97316]">PROMOCIONES VIGENTES</p>
            <h3 className="mt-1 text-[18px] font-bold leading-tight text-[#050a14]">¿Hay promo esta semana? Pregunta y te decimos.</h3>
            <p className="mono mt-1 text-[11px] text-black/40">Sin spam, solo la vigente por WhatsApp.</p>
          </div>
          <a href="https://wa.me/529981684805?text=Hola%20SOMCAR%2C%20quiero%20saber%20sobre%20sus%20promociones%20vigentes%20para%20renta%20en%20Canc%C3%BAn" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-6 py-3 text-[13px] font-bold text-white shadow-[0_10px_24px_rgba(249,115,22,0.25)] hover:bg-[#c2410c]">
            Preguntar por WhatsApp <span>→</span>
          </a>
        </div>
      </section>

      {/* ¿A DÓNDE QUIERES IR? — muy llamativo, lleva a /ruta */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-12 text-white sm:py-16">
        <img src="/img/cenote-default.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.08]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)] via-[var(--color-ink)]/90 to-[var(--color-ink)]" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0 overflow-hidden">
              <p className="mono inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-[var(--color-lime)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-lime)] animate-pulse" /> LA RIVIERA EN 90 KM
              </p>
              <h2 className="display mt-3 text-[30px] sm:text-[44px]">{t.destTitle}</h2>
              <p className="mt-2 truncate whitespace-nowrap text-[13px] sm:text-[14px] leading-relaxed text-white/60">{locale === "es" ? "Todo el Caribe en auto, en tu carro a tu ritmo y horarios." : locale === "en" ? "The whole Caribbean by car, at your pace and schedule." : "Tutti i Caraibi in auto, al tuo ritmo e orari."}</p>
            </div>
            <Link to={localize("ruta", locale)} className="mono hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-black hover:bg-[var(--color-lime)] sm:inline-flex">
              Ver ruta completa →
            </Link>
          </div>

          <div className="mt-8 overflow-hidden">
            <div className="flex w-max animate-[carousel_28s_linear_infinite] gap-4 sm:gap-5 lg:gap-6">
              {[
                { place: "Cancún", km: "0 km", time: "Salida", do: "Playa + mercado 28" },
                { place: "Puerto Morelos", km: "36 km", time: "28 min", do: "Snorkel en arrecife" },
                { place: "Playa del Carmen", km: "68 km", time: "55 min", do: "Cenote + 5ta Av" },
                { place: "Akumal", km: "84 km", time: "1h 10m", do: "Nado con tortugas" },
                { place: "Tulum", km: "122 km", time: "1h 30m", do: "Ruinas + laguna" },
                { place: "Cancún", km: "0 km", time: "Salida", do: "Playa + mercado 28" },
                { place: "Puerto Morelos", km: "36 km", time: "28 min", do: "Snorkel en arrecife" },
                { place: "Playa del Carmen", km: "68 km", time: "55 min", do: "Cenote + 5ta Av" },
                { place: "Akumal", km: "84 km", time: "1h 10m", do: "Nado con tortugas" },
                { place: "Tulum", km: "122 km", time: "1h 30m", do: "Ruinas + laguna" },
              ].map((s, i) => (
                <div key={`${s.place}-${i}`} className="flex w-[78vw] shrink-0 flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white text-black sm:w-[320px] lg:w-[300px]">
                  <div className="relative h-[160px] overflow-hidden">
                    <img src="/img/cenote-default.jpg" alt={s.place} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold">{s.km}</span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-[var(--color-lime)] px-2.5 py-1 text-[10px] font-bold text-black">{s.time}</span>
                    <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-[11px] font-bold">{(i % 5) + 1}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[16px] font-bold leading-none">{s.place}</p>
                    <p className="mono mt-1 text-[11px] font-bold tracking-[0.08em] text-black/50">{s.do.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SERVICIOS — editorial, no cards iguales */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[28px] sm:text-[36px]">{t.servicesTitle}</h2>
          <p className="max-w-[40ch] text-[13px] leading-relaxed text-black/60">{t.servicesSub}</p>
        </div>

        <div className="mt-8 grid gap-4">
          {FICHAS.map((f, i) => (
            <Link
              key={f.slug}
              to={localize("ficha", locale, f.slug)}
              className={`group relative flex flex-col gap-4 overflow-hidden border border-black/10 bg-white p-6 transition hover:shadow-[0_16px_40px_rgba(11,15,26,0.08)] sm:p-7 ${i % 2 === 0 ? "rounded-[28px] lg:flex-row lg:items-center" : "rounded-[32px] lg:flex-row-reverse lg:items-center"}`}
            >
              <span className="mono absolute right-4 top-4 rounded-full border border-black/10 bg-[var(--color-cream)] px-2.5 py-1 text-[11px] font-bold tracking-[0.1em]">0{i + 1} • {FICHAS.length}</span>
              <div className={`grid h-16 w-16 shrink-0 place-items-center text-[22px] font-bold ${i % 2 === 0 ? "rounded-[20px] bg-[var(--color-ink)] text-white" : "rounded-full bg-[var(--color-lime)] text-black"}`}>
                {i === 0 ? "◐" : "⇄"}
              </div>
              <div className="flex-1">
                <h3 className="display text-[22px] sm:text-[26px]">{f.datos[locale].nombre}</h3>
                <p className="mt-2 max-w-[56ch] text-[13px] leading-relaxed text-black/60">{f.datos[locale].resumen}</p>
                <span className="mono mt-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em]">
                  Ver detalles <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-white transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-[var(--color-cream)] px-4 py-2 text-[11px] font-bold lg:inline-flex">WhatsApp fotos ↗</div>
            </Link>
          ))}
        </div>

        {/* Promo — pill gigante, no rectángulo */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[28px] bg-[var(--color-lime)] p-6 sm:flex-row sm:p-8">
          <div>
            <p className="display text-[20px] sm:text-[24px]">{t.promoTitle}</p>
            <p className="mono mt-1 text-[12px] opacity-60">{t.promoText}</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="shrink-0 rounded-full bg-black px-6 py-3 text-[13px] font-bold text-white">
            Reservar 7 días
          </a>
        </div>
      </section>

      {/* PROCESO — timeline vertical conector, no 4 cuadrados */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
          <h2 className="display text-[28px] sm:text-[36px]">{t.stepsTitle}</h2>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-4 right-4 top-[28px] hidden h-px bg-black/10 lg:block" aria-hidden />
            {t.steps.map((s, i) => (
              <div key={s.titulo} className="relative flex gap-4 rounded-[24px] border border-black/10 bg-[var(--color-cream)] p-5 sm:flex-col">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-ink)] text-[14px] font-bold text-white sm:h-12 sm:w-12 sm:text-[16px]">{i + 1}</span>
                <div>
                  <h3 className="text-[15px] font-bold leading-tight">{s.titulo}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-black/60">{s.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS — quotes grandes, no cards grises */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[28px] sm:text-[32px]">{t.testiTitle}</h2>
          <p className="mono text-[11px] tracking-[0.1em] text-black/40">{t.testiSub}</p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {TESTIMONIOS.map((x, i) => (
            <figure key={x.nombre} className={`relative overflow-hidden p-6 sm:p-7 ${i === 1 ? "rounded-[32px] bg-[var(--color-ink)] text-white" : "rounded-[24px] border border-black/10 bg-white"}`}>
              <span className={`absolute right-6 top-6 text-[48px] leading-none opacity-10 ${i === 1 ? "text-white" : "text-black"}`}>“</span>
              <p className="mono text-[11px] tracking-[0.12em] text-[var(--color-coral)]">★★★★★</p>
              <blockquote className={`mt-3 text-[15px] leading-relaxed ${i === 1 ? "text-white/90" : "text-black/70"}`}>“{x.texto}”</blockquote>
              <figcaption className={`mono mt-4 text-[11px] font-bold tracking-[0.08em] ${i === 1 ? "text-white/60" : "text-black/50"}`}>— {x.nombre}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ — acordeón limpio */}
      <section className="bg-[var(--color-cream)] py-12 sm:py-16">
        <div className="mx-auto max-w-[860px] px-5 sm:px-6 lg:px-8">
          <h2 className="display text-center text-[28px] sm:text-[32px]">{t.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {t.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-black/10 bg-white open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[14px] font-bold">
                  <span>{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-white transition group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-black/10 px-5 py-4 text-[13px] leading-relaxed text-black/60">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO — CTA grande, no cuadrado azul */}
      <section id="contacto" className="bg-[var(--color-ink)] px-5 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="display text-[36px] leading-[0.9] sm:text-[48px]">{t.contactTitle}</h2>
              <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-white/60">{t.contactSub} Respuesta real, no bot.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-3 rounded-full bg-[var(--color-lime)] px-6 py-4 text-[14px] font-bold text-black transition hover:bg-[#d4e600]">
                  WhatsApp: {PHONE_LABEL}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-xs text-white">↗</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-[14px] font-bold text-white backdrop-blur hover:bg-white hover:text-black">
                  {EMAIL}
                </a>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-6 text-black lg:col-span-4">
              <p className="mono text-[11px] font-bold tracking-[0.14em] text-black/40">ENCUÉNTRANOS</p>
              <p className="mt-2 text-[13px] font-bold leading-relaxed">Aeropuerto CUN • Cancún centro • Playa del Carmen</p>
              <p className="mono mt-2 text-[11px] leading-relaxed text-black/50">Entrega y recogida donde estés. Sin mostrador, sin fila.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={localize("terminos", locale)} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-bold">
                  Términos
                </Link>
                <Link to={localize("privacidad", locale)} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-bold">
                  Privacidad
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] tracking-[0.08em] text-white/40">
            <span>SOMCAR · Soluciones Móviles del Caribe</span>
            <span className="flex gap-3">
              <a href="https://www.facebook.com/SolucionesMovilesdelCaribe/" target="_blank" rel="noopener" className="hover:text-white">
                Facebook
              </a>
              <a href="https://www.instagram.com/somcar_mx/" target="_blank" rel="noopener" className="hover:text-white">
                Instagram
              </a>
            </span>
          </div>
        </div>
      </section>

      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.33%)}}@keyframes dash{to{stroke-dashoffset:-14}}@keyframes carousel{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){[style*="animation: dash"],[style*="animation: carousel"]{animation:none!important}}`}</style>
    </div>
  );
}
