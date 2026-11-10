import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "../components/Link";
import { localize, usePageMeta, type Locale } from "../lib/router";
import { FICHAS } from "../lib/fichas";
import { whatsappUrl } from "../lib/home";

export default function ServiciosPage({ locale }: { locale: Locale }) {
  usePageMeta("servicios", locale);
  const switchPath = (l: Locale) => localize("servicios", l);
  const renta = FICHAS.find((f) => f.slug === "renta-de-autos")!;
  const shuttle = FICHAS.find((f) => f.slug === "shuttle")!;
  const tr = {
    es: {
      kicker: "ELIGE CÓMO MOVERTE",
      rentaBadge: "Desde $750 / día • Sin tarjeta",
      rentaBullets: ["Kilometraje ilimitado", "Entrega 24/7 • Aeropuerto CUN, Cancún, Playa, Tulum", "Seguro incluido • Pet friendly (consulta)"],
      shuttleBadge: "Privado • 24/7",
      shuttleBullets: ["Aeropuerto → hotel y viceversa", "Van privada, no compartida", "Asistencia 24/7 durante tu viaje"],
      verDetalles: "Ver detalles →",
      cotizarRenta: "Cotizar renta",
      cotizarShuttle: "Cotizar traslado",
      cual: "¿CUÁL TE CONVIENE?",
      elige: "Tú eliges el ritmo.",
      cualDesc: "¿Quieres explorar cenotes, playas y pueblos a tu hora? Renta. ¿Solo llegar y no manejar? Shuttle directo.",
      rentaTitle: "Renta",
      rentaPoints: ["3–7 días, km ilimitado", "Tú decides paradas", "Ideal para Riviera completa"],
      shuttleTitle: "Shuttle",
      shuttlePoints: ["Solo traslados", "Sin manejar, sin estacionar", "Ideal si solo es hotel-aeropuerto"],
      cta: "¿Dudas cuál te conviene? Te asesoramos en 2 minutos.",
      ctaBtn: "Cotizar ahora →",
    },
    en: {
      kicker: "CHOOSE HOW TO MOVE",
      rentaBadge: "From $750 / day • No card",
      rentaBullets: ["Unlimited mileage", "Delivery 24/7 • CUN Airport, Cancun, Playa, Tulum", "Insurance included • Pet friendly (ask)"],
      shuttleBadge: "Private • 24/7",
      shuttleBullets: ["Airport → hotel and back", "Private van, not shared", "24/7 assistance during your trip"],
      verDetalles: "View details →",
      cotizarRenta: "Quote rental",
      cotizarShuttle: "Quote shuttle",
      cual: "WHICH ONE FITS YOU?",
      elige: "You set the pace.",
      cualDesc: "Want to explore cenotes and beaches on your time? Rent. Just need to get there? Shuttle.",
      rentaTitle: "Rental",
      rentaPoints: ["3–7 days, unlimited km", "You choose stops", "Ideal for the whole Riviera"],
      shuttleTitle: "Shuttle",
      shuttlePoints: ["Transfers only", "No driving, no parking", "Ideal for hotel-airport only"],
      cta: "Not sure? We advise you in 2 minutes.",
      ctaBtn: "Get quote →",
    },
    it: {
      kicker: "SCEGLI COME MUOVERTI",
      rentaBadge: "Da $750 / giorno • Senza carta",
      rentaBullets: ["Chilometraggio illimitato", "Consegna 24/7 • Aeroporto CUN, Cancún, Playa, Tulum", "Assicurazione inclusa • Pet friendly (su richiesta)"],
      shuttleBadge: "Privato • 24/7",
      shuttleBullets: ["Aeroporto → hotel e ritorno", "Van privato, non condiviso", "Assistenza 24/7 durante il viaggio"],
      verDetalles: "Vedi dettagli →",
      cotizarRenta: "Richiedi noleggio",
      cotizarShuttle: "Richiedi transfer",
      cual: "QUALE FA PER TE?",
      elige: "Decidi tu il ritmo.",
      cualDesc: "Vuoi esplorare cenotes e spiagge con calma? Noleggia. Vuoi solo arrivare? Shuttle.",
      rentaTitle: "Noleggio",
      rentaPoints: ["3–7 giorni, km illimitato", "Decidi tu le tappe", "Ideale per l'intera Riviera"],
      shuttleTitle: "Navetta",
      shuttlePoints: ["Solo transfer", "Senza guidare, senza parcheggio", "Ideale solo hotel-aeroporto"],
      cta: "Dubbi? Ti consigliamo in 2 minuti.",
      ctaBtn: "Richiedi preventivo →",
    },
  }[locale];

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      <section className="relative overflow-hidden">
        <img src="/img/cenote-default.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <p className="mono inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" /> {tr.kicker}
          </p>
          <h1 className="display mt-4 max-w-[16ch] text-[34px] leading-[0.9] sm:text-[48px] lg:text-[56px]">
            {locale === "es" ? <>¿Rentas <span className="font-light italic">o te llevamos?</span></> : locale === "en" ? <>Rent <span className="font-light italic">or we drive you?</span></> : <>Noleggi <span className="font-light italic">o ti portiamo?</span></>}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-black/60">
            {locale === "es" ? "Dos servicios, misma promesa: sin tarjeta, km ilimitado y entrega donde estés. El auto para explorar, el traslado para llegar sin manejar." : locale === "en" ? "Two services, same promise: no card, unlimited km, delivery where you are." : "Due servizi, stessa promessa: senza carta, km illimitato."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-[32px] border border-black/10 bg-white p-6 sm:p-8">
            <img src="/img/renta-autos.webp" alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/img/cenote-default.webp")} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" aria-hidden />
            <span className="relative inline-flex w-fit rounded-full bg-white px-3 py-1 text-[11px] font-bold">{tr.rentaBadge}</span>
            <div className="relative mt-auto">
              <h2 className="display text-[28px] text-white sm:text-[32px]">{renta.datos[locale].nombre}</h2>
              <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-white/80">{renta.datos[locale].resumen}</p>
              <ul className="mt-4 space-y-1.5 text-[13px] text-white/90">
                {tr.rentaBullets.map((b) => (
                  <li key={b}>✓ {b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={localize("ficha", locale, renta.slug)} className="rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black hover:bg-[var(--color-lime)]">{tr.verDetalles}</Link>
                <Link to={localize("cotizador", locale)} className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-[13px] font-bold text-white hover:bg-[var(--color-accent-dark)]">{tr.cotizarRenta}</Link>
              </div>
            </div>
          </div>

          <div className="group relative flex min-h-[480px] flex-col overflow-hidden rounded-[32px] border border-black/10 bg-white p-6 sm:p-8">
            <img src="/img/shuttle-van.webp" alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="lazy" onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/img/cenote-default.webp")} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" aria-hidden />
            <span className="relative inline-flex w-fit rounded-full bg-[var(--color-lime)] px-3 py-1 text-[11px] font-bold text-black">{tr.shuttleBadge}</span>
            <div className="relative mt-auto">
              <h2 className="display text-[28px] text-white sm:text-[32px]">{shuttle.datos[locale].nombre}</h2>
              <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-white/80">{shuttle.datos[locale].resumen}</p>
              <ul className="mt-4 space-y-1.5 text-[13px] text-white/90">
                {tr.shuttleBullets.map((b) => (
                  <li key={b}>✓ {b}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={localize("ficha", locale, shuttle.slug)} className="rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black hover:bg-[var(--color-lime)]">{tr.verDetalles}</Link>
                <a href={whatsappUrl(locale, "shuttle")} target="_blank" rel="noopener" className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[13px] font-bold text-white hover:bg-black">{tr.cotizarShuttle}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white">
          <div className="grid lg:grid-cols-3">
            <div className="p-6 sm:p-7">
              <p className="mono text-[11px] font-bold tracking-[0.12em] text-black/40">{tr.cual}</p>
              <h3 className="mt-2 text-[18px] font-bold leading-tight">{tr.elige}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-black/60">{tr.cualDesc}</p>
            </div>
            <div className="border-t border-black/10 p-6 sm:p-7 lg:border-l lg:border-t-0">
              <p className="text-[14px] font-bold">{tr.rentaTitle}</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-black/60">
                {tr.rentaPoints.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
            <div className="border-t border-black/10 bg-[var(--color-cream)] p-6 sm:p-7 lg:border-l lg:border-t-0">
              <p className="text-[14px] font-bold">{tr.shuttleTitle}</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-black/60">
                {tr.shuttlePoints.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] bg-[#f97316] px-6 py-6 text-white sm:flex-row sm:px-8">
          <p className="text-[15px] font-bold">{tr.cta}</p>
          <Link to={localize("cotizador", locale)} className="rounded-full bg-black px-6 py-3 text-[13px] font-bold text-white hover:bg-white hover:text-black">{tr.ctaBtn}</Link>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
