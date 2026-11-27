import Link from "next/link";
import { RelatedLinks } from "@/components/ui/related-links";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import type { Service } from "@/lib/services";
import { getPackages } from "@/lib/content";
import { isWinterPricing, WINTER_NOTE } from "@/lib/pricing";
import type { PackageSeo } from "@/lib/package-seo";

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

/** Package line items that have their own service page, matched by wording. */
const SERVICE_LINKS: [RegExp, string][] = [
  [/^mycie detailingowe/i, "mycie-detailingowe"],
  [/^twardy wosk/i, "twardy-wosk"],
  [/^jednoetapowe polerowanie/i, "polerowanie"],
  [/^dwuetapowe polerowanie/i, "polerowanie-dwuetapowe"],
  [/^polerowanie reflektorów/i, "polerowanie-reflektorow"],
  [/^powłoka antydeszcz|^szyby \+ antydeszcz/i, "antideszcz"],
  [/^ceramika na (wszystkie )?szyby|^powłoka na wszystkie szyby/i, "ceramika-szyby"],
  [/^ceramika na felgi/i, "ceramika-felgi"],
  [/^czyszczenie i impregnacja skóry/i, "impregnacja-skory"],
  [/^impregnacja tapicerki/i, "impregnacja-tapicerki"],
  [/^detailing komory silnika/i, "komora-silnika"],
];

function serviceHref(item: string): string | null {
  return SERVICE_LINKS.find(([re]) => re.test(item))?.[1] ?? null;
}

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-wine/40 p-6 sm:p-7">
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/80">
        {label}
      </span>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export async function ServiceDetail({
  service,
  seo,
}: {
  service: Service;
  /** Optional search copy for this package (lib/package-seo.ts). */
  seo?: PackageSeo;
}) {
  const others = (await getPackages()).filter((s) => s.slug !== service.slug);
  const winter = isWinterPricing() && Boolean(service.priceSeason);

  const meta = [
    { label: "Cena od", value: service.price },
    { label: "Czas realizacji", value: service.duration },
    { label: "Częstotliwość", value: service.cycle },
    { label: "Lokalizacja", value: "Łódź" },
  ];

  return (
    <section
      id="usluga"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 8%, rgba(124,32,48,0.3), transparent 55%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        {/* Breadcrumb */}
        <Reveal>
          <div className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-cream/45">
            <Link href="/pakiety" className="transition-colors hover:text-gold">
              Pakiety
            </Link>
            <span className="text-cream/25">/</span>
            <span className="text-cream/70">{service.name}</span>
          </div>
        </Reveal>

        {/* Header: text + image (image a touch smaller) */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index={service.n}>Pakiet</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading
                as="h1"
                variant="elegant"
                className="mt-8 text-[clamp(2.2rem,5vw,4.2rem)]"
              >
                <span className="gold-metallic block">{service.name}</span>
                {/* Part of the H1 so the heading names the service and city,
                    not just the package brand. */}
                <span className="mt-4 block max-w-md font-sans text-lg font-normal normal-case leading-relaxed tracking-normal text-cream/80">
                  {seo?.h1Line ?? `${service.tagline} — pakiet detailingu w Łodzi`}
                </span>
              </Heading>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <span className="flex flex-col gap-1">
                  <span className="font-display text-3xl font-semibold text-cream">
                    {service.price}
                  </span>
                  {winter && (
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-champagne">
                      {WINTER_NOTE}
                    </span>
                  )}
                </span>
                <ArrowButton href="#kontakt-form" tone="dark">
                  Umów ten pakiet
                </ArrowButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <MediaSlot
              src={service.image}
              alt={`${service.name} — ${service.tagline}`}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[16/10] w-full rounded-2xl sm:aspect-[16/9] lg:aspect-[4/3]"
            />
          </Reveal>
        </div>

        {/* Meta cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4">
          {meta.map((m, i) => (
            <Reveal key={m.label} delay={0.05 + i * 0.05}>
              <div className="h-full rounded-2xl border border-cream/10 bg-wine/40 p-5 sm:p-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-cream/45">
                  {m.label}
                </span>
                <p className="mt-3 font-display text-lg font-semibold text-gold sm:text-xl">
                  {m.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick answer */}
        <Reveal>
          <div className="mt-12 rounded-2xl border border-cream/10 bg-wine/30 p-7 sm:p-9 lg:mt-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/80">
              Szybka odpowiedź
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-cream sm:text-3xl">
              Dla kogo jest pakiet {service.name}?
            </h2>
            <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-cream/70">
              {service.name} — {service.tagline.toLowerCase()} w Łodzi.
              Cena {service.price}, orientacyjny czas realizacji:{" "}
              {service.duration}. Zalecana częstotliwość: {service.cycle.toLowerCase()}.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoCard label="Problem">
                <p className="font-sans text-sm leading-relaxed text-cream/70">
                  {service.problem}
                </p>
              </InfoCard>

              <InfoCard label="Efekt">
                <ul className="space-y-2.5">
                  {service.effect.map((e) => (
                    <li key={e} className="flex items-start gap-2.5">
                      <Check />
                      <span className="font-sans text-sm leading-snug text-cream/80">
                        {e}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard label="W pakiecie">
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1">
                  {service.includes.map((item) => {
                    const slug = serviceHref(item);
                    return (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check />
                        {slug ? (
                          <Link
                            href={`/uslugi/${slug}`}
                            className="font-sans text-sm leading-snug text-cream/80 underline decoration-cream/20 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
                          >
                            {item}
                          </Link>
                        ) : (
                          <span className="font-sans text-sm leading-snug text-cream/80">
                            {item}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </InfoCard>

              <InfoCard label="Gdzie wykonujemy">
                <p className="font-sans text-sm leading-relaxed text-cream/70">
                  Studio detailingu w Łodzi. Umów dogodny termin —
                  zajmiemy się autem kompleksowo, a Ty odbierzesz je gotowe.
                </p>
                <ArrowButton
                  href="#kontakt-form"
                  tone="dark"
                  className="mt-5 w-full gap-3! whitespace-nowrap px-5! tracking-[0.2em]! sm:w-auto sm:gap-10! sm:px-8! sm:tracking-[0.28em]!"
                >
                  Zarezerwuj termin
                </ArrowButton>
              </InfoCard>
            </div>
          </div>
        </Reveal>

        {seo && (
          <Reveal>
            <div className="mt-6 rounded-2xl border border-cream/10 bg-wine/30 p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                {seo.section.heading}
              </h2>
              <div className="mt-4 max-w-3xl space-y-4">
                {seo.section.paragraphs.map((p) => (
                  <p key={p} className="font-sans text-base leading-relaxed text-cream/70">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Other packages */}
        <RelatedLinks
          label="Pozostałe pakiety"
          headingAs="span"
          items={others.map((o) => ({
            href: `/pakiety/${o.slug}`,
            title: o.name,
            image: o.image,
            meta: o.price,
          }))}
        />
      </div>
    </section>
  );
}
