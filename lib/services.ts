export type Service = {
  slug: string;
  n: string;
  /** Package name, e.g. ESSENTIAL */
  name: string;
  /** Short Polish descriptor under the name */
  tagline: string;
  /** One-line summary for cards */
  short: string;
  /** Display price, e.g. "od 799 zł" */
  price: string;
  /** Numeric price for summaries */
  priceValue: number;
  /** Estimated time, e.g. "~4–5 godzin" */
  duration: string;
  /** Recommended frequency, e.g. "Co 2–3 miesiące" */
  cycle: string;
  /** value matching the lead-form service options */
  prefill: string;
  /** placeholder path — drop a real photo here */
  image: string;
  /** "Dla kogo / jaki problem" paragraph */
  problem: string;
  /** Result bullets */
  effect: string[];
  /** What the package includes (w zakresie) */
  includes: string[];
  /** Highlight as the most popular pick */
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "essential",
    n: "01",
    name: "ESSENTIAL",
    tagline: "Regularny detailing auta",
    short: "Regularna pielęgnacja, która utrzymuje auto w nienagannym stanie.",
    price: "od 349 zł",
    priceValue: 349,
    duration: "~2 godziny",
    cycle: "Co 2–4 tygodnie",
    prefill: "essential",
    image: "/images/p1.png",
    problem:
      "Auto używane na co dzień szybko traci świeżość — kurz, sól i drobne zabrudzenia osadzają się na lakierze i we wnętrzu. Bez regularnej pielęgnacji efekt kumuluje się z tygodnia na tydzień.",
    effect: [
      "Czysty, zadbany lakier i wnętrze",
      "Ochrona świeżości między większymi zabiegami",
      "Gotowe w około 2 godziny",
    ],
    includes: [
      "Dwufazowe mycie karoserii",
      "Czyszczenie felg i bezpieczne suszenie",
      "Wosk w płynie dla ochrony i połysku",
      "Odkurzanie wnętrza i bagażnika",
      "Czyszczenie plastików, boczków i konsoli",
      "Kondycjonowanie plastików i skóry",
    ],
  },
  {
    slug: "protect",
    n: "02",
    name: "PROTECT",
    tagline: "Ochrona lakieru",
    short:
      "Dekontaminacja, twardy wosk i ochrona szyb — tarcza przed warunkami zewnętrznymi.",
    price: "od 799 zł",
    priceValue: 799,
    duration: "~4–5 godzin",
    cycle: "Co 2–3 miesiące",
    prefill: "protect",
    image: "/images/p2.png",
    problem:
      "Lakier codziennie mierzy się z owadami, bitumem, solą drogową i promieniowaniem UV. Bez warstwy ochronnej zanieczyszczenia wnikają w powłokę, a kolor blaknie.",
    effect: [
      "Lakier zabezpieczony twardym woskiem",
      "Efekt hydrofobowy na szybach",
      "Łatwiejsze utrzymanie czystości",
    ],
    includes: [
      "Mycie detailingowe (pełny zakres)",
      "Podstawowa pielęgnacja wnętrza",
      "Dekontaminacja lakieru — bitum i zanieczyszczenia metaliczne",
      "Twardy wosk ochronny",
      "Czyszczenie szyb wewnątrz i na zewnątrz",
      "Powłoka antideszcz na szyby",
    ],
  },
  {
    slug: "restore",
    n: "03",
    name: "RESTORE",
    tagline: "Przywrócenie połysku i głębi lakieru",
    short:
      "Polerowanie przywracające głębię koloru i blask zmęczonemu lakierowi.",
    price: "od 1 490 zł",
    priceValue: 1490,
    duration: "1 dzień roboczy",
    cycle: "Raz na 12–18 miesięcy",
    prefill: "restore",
    image: "/images/p3.png",
    problem:
      "Z czasem lakier matowieje, pokrywa się swirlami i traci głębię koloru. Standardowe mycie tego nie cofnie — potrzebne jest polerowanie karoserii.",
    effect: [
      "Przywrócona głębia i połysk lakieru",
      "Usunięte zmatowienia i drobne rysy",
      "Zabezpieczenie twardym woskiem",
    ],
    includes: [
      "Mycie detailingowe (pełny zakres)",
      "Podstawowa pielęgnacja wnętrza",
      "Dekontaminacja lakieru",
      "Polerowanie karoserii — przywrócenie głębi koloru",
      "Twardy wosk ochronny",
      "Czyszczenie szyb wewnątrz i na zewnątrz",
    ],
  },
  {
    slug: "ceramic",
    n: "04",
    name: "CERAMIC",
    tagline: "Korekta lakieru + powłoka ceramiczna",
    short:
      "Polerowanie i powłoka ceramiczna — długotrwała ochrona i głęboki połysk.",
    price: "od 2 990 zł",
    priceValue: 2990,
    duration: "1–2 dni",
    cycle: "Raz na 2–3 lata",
    prefill: "ceramic",
    image: "/images/p4.png",
    popular: true,
    problem:
      "Chcesz, by efekt utrzymał się latami, a nie tygodniami. Wosk zmywa się po kilku miesiącach — trwałą ochronę i głębię daje dopiero ceramika na wypolerowanym lakierze.",
    effect: [
      "Trwała powłoka ceramiczna z efektem hydrofobowym",
      "Głęboki, lustrzany połysk lakieru",
      "Ochrona UV i łatwiejsza pielęgnacja przez lata",
    ],
    includes: [
      "Mycie detailingowe (pełny zakres)",
      "Podstawowa pielęgnacja wnętrza",
      "Dekontaminacja lakieru",
      "Polerowanie karoserii",
      "Powłoka ceramiczna — długotrwała ochrona",
      "Czyszczenie szyb + powłoka antideszcz",
    ],
  },
  {
    slug: "signature",
    n: "05",
    name: "SIGNATURE",
    tagline: "Pełny detailing premium",
    short:
      "Maksymalny zakres pielęgnacji i ochrony — od wnętrza po ceramikę.",
    price: "od 4 990 zł",
    priceValue: 4990,
    duration: "2–3 dni",
    cycle: "Raz na rok",
    prefill: "signature",
    image: "/images/p5.png",
    problem:
      "Oczekujesz kompletnej odnowy auta w jednym zabiegu — perfekcyjnego wnętrza, wypolerowanego lakieru i najtrwalszej ochrony, bez kompromisów.",
    effect: [
      "Pełna renowacja wnętrza i lakieru",
      "Powłoka ceramiczna klasy premium",
      "Auto w stanie lepszym niż salonowy",
    ],
    includes: [
      "Mycie detailingowe (pełny zakres)",
      "Pranie wnętrza Premium — z częściowym demontażem",
      "Dekontaminacja lakieru",
      "Polerowanie karoserii",
      "Powłoka ceramiczna",
      "Czyszczenie szyb + powłoka antideszcz",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
