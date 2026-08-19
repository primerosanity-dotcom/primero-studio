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
            <SectionLabel index={index}>Usługi</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2rem,4.6vw,3.8rem)] gold-metallic"
            >
              Najczęściej wybierane usługi.
            </Heading>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {POPULAR.map((s, i) => (
            <Reveal key={s.id} delay={0.05 + i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/12 bg-wine/40 transition-colors duration-500 ease-lux hover:border-champagne/40">
                <MediaSlot
                  src={s.image}
                  alt={s.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[16/9] w-full"
                />

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                      {s.n}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-cream/40">
                      {s.duration}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.12em] text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-cream/55">
                    {s.desc}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2 border-t border-cream/10 pt-6">
                    <span className="font-display text-3xl font-bold text-cream">
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
                      href="/uslugi"
                      className="shrink-0 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-cream/45 transition-colors duration-300 hover:text-champagne"
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
            tone="dark"
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
