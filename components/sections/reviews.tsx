import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";

const GALLERY = [
  { caption: "Lakier", cls: "sm:mt-10 aspect-[4/5]" },
  { caption: "Felga", cls: "aspect-[3/4.4]" },
  { caption: "Wnętrze", cls: "sm:mt-10 aspect-[4/5]" },
];

export function Reviews() {
  return (
    <section
      id="opinie"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-12 pt-20 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel index="07" tone="ink">
              Efekty i opinie
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2rem,4.6vw,4rem)] text-ink"
            >
              Efekty, które widać. Opinie, które budują zaufanie.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Perfekcja tkwi w detalach, a efekty mówią same za siebie. Zobacz,
              jak zmieniamy auta naszych klientów i dlaczego wracają do nas
              ponownie.
            </p>
          </Reveal>
        </div>

        {/* Gallery — horizontal swipe on mobile, offset bento on desktop */}
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.caption}
              delay={0.05 + i * 0.1}
              className="w-[74%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              {/* Podmień: <MediaSlot src="/images/gallery-N.jpg" ... /> */}
              <MediaSlot
                caption={g.caption}
                className={`w-full rounded-lg ${g.cls}`}
              />
            </Reveal>
          ))}
        </div>

        {/* Testimonial — wine card */}
        <Reveal delay={0.15}>
          <figure className="mt-10 overflow-hidden rounded-2xl border border-champagne/25 bg-wine px-6 py-8 sm:px-12 sm:py-14 lg:mt-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
              <span
                aria-hidden
                className="font-display text-6xl leading-none text-gold/70"
              >
                &ldquo;
              </span>
              <div>
                <div className="text-lg tracking-[0.3em] text-gold">★★★★★</div>
                <blockquote className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-cream/85 sm:text-lg">
                  Auto wygląda lepiej niż w dniu odbioru z salonu. Lakier jak
                  lustro, wnętrze dopracowane w każdym detalu. Profesjonalizm
                  i&nbsp;podejście klasy premium.
                </blockquote>
                <div className="mt-8 h-px w-12 bg-champagne/40" />
                <figcaption className="mt-5 font-sans text-[11px] uppercase tracking-[0.32em] text-champagne">
                  Marek · Porsche 911
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <ArrowButton
            href="#kontakt"
            tone="light"
            className="mt-8 w-full justify-between lg:mt-12"
          >
            Umów wizytę
          </ArrowButton>
        </Reveal>
      </div>

      <NextCue index="08" label="Kontakt" href="#kontakt" tone="light" />
    </section>
  );
}
