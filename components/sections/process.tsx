import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
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
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 pb-12 pt-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-24 lg:pt-36">
        {/* Left — copy + steps */}
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

          <Reveal delay={0.1}>
            <div className="mt-8 h-px w-14 bg-champagne/60" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-ink/65">
              Zaczynamy od oceny stanu auta. Następnie dobieramy zakres prac,
              materiały i poziom ochrony — tak, aby efekt był dopasowany do
              samochodu i oczekiwań właściciela.
            </p>
          </Reveal>

          <ol className="mt-8 lg:mt-12">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={0.2 + i * 0.08}>
                <div className="group flex items-center gap-8 border-b border-ink/10 py-4 lg:py-5">
                  <span className="font-display text-2xl font-semibold text-ink/25 transition-colors duration-300 group-hover:text-champagne">
                    {s.n}
                  </span>
                  <span className="font-sans text-sm uppercase tracking-[0.26em] text-ink sm:text-base">
                    {s.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.5}>
            <TextLink href="/pakiety" tone="light" className="mt-10">
              Przejdź do wyceny
            </TextLink>
          </Reveal>
        </div>

        {/* Right — media */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.15}>
            <MediaSlot
              src="/images/about.png"
              alt="Wnętrze studia Primero — hala detailingowa"
              tone="light"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="rounded-2xl aspect-[16/10] w-full lg:aspect-auto lg:h-[62vh]"
            />
          </Reveal>
        </div>
      </div>

    </section>
  );
}
