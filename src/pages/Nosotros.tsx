import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "../components/Link";
import { localize, usePageMeta, type Locale } from "../lib/router";

export default function NosotrosPage({ locale }: { locale: Locale }) {
  usePageMeta("nosotros", locale);
  const switchPath = (l: Locale) => localize("nosotros", l);

  const t = {
    es: {
      kicker: "SOMCAR • 9 años • Soluciones Móviles del Caribe",
      title: "Renta de autos en Cancún",
      sub: "#RentaUnAutoConSOMCAR — descubre el Caribe libremente.",
      storyTitle: "En SOMCAR te facilitamos tu renta",
      story: "Te ofrecemos una manera sencilla para tu renta de autos en Cancún. Contamos con gran variedad desde compactos hasta vans, todas en perfectas condiciones para tu seguridad y comodidad. Atención 24/7 los 7 días para cualquier pregunta o percance.",
      values: [
        { title: "9 años de experiencia", desc: "Empresa cancunense con casi una década moviendo a viajeros por la Riviera Maya." },
        { title: "Excelentes precios", desc: "Los mejores del mercado. Impuestos y seguros incluidos." },
        { title: "Kilómetros ilimitados", desc: "Sin límite. De Cancún a Tulum sin contar kilómetros." },
        { title: "Pickup & Regreso 24/7", desc: "Lunes a domingo, a cualquier hora." },
        { title: "Múltiples puntos", desc: "Cancún, Playa del Carmen o Aeropuerto — donde estés." },
        { title: "Pet Friendly", desc: "Pregunta por unidades Pet Friendly." },
      ],
      commitment: "Compromiso",
      commitmentTitle: "Tu tiempo manda",
      commitmentDesc: "Si tu vuelo se retrasa, te esperamos. Si quieres quedarte 2h en un cenote, te esperamos. El auto es para que la Riviera sea tuya, no del tour.",
      cta: "Cotiza tu ruta",
      cta2: "Habla por WhatsApp",
    },
    en: {
      kicker: "SOMCAR • Caribbean Mobility",
      title: "We don't rent cars.\nWe give freedom.",
      sub: "From Cancun, we make the Riviera simple — no fine print, no card. You decide where and how long.",
      storyTitle: "From Cancun for the Caribbean",
      story: "We saw tourists paying held deposits and surprise insurance. SOMCAR is the opposite: a car ready at airport, ADO, Playa, Tulum or where you are, with unlimited km and minutes-fast WhatsApp reply.",
      values: [
        { title: "No friction", desc: "No card, no deposit." },
        { title: "No clock", desc: "Unlimited km." },
        { title: "No surprises", desc: "Taxes and insurance included." },
        { title: "24/7 real", desc: "Delivery where you are." },
      ],
      commitment: "Commitment",
      commitmentTitle: "Your time rules",
      commitmentDesc: "Delayed flight? We wait. Stay 2h at a cenote? We wait.",
      cta: "Get a quote",
      cta2: "WhatsApp us",
    },
    it: {
      kicker: "SOMCAR • Soluzioni Mobili dei Caraibi",
      title: "Non noleggiamo auto.\nDiamo libertà.",
      sub: "Da Cancún, rendiamo la Riviera semplice — senza clausole, senza carta.",
      storyTitle: "Da Cancún per i Caraibi",
      story: "Turisti con depositi bloccati e assicurazioni a sorpresa. SOMCAR è l'opposto: auto pronta ovunque, km illimitato.",
      values: [
        { title: "Senza attrito", desc: "Senza carta né deposito." },
        { title: "Senza orologio", desc: "Km illimitato." },
        { title: "Senza sorprese", desc: "Tasse e assicurazione incluse." },
        { title: "24/7 vero", desc: "Consegna dove sei." },
      ],
      commitment: "Impegno",
      commitmentTitle: "Il tuo tempo comanda",
      commitmentDesc: "Volo in ritardo? Aspettiamo. Cenote 2h? Aspettiamo.",
      cta: "Richiedi preventivo",
      cta2: "WhatsApp",
    },
  }[locale];

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="/img/cenote-default.webp" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[var(--color-cream)]/82 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="mono inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em]">{t.kicker}</p>
          <h1 className="display mt-4 whitespace-pre-line text-[36px] leading-[0.9] sm:text-[48px] lg:text-[56px]">{t.title}</h1>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-black/60">{t.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={localize("cotizador", locale)} className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-[13px] font-bold text-white hover:bg-[var(--color-accent-dark)]">
              {t.cta}
            </Link>
            <a href="https://wa.me/529981684805" target="_blank" rel="noopener" className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold hover:bg-black hover:text-white">
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* HISTORIA — con pin 9 años */}
      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white">{locale === "es" ? "★ 9 AÑOS DE EXPERIENCIA" : locale === "en" ? "★ 9 YEARS OF EXPERIENCE" : "★ 9 ANNI DI ESPERIENZA"}</div>
          <h2 className="display mt-3 text-[28px] sm:text-[32px]">{t.storyTitle}</h2>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-black/60">{t.story}</p>
          <p className="mono mt-3 text-[13px] italic text-black/50">{locale === "es" ? "“Descubre el Caribe libremente y #RentaUnAutoConSOMCAR.”" : locale === "en" ? "“Discover the Caribbean freely — #RentACarWithSOMCAR.”" : "“Scopri i Caraibi liberamente — #NoleggiaConSOMCAR.”"}</p>
          <p className="mono mt-4 inline-flex rounded-full bg-[var(--color-ink)] px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-white">Cancún • Puerto Morelos • Playa • Tulum • CUN</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {t.values.map((v) => (
            <div key={v.title} className={`rounded-[20px] border p-5 ${t.values[0].title === v.title ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white" : "border-black/10 bg-white"}`}>
              <p className="text-[15px] font-bold leading-tight">{v.title}</p>
              <p className={`mt-1 text-[12px] leading-relaxed ${t.values[0].title === v.title ? "text-white/90" : "text-black/60"}`}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPROMISO */}
      <section className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[var(--color-ink)] p-6 text-white sm:p-8 lg:p-10">
          <p className="mono text-[11px] font-bold tracking-[0.14em] text-white/50">{t.commitment}</p>
          <h2 className="display mt-2 max-w-[14ch] text-[28px] sm:text-[32px]">{t.commitmentTitle}</h2>
          <p className="mt-3 max-w-[48ch] text-[13px] leading-relaxed text-white/60">{t.commitmentDesc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={localize("ruta", locale)} className="rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black hover:bg-[var(--color-accent)] hover:text-white">
              {locale === "es" ? "Ver la ruta" : locale === "en" ? "See the route" : "Vedi il percorso"}
            </Link>
            <Link to={localize("cotizador", locale)} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-bold text-white hover:bg-white hover:text-black">
              {locale === "es" ? "Cotizar ahora" : locale === "en" ? "Get quote" : "Richiedi preventivo"}
            </Link>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </div>
  );
}
