import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Monogram } from "@/components/ui/monogram";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import type { ContactConfig } from "@/lib/site-config";

const S = { stroke: "currentColor", strokeWidth: 1.3, fill: "none" } as const;

const Icons = {
  phone: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <rect x="7.5" y="3" width="9" height="18" rx="2.2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <path
        d="M4 20l1.3-3.3A7.2 7.2 0 1 1 8.4 19L4 20z"
        strokeLinejoin="round"
      />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" strokeLinecap="round" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m5 7 7 5.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.1" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden {...S}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.8 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function Contact({ contact }: { contact: ContactConfig }) {
  const contacts = [
    contact.phoneHref && contact.phoneDisplay
      ? {
          icon: Icons.email,
          label: "Telefon",
          lines: [contact.phoneDisplay],
          href: contact.phoneHref,
          external: false,
        }
      : null,
    contact.whatsappUrl
      ? {
          icon: Icons.whatsapp,
          label: "WhatsApp",
          lines: [contact.phoneDisplay ?? "Napisz na WhatsApp"],
          href: contact.whatsappUrl,
          external: true,
        }
      : null,
    {
      icon: Icons.instagram,
      label: "Instagram",
      lines: [contact.instagramHandle],
      href: contact.instagramUrl,
      external: true,
    },
    contact.email
      ? {
          icon: Icons.phone,
          label: "E-mail",
          lines: [contact.email],
          href: `mailto:${contact.email}`,
          external: false,
        }
      : null,
    contact.addressLines.length
      ? {
          icon: Icons.pin,
          label: "Adres",
          lines: contact.addressLines,
          href: contact.mapsUrl,
          external: Boolean(contact.mapsUrl),
        }
      : null,
    {
      icon: Icons.clock,
      label: "Godziny pracy",
      lines: ["Pon – Pt: 9:00 – 19:00", "Sob: 10:00 – 15:00"],
      href: null,
      external: false,
    },
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

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

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 pb-12 pt-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-20 lg:pt-32">
        {/* Left — heading + contacts */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index="08">Kontakt</SectionLabel>
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
          <ul className="relative mt-8 max-w-md lg:mt-12">
            <span
              aria-hidden
              className="absolute bottom-6 left-[19px] top-6 w-px bg-cream/12"
            />
            {contacts.map((c, i) => (
              <Reveal as="li" key={c.label} delay={0.15 + i * 0.07}>
                <div className="relative flex items-start gap-5 py-3.5">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/15 bg-wine-deep text-gold">
                    {c.icon}
                  </span>
                  <div className="pt-1">
                    <span className="block font-sans text-[10px] uppercase tracking-[0.32em] text-cream/45">
                      {c.label}
                    </span>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noreferrer" : undefined}
                        className="mt-1.5 block space-y-0.5 text-cream/85 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                      >
                        {c.lines.map((line) => (
                          <span
                            key={line}
                            className="block font-sans text-sm sm:text-base"
                          >
                            {line}
                          </span>
                        ))}
                      </a>
                    ) : (
                      <div className="mt-1.5 space-y-0.5">
                        {c.lines.map((line) => (
                          <p
                            key={line}
                            className="font-sans text-sm text-cream/85 sm:text-base"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

        </div>

        {/* Right — lead form */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15} className="lg:sticky lg:top-24">
            <LeadForm
              deliveryEnabled={contact.leadDeliveryEnabled}
              fallbackUrl={contact.whatsappUrl ?? contact.instagramUrl}
              fallbackLabel={
                contact.whatsappUrl ? "Napisz na WhatsApp" : "Napisz na Instagramie"
              }
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
