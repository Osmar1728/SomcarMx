import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "../components/Link";
import { localize, usePageMeta, type Locale } from "../lib/router";
import { getFicha } from "../lib/fichas";


export default function FichaPage({ locale, slug }: { locale: Locale; slug: string }) {
  const f = getFicha(slug);
  usePageMeta("ficha", locale, slug);
  if (!f) {
    return (
      <div className="bg-[var(--color-cream)] py-12 text-center">No encontrado</div>
    );
  }
  const switchPath = (l: Locale) => localize("ficha", l, slug);
  const isRenta = slug === "renta-de-autos";
  const tr = {
    es: {
      heroBadgeRenta: "Desde $750 / día • Sin tarjeta",
      heroBadgeShuttle: "Privado • Aeropuerto - Hotel",
      pillKm: "Km ilimitado",
      pillSeguro: "Seguro incluido",
      pillEntrega: "Entrega 24/7",
      queIncluye: "QUÉ INCLUYE",
      noIncluye: "NO INCLUYE",
      incluye: ["Kilometraje ilimitado real", "Impuestos y seguro incluidos", "Entrega donde estés (CUN, Cancún, Playa, Tulum)", "Conductores adicionales $50/día", "Pet friendly (consulta)"],
      noIncluyeList: ["Gasolina — entregas igual, faltante $25/L", "Multas de tránsito", "Llaves $2,190 / Tarjeta $2,920 / Placa $2,920", "Limpieza por fumar $600"],
      requisitos: "Requisitos",
      reqPills: ["INE o Pasaporte vigente", "Licencia vigente con foto", "18+ años", "Sin tarjeta de crédito", "Sin depósito"],
      reqNote: "Fotos ilustrativas — se garantiza categoría, no modelo exacto.",
      flota: "Flota por categoría",
      flotaSub: "Garantizamos categoría, no modelo — foto ilustrativa",
      crossRenta: "¿Solo necesitas traslado aeropuerto-hotel?",
      crossShuttle: "¿Prefieres moverte libre toda la semana?",
      verShuttle: "Ver Shuttle →",
      verRenta: "Ver Renta →",
      shuttleIncluye: "Qué incluye el shuttle",
      shuttleBullets: ["Van privada (no compartida) hasta 6-8 pax", "Chofer y asistencia 24/7", "Silla bebé sin cargo (consulta)", "Espera por retraso de vuelo (avisa)"],
      puntos: "Puntos",
      puntosDesc: "Aeropuerto CUN / TQO • Cancún centro • Puerto Morelos • Playa del Carmen • Tulum • Valladolid • Dentro ciudad",
      puntosNote: "Hora y lugar juntos en el cotizador",
    },
    en: {
      heroBadgeRenta: "From $750 / day • No card",
      heroBadgeShuttle: "Private • Airport - Hotel",
      pillKm: "Unlimited km",
      pillSeguro: "Insurance included",
      pillEntrega: "Delivery 24/7",
      queIncluye: "WHAT'S INCLUDED",
      noIncluye: "NOT INCLUDED",
      incluye: ["Unlimited mileage", "Taxes and insurance included", "Delivery where you are (CUN, Cancun, Playa, Tulum)", "Additional drivers $50/day", "Pet friendly (ask)"],
      noIncluyeList: ["Gas — deliver same level, missing $25/L", "Traffic fines", "Keys $2,190 / Card $2,920 / Plate $2,920", "Smoking cleaning $600"],
      requisitos: "Requirements",
      reqPills: ["ID or Passport", "Valid driver license with photo", "18+ years", "No credit card", "No deposit"],
      reqNote: "Illustrative photos — category guaranteed, not exact model.",
      flota: "Fleet by category",
      flotaSub: "Category guaranteed, not model — illustrative photo",
      crossRenta: "Just need airport-hotel transfer?",
      crossShuttle: "Prefer to move freely all week?",
      verShuttle: "View Shuttle →",
      verRenta: "View Rental →",
      shuttleIncluye: "What shuttle includes",
      shuttleBullets: ["Private van (not shared) up to 6-8 pax", "Driver and 24/7 assistance", "Baby seat free (ask)", "Wait for flight delay (notify)"],
      puntos: "Pickup points",
      puntosDesc: "CUN / TQO Airport • Cancun downtown • Puerto Morelos • Playa del Carmen • Tulum • Valladolid • Inside city",
      puntosNote: "Time and place together in quote form",
    },
    it: {
      heroBadgeRenta: "Da $750 / giorno • Senza carta",
      heroBadgeShuttle: "Privato • Aeroporto - Hotel",
      pillKm: "Km illimitato",
      pillSeguro: "Assicurazione inclusa",
      pillEntrega: "Consegna 24/7",
      queIncluye: "COSA INCLUDE",
      noIncluye: "NON INCLUDE",
      incluye: ["Chilometraggio illimitato", "Tasse e assicurazione incluse", "Consegna dove sei (CUN, Cancún, Playa, Tulum)", "Conducenti aggiuntivi $50/giorno", "Pet friendly (su richiesta)"],
      noIncluyeList: ["Benzina — consegna stesso livello, mancante $25/L", "Multe", "Chiavi $2.190 / Tessera $2.920 / Targa $2.920", "Pulizia fumo $600"],
      requisitos: "Requisiti",
      reqPills: ["Carta d'identità o Passaporto", "Patente valida con foto", "18+ anni", "Senza carta di credito", "Senza deposito"],
      reqNote: "Foto illustrative — garantita categoria, non modello esatto.",
      flota: "Flotta per categoria",
      flotaSub: "Categoria garantita, non modello — foto illustrativa",
      crossRenta: "Ti serve solo transfer aeroporto-hotel?",
      crossShuttle: "Preferisci muoverti libero tutta la settimana?",
      verShuttle: "Vedi Navetta →",
      verRenta: "Vedi Noleggio →",
      shuttleIncluye: "Cosa include la navetta",
      shuttleBullets: ["Van privato (non condiviso) fino a 6-8 pax", "Autista e assistenza 24/7", "Seggiolino gratis (su richiesta)", "Attesa per ritardo volo (avvisa)"],
      puntos: "Punti",
      puntosDesc: "Aeroporto CUN / TQO • Cancún centro • Puerto Morelos • Playa del Carmen • Tulum • Valladolid • Dentro città",
      puntosNote: "Ora e luogo insieme nel preventivo",
    },
  }[locale];

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={isRenta ? "/img/renta-autos-riviera.webp" : "/img/shuttle-transfer.webp"} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/img/cenote-default.webp")} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" aria-hidden />
        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-bold">{isRenta ? tr.heroBadgeRenta : tr.heroBadgeShuttle}</span>
          <h1 className="display mt-4 max-w-[14ch] text-[32px] leading-[0.9] text-white sm:text-[48px]">{f.datos[locale].nombre}</h1>
          <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-white/80">{f.datos[locale].resumen}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="mono rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold">✓ {tr.pillKm}</span>
            <span className="mono rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold">✓ {tr.pillSeguro}</span>
            <span className="mono rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold">✓ {tr.pillEntrega}</span>
          </div>
        </div>
      </section>

      {isRenta ? (
        <>
          {/* INCLUYE / NO INCLUYE */}
          <section className="mx-auto max-w-[1440px] grid gap-4 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-7">
              <p className="mono text-[11px] font-bold tracking-[0.12em] text-[#0a3d7a]">{tr.queIncluye}</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed">
                {tr.incluye.map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] bg-[var(--color-ink)] p-6 text-white sm:p-7">
              <p className="mono text-[11px] font-bold tracking-[0.12em] text-white/40">{tr.noIncluye}</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-white/80">
                {tr.noIncluyeList.map((x) => (
                  <li key={x}>✕ {x}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* REQUISITOS */}
          <section className="mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-8">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-7">
              <h2 className="text-[18px] font-bold">{tr.requisitos}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {tr.reqPills.map((x, i) => (
                  <span key={x} className={`mono rounded-full px-4 py-2 text-[12px] font-bold ${i >= 3 ? "bg-[var(--color-lime)]" : "bg-[var(--color-cream)]"}`}>{x}</span>
                ))}
              </div>
              <p className="mono mt-3 text-[11px] text-black/40">{tr.reqNote}</p>
            </div>
          </section>

          {/* FLOTA POR CATEGORÍA */}
          <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-6 lg:px-8">
            <h2 className="display text-[22px] sm:text-[28px]">{tr.flota}</h2>
            <p className="mono mt-1 text-[12px] text-black/40">{tr.flotaSub}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { cat: "Económica", ex: "March, Ignis", pax: "4-5" },
                { cat: "Regular", ex: "Versa, Sentra", pax: "5" },
                { cat: "SUV", ex: "Creta, Tracker", pax: "5" },
                { cat: "Familiar", ex: "Ertiga, Avanza", pax: "7" },
                { cat: "Van", ex: "Hiace, Transit", pax: "12-15" },
              ].map((c) => (
                <div key={c.cat} className="group relative overflow-hidden rounded-[20px] border border-black/10 bg-white">
                  <div className="relative h-[190px] overflow-hidden bg-black sm:h-[200px]">
                    <img src={`/img/categoria-${c.cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.webp`} alt={c.cat} className="absolute inset-0 h-full w-full object-cover opacity-90 transition" loading="lazy" onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/img/renta-autos-riviera.webp")} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold">{c.cat.toUpperCase()}</span>
                    <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white">{c.pax} pax</span>
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] font-bold">{c.cat}</p>
                    <p className="mono text-[11px] text-black/50">Ej. {c.ex}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>



          {/* CROSS */}
          <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] bg-[var(--color-ink)] px-6 py-6 text-white sm:flex-row">
              <p className="text-[15px] font-bold">{tr.crossRenta}</p>
              <Link to={localize("ficha", locale, "shuttle")} className="rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black hover:bg-[var(--color-lime)]">{tr.verShuttle}</Link>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* SHUTTLE DETALLE */}
          <section className="mx-auto max-w-[1440px] grid gap-4 px-5 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-7">
              <h2 className="text-[18px] font-bold">{tr.shuttleIncluye}</h2>
              <ul className="mt-3 space-y-2 text-[13px] leading-relaxed">
                {tr.shuttleBullets.map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[24px] bg-[var(--color-lime)] p-6 sm:p-7">
              <h2 className="text-[18px] font-bold">{tr.puntos}</h2>
              <p className="mt-2 text-[13px] leading-relaxed">{tr.puntosDesc}</p>
              <p className="mono mt-3 text-[11px] text-black/60">{tr.puntosNote}</p>
            </div>
          </section>
          <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[24px] bg-white px-6 py-6 shadow-sm sm:flex-row">
              <p className="text-[15px] font-bold">{tr.crossShuttle}</p>
              <Link to={localize("ficha", locale, "renta-de-autos")} className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-[13px] font-bold text-white">{tr.verRenta}</Link>
            </div>
          </section>
        </>
      )}

      <Footer locale={locale} />
    </div>
  );
}
