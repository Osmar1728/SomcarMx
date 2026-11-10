import Link from "./Link";
import { whatsappUrl, PHONE_LABEL, EMAIL, HOME } from "../lib/home";
import { localize, type Locale } from "../lib/router";

export default function Footer({ locale }: { locale: Locale }) {
  const t = HOME[locale];
  return (
    <section id="contacto" className="bg-[var(--color-ink)] px-5 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display text-[36px] leading-[0.9] sm:text-[48px]">{t.contactTitle}</h2>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-white/60">{t.contactSub} Respuesta real, no bot.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whatsappUrl(locale)} target="_blank" rel="noopener" className="inline-flex items-center gap-3 rounded-full bg-[var(--color-lime)] px-6 py-4 text-[14px] font-bold text-black transition hover:bg-[#d4e600]">
                WhatsApp: {PHONE_LABEL}
                <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-xs text-white">↗</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="rounded-full border border-white/20 bg-white/10 px-6 py-4 text-[14px] font-bold text-white backdrop-blur hover:bg-white hover:text-black">
                {EMAIL}
              </a>
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-6 text-black lg:col-span-4">
            <p className="mono text-[11px] font-bold tracking-[0.14em] text-black/40">{locale === "es" ? "ENCUÉNTRANOS" : locale === "en" ? "FIND US" : "DOVE SIAMO"}</p>
            <p className="mt-2 text-[13px] font-bold leading-relaxed">Aeropuerto CUN • Cancún centro • Playa del Carmen</p>
            <p className="mono mt-2 text-[11px] leading-relaxed text-black/50">{locale === "es" ? "Entrega y recogida donde estés. Sin mostrador, sin fila." : locale === "en" ? "Delivery and pickup where you are. No counter, no line." : "Consegna e ritiro dove sei. Senza sportello, senza fila."}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to={localize("terminos", locale)} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-bold">
                {locale === "es" ? "Términos" : locale === "en" ? "Terms" : "Termini"}
              </Link>
              <Link to={localize("privacidad", locale)} className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-bold">
                {locale === "es" ? "Privacidad" : locale === "en" ? "Privacy" : "Privacy"}
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
  );
}
