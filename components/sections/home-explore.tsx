import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Monogram } from "@/components/ui/monogram";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type Card = {
  n: string;
  title: string;
  desc: string;
  href: string;
  span: string;
  feature?: boolean;
};

const CARDS: Card[] = [
  {
    n: "02",
    title: "O nas",
    desc: "Nie myjnia — precyzyjne studio detailingu klasy premium, w którym liczy się każdy detal.",
    href: "/o-nas",
    span: "sm:col-span-2 lg:col-span-2",
    feature: true,
  },
  {
    n: "03",
    title: "Usługi",
    desc: "Pojedyncze usługi — od mycia po powłokę ceramiczną.",
    href: "/uslugi",
    span: "",
  },
  {
    n: "04",
    title: "Pakiety",
    desc: "Gotowe zestawy pielęgnacji — od ESSENTIAL po SIGNATURE.",
    href: "/pakiety",
    span: "",
  },
  {
    n: "05",
    title: "Realizacje",
    desc: "Efekty przed / po i galeria naszych aut.",
    href: "/realizacje",
    span: "",
  },
  {
    n: "06",
    title: "Opinie",
    desc: "Ocena 5,0 w Google od naszych klientów.",
    href: "/opinie",
    span: "",
  },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M0 6h24M19 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeExplore() {
  return (
    <section
      id="poznaj"
      data-section-theme="light"
      className="relative scroll-mt-20 overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-20 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="03" tone="ink">
              Poznaj studio
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2rem,4.6vw,4rem)] text-ink"
            >
              Wszystko, czego potrzebuje twoje auto.
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.href} delay={0.05 + i * 0.06} className={c.span}>
              <Link
                href={c.href}
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/12 bg-cream-soft/40 p-7 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-champagne/50 hover:bg-cream-soft/70 hover:shadow-[0_28px_60px_-32px_rgba(45,7,10,0.4)] sm:p-8",
                  c.feature ? "min-h-[240px] lg:min-h-[300px]" : "min-h-[230px]",
                )}
              >
                {/* Oversized ghost number */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-8 right-1 select-none font-display font-bold leading-none text-ink/[0.05] transition-all duration-700 ease-lux group-hover:-translate-y-1 group-hover:text-champagne/15",
                    c.feature ? "text-[13rem]" : "text-[9rem]",
                  )}
                >
                  {c.n}
                </span>

                {/* Monogram watermark on the feature card */}
                {c.feature && (
                  <Monogram className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 text-ink/[0.04] transition-colors duration-700 group-hover:text-champagne/10" />
                )}

                <div className="relative">
                  <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                    {c.n}
                  </span>
                  <h3
                    className={cn(
                      "mt-4 font-display font-semibold uppercase tracking-[0.02em] text-ink transition-colors duration-300 group-hover:text-champagne",
                      c.feature
                        ? "text-2xl sm:text-3xl lg:text-4xl"
                        : "text-xl sm:text-2xl",
                    )}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 font-sans text-sm leading-relaxed text-ink/60",
                      c.feature ? "max-w-sm" : "max-w-xs",
                    )}
                  >
                    {c.desc}
                  </p>
                </div>

                <span className="relative mt-8 flex items-center gap-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em] text-champagne">
                  <span className="relative">
                    Zobacz
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 ease-lux group-hover:w-full" />
                  </span>
                  <Arrow className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5" />
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Kontakt — full-width dark banner CTA */}
          <Reveal
            delay={0.05 + CARDS.length * 0.06}
            className="sm:col-span-2 lg:col-span-3"
          >
            <Link
              href="/kontakt"
              className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-champagne/30 bg-wine p-8 text-cream transition-all duration-500 ease-lux hover:border-gold/60 hover:bg-wine-deep sm:flex-row sm:items-center sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 120% at 90% 20%, rgba(124,32,48,0.4), transparent 60%)",
                }}
              />
              <Monogram className="pointer-events-none absolute -right-6 -top-10 h-52 w-52 text-gold/[0.06] transition-all duration-700 ease-lux group-hover:-translate-y-1 group-hover:text-gold/[0.1]" />

              <div className="relative max-w-xl">
                <span className="font-sans text-[11px] tracking-[0.3em] text-gold/70">
                  07
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-[0.02em] text-gold sm:text-4xl">
                  Umów wizytę
                </h3>
                <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-cream/65">
                  Zostaw kontakt — oddzwonimy, doradzimy zakres prac i
                  zadbamy o każdy detal Twojego auta.
                </p>
              </div>

              <span className="relative inline-flex shrink-0 items-center gap-4 self-start rounded-full border border-gold/40 px-7 py-4 font-sans text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gold transition-colors duration-500 ease-lux group-hover:bg-gold group-hover:text-wine-deep sm:self-auto">
                Umów wizytę
                <Arrow className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
