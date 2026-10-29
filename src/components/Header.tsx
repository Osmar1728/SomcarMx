import { LOCALES, localize, type Locale, type StaticPage } from "../lib/router";
import Link from "./Link";

const LABELS: Record<Locale, { page: StaticPage; label: string }[]> = {
  es: [
    { page: "home", label: "Inicio" },
    { page: "servicios", label: "Servicios" },
    { page: "contacto", label: "Contacto" },
  ],
  en: [
    { page: "home", label: "Home" },
    { page: "servicios", label: "Services" },
    { page: "contacto", label: "Contact" },
  ],
  it: [
    { page: "home", label: "Home" },
    { page: "servicios", label: "Servizi" },
    { page: "contacto", label: "Contatti" },
  ],
};

export default function Header({ locale, switchPath }: { locale: Locale; switchPath: (l: Locale) => string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#072c58]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link to={localize("home", locale)} className="flex items-center" aria-label="SOMCAR inicio">
          <img src="/img/logo-fondo-negro.jpeg" alt="SOMCAR Car Rental" className="h-10 w-auto rounded-lg" />
        </Link>
        <nav className="ml-4 hidden items-center gap-5 text-sm font-medium md:flex">
          {LABELS[locale].slice(1).map((n) => (
            <Link key={n.page} to={localize(n.page, locale)} className="text-white/80 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-3 text-sm" aria-label="Language">
          {LOCALES.map((l) => (
            <Link key={l} to={switchPath(l)} className={l === locale ? "font-bold text-[#f97316]" : "text-white/70 hover:text-white"}>
              {l.toUpperCase()}
            </Link>
          ))}
        </span>
      </div>
    </header>
  );
}
