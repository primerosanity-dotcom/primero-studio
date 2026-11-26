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
    // Official WhatsApp glyph (Simple Icons) — the outline version was unclear.
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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

export function Contact({
  contact,
  hours = [],
}: {
  contact: ContactConfig;
  /** Opening hours from the CMS settings — the same source as the footer. */
  hours?: { days: string; hours: string }[];
}) {
  const contacts = [
    contact.phoneHref && contact.phoneDisplay
      ? {
          icon: Icons.phone,
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
          icon: Icons.email,
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
    hours.length
      ? {
          icon: Icons.clock,
          label: "Godziny pracy",
          lines: hours.map((h) => `${h.days}: ${h.hours}`),
          href: null,
          external: false,
        }
      : null,
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
            "radial-gradient(100% 80% at 85% 12%, rgba(124,32,48,0.32), transparent 55%), #150406",
        }}
      />

      {/* Faint monogram watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-6%] top-16 hidden text-gold/[0.04] lg:block"
      >
        <Monogram className="h-[80vh] w-auto" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 pb-14 pt-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-20 lg:pt-40">
        {/* Left — heading + contacts */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index="07">Kontakt</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              as="h1"
              variant="elegant"
              className="mt-8 text-[clamp(2.2rem,5vw,4.5rem)] gold-metallic"
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
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
