import Header from "../components/Header";
import Link from "../components/Link";
import { HOME, TESTIMONIOS, WHATSAPP_URL, PHONE_LABEL, EMAIL } from "../lib/home";
import { FICHAS } from "../lib/fichas";
import { localize, usePageMeta, type Locale } from "../lib/router";

function Eyebrow({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f97316]">{children}</p>;
}

function SectionTitle({ title, sub, dark }: { title: string; sub: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className={`mt-1 text-3xl font-extrabold tracking-tight short:text-2xl sm:text-4xl ${dark ? "text-white" : "text-[#0a3d7a]"}`}>{title}</h2>
      <p className={`mt-2 text-[15px] short:mt-1 short:text-sm ${dark ? "text-white/75" : "text-slate-600"}`}>{sub}</p>
    </div>
  );
}

export default function HomePage({ locale }: { locale: Locale }) {
  usePageMeta("home", locale);
  const t = HOME[locale];
  const switchPath = (l: Locale) => localize("home", l);

  return (
    <div>
      <Header locale={locale} switchPath={switchPath} />

      {/* HERO — pantalla completa en laptop */}
      <section id="inicio" className="fill-screen relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#072c58] pb-10 pt-[96px] text-white max-sm:pb-8 max-sm:pt-20 sm:pt-[104px]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f97316]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#0a3d7a] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Eyebrow>{t.kicker}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight max-sm:mt-4 ms:text-5xl sm:text-6xl lg:text-[68px]">
            {locale === "es" ? "Renta de autos en Cancún" : locale === "en" ? "Car rental in Cancun" : "Noleggio auto a Cancún"}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">{t.heroSub}</p>
          <div className="mt-7 flex flex-wrap gap-3 max-sm:mt-5">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="rounded-xl bg-[#f97316] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c2410c]">
              {t.ctaBook}
            </a>
            <Link to={localize("servicios", locale)} className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              {t.ctaServices}
            </Link>
          </div>
          <div className="mt-7 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 max-sm:mt-5 max-sm:pt-5 ms:gap-6">
            <div>
              <p className="text-xl font-extrabold text-[#f97316] sm:text-2xl">{t.price}</p>
              <p className="mt-1 text-xs text-white/70">{t.priceNote}</p>
            </div>
            {t.stats.slice(0, 2).map((s) => (
              <div key={s.titulo}>
                <p className="text-xl font-extrabold sm:text-2xl">{s.titulo}</p>
                <p className="mt-1 text-xs text-white/70">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS — carrusel en móvil, grid desde sm */}
      <section className="fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionTitle title={t.benefitsTitle} sub={t.benefitsSub} />
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 short:mt-5 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {t.benefits.map((b) => (
              <article key={b.titulo} className="flex min-w-[80%] snap-center flex-col rounded-2xl border border-slate-200 bg-[#f6f7f9] p-5 short:p-4 sm:min-w-0">
                <span className="flex h-11 w-11 short:h-9 short:w-9 items-center justify-center rounded-xl bg-[#0a3d7a] text-lg font-extrabold text-white">✓</span>
                <h3 className="mt-3 short:mt-2 text-[15px] short:text-sm font-bold leading-snug text-[#0a3d7a]">{b.titulo}</h3>
                <p className="mt-1.5 short:mt-1 text-sm short:text-[13px] text-slate-600">{b.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS — fichas desde datos */}
      <section className="fill-screen flex flex-col justify-center bg-[#f6f7f9] py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionTitle title={t.servicesTitle} sub={t.servicesSub} />
          <div className="mt-8 grid grid-cols-1 gap-4 short:mt-5 sm:gap-5 ms:grid-cols-2 lg:gap-6">
            {FICHAS.map((f) => (
              <Link key={f.slug} to={localize("ficha", locale, f.slug)} className="group rounded-2xl border border-slate-200 bg-white p-6 short:p-4 transition hover:-translate-y-1 hover:border-[#f97316] hover:shadow-[0_12px_28px_rgba(10,61,122,0.12)]">
                <h3 className="text-xl font-extrabold text-[#0a3d7a] group-hover:text-[#f97316]">{f.datos[locale].nombre}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.datos[locale].resumen}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionTitle title={t.stepsTitle} sub="" />
          <ol className="mt-8 grid grid-cols-1 gap-4 short:mt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {t.steps.map((s, i) => (
              <li key={s.titulo} className="rounded-2xl bg-[#0a3d7a] p-6 short:p-4 text-white">
                <p className="text-3xl font-extrabold text-[#f97316]">{i + 1}</p>
                <h3 className="mt-2 text-base font-bold">{s.titulo}</h3>
                <p className="mt-1 text-sm text-white/75">{s.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROMO */}
      <section className="bg-[#f97316] py-12 text-white sm:py-14">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.promoTitle}</h2>
          <p className="mt-2 text-white/90">{t.promoText}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="mt-6 inline-block rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#c2410c] transition hover:bg-[#f6f7f9]">
            {t.ctaBook}
          </a>
        </div>
      </section>

      {/* DESTINOS */}
      <section className="fill-screen flex flex-col justify-center bg-[#f6f7f9] py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionTitle title={t.destTitle} sub={t.destSub} />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3 short:mt-5">
            {t.dests.map((d) => (
              <li key={d} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#0a3d7a]">{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="fill-screen flex flex-col justify-center bg-white py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionTitle title={t.testiTitle} sub={t.testiSub} />
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 short:mt-5 [scrollbar-width:none] sm:pb-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {TESTIMONIOS.map((x) => (
              <figure key={x.nombre} className="flex min-w-[85%] snap-center flex-col rounded-2xl border border-slate-200 bg-[#f6f7f9] p-6 short:p-4 sm:min-w-0">
                <p className="text-[#f97316]" aria-label="5 de 5">★★★★★</p>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-700">“{x.texto}”</blockquote>
                <figcaption className="mt-4 text-sm font-bold text-[#0a3d7a]">{x.nombre}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="fill-screen flex flex-col justify-center bg-[#f6f7f9] py-16 sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <SectionTitle title={t.faqTitle} sub="" />
          <div className="mt-8 space-y-3 short:mt-5">
            {t.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white px-5 py-4">
                <summary className="cursor-pointer list-none text-[15px] font-bold text-[#0a3d7a]">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="fill-screen flex scroll-mt-20 flex-col justify-center bg-[#072c58] py-16 text-white sm:py-20 lg:py-10">
        <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.contactTitle}</h2>
          <p className="mt-2 text-white/75">{t.contactSub}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="rounded-xl bg-[#f97316] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#c2410c]">
              WhatsApp: {PHONE_LABEL}
            </a>
            <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#041c3a] py-8 text-center text-xs text-white/60">
        <p>SOMCAR · Soluciones Móviles del Caribe</p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link to={localize("terminos", locale)}>Términos</Link>
          <Link to={localize("privacidad", locale)}>Privacidad</Link>
          <a href="https://www.facebook.com/SolucionesMovilesdelCaribe/" target="_blank" rel="noopener" className="underline">Facebook</a>
          <a href="https://www.instagram.com/somcar_mx/" target="_blank" rel="noopener" className="underline">Instagram</a>
        </p>
      </footer>
    </div>
  );
}
