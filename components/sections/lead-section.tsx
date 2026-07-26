import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { getContactConfig } from "@/lib/site-config";

export function LeadSection() {
  const contact = getContactConfig();

  return (
    <section
      id="kontakt-form"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
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
              <span>Warszawa</span>
            </div>
          </Reveal>
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
