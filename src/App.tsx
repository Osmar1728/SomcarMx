import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "./components/Link";
import HomePage from "./pages/Home";
import CotizadorPage from "./pages/Cotizador";
import RutaPage from "./pages/Ruta";
import NosotrosPage from "./pages/Nosotros";
import ServiciosPage from "./pages/Servicios";
import { UI } from "./lib/ui";
import { localize, setLenis, usePageMeta, useRoute, type Locale, type StaticPage } from "./lib/router";
import FichaPage from "./pages/Ficha";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function Shell({ title, locale, switchPath, children }: { title: string; locale: Locale; switchPath: (l: Locale) => string; children: React.ReactNode }) {
  const isLegal = title === UI[locale].terminosTitle || title === UI[locale].privacidadTitle;
  const isNotFound = title === PAGE_NOT_FOUND[locale];
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />
      <section className="relative overflow-hidden border-b border-black/5">
        <img src="/img/cenote-default.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.07]" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[var(--color-cream)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 py-10 sm:py-12 lg:max-w-[960px] lg:px-8">
          <p className="mono inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" /> {isNotFound ? (locale === "es" ? "SOMCAR • Error 404" : locale === "en" ? "SOMCAR • Error 404" : "SOMCAR • Errore 404") : isLegal ? (locale === "es" ? "SOMCAR • Información legal" : locale === "en" ? "SOMCAR • Legal information" : "SOMCAR • Informazioni legali") : "SOMCAR • Riviera Maya"}
          </p>
          <h1 className="display mt-4 text-[30px] leading-[0.95] sm:text-[40px]">{title}</h1>
          {!isNotFound && (
            <p className="mt-3 max-w-[48ch] text-[13px] leading-relaxed text-black/60">
              {title === UI[locale].terminosTitle ? (locale === "es" ? "Lee con calma. Todo claro, sin letras chicas — como tu renta." : locale === "en" ? "Clear and simple, just like your rental." : "Chiaro e semplice, come il tuo noleggio.") : title === UI[locale].privacidadTitle ? (locale === "es" ? "Cómo cuidamos tus datos. Transparencia total." : locale === "en" ? "How we protect your data. Full transparency." : "Come proteggiamo i tuoi dati.") : locale === "es" ? "Estamos aquí para ayudarte." : locale === "en" ? "We're here to help." : "Siamo qui per aiutarti."}
            </p>
          )}
        </div>
      </section>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:py-10 lg:max-w-[960px] lg:px-8">
        <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">{children}</div>
      </main>
      <Footer locale={locale} />
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
  return <ServiciosPage locale={locale} />;
}

function Ficha({ locale, slug }: { locale: Locale; slug: string }) {
  return <FichaPage locale={locale} slug={slug} />;
}

function Legal({ name, locale }: { name: "terminos" | "privacidad"; locale: Locale }) {
  usePageMeta(name, locale);
  if (name === "terminos" && locale === "en") {
    return (
      <Shell title={UI[locale].terminosTitle} locale={locale} switchPath={(l) => localize(name, l)}>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p className="font-bold text-[#0a3d7a]">RENTAL POLICIES AND CONDITIONS</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Valid ID (INE or Passport) and valid driver license with photo required. Must be valid for entire rental.</li>
            <li>Minimum age 18.</li>
            <li>Unlimited mileage included.</li>
            <li>Pets allowed with extra charge.</li>
            <li>Vehicles guaranteed by category (Economy, Regular, SUV, Family, Van), not exact model.</li>
            <li>Report accidents immediately; otherwise coverage is void.</li>
            <li>Additional driver $50/day.</li>
            <li>Gas not included — deliver same level, missing $25/L. Extra hour $100 (max 3h) then full day. No smoking $600. Keys $2,190 / Card $2,920 / Plate $2,920.</li>
          </ul>
          <p className="mono text-[12px] text-slate-400">Source: somcar.mx/terminos — translated for information.</p>
        </div>
      </Shell>
    );
  }
  if (name === "terminos" && locale === "it") {
    return (
      <Shell title={UI[locale].terminosTitle} locale={locale} switchPath={(l) => localize(name, l)}>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p className="font-bold text-[#0a3d7a]">POLITICHE E CONDIZIONI DI NOLEGGIO</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Documento valido (INE o Passaporto) e patente valida con foto. Età minima 18 anni.</li>
            <li>Chilometraggio illimitato incluso.</li>
            <li>Animali ammessi con supplemento.</li>
            <li>Veicolo garantito per categoria, non modello esatto.</li>
            <li>Segnalare incidenti immediatamente.</li>
            <li>Conducente aggiuntivo $50/giorno.</li>
            <li>Benzina non inclusa — $25/L mancante. Ora extra $100. Fumo $600. Chiavi $2.190 / Tessera $2.920 / Targa $2.920.</li>
          </ul>
          <p className="mono text-[12px] text-slate-400">Fonte: somcar.mx/terminos — tradotto a scopo informativo.</p>
        </div>
      </Shell>
    );
  }
  if (name === "terminos") {
    return (
      <Shell title={UI[locale][name === "terminos" ? "terminosTitle" : "privacidadTitle"]} locale={locale} switchPath={(l) => localize(name, l)}>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p className="font-bold text-[#0a3d7a]">POLÍTICAS Y CONDICIONES DE RENTA</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Identificación oficial vigente (INE o Pasaporte).</li>
            <li>El cliente y cualquier conductor adicional deberán presentar licencia de conducir original y vigente, con fotografía. La licencia debe ser válida en el momento del alquiler y durante todo el período. SOMCAR se reserva el derecho de verificar y aceptar las licencias y negar el arrendamiento si el documento no cumple requisitos, es ilegible o presenta tachaduras.</li>
            <li>Edad mínima del conductor: 18 años.</li>
            <li>Tarifa incluye kilometraje ilimitado.</li>
            <li>Pueden viajar mascotas dentro de nuestras unidades con un cargo extra.</li>
            <li>La mayoría de nuestros vehículos están equipados con seguros eléctricos, control de energía, reproductor de cinta o CD y radio AM/FM.</li>
            <li>Las fotografías en la web (marcas y modelos) son meramente ilustrativas. Los vehículos solo se pueden reservar por categoría (Económica, Regular, SUV, Familiar y Van) — se garantiza únicamente la categoría reservada.</li>
            <li>En caso de no encontrarse el auto disponible al momento del contrato se asignará otro de la misma categoría; de no existir, se ofrecerá uno de categoría superior sin costo.</li>
            <li>En caso de accidente el cliente debe reportar el percance de inmediato a la oficina o teléfonos de asistencia y firmar el reporte al finalizar la renta; de lo contrario la cobertura será inválida y se cargará el monto del daño.</li>
            <li>Si el cliente no respeta las cláusulas del contrato que firmó, la cobertura o seguros serán nulos.</li>
            <li>Las unidades deberán ser devueltas en condiciones normales al término del arrendamiento.</li>
            <li>Cualquier faltante en la gasolina y daños serán cobrados en forma adicional a la renta.</li>
            <li>SOMCAR se reserva el derecho de declinar la reservación si el arrendador no cubre los requisitos.</li>
            <li>Esta guía está sujeta a cambios sin previo aviso.</li>
          </ul>

          <h3 className="font-bold text-[#0a3d7a]">CONDUCTORES ADICIONALES</h3>
          <p>Los conductores adicionales deberán ser mayores de 18 años y presentar licencia vigente expedida por autoridad competente. Estarán sujetos a las mismas obligaciones y son responsables solidarios por daños a terceros y/o al auto.</p>
          <p><strong>Cargo por día: MXN$50.00</strong> — Precios incluyen impuestos.</p>

          <h3 className="font-bold text-[#0a3d7a]">GASOLINA</h3>
          <p>La gasolina no está incluida en la cotización. Con el mismo nivel con que se recibe el vehículo deberá ser entregado a la devolución, según contrato. No hay reembolsos por excedentes. Faltante se cobrará a <strong>MXN$25 por litro</strong>.</p>

          <h3 className="font-bold text-[#0a3d7a]">HORAS EXTRA</h3>
          <p>El cargo mínimo es de un día, aunque se ocupe solo parte. En la devolución hay 30 minutos de tolerancia. Después se cobrará la hora completa hasta 3 horas a <strong>$100 por hora</strong>. Después de 3 horas se cobrará el día completo según tarifa vigente.</p>

          <h3 className="font-bold text-[#0a3d7a]">PROHIBICIÓN DE FUMAR EN VEHÍCULOS</h3>
          <p>Para brindar vehículos libres de malos olores, está prohibido fumar en todos los vehículos de Veico Car Rental. Si se regresa con olor o residuos se aplicará cargo por limpieza y desodorización de <strong>MXN$600</strong> impuestos incluidos.</p>

          <h3 className="font-bold text-[#0a3d7a]">RESERVACIONES Y CANCELACIONES</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cualquier cambio podrá solicitarse por el mismo medio donde fue creada, con mínimo 2 horas de anticipación.</li>
            <li>Reservaciones no pre-pagadas solo estarán disponibles hasta 2 horas después de la hora confirmada.</li>
            <li>Reservaciones garantizadas pre-pagadas se mantendrán activas todo el día laboral o hasta cierre de oficina.</li>
            <li>Toda reservación web está sujeta a confirmación de disponibilidad. SOMCAR notificará en 24h (directas) o 48h (terceros) si el auto no estuviera disponible.</li>
            <li>Si no requiere el servicio, cancele con mínimo 24h de anticipación por el mismo medio; si hay prepago el reembolso será íntegro.</li>
            <li>SOMCAR se reserva el derecho de cancelar cualquier reserva si el cliente no proporcionó información requerida o no puede ser localizado.</li>
            <li>Reservaciones con pago en línea u Oxxo no son reembolsables pero podrán usarse en fecha posterior (12 meses de vigencia) si se cambia 48h antes vía centro de atención. Cambios de fecha/destino/categoría pueden generar costos adicionales.</li>
            <li>Pago en línea/Oxxo no aplica reembolsos por no-show, por entrega anticipada o por falta de requisitos.</li>
            <li>Reservaciones con pago en oficina no generan cargos de cancelación o no-show.</li>
          </ul>

          <h3 className="font-bold text-[#0a3d7a]">MULTAS POR INFRACCIONES DE TRÁNSITO</h3>
          <p>De acuerdo al contrato, el cliente será responsable del pago de multas ocurridas durante el periodo en que tuvo posesión del vehículo.</p>

          <h3 className="font-bold text-[#0a3d7a]">DEVOLUCIÓN DEL VEHÍCULO Y EXTENSIÓN DE ARRENDAMIENTO</h3>
          <p>El lugar y fecha convenidos para la devolución pueden ser modificados a solicitud del cliente y con previa autorización de SOMCAR. En caso de incumplimiento, además de los cargos derivados, SOMCAR podrá rescindir el contrato inmediatamente y recuperar el auto donde se encuentre.</p>

          <h3 className="font-bold text-[#0a3d7a]">PÉRDIDA DE LLAVES, TARJETA DE CIRCULACIÓN Y PLACAS</h3>
          <p>Las llaves, tarjeta y placas no están incluidas en ninguna cobertura. En caso de pérdida o daño el cliente pagará:</p>
          <ul className="list-disc pl-5">
            <li>Llaves: <strong>MXN$2,190</strong></li>
            <li>Tarjeta de circulación: <strong>MXN$2,920</strong></li>
            <li>Placas: <strong>MXN$2,920</strong> por pieza</li>
          </ul>


        </div>
      </Shell>
    );
  }
  if (locale === "en") {
    return (
      <Shell title={UI[locale].privacidadTitle} locale={locale} switchPath={(l) => localize(name, l)}>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p>The purpose of this Privacy Notice is to provide complete information on how we process your personal data. In compliance with the Federal Law on Protection of Personal Data, <strong>SOLUCIONES MÓVILES DEL CARIBE (SOMCAR)</strong> is responsible for your data. Contact us at <a href="mailto:contacto@somcar.mx" className="font-bold text-[#0a3d7a]">contacto@somcar.mx</a> or <a href="tel:+529981976325" className="font-bold text-[#0a3d7a]">998 197 6325</a>.</p>
          <h3 className="font-bold text-[#0a3d7a]">COOKIES</h3>
          <p>Cookies are small text files that identify your computer. Purchase and reservation require cookies enabled. You may disable them but functionality will be limited. Cookies contain no personal data.</p>
          <h3 className="font-bold text-[#0a3d7a]">PERSONAL DATA</h3>
          <p>We request: Full name, Phone, Email, Address and Country. Data is processed under principles of lawfulness, consent, quality and confidentiality with administrative, technical and physical safeguards.</p>
          <h3 className="font-bold text-[#0a3d7a]">ARCO RIGHTS</h3>
          <p>You may exercise ARCO rights (access, cancellation, rectification, opposition) or revoke consent by writing to <a href="mailto:contacto@somcar.mx" className="text-[#0a3d7a]">contacto@somcar.mx</a> with ID and clear description. We reply within 20 business days.</p>
          <h3 className="font-bold text-[#0a3d7a]">USE OF INFORMATION</h3>
          <p>To provide efficient service, inform about related products, fulfill obligations and improve support. Data forms a profile you can modify with your user number and password.</p>
          <p className="mono text-[12px] text-slate-400">Last update: 9 November 2026.</p>
        </div>
      </Shell>
    );
  }
  if (locale === "it") {
    return (
      <Shell title={UI[locale].privacidadTitle} locale={locale} switchPath={(l) => localize(name, l)}>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p>Lo scopo di questa Informativa è fornire informazioni sul trattamento dei dati personali. In conformità alla Legge Federale sulla Protezione dei Dati, <strong>SOLUCIONES MÓVILES DEL CARIBE (SOMCAR)</strong> è responsabile dei tuoi dati. Contattaci a <a href="mailto:contacto@somcar.mx" className="font-bold text-[#0a3d7a]">contacto@somcar.mx</a> o <a href="tel:+529981976325" className="font-bold text-[#0a3d7a]">998 197 6325</a>.</p>
          <h3 className="font-bold text-[#0a3d7a]">COOKIE</h3>
          <p>I cookie sono piccoli file di testo. L'acquisto richiede cookie attivi. Puoi disabilitarli ma limiterai le funzioni. Non contengono dati personali.</p>
          <h3 className="font-bold text-[#0a3d7a]">DATI PERSONALI</h3>
          <p>Richiediamo: Nome, Telefono, Email, Indirizzo e Paese. I dati sono trattati con principi di liceità e riservatezza con misure di sicurezza.</p>
          <h3 className="font-bold text-[#0a3d7a]">DIRITTI ARCO</h3>
          <p>Puoi esercitare i diritti ARCO scrivendo a <a href="mailto:contacto@somcar.mx" className="text-[#0a3d7a]">contacto@somcar.mx</a> con documento e descrizione. Rispondiamo entro 20 giorni lavorativi.</p>
          <p className="mono text-[12px] text-slate-400">Ultimo aggiornamento: 9 novembre 2026.</p>
        </div>
      </Shell>
    );
  }
  return (
    <Shell title={UI[locale].privacidadTitle} locale={locale} switchPath={(l) => localize(name, l)}>
      <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
        <p>El propósito de este Aviso de Privacidad es proporcionarle la información completa sobre cómo damos tratamiento a sus datos personales, con las debidas precauciones que el caso requiere. En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, <strong>SOLUCIONES MÓVILES DEL CARIBE (SOMCAR)</strong> le informa que es responsable del uso de sus datos personales. Podrá contactarnos en <a href="mailto:contacto@somcar.mx" className="font-bold text-[#0a3d7a]">contacto@somcar.mx</a> o al <a href="tel:+529981976325" className="font-bold text-[#0a3d7a]">998 197 6325</a>. Protegemos y salvaguardamos sus datos para evitar daño, pérdida, destrucción, robo, extravío, alteración y tratamiento no autorizado.</p>

        <h3 className="font-bold text-[#0a3d7a]">¿QUÉ SON LAS COOKIES Y CÓMO SE UTILIZAN?</h3>
        <p>La aceptación de las cookies no es requisito para visitar nuestra página, pero el proceso de compra y generación de número de reservación solo es posible con cookies activas. Las cookies son pequeños archivos de texto que identifican su computadora con nuestro servidor como usuario único y se guardan en su navegador. Se usan para reconocer su IP y ahorrar tiempo al volver al sitio (por ejemplo, recordar quién es al modificar su reservación). Su navegador puede configurarse para no aceptar cookies, pero restringirá el uso de la página. El uso de cookies no contiene datos personales ni virus.</p>

        <h3 className="font-bold text-[#0a3d7a]">DATOS PERSONALES</h3>
        <p>La información deberá ser siempre veraz y completa. El usuario responderá por los datos proporcionados y en ningún caso SOMCAR será responsable de la veracidad de los mismos. La información solicitada en <strong>www.somcar.mx</strong> es: Nombre completo, Teléfonos de contacto, Correo Electrónico, Dirección y País. Sus datos serán tratados con base en los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad. Se mantendrá la confidencialidad estableciendo medidas de seguridad administrativas, técnicas y físicas para evitar daño, pérdida, alteración, destrucción, uso, acceso o divulgación indebida.</p>

        <h3 className="font-bold text-[#0a3d7a]">LIMITACIÓN DE USO Y DIVULGACIÓN DE INFORMACIÓN</h3>
        <p>En nuestro programa de notificación de promociones, ofertas y servicios por correo electrónico, SOMCAR tiene acceso a la información recabada. Esta publicidad solo será enviada a usted y a contactos registrados para tal propósito; podrá modificar esta indicación en cualquier momento enviando un correo a <a href="mailto:contacto@somcar.mx" className="text-[#0a3d7a]">contacto@somcar.mx</a>. En los correos pueden incluirse ocasionalmente ofertas de terceras partes que sean nuestros socios comerciales.</p>

        <h3 className="font-bold text-[#0a3d7a]">PARA EJERCER SUS DERECHOS ARCO Y REVOCAR EL CONSENTIMIENTO</h3>
        <p>Como titular podrá ejercitar derechos ARCO (acceso, cancelación, rectificación y oposición), o revocar el consentimiento, enviando solicitud al área de Servicio de Atención al Cliente a <a href="mailto:contacto@somcar.mx" className="text-[#0a3d7a]">contacto@somcar.mx</a>. La solicitud deberá contener: (a) nombre y domicilio para respuesta; (b) documentos que acrediten identidad o representación legal; (c) descripción clara de los datos respecto de los que solicita ejercer derechos ARCO; (d) manifestación expresa para revocar consentimiento; (e) cualquier otro elemento que facilite localización. Deberá acompañar fundamentos e identificación oficial. En un plazo máximo de 20 días hábiles atenderemos su solicitud e informaremos la procedencia al correo de origen. Actualice sus datos cuando sufran modificación para brindarle un servicio eficiente.</p>

        <h3 className="font-bold text-[#0a3d7a]">USO DE LA INFORMACIÓN</h3>
        <p>La información permite a SOMCAR contactar a usuarios cuando sea necesario para completar procedimientos de compra. Asimismo se usará para: procurar un servicio eficiente; informar sobre nuevos productos o servicios relacionados con el contratado; dar cumplimiento a obligaciones con clientes; informar cambios de productos o servicios; proveer mejor atención. Los datos proporcionados formarán parte de un archivo con su perfil, que puede modificar en cualquier momento con su número de usuario y contraseña.</p>

        <h3 className="font-bold text-[#0a3d7a]">CAMBIOS EN EL AVISO DE PRIVACIDAD</h3>
        <p>Nos reservamos el derecho de efectuar modificaciones o actualizaciones en cualquier momento para atender novedades legislativas, políticas internas, nuevos requerimientos o prácticas del mercado. Las modificaciones estarán disponibles en <strong>www.somcar.mx, sección aviso de privacidad</strong>.</p>

        <h3 className="font-bold text-[#0a3d7a]">ACEPTACIÓN DE LOS TÉRMINOS</h3>
        <p>Esta declaración está sujeta a los términos y condiciones del sitio web de SOMCAR, lo cual constituye un acuerdo legal entre el usuario y SOMCAR. Si utiliza los servicios de www.somcar.mx significa que ha leído, entendido y aceptado los términos.</p>

        <h3 className="font-bold text-[#0a3d7a]">AUTORIDAD</h3>
        <p>Si considera vulnerados sus derechos, puede acudir al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos (INAI), <a href="https://www.ifai.mx" target="_blank" rel="noopener" className="text-[#0a3d7a]">www.ifai.mx</a>.</p>

        <h3 className="font-bold text-[#0a3d7a]">TRANSFERENCIAS DE INFORMACIÓN POR SOLICITUD JUDICIAL</h3>
        <p>SOMCAR únicamente realiza remisiones de datos para cumplir obligaciones contraídas con clientes y solo compartirá datos cuando sea requerido por orden judicial para cumplir disposiciones procesales.</p>

        <p className="mono text-[12px] text-slate-400">Fecha de última actualización: 9 de noviembre de 2026.</p>
      </div>
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    case "cotizador":
      return <CotizadorPage locale={route.locale} />;
    case "ruta":
      return <RutaPage locale={route.locale} />;
    case "nosotros":
      return <NosotrosPage locale={route.locale} />;
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
