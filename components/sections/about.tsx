import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";
import { getSettings } from "@/lib/content";

const CAPABILITIES = [
  "Korekta lakieru",
  "Powłoki ceramiczne",
  "Ochrona PPF",
  "Pielęgnacja wnętrza",
];

export async function About() {
  const { aboutImage } = await getSettings();
  return (
    <section
      id="o-nas"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 pb-16 pt-28 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-40">
        {/* Left — copy + capabilities */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel index="02" tone="ink">
              O nas
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.2rem,5.2vw,4.5rem)] text-ink"
            >
              Nie myjnia.
              <br />
              Studio detailingu.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 h-px w-14 bg-champagne/60" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Primero Studio to precyzyjna pielęgnacja samochodów —
              od korekty lakieru po ochronę i wnętrze dopracowane
              w&nbsp;każdym detalu.
            </p>
          </Reveal>

          <ul className="mt-8 lg:mt-12">
            {CAPABILITIES.map((c, i) => (
              <Reveal as="li" key={c} delay={0.2 + i * 0.08}>
                <div className="group flex items-center gap-6 border-b border-ink/10 py-4 lg:py-5">
                  <span className="font-display text-lg font-medium text-ink/25">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-sm uppercase tracking-[0.24em] text-ink transition-colors duration-300 group-hover:text-champagne sm:text-base">
                    {c}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Right — media */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15}>
            <MediaSlot
              src={aboutImage}
              alt="Wnętrze studia Primero — hala detailingowa"
              tone="light"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[16/10] w-full rounded-2xl lg:aspect-auto lg:h-[62vh]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
