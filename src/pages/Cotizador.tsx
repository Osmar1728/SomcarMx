import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
  const [phoneCode, setPhoneCode] = useState("+52");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [categoryOther, setCategoryOther] = useState("");

  const t = {
    es: {
      title: "Cotiza en 3 pasos",
      sub: "Elige dónde y cuándo. Sin tarjeta, km ilimitado.",
      step1: "¿Dónde y cuándo recogemos?",
      step2: "¿Dónde y cuándo entregas?",
      step3: "¿Qué vehículo necesitas?",
      vehicle: "Vehículo",
      vehiclePh: "Selecciona categoría",
      step4: "Confirma y reserva",
      pickup: "Lugar de recogida",
      dropoff: "Lugar de devolución",
      otherPh: "Especifica dirección / hotel",
      date: "Fecha",
      time: "Hora",
      sameAsPickup: "Mismo que recogida",
      days: "Días",
      contact: "Tus datos",
      namePh: "Nombre *",
      phonePh: "Teléfono / WhatsApp *",
      emailPh: "Email (opcional)",
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
      step3: "Which vehicle?",
      vehicle: "Vehicle",
      vehiclePh: "Select category",
      step4: "Confirm & book",
      pickup: "Pickup location",
      dropoff: "Drop-off location",
      otherPh: "Specify address / hotel",
      date: "Date",
      time: "Time",
      sameAsPickup: "Same as pickup",
      days: "Days",
      contact: "Your details",
      namePh: "Name *",
      phonePh: "Phone / WhatsApp *",
      emailPh: "Email (opcional)",
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
      step3: "Quale veicolo?",
      vehicle: "Veicolo",
      vehiclePh: "Seleziona categoria",
      step4: "Conferma e prenota",
      pickup: "Luogo di ritiro",
      dropoff: "Luogo di riconsegna",
      otherPh: "Specifica indirizzo / hotel",
      date: "Data",
      time: "Ora",
      sameAsPickup: "Come il ritiro",
      days: "Giorni",
      contact: "I tuoi dati",
      namePh: "Nome *",
      phonePh: "Telefono / WhatsApp *",
      emailPh: "Email (opcional)",
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

  const COUNTRY_CODES = [
    { code: "+52", label: "🇲🇽 +52" },
    { code: "+1", label: "🇺🇸 +1" },
    { code: "+39", label: "🇮🇹 +39" },
    { code: "+34", label: "🇪🇸 +34" },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+33", label: "🇫🇷 +33" },
    { code: "+49", label: "🇩🇪 +49" },
    { code: "+55", label: "🇧🇷 +55" },
    { code: "+57", label: "🇨🇴 +57" },
    { code: "+54", label: "🇦🇷 +54" },
    { code: "+56", label: "🇨🇱 +56" },
    { code: "+51", label: "🇵🇪 +51" },
  ];

  const TIME_OPTIONS = useMemo(() => {
    const opts: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (const m of [0, 30]) {
        opts.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return opts;
  }, []);

  const phoneDigits = phone.replace(/\D/g, "");
  const isPhoneValid = phoneDigits.length >= 10;
  const fullPhone = `${phoneCode} ${phone}`;

  const pickupLabel = pickupLoc ? (pickupLoc === "otros" ? pickupOther || labelFor(pickupLoc, locale) : labelFor(pickupLoc, locale)) : "—";
  const dropoffLabel = dropoffLoc ? (dropoffLoc === "otros" ? dropoffOther || labelFor(dropoffLoc, locale) : labelFor(dropoffLoc, locale)) : "—";

  const todayStr = useMemo(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }, []);
  const isPast = (d: string) => !!d && d < todayStr;

  const days = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 0;
    const a = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const b = new Date(`${dropoffDate}T${dropoffTime || "00:00"}`);
    const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
    if (isNaN(diff) || diff <= 0) return 2;
    return Math.max(2, Math.ceil(diff));
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);
  const rawDays = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 0;
    const a = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const b = new Date(`${dropoffDate}T${dropoffTime || "00:00"}`);
    const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
    if (isNaN(diff) || diff <= 0) return 1;
    return Math.ceil(diff);
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  const canStep1 = !!pickupLoc && (pickupLoc !== "otros" || !!pickupOther.trim()) && !!pickupDate && !!pickupTime && !isPast(pickupDate);
  const canStep2 = !!dropoffLoc && (dropoffLoc !== "otros" || !!dropoffOther.trim()) && !!dropoffDate && !!dropoffTime && !isPast(dropoffDate) && !isPast(pickupDate);
  const canStep3 = !!pickupDate && !!dropoffDate && !!pickupTime && !!dropoffTime && days >= 2 && !!category && (category !== "Otro" || !!categoryOther.trim()) && (category !== "Other" || !!categoryOther.trim()) && (category !== "Altro" || !!categoryOther.trim());
  const canStep4 = !!name.trim() && isPhoneValid;

  const whatsappMsg = encodeURIComponent(
    `Hola SOMCAR, quiero cotizar:\n• Recogida: ${pickupLabel} — ${pickupDate} ${pickupTime}\n• Devolución: ${dropoffLabel} — ${dropoffDate} ${dropoffTime}\n• Vehículo: ${(category === "Otro" || category === "Other" || category === "Altro" ? (categoryOther || category) : category) || "—"}\n• Días: ${days}\n• Nombre: ${name || "—"}\n• Tel: ${fullPhone || "—"}\n• Email: ${email || "—"}\n• Nota: ${note || "—"}\nSin tarjeta, km ilimitado, entrega 24/7.`
  );
  const waUrl = `${WHATSAPP_URL.split("?")[0]}?text=${whatsappMsg}`;
  const mailSubject = encodeURIComponent(`Cotización SOMCAR — ${pickupLabel} → ${dropoffLabel} — ${days} días`);
  const mailBody = encodeURIComponent(
    `Hola SOMCAR,\n\nQuiero cotizar:\nRecogida: ${pickupLabel} — ${pickupDate} ${pickupTime}\nDevolución: ${dropoffLabel} — ${dropoffDate} ${dropoffTime}\nVehículo: ${(category === "Otro" || category === "Other" || category === "Altro" ? categoryOther : category)}\nDías: ${days}\nNombre: ${name}\nTel: ${fullPhone}\nEmail: ${email}\nNota: ${note}\n\nGracias.`
  );

  return (
    <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <Header locale={locale} switchPath={switchPath} />

      <section className="mx-auto max-w-[1080px] px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
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
                <p className="mono mt-1 text-[11px] tracking-[0.08em] text-black/40">{locale === "es" ? "Paso 1 de 4 — punto y hora exactos" : locale === "en" ? "Step 1 of 4 — exact point and time" : "Passo 1 di 4 — punto e ora esatti"}</p>

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

                <div className="mt-4 flex gap-3">
                  <div className="flex-1">
                    <label className="text-[11px] font-bold">{t.date}</label>
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} min={todayStr} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                  {pickupDate && !isPast(pickupDate) && (
                    <div className="w-[130px] shrink-0">
                      <label className="text-[11px] font-bold">{t.time}</label>
                      <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]">
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  )}
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
                  <button onClick={() => { setDropoffLoc(pickupLoc as LocValue); setDropoffOther(pickupOther); const d = new Date(pickupDate); if (!isNaN(d.getTime())) { d.setDate(d.getDate() + 2); setDropoffDate(d.toISOString().split("T")[0]); } else { setDropoffDate(pickupDate); } setDropoffTime(pickupTime); }} className="shrink-0 rounded-full border border-black/10 bg-white px-3 text-[11px] font-bold">
                    {t.sameAsPickup}
                  </button>
                </div>
                {dropoffLoc === "otros" && (
                  <input value={dropoffOther} onChange={(e) => setDropoffOther(e.target.value)} placeholder={t.otherPh} className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                )}

                <div className="mt-4 flex gap-3">
                  <div className="flex-1">
                    <label className="text-[11px] font-bold">{t.date}</label>
                    <input type="date" value={dropoffDate} onChange={(e) => setDropoffDate(e.target.value)} min={pickupDate && pickupDate > todayStr ? pickupDate : todayStr} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                  </div>
                  {dropoffDate && !isPast(dropoffDate) && (
                    <div className="w-[130px] shrink-0">
                      <label className="text-[11px] font-bold">{t.time}</label>
                      <select value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]">
                        {TIME_OPTIONS.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <button onClick={() => setStep(1)} className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-bold">
                    ← {t.back}
                  </button>
                  <button disabled={!canStep2} onClick={() => setStep(3)} className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-[13px] font-bold text-white hover:bg-black disabled:opacity-30">
                    {t.next} →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-[18px] font-bold">{t.step3}</h2>
                <p className="mono mt-2 text-[12px] text-black/50">{days ? `${days} ${t.days}` : "—"} {locale === "es" ? "(mínimo 2 días)" : locale === "en" ? "(minimum 2 days)" : "(minimo 2 giorni)"}</p>
                {rawDays > 0 && rawDays < 2 && (
                  <p className="mono mt-2 rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-bold text-amber-700">{locale === "es" ? "Por política, la renta mínima es de 2 días." : locale === "en" ? "Per policy, minimum rental is 2 days." : "Per politica, noleggio minimo 2 giorni."}</p>
                )}
                <p className="mt-6 text-[13px] font-bold">{(t as any).vehicle}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
                  {(locale === "es" ? ["Carro", "Camioneta", "Van", "Otro"] : locale === "en" ? ["Car", "SUV", "Van", "Other"] : ["Auto", "SUV", "Van", "Altro"]).map((c) => (
                    <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-2xl border px-4 py-3 text-[13px] font-bold ${category === c ? "border-black bg-[var(--color-ink)] text-white" : "border-black/10 bg-white hover:bg-black/5"}`}>
                      {c}
                    </button>
                  ))}
                </div>
                {(category === "Otro" || category === "Other" || category === "Altro") && (
                  <input value={categoryOther} onChange={(e) => setCategoryOther(e.target.value)} placeholder={locale === "es" ? "Especifica: modelo, capacidad, ej. Suburban" : locale === "en" ? "Specify: model, capacity" : "Specifica: modello"} className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px]" />
                )}

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
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} required className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] focus:border-black/20 focus:outline-none" />
                  <div>
                    <div className="flex gap-2">
                      <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} className="w-[110px] shrink-0 rounded-2xl border border-black/10 bg-white px-3 py-3 text-[14px] focus:border-black/20 focus:outline-none">
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>{c.label}</option>
                        ))}
                      </select>
                      <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))} placeholder={(t as any).phonePh} required type="tel" inputMode="numeric" maxLength={15} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] focus:border-black/20 focus:outline-none" />
                    </div>
                  </div>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} type="email" className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] focus:border-black/20 focus:outline-none" />
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePh} rows={3} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-[14px] focus:border-black/20 focus:outline-none" />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={canStep4 ? waUrl : undefined} target="_blank" rel="noopener" onClick={(e) => { if (!canStep4) e.preventDefault(); }} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] font-bold text-white ${canStep4 ? "bg-[#25D366] hover:bg-[#1eb955]" : "bg-black/20 pointer-events-none"}`}>
                    {t.whatsapp} ↗
                  </a>
                  <a href={canStep4 ? `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}` : undefined} onClick={(e) => { if (!canStep4) e.preventDefault(); }} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-6 py-4 text-[14px] font-bold ${canStep4 ? "border-black/10 bg-white hover:bg-black hover:text-white" : "border-black/10 bg-black/5 text-black/30 pointer-events-none"}`}>
                    {t.emailBtn} <span>→</span>
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

          {/* summary — sticky */}
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
              <div className="rounded-2xl bg-white/10 p-3">
                <p className="mono text-[10px] tracking-[0.12em] text-white/50">{(t as any).vehicle}</p>
                <p className="font-bold">{category === "Otro" || category === "Other" || category === "Altro" ? (categoryOther || category) : (category || "—")}</p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 font-bold text-white">
                <span>{t.days}: {days || "—"}</span>
                <span className="mono text-[11px] font-normal text-white/60">{locale === "es" ? "solo cotización" : locale === "en" ? "quote only" : "solo preventivo"}</span>
              </div>
              {rawDays > 0 && rawDays < 2 && <p className="mono rounded-xl bg-amber-400/20 px-3 py-2 text-[11px] font-bold text-amber-200">{locale === "es" ? "Mínimo 2 días aplicado" : locale === "en" ? "Minimum 2 days applied" : "Minimo 2 giorni"}</p>}
              <p className="mono text-[10px] leading-relaxed text-white/40">{locale === "es" ? "Mínimo 2 días • Sin tarjeta • Km ilimitado • Entrega 24/7." : locale === "en" ? "Minimum 2 days • No card • Unlimited km • Delivery 24/7." : "Minimo 2 giorni • Senza carta • Km illimitato • Consegna 24/7."}</p>
            </div>
          </div>
        </div>
      </section>
      <Footer locale={locale} />
    </div>
  );
}
