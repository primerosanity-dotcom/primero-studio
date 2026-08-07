import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { TextLink } from "@/components/ui/text-link";
import { Reveal } from "@/components/reveal";

const STEPS = [
  { n: "01", label: "Ocena stanu" },
  { n: "02", label: "Dobór rozwiązania" },
  { n: "03", label: "Realizacja" },
  { n: "04", label: "Odbiór auta" },
];

export function Process({ index = "—" }: { index?: string }) {
  return (
    <section
      id="proces"
      data-section-theme="light"
      className="relative overflow-hidden bg-cream-soft text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-16 pt-20 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          {/* Left — heading */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index={index} tone="ink">
                Proces
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <Heading
                variant="strong"
                className="mt-8 text-[clamp(2.2rem,5.2vw,4.5rem)] text-ink"
              >
                Każde auto
                <br />
                ma swój proces.
              </Heading>
            </Reveal>
          </div>

          {/* Right — copy + link */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="max-w-xl font-sans text-base leading-relaxed text-ink/65">
                Zaczynamy od oceny stanu auta. Następnie dobieramy zakres prac,
                materiały i poziom ochrony — tak, aby efekt był dopasowany do
                samochodu i oczekiwań właściciela.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <TextLink href="/pakiety" tone="light" className="mt-7">
                Przejdź do wyceny
              </TextLink>
            </Reveal>
          </div>
        </div>

        {/* Steps — stacked rows on mobile, horizontal timeline on desktop */}
        <ol className="mt-10 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-8">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={0.2 + i * 0.08}>
              <div className="group flex items-center gap-8 border-b border-ink/10 py-4 lg:h-full lg:flex-col lg:items-start lg:gap-5 lg:border-b-0 lg:border-t lg:border-ink/15 lg:py-0 lg:pt-7">
                <span className="font-display text-2xl font-semibold text-ink/25 transition-colors duration-300 group-hover:text-champagne lg:text-4xl">
                  {s.n}
                </span>
                <span className="font-sans text-sm uppercase tracking-[0.26em] text-ink sm:text-base lg:text-sm lg:leading-relaxed">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
