import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Monogram } from "@/components/ui/monogram";
import { Reveal } from "@/components/reveal";
import { getPackages, getSettings } from "@/lib/content";
import { ArrowButton } from "@/components/ui/arrow-button";
import { PackageBookingButton } from "@/components/package-booking-button";
import { isWinterPricing, WINTER_BADGE, WINTER_NOTE } from "@/lib/pricing";
import type { Service } from "@/lib/services";

/**
 * The homepage shows a short pick of the packages; the full list lives on
 * /pakiety. The featured card is the package marked "Najczęściej wybierany"
 * in Studio; these follow it, in this order.
 */
const HOME_SLUGS = [
  "mycie-wnetrze",
  "pranie-wnetrza",
  "ochrona-na-zime",
  "polerowanie-ceramika-3-lata",
];
const HOME_COUNT = HOME_SLUGS.length;

/** Same checkmark as the "W pakiecie" list on the package pages. */
function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

function Includes({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-5 flex-1 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check />
          <span className="font-sans text-[13px] leading-snug text-cream/70">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Price row + buttons, matching the Usługi cards on the homepage. */
function CardFooter({
  service,
  deliveryEnabled,
  fallbackUrl,
}: {
  service: Service;
  deliveryEnabled: boolean;
  fallbackUrl: string;
}) {
  return (
    <>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-cream/10 pt-6">
        <span className="font-display text-3xl font-bold text-cream">
          {service.price}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <PackageBookingButton
          summary={{
            name: service.name,
            tagline: service.tagline,
            price: service.price,
            cycle: service.cycle,
            duration: service.duration,
            includes: service.includes,
            prefill: service.prefill,
          }}
          deliveryEnabled={deliveryEnabled}
          fallbackUrl={fallbackUrl}
        />
        <Link
          href={`/pakiety/${service.slug}`}
          className="shrink-0 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-cream/45 transition-colors duration-300 hover:text-champagne"
        >
          Szczegóły
        </Link>
      </div>
    </>
  );
}

export async function ServicesShowcase({ index = "03" }: { index?: string }) {
  const [all, { contact }] = await Promise.all([
    getPackages(),
    getSettings(),
  ]);
  const featured = all.find((s) => s.popular);
  const rest = all.filter((s) => s !== featured);
  const picked = HOME_SLUGS.map((slug) => rest.find((s) => s.slug === slug)).filter(
    (s): s is Service => Boolean(s),
  );
  // If Studio slugs change, fall back to the first packages instead of an empty row.
  const SERVICES = picked.length === HOME_COUNT ? picked : rest.slice(0, HOME_COUNT);
  const winter = isWinterPricing() && all.some((s) => s.priceSeason);
  const deliveryEnabled = contact.leadDeliveryEnabled;
  const fallbackUrl = contact.whatsappUrl ?? contact.instagramUrl;

  return (
    <section
      id="pakiety"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 12% 12%, rgba(124,32,48,0.28), transparent 55%), #150406",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={index}>
              Pakiety
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2rem,4.6vw,3.8rem)] gold-metallic"
            >
              Pakiet dopasowany do twojego auta.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-cream/55">
              Kompleksowe pakiety — od regularnej pielęgnacji po pełną
              renowację i ochronę ceramiczną. Zobacz zakres i orientacyjną cenę.
            </p>
          </Reveal>
          {winter && (
            <Reveal delay={0.12}>
              <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.18em] text-champagne">
                {WINTER_NOTE}
              </p>
            </Reveal>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {/* Featured package — the site's "featured" card style (see /pakiety) */}
          {featured && (
            <Reveal delay={0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/50 bg-gold/[0.05] transition-[translate,border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_18px_44px_-28px_rgba(217,184,114,0.4)]">
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full bg-gold px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-wine-deep">
                    {winter ? WINTER_BADGE : "Najczęściej wybierany"}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.14em] text-gold sm:text-xl">
                    {featured.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-cream/55">
                    {featured.short}
                  </p>
                  <Includes items={featured.includes} />
                  <CardFooter
                    service={featured}
                    deliveryEnabled={deliveryEnabled}
                    fallbackUrl={fallbackUrl}
                  />
                </div>
              </article>
            </Reveal>
          )}

          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.11 + i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/12 bg-wine/40 transition-[translate,border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-champagne/40 hover:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.55)]">
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-300 group-hover:text-champagne sm:text-xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-cream/55">
                    {s.short}
                  </p>
                  <Includes items={s.includes} />
                  <CardFooter
                    service={s}
                    deliveryEnabled={deliveryEnabled}
                    fallbackUrl={fallbackUrl}
                  />
                </div>
              </article>
            </Reveal>
          ))}

          {/* CTA closes the grid */}
          <Reveal delay={0.05 + SERVICES.length * 0.06}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-champagne/30 bg-wine p-7 text-cream sm:p-8">
              <Monogram className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 text-gold/[0.06]" />
              <div className="relative">
                <span className="font-sans text-[11px] tracking-[0.3em] text-gold/70">
                  {String(SERVICES.length + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.14em] text-gold sm:text-xl">
                  Nie wiesz,
                  <br />
                  który pakiet wybrać?
                </h3>
                <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream/65">
                  Napisz lub zadzwoń — obejrzymy auto, dobierzemy zakres prac
                  i przygotujemy indywidualną wycenę.
                </p>
              </div>

              <div className="relative mt-8 flex flex-col gap-3">
                <Link
                  href="/kontakt"
                  className="group/btn inline-flex items-center justify-between gap-6 bg-gold px-6 py-4 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-wine-deep shadow-[0_12px_32px_-12px_rgba(217,184,114,0.5)] transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:bg-cream-soft active:translate-y-0 active:scale-[0.99]"
                >
                  <span>Umów konsultację</span>
                  <svg
                    width="24"
                    height="11"
                    viewBox="0 0 26 12"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1"
                  >
                    <path
                      d="M0 6h24M19 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                {contact.phoneHref && contact.phoneDisplay && (
                  <a
                    href={contact.phoneHref}
                    className="text-center font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream/55 transition-colors duration-300 hover:text-gold"
                  >
                    {contact.phoneDisplay}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <ArrowButton
            href="/pakiety"
            variant="outline"
            className="mt-10 w-full justify-between lg:mt-12"
          >
            Wszystkie pakiety
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
