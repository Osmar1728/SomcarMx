import Header from "./components/Header";
import Link from "./components/Link";
import HomePage from "./pages/Home";
import { UI } from "./lib/ui";
import { localize, setLenis, usePageMeta, useRoute, type Locale, type StaticPage } from "./lib/router";
import { FICHAS, getFicha } from "./lib/fichas";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function Shell({ title, locale, switchPath, children }: { title: string; locale: Locale; switchPath: (l: Locale) => string; children: React.ReactNode }) {
  return (
    <div>
      <Header locale={locale} switchPath={switchPath} />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0a3d7a]">{title}</h1>
        {children}
      </main>
    </div>
  );
}

function Contacto({ locale }: { locale: Locale }) {
  usePageMeta("contacto", locale);
  return (
    <Shell title={UI[locale].contactoTitle} locale={locale} switchPath={(l) => localize("contacto", l)}>
      <p className="mt-4 text-slate-600">{UI[locale].contactoBody}</p>
    </Shell>
  );
}

function Servicios({ locale }: { locale: Locale }) {
  usePageMeta("servicios", locale);
  return (
    <Shell title={UI[locale].serviciosTitle} locale={locale} switchPath={(l) => localize("servicios", l)}>
      <ul className="mt-4 space-y-2">
        {FICHAS.map((f) => (
          <li key={f.slug}>
            <Link to={localize("ficha", locale, f.slug)}>{f.datos[locale].nombre}</Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Ficha({ locale, slug }: { locale: Locale; slug: string }) {
  usePageMeta("ficha", locale, slug);
  const f = getFicha(slug);
  if (!f) return <NotFound locale={locale} />;
  return (
    <Shell title={f.datos[locale].nombre} locale={locale} switchPath={(l) => localize("ficha", l, slug)}>
      <p className="mt-4 text-slate-600">{f.datos[locale].resumen}</p>
      <p className="mt-2">
        <Link to={localize("contacto", locale)}>{UI[locale].contactCta}</Link>
      </p>
    </Shell>
  );
}

function Legal({ name, locale }: { name: "terminos" | "privacidad"; locale: Locale }) {
  usePageMeta(name, locale);
  return (
    <Shell title={UI[locale][name === "terminos" ? "terminosTitle" : "privacidadTitle"]} locale={locale} switchPath={(l) => localize(name, l)}>
      <p className="mt-4 text-slate-600">{UI[locale].legalBody}</p>
    </Shell>
  );
}

const PAGE_NOT_FOUND: Record<Locale, string> = {
  es: "Página no encontrada",
  en: "Page not found",
  it: "Pagina non trovata",
};

function NotFound({ locale }: { locale: Locale }) {
  usePageMeta("notfound", locale);
  return (
    <Shell title={PAGE_NOT_FOUND[locale]} locale={locale} switchPath={(l) => localize("home", l)}>
      <p className="mt-4 text-slate-600">
        {UI[locale].notFoundBody} <Link to={localize("home", locale)}>{UI[locale].backTo}</Link>.
      </p>
    </Shell>
  );
}

export default function App() {
  const route = useRoute();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  switch (route.name) {
    case "home":
      return <HomePage locale={route.locale} />;
    case "contacto":
      return <Contacto locale={route.locale} />;
    case "servicios":
      return <Servicios locale={route.locale} />;
    case "ficha":
      return <Ficha locale={route.locale} slug={route.param ?? ""} />;
    case "terminos":
      return <Legal name="terminos" locale={route.locale} />;
    case "privacidad":
      return <Legal name="privacidad" locale={route.locale} />;
    default:
      return <NotFound locale={route.locale} />;
  }
}

export type { StaticPage };
