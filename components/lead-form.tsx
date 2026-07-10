"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import {
  LEAD_PREFILL_EVENT,
  type LeadPrefill,
} from "@/lib/lead-prefill";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICE_OPTIONS = [
  { value: "mycie", label: "Mycie detailingowe" },
  { value: "korekta", label: "Korekta lakieru" },
  { value: "ceramika", label: "Powłoka ceramiczna" },
  { value: "ppf", label: "Ochrona PPF" },
  { value: "wnetrze", label: "Detailing wnętrza" },
  { value: "inne", label: "Inne / nie wiem" },
];

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-sans text-[10px] uppercase tracking-[0.3em] text-cream/45"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border-b border-cream/20 bg-transparent pb-3 pt-1 font-sans text-sm text-cream placeholder:text-cream/35 transition-colors duration-300 hover:border-cream/40 focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-wine";

function validPhone(value: string): boolean {
  if (!/^\+?[\d\s().-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string | null>(null);
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState(false);

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { service: nextService, details: nextDetails } = (
        event as CustomEvent<LeadPrefill>
      ).detail;
      if (
        nextService &&
        SERVICE_OPTIONS.some((option) => option.value === nextService)
      ) {
        setService(nextService);
      }
      if (nextDetails) setDetails(nextDetails);
    };

    window.addEventListener(LEAD_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(LEAD_PREFILL_EVENT, onPrefill);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2 || !validPhone(phone)) {
      setInvalidFields(true);
      setError("Podaj imię i poprawny numer telefonu.");
      return;
    }

    setInvalidFields(false);
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const website = new FormData(form).get("website");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, phone, service, details, website }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setInvalidFields(response.status === 400);
        setError(result.error ?? "Nie udało się wysłać zgłoszenia.");
        return;
      }
      setSent(true);
    } catch {
      setError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-champagne/25 bg-wine px-6 py-7 sm:px-8 sm:py-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 text-gold">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 12.5 9.5 18 20 6.5" />
              </svg>
            </span>
            <p className="mt-6 font-display text-xl font-semibold uppercase tracking-wide text-gold">
              Dziękujemy!
            </p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream/65">
              Twoje zgłoszenie zostało wysłane. Odezwiemy się w ciągu godziny
              w dni robocze.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName("");
                setPhone("");
                setService(null);
                setDetails("");
                setError(null);
                setInvalidFields(false);
              }}
              className="mt-7 font-sans text-[11px] uppercase tracking-[0.26em] text-champagne transition-colors duration-300 hover:text-gold"
            >
              Wyślij kolejne →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.32em] text-cream/50">
              Zostaw zgłoszenie
            </span>
            <p className="mt-3 font-sans text-sm leading-relaxed text-cream/60">
              Oddzwonimy, doradzimy i zarezerwujemy termin.
            </p>

            <div className="mt-7 space-y-6">
              <Field label="Imię" htmlFor="lead-name">
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={invalidFields}
                  aria-describedby={invalidFields ? "lead-error" : undefined}
                  required
                  placeholder="Jak się do Ciebie zwracać?"
                  className={inputCls}
                />
              </Field>

              <Field label="Telefon" htmlFor="lead-phone">
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={invalidFields}
                  aria-describedby={invalidFields ? "lead-error" : undefined}
                  inputMode="tel"
                  required
                  placeholder="+48 ___ ___ ___"
                  className={inputCls}
                />
              </Field>

              <Field label="Usługa" htmlFor="lead-service">
                <Select
                  id="lead-service"
                  options={SERVICE_OPTIONS}
                  value={service}
                  onChange={setService}
                  placeholder="Czego potrzebuje Twoje auto?"
                />
              </Field>

              <Field label="Uwagi" htmlFor="lead-details">
                <textarea
                  id="lead-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Model auta, wybrane usługi lub dogodny termin"
                  className={cn(inputCls, "resize-y")}
                />
              </Field>
            </div>

            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 font-sans text-xs text-[#e08c8c]"
                  role="alert"
                  id="lead-error"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className={cn(
                "group mt-8 inline-flex w-full items-center justify-between gap-10 bg-gold px-8 py-5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.28em] text-wine-deep transition-colors duration-500 ease-lux hover:bg-cream-soft active:scale-[0.99] disabled:cursor-wait disabled:opacity-60",
              )}
            >
              <span>{sending ? "Wysyłanie…" : "Wyślij zgłoszenie"}</span>
              <svg
                width="26"
                height="12"
                viewBox="0 0 26 12"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              >
                <path
                  d="M0 6h24M19 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="mt-4 font-sans text-[10px] leading-relaxed text-cream/35">
              Wysyłając zgłoszenie wyrażasz zgodę na kontakt telefoniczny
              w sprawie wyceny.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
