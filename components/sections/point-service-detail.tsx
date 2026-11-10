import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import type { PointService } from "@/lib/individual-services";
import type { Service } from "@/lib/services";
import type { ServicePage } from "@/lib/service-pages";

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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-2xl border border-cream/10 bg-wine/40 p-6 sm:p-7">
      <h2 className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/80">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check />
          <span className="font-sans text-sm leading-snug text-cream/80">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Landing page for one single service — the page that should rank for
 * "<usługa> Łódź". Server-rendered end to end: every word is in the HTML.
 */
export function PointServiceDetail({
  service,
  page,
  packages,
  related,
}: {
  service: PointService;
  page: ServicePage | undefined;
  packages: Service[];
  related: PointService[];
}) {
  const h1 = page?.h1 ?? `${service.title} w Łodzi`;
  const intro = page?.intro ?? [service.desc];

  const meta = [
    { label: "Cena", value: service.price },
    { label: "Czas wykonania", value: service.duration },
    { label: "Lokalizacja", value: "Łódź" },
  ].filter((m) => m.value);

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
        <Reveal>
          <nav
            aria-label="Okruszki"
            className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-cream/45"
          >
            <Link href="/uslugi" className="transition-colors hover:text-gold">
              Usługi
            </Link>
            <span className="text-cream/25">/</span>
            <span className="text-cream/70">{service.title}</span>
          </nav>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index={service.n}>Usługa</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading
                as="h1"
                variant="elegant"
                className="mt-8 text-[clamp(2rem,4.6vw,3.8rem)] gold-metallic"
              >
                {h1}
              </Heading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 max-w-xl space-y-4">
                {intro.map((p) => (
                  <p
                    key={p}
                    className="font-sans text-base leading-relaxed text-cream/75"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {service.price && (
                  <span className="font-display text-3xl font-semibold text-cream">
                    {service.price}
                  </span>
                )}
                <ArrowButton href="#kontakt-form" tone="dark">
                  Umów wizytę
                </ArrowButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <MediaSlot
              src={service.image}
              alt={`${service.title} — Primero Studio Łódź`}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[16/10] w-full rounded-2xl sm:aspect-[16/9] lg:aspect-[4/3]"
            />
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-3">
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

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16">
          <Reveal>
            <Card title="Co obejmuje usługa">
              <Checklist items={page?.includes ?? [service.desc]} />
            </Card>
          </Reveal>
          {page?.when?.length ? (
            <Reveal delay={0.05}>
              <Card title="Kiedy warto">
                <Checklist items={page.when} />
              </Card>
            </Reveal>
          ) : null}
        </div>

        {packages.length > 0 && (
          <Reveal>
            <div className="mt-12 rounded-2xl border border-cream/10 bg-wine/30 p-7 sm:p-9 lg:mt-16">
              <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                {h1.replace(/\s+w Łodzi$/, "")} w pakiecie
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-cream/60">
                Ta usługa jest częścią pakietów, w których łączymy kilka zabiegów
                w jednej wizycie.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/pakiety/${p.slug}`}
                      className="group flex h-full items-center justify-between gap-4 rounded-xl border border-cream/10 px-5 py-4 transition-colors duration-300 hover:border-champagne/50"
                    >
                      <span>
                        <span className="block font-display text-lg font-semibold uppercase tracking-[0.04em] text-cream">
                          {p.name}
                        </span>
                        <span className="mt-1 block font-sans text-xs text-cream/50">
                          {p.tagline} · {p.price}
                        </span>
                      </span>
                      <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {related.length > 0 && (
          <div className="mt-16 border-t border-cream/10 pt-12">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
              Powiązane usługi
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/uslugi/${r.id}`}
                    className="group inline-flex items-center gap-3 font-display text-lg font-medium uppercase tracking-[0.02em] text-cream/70 transition-colors duration-300 hover:text-gold sm:text-xl"
                  >
                    {r.title}
                    <span className="text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
