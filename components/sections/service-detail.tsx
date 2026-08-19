import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import type { Service } from "@/lib/services";
import { getPackages } from "@/lib/content";

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

export async function ServiceDetail({ service }: { service: Service }) {
  const others = (await getPackages()).filter((s) => s.slug !== service.slug);

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
                className="mt-8 text-[clamp(2.2rem,5vw,4.2rem)] gold-metallic"
              >
                {service.name}
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-cream/80">
                {service.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <span className="font-display text-3xl font-semibold text-cream">
                  {service.price}
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
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check />
                      <span className="font-sans text-sm leading-snug text-cream/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard label="Gdzie wykonujemy">
                <p className="font-sans text-sm leading-relaxed text-cream/70">
                  Studio detailingu w Łodzi. Umów dogodny termin —
                  zajmiemy się autem kompleksowo, a Ty odbierzesz je gotowe.
                </p>
                <ArrowButton href="#kontakt-form" tone="dark" className="mt-5">
                  Zarezerwuj termin
                </ArrowButton>
              </InfoCard>
            </div>
          </div>
        </Reveal>

        {/* Other packages */}
        <div className="mt-16 border-t border-cream/10 pt-12">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
            Pozostałe pakiety
          </span>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/pakiety/${o.slug}`}
                className="group inline-flex items-center gap-3 font-display text-lg font-medium uppercase tracking-[0.02em] text-cream/70 transition-colors duration-300 hover:text-gold sm:text-xl"
              >
                {o.name}
                <span className="text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
