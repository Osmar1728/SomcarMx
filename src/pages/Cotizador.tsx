import { useMemo, useState } from "react";
import Header from "../components/Header";
import { EMAIL, WHATSAPP_URL } from "../lib/home";
import { localize, usePageMeta, type Locale } from "../lib/router";

const LOCATIONS = [
  { value: "aeropuerto-cun", label: { es: "Aeropuerto CUN", en: "CUN Airport", it: "Aeroporto CUN" } },
  { value: "aeropuerto-tulum", label: { es: "Aeropuerto Tulum (TQO)", en: "Tulum Airport (TQO)", it: "Aeroporto Tulum (TQO)" } },
  { value: "ado-cancun", label: { es: "ADO Cancún", en: "ADO Cancun", it: "ADO Cancún" } },
  { value: "puerto-morelos", label: { es: "Puerto Morelos", en: "Puerto Morelos", it: "Puerto Morelos" } },
  { value: "playa-del-carmen", label: { es: "Playa del Carmen", en: "Playa del Carmen", it: "Playa del Carmen" } },
  { value: "tulum", label: { es: "Tulum centro", en: "Tulum downtown", it: "Tulum centro" } },
  { value: "valladolid", label: { es: "Valladolid", en: "Valladolid", it: "Valladolid" } },
  { value: "dentro-ciudad", label: { es: "Dentro de la ciudad (Cancún)", en: "Inside Cancun city", it: "Dentro Cancún" } },
  { value: "otros", label: { es: "Otros — especificar", en: "Other — specify", it: "Altro — specifica" } },
] as const;

type LocValue = (typeof LOCATIONS)[number]["value"];

function labelFor(v: string, locale: Locale) {
  const f = LOCATIONS.find((x) => x.value === v);
  if (!f) return v;
  return f.label[locale];
}

export default function CotizadorPage({ locale }: { locale: Locale }) {
  usePageMeta("cotizador", locale);
  const switchPath = (l: Locale) => localize("cotizador", l);

  const [step, setStep] = useState(1);
  const [pickupLoc, setPickupLoc] = useState<LocValue | "">("");
  const [pickupOther, setPickupOther] = useState("");
  const [dropoffLoc, setDropoffLoc] = useState<LocValue | "">("");
  const [dropoffOther, setDropoffOther] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const t = {
    es: {
      title: "Cotiza en 3 pasos",
      sub: "Elige dónde y cuándo. Sin tarjeta, km ilimitado.",
      step1: "¿Dónde y cuándo recogemos?",
      step2: "¿Dónde y cuándo entregas?",
      step3: "¿Cuándo?",
      step4: "Confirma y reserva",
      pickup: "Lugar de recogida",
      dropoff: "Lugar de devolución",
      otherPh: "Especifica dirección / hotel",
      date: "Fecha",
      time: "Hora",
      sameAsPickup: "Mismo que recogida",
      days: "Días",
      contact: "Tus datos",
      namePh: "Nombre",
      emailPh: "Email",
      notePh: "Vuelo, hotel, silla bebé, nota…",
      next: "Siguiente",
      back: "Atrás",
      whatsapp: "Reservar por WhatsApp",
      emailBtn: "Enviar por Email",
      summary: "Resumen",
      from: "Recogida",
      to: "Devolución",
      total: "Cotización",
    },
    en: {
      title: "Quote in 3 steps",
      sub: "Pick where and when. No card, unlimited km.",
      step1: "Where & when to pick up?",
      step2: "Where & when to drop off?",
      step3: "When?",
      step4: "Confirm & book",
      pickup: "Pickup location",
      dropoff: "Drop-off location",
      otherPh: "Specify address / hotel",
      date: "Date",
      time: "Time",
      sameAsPickup: "Same as pickup",
      days: "Days",
      contact: "Your details",
      namePh: "Name",
      emailPh: "Email",
      notePh: "Flight, hotel, baby seat, notes…",
      next: "Next",
      back: "Back",
      whatsapp: "Book on WhatsApp",
      emailBtn: "Send by Email",
      summary: "Summary",
      from: "Pick-up",
      to: "Drop-off",
      total: "Quote",
    },
    it: {
      title: "Preventivo in 3 passi",
      sub: "Scegli dove e quando. Senza carta, km illimitato.",
      step1: "Dove e quando ritiri?",
      step2: "Dove e quando riconsegni?",
      step3: "Quando?",
      step4: "Conferma e prenota",
      pickup: "Luogo di ritiro",
      dropoff: "Luogo di riconsegna",
      otherPh: "Specifica indirizzo / hotel",
      date: "Data",
      time: "Ora",
      sameAsPickup: "Come il ritiro",
      days: "Giorni",
      contact: "I tuoi dati",
      namePh: "Nome",
      emailPh: "Email",
      notePh: "Volo, hotel, seggiolino, note…",
      next: "Avanti",
      back: "Indietro",
      whatsapp: "Prenota su WhatsApp",
      emailBtn: "Invia via Email",
      summary: "Riepilogo",
      from: "Ritiro",
      to: "Riconsegna",
      total: "Preventivo",
    },
  }[locale];

  const pickupLabel = pickupLoc ? (pickupLoc === "otros" ? pickupOther || labelFor(pickupLoc, locale) : labelFor(pickupLoc, locale)) : "—";
  const dropoffLabel = dropoffLoc ? (dropoffLoc === "otros" ? dropoffOther || labelFor(dropoffLoc, locale) : labelFor(dropoffLoc, locale)) : "—";

  const days = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 0;
    const a = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const b = new Date(`${dropoffDate}T${dropoffTime || "00:00"}`);
    const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
    if (isNaN(diff) || diff <= 0) return 1;
    return Math.max(1, Math.ceil(diff));
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  const canStep1 = !!pickupLoc && (pickupLoc !== "otros" || !!pickupOther.trim()) && !!pickupDate && !!pickupTime;
  const canStep2 = !!dropoffLoc && (dropoffLoc !== "otros" || !!dropoffOther.trim()) && !!dropoffDate && !!dropoffTime;
  const canStep3 = !!pickupDate && !!dropoffDate && !!pickupTime && !!dropoffTime;

  const whatsappMsg = encodeURIComponent(
    `Hola SOMCAR, quiero cotizar:\n• Recogida: ${pickupLabel} — ${pickupDate} ${pickupTime}\n• Devolución: ${dropoffLabel} — ${dropoffDate} ${dropoffTime}\n• Días: ${days}\n• Nombre: ${name || "—"}\n• Email: ${email || "—"}\n• Nota: ${note || "—"}\nSin tarjeta, km ilimitado, entrega 24/7.`
  );
  const waUrl = `${WHATSAPP_URL.split("?")[0]}?text=${whatsappMsg}`;
  const mailSubject = encodeURIComponent(`Cotización SOMCAR — ${pickupLabel} → ${dropoffLabel} — ${days} días`);
  const mailBody = encodeURIComponent(
    `Hola SOMCAR,\n\nQuiero cotizar:\nRecogida: ${pickupLabel} — ${pickupDate} ${pickupTime}\nDevolución: ${dropoffLabel} — ${dropoffDate} ${dropoffTime}\nDías: ${days}\nNombre: ${name}\nEmail: ${email}\nNota: ${note}\n\nGracias.`
  );

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      <section className="mx-auto max-w-[1080px] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* header lexor style — progress */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-[0.14em]">COTIZADOR • LEXOR STEPS</p>
            <h1 className="display mt-3 text-[32px] sm:text-[40px]">{t.title}</h1>
            <p className="mt-2 max-w-[48ch] text-[13px] leading-relaxed text-black/60">{t.sub}</p>
          </div>
          <div className="mono flex items-center gap-2 text-[11px] font-bold tracking-[0.12em]">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={`grid h-8 w-8 place-items-center rounded-full border text-[12px] ${step === n ? "bg-[var(--color-ink)] text-white border-black" : step > n ? "bg-[var(--color-lime)] text-black border-black" : "bg-white text-black/40 border-black/10"}`}>
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* progress line */}
        <div className="mt-6 h-1 w-full rounded-full bg-black/10">
          <div className="h-1 rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
          {/* steps */}
          <div className="rounded-[28px] border border-black/10 bg-white p-5 sm:p-7">
            {step === 1 && (
              <div>
                <h2 className="text-[18px] font-bold">{t.step1}</h2>
                <p className="mono mt-1 text-[11px] tracking-[0.08em] text-black/40">Paso 1 de 4 — punto y hora exactos</p>

                <label className="mt-6 block text-[12px] font-bold">{t.pickup}</label>
                <select value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value as LocValue)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[var(--color-cream)] px-4 py-3 text-[14px] font-medium">
                  <option value="">{locale === "es" ? "Selecciona…" : locale === "en" ? "Select…" : "Seleziona…"}</option>
                  {LOCATIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label[locale]}
                    </option>
                  ))}
                </select>
                {pickupLoc === "otros" && (
                  <input value={pickupOther} onChange={(e) => setPickupOther(e.target.value)} placeholder={t.otherPh} className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                )}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold">{t.date}</label>
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold">{t.time}</label>
                    <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button disabled={!canStep1} onClick={() => setStep(2)} className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[13px] font-bold text-white transition hover:bg-black disabled:opacity-30">
                    {t.next} →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-[18px] font-bold">{t.step2}</h2>

                <label className="mt-6 block text-[12px] font-bold">{t.dropoff}</label>
                <div className="mt-2 flex gap-2">
                  <select value={dropoffLoc} onChange={(e) => setDropoffLoc(e.target.value as LocValue)} className="w-full rounded-2xl border border-black/10 bg-[var(--color-cream)] px-4 py-3 text-[14px] font-medium">
                    <option value="">{locale === "es" ? "Selecciona…" : locale === "en" ? "Select…" : "Seleziona…"}</option>
                    {LOCATIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label[locale]}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => { setDropoffLoc(pickupLoc as LocValue); setDropoffOther(pickupOther); setDropoffDate(pickupDate); setDropoffTime(pickupTime); }} className="shrink-0 rounded-full border border-black/10 bg-white px-3 text-[11px] font-bold">
                    {t.sameAsPickup}
                  </button>
                </div>
                {dropoffLoc === "otros" && (
                  <input value={dropoffOther} onChange={(e) => setDropoffOther(e.target.value)} placeholder={t.otherPh} className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                )}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold">{t.date}</label>
                    <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold">{t.time}</label>
                    <input type="time" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold">
                    ← {t.back}
                  </button>
                  <button disabled={!canStep2} onClick={() => setStep(4)} className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[13px] font-bold text-white hover:bg-black disabled:opacity-30">
                    {t.next} →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-[18px] font-bold">{t.step3}</h2>
                <p className="mono mt-2 text-[12px] text-black/50">{days ? `${days} ${t.days}` : "—"}</p>
                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(2)} className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold">
                    ← {t.back}
                  </button>
                  <button disabled={!canStep3} onClick={() => setStep(4)} className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[13px] font-bold text-white hover:bg-black disabled:opacity-30">
                    {t.next} →
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-[18px] font-bold">{t.step4}</h2>

                <div className="mt-6 grid gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} type="email" className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePh} rows={3} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={waUrl} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-[14px] font-bold text-white hover:bg-[#1eb955]">
                    {t.whatsapp} ↗
                  </a>
                  <a href={`mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-[14px] font-bold hover:bg-black hover:text-white">
                    {t.emailBtn} ✉
                  </a>
                </div>

                <div className="mt-6 flex justify-between">
                  <button onClick={() => setStep(3)} className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold">
                    ← {t.back}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* summary — lexor style sticky */}
          <div className="h-fit rounded-[28px] border border-black/10 bg-[var(--color-ink)] p-5 text-white sm:p-6">
            <p className="mono text-[11px] font-bold tracking-[0.14em] text-white/50">{t.summary}</p>
            <div className="mt-4 space-y-3 text-[13px]">
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="mono text-[10px] tracking-[0.12em] text-white/50">{t.from}</p>
                <p className="font-bold">{pickupLabel}</p>
                <p className="mono text-[11px] text-white/60">{pickupDate || "—"} {pickupTime}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="mono text-[10px] tracking-[0.12em] text-white/50">{t.to}</p>
                <p className="font-bold">{dropoffLabel}</p>
                <p className="mono text-[11px] text-white/60">{dropoffDate || "—"} {dropoffTime}</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 font-bold text-white">
                <span>{t.days}: {days || "—"}</span>
                <span className="mono text-[11px] font-normal text-white/60">solo cotización</span>
              </div>
              <p className="mono text-[10px] leading-relaxed text-white/40">Sin tarjeta • Km ilimitado • Entrega 24/7.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
