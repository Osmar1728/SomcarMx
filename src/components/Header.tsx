import { LOCALES, localize, type Locale, type StaticPage } from "../lib/router";
import Link from "./Link";

const LABELS: Record<Locale, { page: StaticPage; label: string }[]> = {
  es: [
    { page: "home", label: "Inicio" },
    { page: "ruta", label: "Ruta" },
    { page: "nosotros", label: "Nosotros" },
    { page: "servicios", label: "Servicios" },
    { page: "contacto", label: "Contacto" },
  ],
  en: [
    { page: "home", label: "Home" },
    { page: "ruta", label: "Route" },
    { page: "nosotros", label: "About" },
    { page: "servicios", label: "Services" },
    { page: "contacto", label: "Contact" },
  ],
  it: [
    { page: "home", label: "Home" },
    { page: "ruta", label: "Percorso" },
    { page: "nosotros", label: "Chi siamo" },
    { page: "servicios", label: "Servizi" },
    { page: "contacto", label: "Contatti" },
  ],
};

export default function Header({ locale, switchPath }: { locale: Locale; switchPath: (l: Locale) => string }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-cream)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-3 px-5 sm:px-6 lg:px-8">
        <Link to={localize("home", locale)} className="flex items-center gap-3" aria-label="SOMCAR inicio">
          <img src="/img/logo-fondo-blanco.jpeg" alt="SOMCAR" className="h-8 w-auto rounded-full border border-black/10 object-contain p-0.5" />
          <span className="hidden text-[11px] font-bold tracking-[0.14em] sm:inline">SOMCAR</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LABELS[locale].slice(1).map((n) => (
            <Link
              key={n.page}
              to={localize(n.page, locale)}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-black/60 transition hover:bg-black hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to={localize("cotizador", locale)} className="hidden items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[var(--color-accent-dark)] sm:inline-flex">
            {locale === "es" ? "Cotizar" : locale === "en" ? "Quote" : "Preventivo"}
          </Link>
          <a
            href="https://wa.me/529981684805?text=Hola%20SOMCAR%20quiero%20cotizar%20renta%20desde%20%24750"
            target="_blank"
            rel="noopener"
            className="hidden items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-bold text-white transition hover:bg-black sm:inline-flex"
          >
            WhatsApp
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-lime)] text-[11px] text-black">↗</span>
          </a>
          <span className="flex items-center gap-1 rounded-full border border-black/10 bg-white p-1" aria-label="Language">
            {LOCALES.map((l) => (
              <Link
                key={l}
                to={switchPath(l)}
                className={`mono rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] transition ${l === locale ? "bg-[var(--color-ink)] text-white" : "text-black/50 hover:text-black"}`}
              >
                {l}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </header>
  );
}
