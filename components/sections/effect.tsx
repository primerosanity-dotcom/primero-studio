import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { BeforeAfter } from "@/components/ui/before-after";
import { ArrowButton } from "@/components/ui/arrow-button";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";

const CASES = [
  { caption: "Korekta lakieru", beforeSrc: undefined, afterSrc: undefined },
  { caption: "Detailing wnętrza", beforeSrc: undefined, afterSrc: undefined },
  { caption: "Renowacja felg", beforeSrc: undefined, afterSrc: undefined },
];

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

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-12 pt-20 lg:px-12 lg:pb-24 lg:pt-36">
        {/* Heading block */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <SectionLabel index="04">Efekty</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                variant="elegant"
                className="mt-8 text-[clamp(2.1rem,4.8vw,4.25rem)] text-gold"
              >
                Efekt, który mówi
                <br />
                sam za siebie.
              </Heading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md font-sans text-base leading-relaxed text-cream/65">
                Głęboki połysk, idealna gładkość i ochrona, która naprawdę
                działa. Przeciągnij suwak i zobacz różnicę.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Reveal delay={0.15}>
              <ArrowButton href="#realizacje" tone="dark" className="w-full sm:w-auto">
                Zobacz realizacje
              </ArrowButton>
            </Reveal>
          </div>
        </div>

        {/* Before / after cases */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.caption} delay={0.1 + i * 0.1}>
              <figure>
                {/* Podmień na własne kadry (ten sam ujęcie przed/po):
                    <BeforeAfter beforeSrc="/images/before-1.jpg" afterSrc="/images/after-1.jpg" /> */}
                <BeforeAfter
                  beforeSrc={c.beforeSrc}
                  afterSrc={c.afterSrc}
                  beforeAlt={`${c.caption} — przed`}
                  afterAlt={`${c.caption} — po`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/5] w-full"
                />
                <figcaption className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-cream/70">
                    {c.caption}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/35">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <NextCue index="05" label="Usługi" href="#uslugi" tone="dark" />
    </section>
  );
}
