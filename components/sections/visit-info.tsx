import { Reveal } from "@/components/reveal";
import { addressLine, displayHours } from "@/lib/display";
import type { ContactConfig } from "@/lib/site-config";

/**
 * "Jak wygląda wizyta" — practical answers under the contact block on
 * /kontakt: how to get there, inspection, booking, pick-up, payment. Only
 * facts the studio has confirmed; same card style as the package pages.
 */
export function VisitInfo({
  contact,
  hours = [],
}: {
  contact: ContactConfig;
  hours?: { days: string; hours: string }[];
}) {
  const address = addressLine(contact.addressLines);
  const open = displayHours(hours)
    .map((h) => `${h.days}: ${h.hours}`)
    .join(", ");

  const cards = [
    {
      label: "Dojazd",
      text: `Studio mieści się przy ${address}, na zamkniętym terenie. Auto czeka na swoją kolej w ogrzewanym studiu.`,
    },
    {
      label: "Oględziny i wycena",
      text: "Oględziny i wycena są bezpłatne, na miejscu. Nie wyceniamy aut ze zdjęć — cenę podajemy po obejrzeniu lakieru i wnętrza.",
    },
    {
      label: "Rezerwacja terminu",
      text: "Termin ustalisz telefonicznie, przez WhatsApp albo formularz na tej stronie. Nie pobieramy zaliczki.",
    },
    {
      label: "Oddanie i odbiór auta",
      text: "Auto zostawiasz w studiu i odbierasz gotowe — nie mamy poczekalni. Na życzenie możemy odebrać auto i je odstawić.",
    },
    {
      label: "Płatność",
      text: "Gotówka, karta, BLIK lub przelew. Fakturę VAT wystawiamy na życzenie.",
    },
    ...(open
      ? [{ label: "Godziny otwarcia", text: `${open}. Poza tymi godzinami zostaw zgłoszenie — oddzwonimy.` }]
      : []),
  ];

  return (
    <section
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 lg:px-12 lg:pb-24">
        <Reveal>
          <div className="rounded-2xl border border-cream/10 bg-wine/30 p-7 sm:p-9">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/80">
              Przed wizytą
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-cream sm:text-3xl">
              Jak wygląda wizyta w Primero Studio
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-cream/10 bg-wine/40 p-6 sm:p-7"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-champagne/80">
                    {c.label}
                  </span>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-cream/70">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
