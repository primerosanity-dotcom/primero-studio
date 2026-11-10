import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import { getPointServices } from "@/lib/content";

// The three services we lead with on the home page.
const POPULAR_IDS = [
  "mycie-detailingowe",
  "powloka-ceramiczna",
  "pranie-wnetrza",
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="11"
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

export async function HomeServices({ index = "03" }: { index?: string }) {
  const all = await getPointServices();
  const POPULAR = POPULAR_IDS.map((id) => all.find((s) => s.id === id)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );
  return (
    <section
      id="uslugi-home"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={index} tone="ink">
              Usługi
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.1rem,5vw,4.5rem)] text-ink"
            >
              Najczęściej wybierane usługi.
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {POPULAR.map((s, i) => (
            <Reveal key={s.id} delay={0.05 + i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-cream-soft/40 transition-colors duration-500 ease-lux hover:border-champagne/50">
                <MediaSlot
                  src={s.image}
                  alt={s.title}
                  tone="light"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[16/9] w-full"
                />

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                      {s.n}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/45">
                      {s.duration}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.12em] text-ink">
                    <Link
                      href={`/uslugi/${s.id}`}
                      className="transition-colors duration-300 hover:text-champagne"
                    >
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink/60">
                    {s.desc}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2 border-t border-ink/10 pt-6">
                    <span className="font-display text-3xl font-bold text-ink">
                      {s.price}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href="/kontakt"
                      className="group/btn inline-flex flex-1 items-center justify-between gap-6 bg-gold px-6 py-4 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-wine-deep shadow-[0_12px_32px_-12px_rgba(217,184,114,0.5)] transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:bg-cream-soft active:translate-y-0 active:scale-[0.99]"
                    >
                      <span>Zapytaj</span>
                      <Arrow className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1" />
                    </Link>
                    <Link
                      href={`/uslugi/${s.id}`}
                      aria-label={`${s.title} — szczegóły`}
                      className="shrink-0 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-ink/50 transition-colors duration-300 hover:text-champagne"
                    >
                      Szczegóły
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <ArrowButton
            href="/uslugi"
            tone="light"
            variant="outline"
            className="mt-10 w-full justify-between lg:mt-12"
          >
            Wszystkie usługi
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
