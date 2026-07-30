export type PointService = {
  id: string;
  n: string;
  title: string;
  desc: string;
  /** Display price, random placeholders until confirmed */
  price: string;
  /** Estimated time */
  duration: string;
  /** Photo path — drop a real file in /public/images/uslugi/<id>.png */
  image?: string;
};

/**
 * Pojedyncze usługi (nie pakiety) — z briefu klienta.
 * Ceny są tymczasowe / orientacyjne do potwierdzenia.
 */
export const POINT_SERVICES: PointService[] = [
  {
    id: "mycie-detailingowe",
    n: "01",
    title: "Mycie detailingowe",
    desc: "Bezpieczne dwufazowe mycie karoserii z dbałością o lakier: czyszczenie felg, ręczne suszenie i nałożenie wosku w płynie.",
    price: "od 149 zł",
    duration: "1–1,5 godziny",
  },
  {
    id: "pielegnacja-wnetrza",
    n: "02",
    title: "Podstawowa pielęgnacja wnętrza",
    desc: "Regularne czyszczenie kabiny: odkurzanie wnętrza i bagażnika, czyszczenie plastików, boczków, konsoli i szyb oraz kondycjonowanie powierzchni.",
    price: "od 129 zł",
    duration: "45–90 minut",
  },
  {
    id: "pranie-wnetrza",
    n: "03",
    title: "Pranie / czyszczenie wnętrza",
    desc: "Głębokie czyszczenie tapicerki profesjonalną chemią. Dostępne warianty Standard (bez demontażu) i Premium (z częściowym demontażem).",
    price: "od 499 zł",
    duration: "4–8 godzin",
  },
  {
    id: "dekontaminacja",
    n: "04",
    title: "Dekontaminacja lakieru",
    desc: "Usuwanie bitumu, wtrąceń metalicznych i innych zanieczyszczeń przed dalszą obróbką (wosk, polerowanie, powłoki).",
    price: "od 249 zł",
    duration: "1–2 godziny",
  },
  {
    id: "polerowanie",
    n: "05",
    title: "Polerowanie karoserii",
    desc: "Przywrócenie głębi koloru i połysku lakieru. Wykonywane po dekontaminacji karoserii.",
    price: "od 1 200 zł",
    duration: "8–12 godzin",
  },
  {
    id: "powloka-ceramiczna",
    n: "06",
    title: "Powłoka ceramiczna",
    desc: "Długotrwała ochrona lakieru z wyraźnym efektem hydrofobowym. Nakładana po dekontaminacji karoserii.",
    price: "od 1 490 zł",
    duration: "1–2 dni",
  },
  {
    id: "twardy-wosk",
    n: "07",
    title: "Twardy wosk",
    desc: "Powłoka ochronna z efektem głębokiego połysku i właściwościami hydrofobowymi. Nakładana po dekontaminacji.",
    price: "od 199 zł",
    duration: "40–60 minut",
  },
  {
    id: "czyszczenie-szyb",
    n: "08",
    title: "Czyszczenie szyb",
    desc: "Profesjonalne czyszczenie wewnętrznej i zewnętrznej powierzchni szyb.",
    price: "od 79 zł",
    duration: "30–40 minut",
  },
  {
    id: "antideszcz",
    n: "09",
    title: "Powłoka antideszcz",
    desc: "Hydrofobowa powłoka na szyby poprawiająca widoczność podczas deszczu — „niewidzialna wycieraczka”.",
    price: "od 99 zł",
    duration: "30 minut",
  },
];
