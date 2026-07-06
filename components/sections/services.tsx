import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { TextLink } from "@/components/ui/text-link";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    n: "01",
    title: "Mycie detailingowe",
    desc: "Dokładne mycie zewnętrzne i bezpieczne przygotowanie auta.",
  },
  {
    n: "02",
    title: "Korekta lakieru",
    desc: "Usuwanie zmatowień, hologramów i drobnych rys.",
  },
  {
    n: "03",
    title: "Powłoki ceramiczne",
    desc: "Ochrona lakieru, głębia koloru i łatwiejsza pielęgnacja.",
  },
  {
    n: "04",
    title: "Ochrona PPF",
    desc: "Folia ochronna na najbardziej narażone elementy auta.",
  },
  {
    n: "05",
    title: "Detailing wnętrza",
    desc: "Czyszczenie, pielęgnacja skóry i dopracowanie detali.",
  },
];

export function Services() {
  return (
    <section
      id="uslugi"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="05" tone="ink">
              Usługi
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <Heading
              variant="strong"
              className="mt-8 text-[clamp(2.1rem,5vw,4.5rem)] text-ink"
            >
              Wybierz usługę, której potrzebuje twoje auto.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Każda usługa ma swój proces, czas realizacji i efekt końcowy.
              Zobacz szczegóły przed umówieniem wizyty.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/12">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={0.05 + i * 0.06}>
              <div className="group border-b border-ink/12 py-8 transition-colors duration-300 hover:bg-ink/[0.02]">
                <div className="grid grid-cols-[auto_1fr] items-start gap-5 lg:grid-cols-[6rem_1fr_auto] lg:items-center lg:gap-10">
                  <span className="font-display text-3xl font-semibold text-ink/25 transition-colors duration-300 group-hover:text-champagne lg:text-4xl">
                    {s.n}
                  </span>
                  <div className="border-l border-ink/15 pl-5 lg:pl-8">
                    <h3 className="font-sans text-base font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 group-hover:text-champagne sm:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ink/55">
                      {s.desc}
                    </p>
                    <div className="mt-4 lg:hidden">
                      <TextLink href="#kontakt" tone="light">
                        Szczegóły
                      </TextLink>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <TextLink href="#kontakt" tone="light">
                      Szczegóły
                    </TextLink>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <NextCue index="06" label="Opinie" href="#opinie" tone="light" />
    </section>
  );
}
