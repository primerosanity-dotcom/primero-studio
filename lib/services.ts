export type Service = {
  slug: string;
  n: string;
  /** Package name, e.g. "Pranie wnętrza" */
  name: string;
  /** Short Polish descriptor under the name */
  tagline: string;
  /** One-line summary for cards */
  short: string;
  /** Display price, e.g. "od 799 zł" — the winter price until 31.03.2027 */
  price: string;
  /**
   * Regular (seasonal) price, e.g. "od 1 290 zł". Shown automatically from
   * the day after WINTER_LAST_DAY (see lib/pricing.ts).
   */
  priceSeason?: string;
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
  /** Last edit in Sanity — feeds the sitemap lastmod. */
  updatedAt?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "serwis-ceramiki",
    n: "01",
    name: "Serwis ceramiki",
    tagline: "Odświeżenie powłoki ceramicznej",
    short:
      "Przegląd i odświeżenie powłoki co pół roku — ceramika dłużej działa i dobrze wygląda.",
    price: "od 279 zł",
    priceSeason: "od 349 zł",
    priceValue: 279,
    duration: "2–3 godziny",
    cycle: "Co 6 miesięcy",
    prefill: "serwis-ceramiki",
    image: "/images/uslugi/6.png",
    problem:
      "Powłoka ceramiczna chroni lakier, ale też potrzebuje opieki. Sól, brud i niewłaściwe mycie stopniowo osłabiają jej efekt hydrofobowy. Regularny serwis utrzymuje powłokę w dobrej formie i pozwala na bieżąco sprawdzać jej stan.",
    effect: [
      "Odświeżony efekt hydrofobowy",
      "Kontrola stanu powłoki",
      "Wpis serwisowy do certyfikatu",
    ],
    includes: [
      "Mycie detailingowe",
      "Dekontaminacja lakieru",
      "Odświeżenie powłoki (booster)",
      "Kontrola stanu powłoki",
      "Wpis do certyfikatu",
    ],
  },
  {
    slug: "mycie-wnetrze",
    n: "02",
    name: "Komplet: mycie + wnętrze",
    tagline: "Regularna pielęgnacja auta",
    short:
      "Mycie karoserii i sprzątanie wnętrza w jednej wizycie — auto czyste w środku i na zewnątrz.",
    price: "od 299 zł",
    priceSeason: "od 399 zł",
    priceValue: 299,
    duration: "2–3 godziny",
    cycle: "Co 2–4 tygodnie",
    prefill: "mycie-wnetrze",
    image: "/images/p1.png",
    problem:
      "Auto używane na co dzień szybko traci świeżość — kurz, sól i drobne zabrudzenia osadzają się na lakierze i we wnętrzu. Regularna pielęgnacja nie pozwala im się kumulować.",
    effect: [
      "Czysty lakier, felgi i wnętrze",
      "Ochrona świeżości między większymi zabiegami",
      "Gotowe w 2–3 godziny",
    ],
    includes: [
      "Dwufazowe mycie nadwozia",
      "Czyszczenie felg i bezpieczne osuszanie",
      "Wosk w płynie",
      "Odkurzanie wnętrza i bagażnika",
      "Czyszczenie plastików, boczków i konsoli",
      "Dressing plastików i skóry",
    ],
  },
  {
    slug: "pranie-wnetrza",
    n: "03",
    name: "Pranie wnętrza",
    tagline: "Pranie tapicerki i czyszczenie kabiny",
    short:
      "Ekstrakcyjne pranie foteli, kanapy i dywaników oraz czyszczenie całej kabiny.",
    price: "od 399 zł",
    priceSeason: "od 499 zł",
    priceValue: 399,
    duration: "4–6 godzin",
    cycle: "Raz na 6–12 miesięcy",
    prefill: "pranie-wnetrza",
    image: "/images/uslugi/3.png",
    problem:
      "Plamy, kurz i zapachy wnikają w tapicerkę — szczególnie zimą, gdy do auta trafia sól i błoto, i w autach, którymi jeżdżą dzieci lub zwierzęta. Odkurzanie tego nie usunie, potrzebne jest pranie.",
    effect: [
      "Czyste fotele, kanapa i dywaniki",
      "Odświeżona kabina bez kurzu",
      "Czyste szyby od wewnątrz",
    ],
    includes: [
      "Odkurzanie",
      "Pranie ekstrakcyjne foteli, kanapy i dywaników",
      "Czyszczenie boczków drzwi, plastików i konsoli",
      "Szyby od wewnątrz",
    ],
  },
  {
    slug: "ochrona-na-zime",
    n: "04",
    name: "Ochrona na zimę",
    tagline: "Twardy wosk i ochrona szyb",
    short:
      "Dekontaminacja, twardy wosk i antydeszcz — tarcza dla lakieru przed solą i błotem.",
    price: "od 549 zł",
    priceSeason: "od 799 zł",
    priceValue: 549,
    duration: "4–5 godzin",
    cycle: "Raz na sezon",
    prefill: "ochrona-na-zime",
    image: "/images/p2.png",
    problem:
      "Zimą lakier codziennie mierzy się z solą drogową, błotem i bitumem. Bez warstwy ochronnej zanieczyszczenia wnikają w powłokę, a auto trudniej utrzymać w czystości.",
    effect: [
      "Lakier zabezpieczony twardym woskiem",
      "Efekt hydrofobowy na szybach",
      "Łatwiejsze mycie auta zimą",
    ],
    includes: [
      "Mycie detailingowe",
      "Podstawowa pielęgnacja wnętrza",
      "Dekontaminacja (smoła, opiłki metaliczne)",
      "Twardy wosk ochronny",
      "Mycie szyb z obu stron",
      "Powłoka antydeszcz na szyby",
    ],
  },
  {
    slug: "auto-do-sprzedazy",
    n: "05",
    name: "Auto do sprzedaży",
    tagline: "Przygotowanie auta do sprzedaży",
    short:
      "Kompleksowe odświeżenie auta przed zdjęciami i oględzinami — szybsza sprzedaż.",
    price: "od 590 zł",
    priceSeason: "od 790 zł",
    priceValue: 590,
    duration: "6–8 godzin",
    cycle: "Przed sprzedażą auta",
    prefill: "auto-do-sprzedazy",
    image: "/images/uslugi/4.png",
    problem:
      "Kupujący ocenia auto po pierwszym wrażeniu — na zdjęciach w ogłoszeniu i przy oględzinach. Czyste wnętrze, odświeżony lakier i przejrzyste reflektory sprawiają, że auto wygląda na zadbane.",
    effect: [
      "Auto gotowe do zdjęć i oględzin",
      "Czyste wnętrze bez zapachów",
      "Przejrzyste reflektory",
    ],
    includes: [
      "Mycie detailingowe",
      "Dekontaminacja lakieru",
      "Pranie foteli i kanapy",
      "Czyszczenie wnętrza i bagażnika",
      "Polerowanie reflektorów",
      "Ozonowanie",
      "Dressing opon i plastików",
      "Opcja: polerowanie odświeżające +500 zł",
    ],
  },
  {
    slug: "wnetrze-jak-nowe",
    n: "06",
    name: "Wnętrze jak nowe",
    tagline: "Pełny detailing wnętrza",
    short:
      "Pranie całej tapicerki z podsufitką, impregnacja skóry i tkanin oraz ozonowanie.",
    price: "od 649 zł",
    priceSeason: "od 899 zł",
    priceValue: 649,
    duration: "1 dzień roboczy",
    cycle: "Raz na rok",
    prefill: "wnetrze-jak-nowe",
    image: "/images/uslugi/2.png",
    problem:
      "Gdy samo pranie foteli to za mało: zabrudzona podsufitka i podłoga, zmęczona skóra, zapach w kabinie. Ten pakiet obejmuje całe wnętrze, z częściowym demontażem i zabezpieczeniem powierzchni.",
    effect: [
      "Czysta cała tapicerka, podsufitka i podłoga",
      "Zabezpieczona skóra i tkaniny",
      "Kabina bez nieprzyjemnych zapachów",
    ],
    includes: [
      "Pranie całej tapicerki z podsufitką i podłogą",
      "Częściowy demontaż",
      "Czyszczenie i impregnacja skóry",
      "Impregnacja tapicerki materiałowej",
      "Ozonowanie",
      "Dressing plastików",
    ],
  },
  {
    slug: "polerowanie-wosk",
    n: "07",
    name: "Polerowanie + wosk",
    tagline: "Przywrócenie połysku lakieru",
    short:
      "Jednoetapowe polerowanie i twardy wosk — lakier odzyskuje głębię i blask.",
    price: "od 899 zł",
    priceSeason: "od 1 290 zł",
    priceValue: 899,
    duration: "1 dzień roboczy",
    cycle: "Raz na 12–18 miesięcy",
    prefill: "polerowanie-wosk",
    image: "/images/p3.png",
    problem:
      "Z czasem lakier matowieje, pokrywa się swirlami i traci głębię koloru. Zwykłe mycie tego nie cofnie — potrzebne jest polerowanie, a po nim zabezpieczenie lakieru.",
    effect: [
      "Przywrócony połysk lakieru",
      "Usunięta większość drobnych rys i zmatowień",
      "Lakier zabezpieczony woskiem",
    ],
    includes: [
      "Mycie detailingowe",
      "Dekontaminacja",
      "Jednoetapowe polerowanie (usuwa większość drobnych rys i zmatowień)",
      "Twardy wosk lub sealant",
      "Szyby + antydeszcz",
      "Podstawowa pielęgnacja wnętrza",
    ],
  },
  {
    slug: "polerowanie-ceramika-1-rok",
    n: "08",
    name: "Polerowanie + ceramika 1 rok",
    tagline: "Polerowanie i powłoka ceramiczna",
    short:
      "Polerowanie przywracające połysk i powłoka ceramiczna z gwarancją 1 roku.",
    price: "od 1 400 zł",
    priceSeason: "od 1 690 zł",
    priceValue: 1400,
    duration: "1–2 dni robocze",
    cycle: "Odnowienie co rok",
    prefill: "polerowanie-ceramika-1-rok",
    image: "/images/pakiety/promocja.jpg",
    popular: true,
    problem:
      "Z czasem lakier matowieje, pokrywa się swirlami i traci głębię koloru. Po polerowaniu zabezpieczamy go powłoką ceramiczną — twardą, gładką warstwą, z której woda i brud spływają same, a sól drogowa i promienie UV nie niszczą lakieru.",
    effect: [
      "Przywrócona głębia i połysk lakieru",
      "Efekt hydrofobowy: woda i brud spływają z lakieru",
      "Ochrona przed solą drogową, UV i zabrudzeniami",
      "Łatwiejsze i szybsze mycie auta",
    ],
    includes: [
      "Mycie detailingowe",
      "Dekontaminacja",
      "Jednoetapowe polerowanie",
      "Powłoka ceramiczna z gwarancją 1 roku",
      "Szyby + antydeszcz",
      "Podstawowa pielęgnacja wnętrza",
      "Certyfikat gwarancyjny",
    ],
  },
  {
    slug: "ochrona-nowego-auta",
    n: "09",
    name: "Ochrona nowego auta",
    tagline: "Ceramika dla auta prosto z salonu",
    short:
      "Polerowanie wykończeniowe i ceramika na lakier, felgi i szyby — ochrona od pierwszego dnia.",
    price: "od 1 790 zł",
    priceSeason: "od 2 290 zł",
    priceValue: 1790,
    duration: "2 dni robocze",
    cycle: "Po odbiorze auta",
    prefill: "ochrona-nowego-auta",
    image: "/images/uslugi/5.png",
    problem:
      "Nowe auto też ma ślady — z transportu, z placu i z mycia w salonie. Najlepszy moment na zabezpieczenie lakieru to początek, zanim pojawią się pierwsze rysy i zanieczyszczenia.",
    effect: [
      "Lakier zabezpieczony od pierwszych kilometrów",
      "Ceramika na lakierze, felgach i szybach",
      "Usunięte ślady z transportu i salonu",
    ],
    includes: [
      "Mycie",
      "Dekontaminacja",
      "Polerowanie wykończeniowe (ślady z transportu i salonu)",
      "Powłoka ceramiczna 3 lata",
      "Ceramika na felgi",
      "Powłoka na wszystkie szyby",
      "Certyfikat",
    ],
  },
  {
    slug: "polerowanie-ceramika-3-lata",
    n: "10",
    name: "Polerowanie + ceramika 3 lata",
    tagline: "Korekta lakieru i ceramika na lata",
    short:
      "Dwuetapowe polerowanie i powłoka ceramiczna z gwarancją 3 lat.",
    price: "od 1 900 zł",
    priceSeason: "od 2 700 zł",
    priceValue: 1900,
    duration: "2 dni robocze",
    cycle: "Raz na 3 lata",
    prefill: "polerowanie-ceramika-3-lata",
    image: "/images/p4.png",
    problem:
      "Chcesz, by efekt utrzymał się latami, a nie miesiącami. Dwuetapowe polerowanie usuwa więcej rys i zmatowień, a powłoka ceramiczna utrwala ten stan i chroni lakier przez 3 lata.",
    effect: [
      "Głęboki połysk po dwuetapowej korekcie",
      "Powłoka ceramiczna z gwarancją 3 lat",
      "Łatwiejsza pielęgnacja przez lata",
    ],
    includes: [
      "Mycie",
      "Dekontaminacja",
      "Dwuetapowe polerowanie lakieru",
      "Powłoka ceramiczna z gwarancją 3 lat",
      "Szyby + antydeszcz",
      "Podstawowa pielęgnacja wnętrza",
      "Certyfikat",
    ],
  },
  {
    slug: "polerowanie-ceramika-5-lat",
    n: "11",
    name: "Polerowanie + ceramika 5 lat",
    tagline: "Najtrwalsza ochrona lakieru",
    short:
      "Dwuetapowe polerowanie, powłoka z gwarancją 5 lat i ceramika na wszystkie szyby.",
    price: "od 2 490 zł",
    priceSeason: "od 3 490 zł",
    priceValue: 2490,
    duration: "2–3 dni robocze",
    cycle: "Raz na 5 lat",
    prefill: "polerowanie-ceramika-5-lat",
    image: "/images/uslugi/8.png",
    problem:
      "Dla tych, którzy planują jeździć autem długo i chcą zabezpieczyć je raz, a dobrze. Najtrwalsza powłoka w naszej ofercie, a zamiast zwykłego antydeszczu — ceramika na wszystkie szyby.",
    effect: [
      "Powłoka ceramiczna z gwarancją 5 lat",
      "Ceramika na wszystkich szybach",
      "Głęboki połysk po dwuetapowej korekcie",
    ],
    includes: [
      "Mycie",
      "Dekontaminacja",
      "Dwuetapowe polerowanie lakieru",
      "Powłoka ceramiczna z gwarancją 5 lat",
      "Ceramika na wszystkie szyby",
      "Podstawowa pielęgnacja wnętrza",
      "Certyfikat",
    ],
  },
  {
    slug: "pelny-detailing",
    n: "12",
    name: "Pełny detailing",
    tagline: "Kompletna odnowa auta",
    short:
      "Maksymalny zakres — korekta lakieru, ceramika 5 lat, wnętrze jak nowe i komora silnika.",
    price: "od 3 490 zł",
    priceSeason: "od 4 990 zł",
    priceValue: 3490,
    duration: "3 dni robocze",
    cycle: "Raz na 3–5 lat",
    prefill: "pelny-detailing",
    image: "/images/p5.png",
    problem:
      "Oczekujesz kompletnej odnowy auta w jednym zabiegu — wypolerowanego lakieru z najtrwalszą ochroną, perfekcyjnego wnętrza i zadbanych detali, bez kompromisów.",
    effect: [
      "Pełna odnowa lakieru i wnętrza",
      "Ceramika 5 lat na lakierze, szybach i felgach",
      "Auto w stanie lepszym niż salonowy",
    ],
    includes: [
      "Dwuetapowe polerowanie",
      "Powłoka ceramiczna 5 lat",
      "Ceramika na szyby i felgi",
      "Polerowanie reflektorów",
      "Detailing komory silnika",
      "Pełny pakiet «Wnętrze jak nowe»",
      "Certyfikat",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Package slugs used before the November 2026 price list, mapped to the
 * package that replaced them. Old links (ads, Google, printed QR codes)
 * redirect here, and leads still carrying an old slug keep a readable label.
 */
export const OLD_PACKAGES: Record<string, { slug: string; name: string }> = {
  essential: { slug: "mycie-wnetrze", name: "ESSENTIAL" },
  protect: { slug: "ochrona-na-zime", name: "PROTECT" },
  restore: { slug: "polerowanie-wosk", name: "RESTORE" },
  ceramic: { slug: "polerowanie-ceramika-3-lata", name: "CERAMIC" },
  signature: { slug: "pelny-detailing", name: "SIGNATURE" },
};
