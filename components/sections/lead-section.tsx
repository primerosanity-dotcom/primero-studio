import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { getContactConfig } from "@/lib/site-config";

const HOURS = [
  { d: "Pon – Pt", h: "09:00 – 19:00" },
  { d: "Sobota", h: "10:00 – 15:00" },
  { d: "Niedziela", h: "Zamknięte" },
];

function Pin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="11" r="2.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Lead capture block on every page. `withLocation` (home) swaps the plain quick
 * links for a full studio card — address, hours, phone and map — so the home
 * page has one rich booking block instead of two similar ones.
 */
export function LeadSection({ withLocation = false }: { withLocation?: boolean }) {
  const contact = getContactConfig();
  const address =
    contact.addressLines.length > 0 ? contact.addressLines : ["Łódź"];
  const mapsUrl =
    contact.mapsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `PRIMERO.STUDIO ${address.join(" ")}`,
    )}`;

  return (
    <section
      id="kontakt-form"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="texture-wine absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 15% 10%, rgba(124,32,48,0.28), transparent 55%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 pb-16 pt-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <Reveal>
            <SectionLabel index="→">Umów wizytę</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2rem,4.4vw,3.5rem)] text-gold"
            >
              Gotowy na perfekcję?
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-cream/65">
              Zostaw kontakt — oddzwonimy, doradzimy zakres prac i zarezerwujemy
              dogodny termin. Zadbamy o każdy detal Twojego auta.
            </p>
          </Reveal>

          {withLocation ? (
            <Reveal delay={0.15}>
              <div className="mt-8 max-w-md rounded-2xl border border-cream/12 bg-wine/40 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-gold">
                    <Pin />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-cream">
                      PRIMERO.STUDIO
                    </h3>
                    <address className="mt-1 not-italic font-sans text-sm leading-relaxed text-cream/60">
                      {address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-cream/10 pt-5">
                  {HOURS.map((row) => (
                    <div key={row.d}>
                      <span className="block font-sans text-[9px] uppercase tracking-[0.16em] text-cream/40">
                        {row.d}
                      </span>
                      <span className="mt-1 block font-sans text-[12px] font-medium text-cream/85">
                        {row.h}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-5">
                  {contact.phoneHref && contact.phoneDisplay && (
                    <a
                      href={contact.phoneHref}
                      className="font-display text-lg font-semibold text-gold transition-colors hover:text-cream"
                    >
                      {contact.phoneDisplay}
                    </a>
                  )}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      aria-hidden
                    >
                      <path
                        d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"
                        strokeLinejoin="round"
                      />
                      <path d="M9 4v14M15 6v14" />
                    </svg>
                    Pokaż na mapie
                  </a>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[11px] uppercase tracking-[0.22em] text-cream/50">
                {contact.phoneHref && contact.phoneDisplay && (
                  <a href={contact.phoneHref} className="hover:text-gold">
                    {contact.phoneDisplay}
                  </a>
                )}
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold"
                >
                  {contact.instagramHandle}
                </a>
                <span>Łódź</span>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15}>
          <LeadForm
            deliveryEnabled={contact.leadDeliveryEnabled}
            fallbackUrl={contact.whatsappUrl ?? contact.instagramUrl}
          />
        </Reveal>
      </div>
    </section>
  );
}
