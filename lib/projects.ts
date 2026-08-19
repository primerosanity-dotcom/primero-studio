export type Project = {
  slug: string;
  /** Car / project title */
  car: string;
  /** Service badge */
  service: string;
  /** One-line summary shown on the card */
  short: string;
  /** Full description of what was done */
  description: string;
  /** Scope of work */
  steps: string[];
  duration: string;
  /** Cover photo ("after") — drop the file in /public/images/realizacje/ */
  image?: string;
  /** Optional "before" shot; when set, the card shows a before/after slider */
  beforeImage?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "audi-a4-zmiana-koloru",
    car: "Audi A4",
    service: "Zmiana koloru",
    short: "Zmiana koloru na szary satyn i dopracowanie każdego detalu.",
    description:
      "Audi A4 przyjechało do nas z innego miasta specjalnie na metamorfozę. Auto wyjechało w zupełnie nowym kolorze, z dopracowanymi detalami i pełną listą wykonanych prac — a właściciel w bardzo dobrym nastroju.",
    steps: [
      "Zmiana koloru na szary satyn",
      "Malowanie przedniego grilla na czarny połysk",
      "Wygłuszenie przednich drzwi",
      "Malowanie zacisków hamulcowych",
      "Czyszczenie i zabezpieczenie skóry powłoką ceramiczną",
      "Renowacja felg",
    ],
    duration: "5 dni roboczych",
    image: "/images/realizacje/1.png",
  },
  {
    slug: "range-rover-sport-oklejanie",
    car: "Range Rover Sport",
    service: "Folia + wnętrze",
    short: "Zdjęcie starej folii, polerowanie i pełne oklejenie poliuretanem.",
    description:
      "Czystość, blask, szyk i solidność — to wszystko symbolizuje biały kolor auta. Każdy kierowca wie, że biel wymaga więcej uwagi niż inne kolory. Tutaj jednak chodziło o coś więcej niż sam kolor: auto przeszło pełną metamorfozę powłoki i wnętrza.",
    steps: [
      "Zdjęcie starej folii",
      "Polerowanie lakieru",
      "Pełne oklejenie poliuretanem Hexis Bodyfence",
      "Malowanie grilla na czarny połysk",
      "Detailing wnętrza z pielęgnacją skóry",
    ],
    duration: "1 tydzień",
    image: "/images/realizacje/2.png",
  },
  {
    slug: "porsche-panamera-oklejanie",
    car: "Porsche Panamera",
    service: "Folia + detale",
    short: "Pełne oklejenie poliuretanem i wszystkie chromy w czarnym połysku.",
    description:
      "Kolejny przedstawiciel niemieckiej stajni trafił do nas, by zamienić fabryczny wygląd na bardziej wyrazisty i jednocześnie zabezpieczyć karoserię przed czynnikami zewnętrznymi. Efekt: spójny, ciemny akcent na każdym detalu i ochrona lakieru pod folią.",
    steps: [
      "Malowanie strukturalnych plastików w kolorze karoserii",
      "Pełne oklejenie karoserii poliuretanem",
      "Malowanie lusterek na czarny połysk",
      "Oklejenie wszystkich chromowanych elementów na czarny połysk",
      "Malowanie felg na czarny połysk",
    ],
    duration: "1 tydzień",
    image: "/images/realizacje/3.png",
  },
  {
    slug: "bmw-x5-ppf-ceramika",
    car: "BMW X5",
    service: "PPF + ceramika",
    short: "Pełna ochrona PPF i ceramika na lakier, szyby, skórę i felgi.",
    description:
      "Celem nie było samo zachowanie wyglądu, ale utrzymanie efektu nowego auta nawet po latach. Cała karoseria trafiła pod folię ochronną, wszystkie błyszczące elementy zostały dopracowane w detalu, a każda powierzchnia zabezpieczona powłoką ceramiczną.",
    steps: [
      "Pełne oklejenie karoserii folią antygrawitacyjną (PPF)",
      "Detaliczne oklejenie wszystkich błyszczących elementów",
      "Powłoka ceramiczna na folię",
      "Powłoka ceramiczna na szyby, skórę i felgi",
    ],
    duration: "5–7 dni",
    image: "/images/realizacje/4.png",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
