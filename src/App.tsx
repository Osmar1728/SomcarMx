import type { MouseEvent, ReactNode } from "react";
import { href, navigate, usePageMeta, useRoute, type RouteName } from "./lib/router";

function Link({ to, children }: { to: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href(to)} onClick={onClick} className="underline">
      {children}
    </a>
  );
}

function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <nav className="mb-8 flex gap-4 text-sm">
        <Link to="/">Inicio</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/terminos">Términos</Link>
        <Link to="/privacidad">Privacidad</Link>
      </nav>
      <main>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {children}
      </main>
    </div>
  );
}

function Home() {
  usePageMeta("home");
  return (
    <Shell title="SOMCAR">
      <p className="mt-4">Página de inicio. Reemplaza este contenido con el real.</p>
      <p className="mt-2">
        <Link to="/contacto">Contáctanos</Link>
      </p>
    </Shell>
  );
}

function Contacto() {
  usePageMeta("contacto");
  return (
    <Shell title="Contacto">
      <p className="mt-4">Agrega aquí tu formulario o datos de contacto.</p>
    </Shell>
  );
}

function Legal({ name, title }: { name: "terminos" | "privacidad"; title: string }) {
  usePageMeta(name);
  return (
    <Shell title={title}>
      <p className="mt-4">Publica aquí el texto legal correspondiente.</p>
    </Shell>
  );
}

function NotFound() {
  usePageMeta("notfound");
  return (
    <Shell title="Página no encontrada">
      <p className="mt-4">
        Vuelve al <Link to="/">inicio</Link>.
      </p>
    </Shell>
  );
}

export default function App() {
  const route: { name: RouteName } = useRoute();
  switch (route.name) {
    case "home":
      return <Home />;
    case "contacto":
      return <Contacto />;
    case "terminos":
      return <Legal name="terminos" title="Términos y condiciones" />;
    case "privacidad":
      return <Legal name="privacidad" title="Aviso de privacidad" />;
    default:
      return <NotFound />;
  }
}
