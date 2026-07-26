import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/reveal";

const CARDS = [
  {
    n: "02",
    title: "O nas",
    desc: "Nie myjnia — precyzyjne studio detailingu klasy premium.",
    href: "/o-nas",
    span: "sm:col-span-2",
  },
  {
    n: "04",
    title: "Cennik",
    desc: "Skomponuj orientacyjną wycenę w kilka sekund.",
    href: "/cennik",
    span: "",
  },
  {
    n: "05",
    title: "Realizacje",
    desc: "Zobacz efekty przed / po i galerię naszych aut.",
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

function Arrow() {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
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
                className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-ink/12 bg-cream-soft/40 p-7 transition-colors duration-500 ease-lux hover:border-champagne/50 hover:bg-cream-soft/70 sm:p-8"
              >
                <div>
                  <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                    {c.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-[0.02em] text-ink sm:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-ink/60">
                    {c.desc}
                  </p>
                </div>
                <span className="flex items-center gap-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em] text-champagne transition-colors duration-300 group-hover:text-ink">
                  Zobacz
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Contact CTA card */}
          <Reveal delay={0.05 + CARDS.length * 0.06}>
            <Link
              href="/kontakt"
              className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-champagne/30 bg-wine p-7 text-cream transition-colors duration-500 ease-lux hover:bg-wine-deep sm:p-8"
            >
              <div>
                <span className="font-sans text-[11px] tracking-[0.3em] text-gold/70">
                  07
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-[0.02em] text-gold sm:text-2xl">
                  Kontakt
                </h3>
                <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-cream/65">
                  Umów wizytę — zadbamy o każdy detal Twojego auta.
                </p>
              </div>
              <span className="flex items-center gap-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em] text-gold">
                Umów wizytę
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
