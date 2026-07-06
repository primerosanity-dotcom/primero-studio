import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Monogram } from "@/components/ui/monogram";
import { Reveal } from "@/components/reveal";

const S = { stroke: "currentColor", strokeWidth: 1.3, fill: "none" } as const;

const Icons = {
  phone: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...S}>
      <rect x="7.5" y="3" width="9" height="18" rx="2.2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...S}>
      <path
        d="M4 20l1.3-3.3A7.2 7.2 0 1 1 8.4 19L4 20z"
        strokeLinejoin="round"
      />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" strokeLinecap="round" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...S}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...S}>
      <path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.1" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...S}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.8 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const CONTACTS = [
  { icon: Icons.phone, label: "Telefon", lines: ["+48 123 456 789"] },
  { icon: Icons.whatsapp, label: "WhatsApp", lines: ["+48 123 456 789"] },
  { icon: Icons.instagram, label: "Instagram", lines: ["@primero.studio"] },
  {
    icon: Icons.pin,
    label: "Adres",
    // Podmień na prawdziwy adres w Warszawie
    lines: ["ul. Przykładowa 12", "00-001 Warszawa"],
  },
  {
    icon: Icons.clock,
    label: "Godziny pracy",
    lines: ["Pon – Pt: 9:00 – 19:00", "Sob: 10:00 – 15:00"],
  },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 85% 12%, rgba(124,32,48,0.32), transparent 55%), linear-gradient(180deg, #150406 0%, #100305 100%)",
        }}
      />

      {/* Faint monogram watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-16 hidden text-gold/[0.04] lg:block"
      >
        <Monogram className="h-[80vh] w-auto" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-6 pb-16 pt-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-20 lg:pt-36">
        {/* Left — heading + contacts */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index="07">Kontakt</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2.2rem,5vw,4.5rem)] text-gold"
            >
              Umów wizytę
              <br />w Primero Studio.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-cream/65">
              Zadbamy o każdy detal. Ty cieszysz się efektem.
            </p>
          </Reveal>

          {/* Contact timeline */}
          <ul className="relative mt-12 max-w-md">
            <span
              aria-hidden
              className="absolute bottom-6 left-[19px] top-6 w-px bg-cream/12"
            />
            {CONTACTS.map((c, i) => (
              <Reveal as="li" key={c.label} delay={0.15 + i * 0.07}>
                <div className="relative flex items-start gap-5 py-3.5">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/15 bg-wine-deep text-gold">
                    {c.icon}
                  </span>
                  <div className="pt-1">
                    <span className="block font-sans text-[10px] uppercase tracking-[0.32em] text-cream/45">
                      {c.label}
                    </span>
                    <div className="mt-1.5 space-y-0.5">
                      {c.lines.map((l) => (
                        <p
                          key={l}
                          className="font-sans text-sm text-cream/85 sm:text-base"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <ArrowButton
              href="#kontakt"
              tone="dark"
              className="mt-11 w-full sm:w-auto"
            >
              Umów wizytę
            </ArrowButton>
          </Reveal>
        </div>

        {/* Right — media */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15}>
            {/* Podmień: <MediaSlot src="/images/contact.jpg" ... /> */}
            <MediaSlot
              caption="Primero · Warszawa"
              className="aspect-[4/5] w-full lg:aspect-auto lg:h-[70vh]"
            />
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-cream/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between lg:px-12">
          <span className="font-display text-xs font-medium tracking-[0.22em] text-cream/60">
            PRIMERO.STUDIO
          </span>
          <Monogram className="h-6 w-6 text-gold/80" />
          <span className="font-sans text-[10px] uppercase tracking-[0.34em] text-cream/40">
            Premium Auto Detailing
          </span>
        </div>
      </div>
    </section>
  );
}
