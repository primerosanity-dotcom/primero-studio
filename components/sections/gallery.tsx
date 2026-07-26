import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";

const TILES = [
  { caption: "Korekta lakieru", cls: "aspect-[4/3] sm:col-span-2" },
  { caption: "Powłoka ceramiczna", cls: "aspect-[3/4]" },
  { caption: "Detal felgi", cls: "aspect-[3/4]" },
  { caption: "Wnętrze — skóra", cls: "aspect-[3/4]" },
  { caption: "Głęboki połysk", cls: "aspect-[4/3] sm:col-span-2" },
];

export function Gallery() {
  return (
    <section
      id="galeria"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream-soft text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-24 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="—" tone="ink">
              Galeria
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2rem,4.6vw,4rem)] text-ink"
            >
              Auta, które przeszły przez nasze ręce.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Każda realizacja to inny lakier, inny stan i inny zakres prac —
              efekt zawsze ten sam: perfekcja w detalu.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16">
          {TILES.map((t, i) => (
            <Reveal key={t.caption} delay={0.05 + i * 0.07} className={t.cls}>
              {/* Podmień: <MediaSlot src="/images/realizacja-N.jpg" ... /> */}
              <MediaSlot caption={t.caption} className="h-full w-full rounded-lg" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ArrowButton
            href="/kontakt"
            tone="light"
            className="mt-12 w-full justify-between lg:mt-16"
          >
            Umów swoje auto
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  );
}
