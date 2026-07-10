import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";

export function Effect() {
  return (
    <section
      id="efekty"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 85% 20%, rgba(124,32,48,0.35), transparent 55%), linear-gradient(180deg, #120306 0%, #180508 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-6 pb-12 pt-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-36">
        {/* Left — copy */}
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel index="04">Efekty</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2.3rem,5.4vw,4.75rem)] text-gold"
            >
              Efekt, który mówi
              <br />
              sam za siebie.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 h-px w-14 bg-champagne/50" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-cream/65">
              Głęboki połysk, idealna gładkość i ochrona, która naprawdę działa.
              Każdy detal ma znaczenie.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ArrowButton
              href="#opinie"
              tone="dark"
              className="mt-10 w-full sm:w-auto"
            >
              Zobacz realizacje
            </ArrowButton>
          </Reveal>
        </div>

        {/* Right — media */}
        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            {/* Podmień: <MediaSlot src="/images/effect.jpg" ... /> */}
            <MediaSlot
              caption="Głęboki połysk"
              className="aspect-[16/10] w-full lg:aspect-auto lg:h-[64vh]"
            />
          </Reveal>
        </div>
      </div>

      <NextCue index="05" label="Usługi" href="#uslugi" tone="dark" />
    </section>
  );
}
