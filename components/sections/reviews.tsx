import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { ArrowButton } from "@/components/ui/arrow-button";
import { NextCue } from "@/components/ui/next-cue";
import { Reveal } from "@/components/reveal";

// Podmień na link do profilu Google Twojej firmy
const GOOGLE_URL =
  "https://www.google.com/maps/search/?api=1&query=Primero+Studio+Warszawa";
const RATING = "5,0";
const REVIEW_COUNT = 48;

const GALLERY = [
  { caption: "Lakier", cls: "sm:mt-10 aspect-[4/5]" },
  { caption: "Felga", cls: "aspect-[3/4.4]" },
  { caption: "Wnętrze", cls: "sm:mt-10 aspect-[4/5]" },
];

const REVIEWS = [
  {
    name: "Marek K.",
    date: "2 tygodnie temu",
    text: "Auto wygląda lepiej niż w dniu odbioru z salonu. Lakier jak lustro, wnętrze dopracowane w każdym detalu. Profesjonalizm klasy premium.",
    tone: "bg-wine text-cream",
  },
  {
    name: "Anna W.",
    date: "miesiąc temu",
    text: "Powłoka ceramiczna zrobiła ogromną różnicę — woda spływa sama, a auto łatwiej utrzymać w czystości. Serdecznie polecam!",
    tone: "bg-champagne text-wine-deep",
  },
  {
    name: "Tomasz L.",
    date: "miesiąc temu",
    text: "Świetny kontakt i pełen profesjonalizm. Korekta lakieru usunęła wszystkie rysy. Widać pasję do detali.",
    tone: "bg-ink text-cream",
  },
  {
    name: "Kamil R.",
    date: "2 miesiące temu",
    text: "Detailing wnętrza na najwyższym poziomie — skóra jak nowa. Terminowo i z dbałością o każdy element. Na pewno wrócę.",
    tone: "bg-gold text-wine-deep",
  },
];

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 2.9-2.2 5.4-4.7 7.1v5.9h7.6c4.4-4.1 7-10.1 7-17.3z"
      />
      <path
        fill="#34A853"
        d="M24 47c6.3 0 11.6-2.1 15.5-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-7.9 2.3-6.1 0-11.2-4.1-13.1-9.6H3.1v6.1C7 42.4 15 47 24 47z"
      />
      <path
        fill="#FBBC05"
        d="M10.9 28.1c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6v-6.1H3.1A22.9 22.9 0 0 0 1 23.5c0 3.7.9 7.2 2.1 10.3l7.8-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 9.9c3.4 0 6.5 1.2 8.9 3.5l6.7-6.7C35.6 3 30.3 1 24 1 15 1 7 5.6 3.1 13.2l7.8 6.1C12.8 13.9 17.9 9.9 24 9.9z"
      />
    </svg>
  );
}

const Stars = ({ small }: { small?: boolean }) => (
  <span
    className={small ? "text-sm tracking-[0.15em]" : "text-base tracking-[0.2em]"}
    aria-label={`${RATING} na 5`}
  >
    ★★★★★
  </span>
);

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
              Perfekcja tkwi w detalach, a efekty mówią same za siebie. Zobacz
              realizacje i przeczytaj, co piszą o nas klienci w Google.
            </p>
          </Reveal>
        </div>

        {/* Gallery */}
        <div
          id="realizacje"
          className="-mx-6 mt-10 scroll-mt-24 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-14"
        >
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.caption}
              delay={0.05 + i * 0.1}
              className="w-[74%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <MediaSlot
                caption={g.caption}
                className={`w-full rounded-lg ${g.cls}`}
              />
            </Reveal>
          ))}
        </div>

        {/* ── Google reviews ────────────────────────────── */}
        <div className="mt-16 lg:mt-24">
          <Reveal>
            <div className="flex flex-col gap-6 border-b border-ink/12 pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <GoogleG className="h-9 w-9" />
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-semibold text-ink">
                      {RATING}
                    </span>
                    <span className="text-gold">
                      <Stars />
                    </span>
                  </div>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink/50">
                    Opinie Google · {REVIEW_COUNT} opinii
                  </span>
                </div>
              </div>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 self-start font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em] text-champagne transition-colors duration-300 hover:text-ink sm:self-auto"
              >
                Zobacz wszystkie opinie
                <svg
                  width="22"
                  height="10"
                  viewBox="0 0 22 10"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
                >
                  <path
                    d="M0 5h20M15.5 1l4.5 4-4.5 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={0.05 + i * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-cream-soft/60 p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold ${r.tone}`}
                    >
                      {r.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <figcaption className="truncate font-sans text-sm font-medium text-ink">
                        {r.name}
                      </figcaption>
                      <span className="font-sans text-[11px] text-ink/45">
                        {r.date}
                      </span>
                    </div>
                    <GoogleG className="ml-auto h-4 w-4 shrink-0" />
                  </div>
                  <span className="mt-4 text-gold">
                    <Stars small />
                  </span>
                  <blockquote className="mt-3 font-sans text-sm leading-relaxed text-ink/70">
                    {r.text}
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <ArrowButton
            href="#kontakt"
            tone="light"
            className="mt-12 w-full justify-between lg:mt-16"
          >
            Umów wizytę
          </ArrowButton>
        </Reveal>
      </div>

      <NextCue index="08" label="Kontakt" href="#kontakt" tone="light" />
    </section>
  );
}
