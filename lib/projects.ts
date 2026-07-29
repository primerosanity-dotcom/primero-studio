export type Project = {
  slug: string;
  /** Car / project title */
  car: string;
  /** Service badge */
  service: string;
  /** One-line summary shown under the before/after */
  short: string;
  /** Full description of what was done */
  description: string;
  /** Scope of work */
  steps: string[];
  duration: string;
  /** placeholder paths — drop real before/after photos here */
  beforeSrc?: string;
  afterSrc?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "bmw-m340i-korekta-ceramika",
    car: "BMW M340i",
    service: "Korekta + ceramika",
    short: "Dwuetapowa korekta lakieru i powłoka ceramiczna.",
    description:
      "Auto trafiło do nas z siecią swirli i zmatowieniem widocznym w pełnym słońcu. Po dekontaminacji wykonaliśmy dwuetapową korektę lakieru, a następnie zabezpieczyliśmy powierzchnię powłoką ceramiczną z efektem hydrofobowym.",
    steps: [
      "Mycie detailingowe i dekontaminacja lakieru",
      "Pomiar grubości lakieru",
      "Dwuetapowa korekta — usunięcie swirli i hologramów",
      "Powłoka ceramiczna z efektem hydrofobowym",
    ],
    duration: "2 dni",
  },
  {
    slug: "porsche-911-detailing-wnetrza",
    car: "Porsche 911",
    service: "Detailing wnętrza",
    short: "Głębokie czyszczenie i pielęgnacja skórzanej kabiny.",
    description:
      "Kompleksowy detailing wnętrza z pielęgnacją skóry. Wyczyściliśmy tapicerkę, plastiki i detale, a skórę odżywiliśmy i zabezpieczyliśmy, przywracając kabinie salonowy wygląd i zapach.",
    steps: [
      "Odkurzanie i pranie tapicerki",
      "Czyszczenie plastików, boczków i konsoli",
      "Pielęgnacja i zabezpieczenie skóry",
      "Czyszczenie szyb i detali",
    ],
    duration: "1 dzień",
  },
  {
    slug: "audi-rs6-renowacja-lakieru",
    car: "Audi RS6",
    service: "Renowacja lakieru",
    short: "Polerowanie przywracające głębię koloru i twardy wosk.",
    description:
      "Zmęczony, matowy lakier po latach eksploatacji. Po dekontaminacji wykonaliśmy polerowanie przywracające głębię koloru i połysk, a całość zabezpieczyliśmy twardym woskiem.",
    steps: [
      "Mycie detailingowe i dekontaminacja",
      "Polerowanie — przywrócenie głębi koloru",
      "Zabezpieczenie twardym woskiem",
      "Czyszczenie szyb i detali",
    ],
    duration: "1 dzień roboczy",
  },
  {
    slug: "mercedes-g-powloka-ceramiczna",
    car: "Mercedes-Benz Klasa G",
    service: "Powłoka ceramiczna",
    short: "Pełna ochrona ceramiczna dużego nadwozia.",
    description:
      "Nowe auto zabezpieczone od pierwszych kilometrów. Po dekontaminacji i przygotowaniu lakieru nałożyliśmy powłokę ceramiczną, zapewniając długotrwałą ochronę i łatwiejszą pielęgnację.",
    steps: [
      "Mycie detailingowe i dekontaminacja",
      "Przygotowanie i odtłuszczenie lakieru",
      "Powłoka ceramiczna z gwarancją",
      "Powłoka hydrofobowa na szyby",
    ],
    duration: "2 dni",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
