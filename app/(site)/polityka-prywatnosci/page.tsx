import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/reveal";
import { COMPANY, getContactConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Jak Primero Studio przetwarza dane osobowe: administrator, cele i podstawy prawne, odbiorcy danych, okres przechowywania, prawa użytkownika i pliki cookies.",
};

const UPDATED = "26 sierpnia 2026";

type Block = { p: string } | { list: string[] };

function Section({
  index,
  title,
  blocks,
}: {
  index: number;
  title: string;
  blocks: Block[];
}) {
  return (
    <Reveal as="li" className="border-t border-ink/12 pt-8">
      <h2 className="flex gap-4 font-sans text-base font-medium uppercase tracking-[0.14em] text-ink">
        <span className="text-gold">{String(index).padStart(2, "0")}</span>
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-4 pl-0 sm:pl-10">
        {blocks.map((block, i) =>
          "p" in block ? (
            <p
              key={i}
              className="max-w-3xl font-sans text-[15px] leading-relaxed text-ink/70"
            >
              {block.p}
            </p>
          ) : (
            <ul key={i} className="max-w-3xl space-y-2">
              {block.list.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/70 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          ),
        )}
      </div>
    </Reveal>
  );
}

export default function PolitykaPrywatnosciPage() {
  const contact = getContactConfig();
  const address = contact.addressLines.join(", ");
  const identity = [
    COMPANY.legalName,
    COMPANY.nip ? `NIP ${COMPANY.nip}` : null,
    COMPANY.regon ? `REGON ${COMPANY.regon}` : null,
    address,
  ]
    .filter(Boolean)
    .join(", ");

  const sections: { title: string; blocks: Block[] }[] = [
    {
      title: "Administrator danych",
      blocks: [
        {
          p: `Administratorem Twoich danych osobowych jest ${identity}. W sprawach dotyczących danych osobowych możesz skontaktować się z nami mailowo${
            contact.email ? ` pod adresem ${contact.email}` : ""
          }${contact.phoneDisplay ? ` lub telefonicznie: ${contact.phoneDisplay}` : ""}.`,
        },
        {
          p: "Nie powołaliśmy inspektora ochrony danych — wszystkimi zgłoszeniami zajmujemy się bezpośrednio.",
        },
      ],
    },
    {
      title: "Jakie dane zbieramy",
      blocks: [
        {
          p: "Zbieramy wyłącznie dane, które sam nam podajesz, oraz podstawowe dane techniczne o wizycie na stronie.",
        },
        {
          list: [
            "Formularz zgłoszeniowy: imię, numer telefonu, wybrana usługa lub pakiet oraz treść uwag, które wpiszesz.",
            "Kontakt bezpośredni: dane, które przekażesz nam w rozmowie telefonicznej, na WhatsAppie, mailem lub przez Instagram.",
            "Dane techniczne: adres IP, rodzaj przeglądarki i urządzenia, źródło wejścia, odwiedzone podstrony — zbierane przez narzędzia analityczne opisane w punkcie 07.",
          ],
        },
        {
          p: "Podanie danych jest dobrowolne, ale bez imienia i numeru telefonu nie jesteśmy w stanie przygotować wyceny ani umówić wizyty.",
        },
      ],
    },
    {
      title: "Cele i podstawy prawne",
      blocks: [
        {
          list: [
            "Kontakt w sprawie zgłoszenia, przygotowanie wyceny i umówienie wizyty — art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes w obsłudze zapytań).",
            "Wykonanie usługi detailingu i rozliczenie jej — art. 6 ust. 1 lit. b RODO, a w zakresie dokumentacji księgowej art. 6 ust. 1 lit. c RODO (obowiązek prawny).",
            "Statystyka i poprawa działania strony, marketing własny — art. 6 ust. 1 lit. a RODO (Twoja zgoda na pliki cookies) oraz art. 6 ust. 1 lit. f RODO.",
            "Ustalenie, dochodzenie lub obrona roszczeń — art. 6 ust. 1 lit. f RODO.",
          ],
        },
      ],
    },
    {
      title: "Komu przekazujemy dane",
      blocks: [
        {
          p: "Twoich danych nie sprzedajemy. Korzystamy natomiast z zewnętrznych dostawców, którzy przetwarzają je na nasze zlecenie:",
        },
        {
          list: [
            "Kommo (system CRM) — tam trafia treść zgłoszenia, żebyśmy mogli je obsłużyć i nie zgubić.",
            "Telegram — powiadomienie o nowym zgłoszeniu trafia na nasz wewnętrzny czat zespołu.",
            "Vercel — hosting strony i serwery, przez które przechodzi formularz.",
            "Sanity — system zarządzania treścią strony (nie przechowuje danych ze zgłoszeń).",
            "Google (Google Analytics, Google Tag Manager) i Meta Platforms (Meta Pixel) — statystyka ruchu i pomiar skuteczności reklam, o ile wyrazisz zgodę na pliki cookies.",
            "Biuro rachunkowe i dostawcy usług księgowych — w zakresie dokumentów rozliczeniowych.",
          ],
        },
        {
          p: "Część z tych dostawców ma siedzibę poza Europejskim Obszarem Gospodarczym. W takim przypadku przekazanie danych odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.",
        },
      ],
    },
    {
      title: "Jak długo przechowujemy dane",
      blocks: [
        {
          list: [
            "Dane ze zgłoszeń, które nie zakończyły się usługą — do 12 miesięcy od ostatniego kontaktu.",
            "Dane klientów, dla których wykonaliśmy usługę — przez czas trwania współpracy, a następnie przez okres przedawnienia roszczeń (co do zasady 3 lata).",
            "Dokumenty księgowe — 5 lat licząc od końca roku podatkowego, zgodnie z przepisami podatkowymi.",
            "Dane z plików cookies — przez okres życia danego pliku, nie dłużej niż 24 miesiące, lub do momentu wycofania zgody.",
          ],
        },
      ],
    },
    {
      title: "Twoje prawa",
      blocks: [
        { p: "W związku z przetwarzaniem danych przysługuje Ci prawo do:" },
        {
          list: [
            "dostępu do swoich danych i otrzymania ich kopii,",
            "sprostowania danych, które są nieprawidłowe lub niekompletne,",
            "usunięcia danych („prawo do bycia zapomnianym”),",
            "ograniczenia przetwarzania,",
            "przeniesienia danych do innego administratora,",
            "wniesienia sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie,",
            "wycofania zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania sprzed jej wycofania.",
          ],
        },
        {
          p: `Aby skorzystać z któregokolwiek z tych praw, napisz do nas${
            contact.email ? ` na ${contact.email}` : ""
          }. Odpowiadamy najpóźniej w ciągu miesiąca. Jeśli uznasz, że przetwarzamy Twoje dane niezgodnie z prawem, możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.`,
        },
      ],
    },
    {
      title: "Pliki cookies i analityka",
      blocks: [
        {
          p: "Strona korzysta z plików cookies — niewielkich plików zapisywanych w Twojej przeglądarce.",
        },
        {
          list: [
            "Cookies niezbędne — konieczne do prawidłowego działania strony i formularza. Nie wymagają zgody.",
            "Cookies analityczne i marketingowe — Google Analytics, Google Tag Manager i Meta Pixel. Pozwalają nam zobaczyć, które podstrony są odwiedzane i skąd trafiasz na stronę, oraz mierzyć skuteczność reklam. Używamy ich wyłącznie za Twoją zgodą.",
          ],
        },
        {
          p: "Zgodę na cookies analityczne i marketingowe możesz w każdej chwili wycofać, czyszcząc pliki cookies w ustawieniach przeglądarki. Możesz też z góry zablokować ich zapisywanie — w takim przypadku strona nadal będzie działać, ale nie zobaczymy statystyk Twojej wizyty.",
        },
      ],
    },
    {
      title: "Bezpieczeństwo i zmiany polityki",
      blocks: [
        {
          p: "Połączenie ze stroną jest szyfrowane certyfikatem SSL, a dostęp do systemów, w których przechowujemy zgłoszenia, mają wyłącznie upoważnione osoby z naszego zespołu.",
        },
        {
          p: "Politykę możemy aktualizować, gdy zmienią się przepisy albo narzędzia, z których korzystamy. Aktualna wersja jest zawsze dostępna na tej stronie, a datę ostatniej zmiany znajdziesz na jej początku.",
        },
      ],
    },
  ];

  return (
    <section
      data-section-theme="light"
      className="relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1500px] px-6 pb-24 pt-28 lg:px-12 lg:pb-32 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="—" tone="ink">
              Dokumenty
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              as="h1"
              variant="strong"
              className="mt-7 text-[clamp(2.1rem,6vw,4rem)] text-ink"
            >
              Polityka prywatności
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-sans text-[15px] leading-relaxed text-ink/60">
              Poniżej opisujemy, jakie dane zbieramy przez tę stronę, po co ich
              potrzebujemy i co możesz z nimi zrobić. Bez prawniczego żargonu
              tam, gdzie da się go uniknąć.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.28em] text-ink/40">
              Ostatnia aktualizacja: {UPDATED}
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 space-y-12 lg:mt-20">
          {sections.map((section, i) => (
            <Section
              key={section.title}
              index={i + 1}
              title={section.title}
              blocks={section.blocks}
            />
          ))}
        </ol>

        <Reveal>
          <div className="mt-16 border-t border-ink/12 pt-8">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:text-gold"
            >
              Masz pytanie o swoje dane? Napisz do nas
              <svg
                width="24"
                height="11"
                viewBox="0 0 26 12"
                fill="none"
                aria-hidden
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
              >
                <path
                  d="M0 6h24M19 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
