import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";

const STATS = [
  { value: "300+", label: "Zrealizowanych aut" },
  { value: "5,0★", label: "Ocena Google" },
  { value: "7 lat", label: "Doświadczenia" },
  { value: "100%", label: "Gwarancja jakości" },
];

export function HomeIntro() {
  return (
    <section
      id="o-nas"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left — copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="02" tone="ink">
                O nas
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                variant="strong"
                className="mt-8 text-[clamp(2rem,4.6vw,3.8rem)] text-ink"
              >
                Twoje auto,
                <br />
                <span className="text-champagne">nasza perfekcja.</span>
              </Heading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-ink/65">
                Primero Studio — studio detailingu w Łodzi. Pracujemy na
                najlepszych materiałach i zapewniamy precyzyjną pielęgnację
                auta — od korekty lakieru i ochrony karoserii po nienaganne
                wnętrze, z dbałością o każdy detal.{" "}
                <Link
                  href="/o-nas"
                  className="text-champagne underline-offset-4 hover:underline"
                >
                  Poznaj nas →
                </Link>
              </p>
            </Reveal>
          </div>

          {/* Right — studio photo */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <MediaSlot
                src="/images/about.png"
                alt="Wnętrze studia Primero — hala detailingowa"
                tone="light"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[4/3] w-full rounded-2xl"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.06}>
              <div className="h-full rounded-2xl border border-ink/10 bg-cream-soft/60 p-6 sm:p-7">
                <span className="font-display text-3xl font-semibold text-champagne sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.24em] text-ink/50">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
