import { useState } from "react";
import { LOCALES, localize, type Locale, type StaticPage } from "../lib/router";
import Link from "./Link";

const LABELS: Record<Locale, { page: StaticPage; label: string }[]> = {
  es: [
    { page: "home", label: "Inicio" },
    { page: "ruta", label: "Ruta" },
    { page: "servicios", label: "Servicios" },
    { page: "nosotros", label: "Nosotros" },
  ],
  en: [
    { page: "home", label: "Home" },
    { page: "ruta", label: "Route" },
    { page: "servicios", label: "Services" },
    { page: "nosotros", label: "About" },
  ],
  it: [
    { page: "home", label: "Home" },
    { page: "ruta", label: "Percorso" },
    { page: "servicios", label: "Servizi" },
    { page: "nosotros", label: "Chi siamo" },
  ],
};

export default function Header({ locale, switchPath }: { locale: Locale; switchPath: (l: Locale) => string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-3 px-5 sm:px-6 lg:px-8">
        <Link to={localize("home", locale)} className="flex items-center gap-2" aria-label="SOMCAR inicio">
          <img src="/img/logo-fondo-blanco.webp" alt="SOMCAR" className="h-8 w-auto rounded-full border border-black/10 object-contain p-0.5" />
          <span className="hidden text-[11px] font-bold tracking-[0.14em] sm:inline">SOMCAR</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LABELS[locale].slice(1).map((n) => (
            <Link key={n.page} to={localize(n.page, locale)} className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-black/60 transition hover:bg-black hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setOpen((v) => !v)} className="mono flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] hover:bg-black/5">
              {locale.toUpperCase()} <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>▼</span>
            </button>
            {open && (
              <div className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                {LOCALES.map((l) => (
                  <a
                    key={l}
                    href={switchPath(l)}
                    onClick={() => setOpen(false)}
                    className={`mono block min-w-[84px] px-4 py-2 text-left text-[11px] font-bold tracking-[0.08em] hover:bg-black/5 ${l === locale ? "bg-black text-white" : "text-black"}`}
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link to={localize("cotizador", locale)} className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_16px_rgba(249,115,22,0.2)] transition hover:bg-[#c2410c]">
            {locale === "es" ? "Cotizar" : locale === "en" ? "Quote" : "Preventivo"}
          </Link>
        </div>
      </div>
    </header>
  );
}
