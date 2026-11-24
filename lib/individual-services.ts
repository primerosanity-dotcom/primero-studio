export type PointService = {
  id: string;
  n: string;
  title: string;
  desc: string;
  /** Display price, e.g. "od 199 zł" — the same all year round */
  price: string;
  /** Estimated time */
  duration: string;
  /** Photo path — drop a real file in /public/images/uslugi/<id>.png */
  image?: string;
  /** Last edit in Sanity — feeds the sitemap lastmod. */
  updatedAt?: string;
};

/**
 * Pojedyncze usługi (nie pakiety) — cennik z listopada 2026.
 * Ceny są takie same przez cały rok (zimowy cennik dotyczy tylko pakietów).
 */
export const POINT_SERVICES: PointService[] = [
  {
    id: "mycie-detailingowe",
    n: "01",
    title: "Mycie detailingowe",
    desc: "Bezpieczne dwufazowe mycie karoserii z dbałością o lakier: czyszczenie felg, ręczne suszenie i nałożenie wosku w płynie.",
    price: "od 199 zł",
    duration: "1–1,5 godziny",
    image: "/images/uslugi/1.png",
  },
  {
    id: "twardy-wosk",
    n: "02",
    title: "Mycie + twardy wosk",
    desc: "Mycie detailingowe i twardy wosk ochronny — głęboki połysk, efekt hydrofobowy i ochrona lakieru na kilka miesięcy.",
    price: "od 449 zł",
    duration: "2–3 godziny",
    image: "/images/uslugi/7.png",
  },
  {
    id: "polerowanie",
    n: "03",
    title: "Polerowanie jednoetapowe",
    desc: "Polerowanie karoserii jednym etapem — usuwa większość drobnych rys i zmatowień i przywraca połysk lakieru.",
    price: "od 990 zł",
    duration: "6–8 godzin",
    image: "/images/uslugi/5.png",
  },
  {
    id: "polerowanie-dwuetapowe",
    n: "04",
    title: "Polerowanie dwuetapowe",
    desc: "Korekta lakieru w dwóch etapach: najpierw usuwamy głębsze rysy i swirle, potem wykańczamy lakier do głębokiego połysku.",
    price: "od 1 490 zł",
    duration: "1–2 dni",
  },
  {
    id: "polerowanie-punktowe",
    n: "05",
    title: "Polerowanie punktowe",
    desc: "Usunięcie lub złagodzenie pojedynczej rysy albo polerowanie jednego elementu karoserii.",
    price: "od 199 zł",
    duration: "1–2 godziny",
  },
  {
    id: "polerowanie-reflektorow",
    n: "06",
    title: "Polerowanie reflektorów",
    desc: "Polerowanie zmatowiałych i pożółkłych kloszy reflektorów (para) — lepszy wygląd auta i lepsze światło na drodze.",
    price: "od 249 zł",
    duration: "1–1,5 godziny",
  },
  {
    id: "antideszcz",
    n: "07",
    title: "Antydeszcz — przednia szyba",
    desc: "Hydrofobowa powłoka na przednią szybę poprawiająca widoczność podczas deszczu — „niewidzialna wycieraczka”.",
    price: "od 149 zł",
    duration: "30 minut",
    image: "/images/uslugi/9.png",
  },
  {
    id: "ceramika-szyby",
    n: "08",
    title: "Ceramika na wszystkie szyby",
    desc: "Trwała powłoka ceramiczna na wszystkie szyby — woda spływa sama, a szyby dłużej pozostają czyste.",
    price: "od 299 zł",
    duration: "1–1,5 godziny",
    image: "/images/uslugi/8.png",
  },
  {
    id: "ceramika-felgi",
    n: "09",
    title: "Ceramika na felgi",
    desc: "Powłoka ceramiczna na felgi — pył z klocków hamulcowych i brud słabiej się przyczepiają, a felgi łatwiej umyć.",
    price: "od 399 zł",
    duration: "2–3 godziny",
  },
  {
    id: "impregnacja-skory",
    n: "10",
    title: "Czyszczenie i impregnacja skóry",
    desc: "Delikatne czyszczenie skórzanej tapicerki i impregnacja, która chroni skórę przed wycieraniem i pękaniem.",
    price: "od 299 zł",
    duration: "2–3 godziny",
    image: "/images/uslugi/2.png",
  },
  {
    id: "impregnacja-tapicerki",
    n: "11",
    title: "Impregnacja tapicerki materiałowej",
    desc: "Zabezpieczenie foteli i kanapy z tkaniny — płyny i brud słabiej wnikają w materiał, a plamy łatwiej usunąć.",
    price: "od 249 zł",
    duration: "1–2 godziny",
  },
  {
    id: "pranie-podsufitki",
    n: "12",
    title: "Pranie podsufitki",
    desc: "Bezpieczne czyszczenie podsufitki z plam i zabrudzeń, bez ryzyka odklejenia materiału.",
    price: "od 149 zł",
    duration: "1–1,5 godziny",
    image: "/images/uslugi/3.png",
  },
  {
    id: "ozonowanie",
    n: "13",
    title: "Ozonowanie",
    desc: "Usuwanie nieprzyjemnych zapachów z kabiny i odświeżenie układu wentylacji ozonem.",
    price: "od 99 zł",
    duration: "30–60 minut",
  },
  {
    id: "komora-silnika",
    n: "14",
    title: "Detailing komory silnika",
    desc: "Bezpieczne czyszczenie komory silnika z kurzu i osadów oraz zabezpieczenie plastików i gum.",
    price: "od 249 zł",
    duration: "1–2 godziny",
  },
  {
    id: "usuwanie-smoly",
    n: "15",
    title: "Usuwanie smoły / żywicy",
    desc: "Usunięcie smoły, bitumu i żywicy z lakieru bez ryzyka jego uszkodzenia.",
    price: "od 149 zł",
    duration: "1 godzina",
    image: "/images/uslugi/4.png",
  },
  {
    id: "powloka-ceramiczna",
    n: "16",
    title: "Powłoka ceramiczna (bez polerowania)",
    desc: "Powłoka ceramiczna na lakier bez polerowania — dla aut do 1 roku, z lakierem w bardzo dobrym stanie. Długotrwała ochrona i efekt hydrofobowy.",
    price: "od 1 290 zł",
    duration: "1–2 dni",
    image: "/images/uslugi/6.png",
  },
];

/**
 * Services removed in the November 2026 price list, mapped to where their old
 * pages now redirect (the nearest service or package).
 */
export const REMOVED_SERVICES: Record<string, string> = {
  "pielegnacja-wnetrza": "/pakiety/mycie-wnetrze",
  "pranie-wnetrza": "/pakiety/pranie-wnetrza",
  dekontaminacja: "/uslugi/usuwanie-smoly",
  "czyszczenie-szyb": "/uslugi/ceramika-szyby",
};
