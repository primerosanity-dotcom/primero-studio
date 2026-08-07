import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/projects";

function Arrow() {
  return (
    <svg
      width="24"
      height="11"
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

export function ProjectsGrid({ index = "05" }: { index?: string }) {
  return (
    <section
      id="realizacje"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 12%, rgba(124,32,48,0.3), transparent 55%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index={index}>Realizacje</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2.1rem,4.8vw,4.25rem)] gold-metallic"
            >
              Auta, które przeszły przez nasze ręce.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/65">
              Każda realizacja to inny lakier, inny stan i inny zakres prac —
              efekt zawsze ten sam: perfekcja w detalu.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 + i * 0.06}>
              <Link
                href={`/realizacje/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/12 bg-wine/40 transition-colors duration-500 ease-lux hover:border-champagne/50"
              >
                {/* Podmień: zdjęcie realizacji w lib/projects.ts */}
                <MediaSlot
                  src={p.image}
                  alt={`${p.car} — ${p.service}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full"
                />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full bg-gold/15 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-gold">
                      {p.service}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/35">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-[0.06em] text-cream transition-colors duration-300 group-hover:text-gold sm:text-xl">
                    {p.car}
                  </h3>
                  <p className="mt-1.5 flex-1 font-sans text-[13px] leading-snug text-cream/55">
                    {p.short}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2.5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.22em] text-champagne transition-colors duration-300 group-hover:text-gold">
                    Zobacz szczegóły
                    <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
