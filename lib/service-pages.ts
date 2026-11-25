/**
 * Landing-page copy for each single service (/uslugi/<slug>).
 *
 * Price and duration are NOT written here — they come from Sanity (or the
 * bundled fallback) so a price change in Studio updates the page, its
 * meta description, its FAQ and its structured data in one go.
 *
 * Keyed by the service slug. A service that exists in Sanity but has no entry
 * here still gets a page, built from its title and description alone.
 *
 * Copy rule: describe the trade honestly. No product brands, warranty terms or
 * durability numbers the studio has not stated itself.
 */
export type ServicePage = {
  /** Visible H1 — the phrase people actually search for, plus the city. */
  h1: string;
  /** <title>, under ~60 characters including the brand suffix. */
  metaTitle: string;
  /** Meta description without the price — the price is appended at runtime. */
  metaDescription: string;
  /** Two or three short paragraphs under the heading. */
  intro: string[];
  /** "Co obejmuje usługa" checklist. */
  includes: string[];
  /** "Kiedy warto" — the situations this service answers. */
  when: string[];
  /** Packages (by slug) that already contain this service. */
  packages: string[];
  /** Extra questions; price and duration questions are generated. */
  faq: { q: string; a: string }[];
  /** Other services worth linking from this page. */
  related: string[];
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "mycie-detailingowe": {
    h1: "Mycie detailingowe w Łodzi",
    metaTitle: "Mycie detailingowe Łódź — ręczne mycie auta",
    metaDescription:
      "Ręczne, dwufazowe mycie detailingowe w Łodzi — bezpieczne dla lakieru, z czyszczeniem felg, ręcznym suszeniem i woskiem w płynie.",
    intro: [
      "Mycie detailingowe to ręczne mycie auta wykonywane tak, żeby nie zostawiać na lakierze rys i swirli, które powstają na szczotkach automatycznych myjni.",
      "Pracujemy metodą dwufazową: najpierw piana aktywna rozpuszcza i zmiękcza brud, dopiero potem lakier myjemy rękawicą. Felgi czyścimy osobnymi narzędziami, a auto suszymy ręcznie i zabezpieczamy woskiem w płynie.",
    ],
    includes: [
      "Dwufazowe mycie karoserii",
      "Czyszczenie felg",
      "Bezpieczne, ręczne suszenie",
      "Wosk w płynie dla połysku i krótkotrwałej ochrony",
    ],
    when: [
      "Regularna pielęgnacja auta używanego na co dzień",
      "Auto po zimie, z solą drogową i osadem na lakierze",
      "Lakier z powłoką ceramiczną lub woskiem, który chcesz myć bezpiecznie",
      "Przed sprzedażą auta lub ważnym wyjazdem",
    ],
    packages: [
      "mycie-wnetrze",
      "ochrona-na-zime",
      "polerowanie-wosk",
      "polerowanie-ceramika-1-rok",
    ],
    faq: [
      {
        q: "Czym mycie detailingowe różni się od myjni automatycznej?",
        a: "Na myjni automatycznej szczotki przesuwają brud po lakierze i z czasem zostawiają na nim drobne rysy (swirle). Przy myciu detailingowym brud najpierw zmiękcza piana, a lakier myjemy ręcznie, bezpiecznymi rękawicami — dzięki temu połysk nie matowieje z każdym myciem.",
      },
      {
        q: "Czy mycie detailingowe jest bezpieczne dla powłoki ceramicznej?",
        a: "Tak — to właśnie zalecany sposób mycia auta z powłoką ceramiczną lub woskiem. Używamy chemii, która nie osłabia warstwy ochronnej.",
      },
    ],
    related: ["twardy-wosk", "usuwanie-smoly", "pranie-podsufitki"],
  },

  polerowanie: {
    h1: "Polerowanie lakieru w Łodzi",
    metaTitle: "Polerowanie lakieru Łódź — korekta lakieru",
    metaDescription:
      "Polerowanie i korekta lakieru w Łodzi — usuwamy zmatowienia, swirle i drobne rysy, przywracając głębię koloru i połysk.",
    intro: [
      "Z czasem każdy lakier matowieje: myjnie automatyczne, piasek i niewłaściwe mycie zostawiają na nim siatkę drobnych rys (swirli), które najlepiej widać w słońcu. Mycie tego nie cofnie — potrzebne jest polerowanie.",
      "Korekta lakieru polega na maszynowym zebraniu cienkiej warstwy lakieru bezbarwnego razem z rysami. Pracujemy po pełnym myciu i dekontaminacji, element po elemencie.",
      "Polerowanie jednoetapowe usuwa większość drobnych rys i zmatowień. Przy mocniej zniszczonym lakierze lepiej sprawdzi się polerowanie dwuetapowe — doradzimy po obejrzeniu auta.",
    ],
    includes: [
      "Mycie i dekontaminacja przed korektą",
      "Maszynowe polerowanie karoserii",
      "Usunięcie zmatowień, swirli i drobnych rys",
      "Przywrócenie głębi koloru i połysku",
    ],
    when: [
      "Lakier matowy, bez głębi koloru",
      "Widoczne swirle i rysy w słońcu",
      "Przygotowanie lakieru pod powłokę ceramiczną",
      "Odświeżenie auta przed sprzedażą",
    ],
    packages: [
      "polerowanie-wosk",
      "polerowanie-ceramika-1-rok",
      "polerowanie-ceramika-3-lata",
      "polerowanie-ceramika-5-lat",
    ],
    faq: [
      {
        q: "Czy polerowanie usunie każdą rysę?",
        a: "Polerowanie usuwa rysy, które nie przeszły przez warstwę lakieru bezbarwnego — swirle, zmatowienia i drobne zarysowania. Głębokie rysy, wyczuwalne paznokciem, można zwykle tylko złagodzić. Ocenimy to na miejscu, zanim zaczniemy pracę.",
      },
      {
        q: "Co zrobić z lakierem po polerowaniu?",
        a: "Wypolerowany lakier warto zabezpieczyć — twardym woskiem albo powłoką ceramiczną. Bez zabezpieczenia efekt zacznie znikać przy kolejnych myciach.",
      },
    ],
    related: ["polerowanie-dwuetapowe", "polerowanie-punktowe", "twardy-wosk"],
  },

  "powloka-ceramiczna": {
    h1: "Powłoka ceramiczna w Łodzi",
    metaTitle: "Powłoka ceramiczna Łódź — ceramika na lakier",
    metaDescription:
      "Powłoka ceramiczna na lakier w Łodzi bez polerowania — dla aut do 1 roku z lakierem w bardzo dobrym stanie. Długotrwała ochrona i efekt hydrofobowy.",
    intro: [
      "Powłoka ceramiczna to twarda, przezroczysta warstwa ochronna, która wiąże się z lakierem. Chroni go przed promieniowaniem UV, solą drogową i zanieczyszczeniami, nadaje głęboki połysk i silny efekt hydrofobowy — woda i brud spływają z karoserii, a auto łatwiej utrzymać w czystości.",
      "Ceramika jest tak dobra, jak lakier, na który ją nakładamy: zamyka pod sobą jego stan. Bez polerowania nakładamy ją tylko na auta do 1 roku, których lakier jest w bardzo dobrym stanie. Starsze auta zabezpieczamy w pakietach z polerowaniem i ceramiką na 1, 3 lub 5 lat.",
    ],
    includes: [
      "Mycie detailingowe i dekontaminacja lakieru",
      "Odtłuszczenie lakieru przed aplikacją",
      "Aplikacja powłoki ceramicznej",
      "Czas na utwardzenie powłoki w studiu",
    ],
    when: [
      "Nowe auto (do 1 roku), które chcesz zabezpieczyć od początku",
      "Lakier w bardzo dobrym stanie, bez swirli i zmatowień",
      "Chcesz rzadziej i łatwiej myć auto",
    ],
    packages: [
      "polerowanie-ceramika-1-rok",
      "ochrona-nowego-auta",
      "polerowanie-ceramika-3-lata",
      "polerowanie-ceramika-5-lat",
    ],
    faq: [
      {
        q: "Wosk czy powłoka ceramiczna — co wybrać?",
        a: "Twardy wosk daje piękny połysk i trzyma zwykle do roku, zależnie od eksploatacji. Powłoka ceramiczna jest twardsza i trwalsza — oferujemy ją z gwarancją 1, 3 lub 5 lat. Jeśli zależy Ci na długiej ochronie, wybierz ceramikę.",
      },
      {
        q: "Czy przed ceramiką trzeba polerować lakier?",
        a: "Powłoka utrwala stan lakieru, który jest pod nią — razem ze swirlami i zmatowieniami. Dlatego w pakietach z ceramiką polerowanie jest częścią usługi. Bez polerowania nakładamy ceramikę tylko na auta do 1 roku z lakierem w bardzo dobrym stanie — ocenimy to i doradzimy uczciwie.",
      },
      {
        q: "Jak myć auto z powłoką ceramiczną?",
        a: "Najlepiej ręcznie, metodą dwufazową — tak jak przy myciu detailingowym. Unikaj myjni szczotkowych, które rysują lakier niezależnie od zabezpieczenia.",
      },
    ],
    related: ["ceramika-szyby", "ceramika-felgi", "polerowanie"],
  },

  "twardy-wosk": {
    h1: "Woskowanie auta w Łodzi",
    metaTitle: "Woskowanie auta Łódź — twardy wosk na lakier",
    metaDescription:
      "Twardy wosk na lakier w Łodzi — głęboki połysk, efekt hydrofobowy i ochrona przed warunkami zewnętrznymi. Nakładany po dekontaminacji.",
    intro: [
      "Twardy wosk to klasyczne zabezpieczenie lakieru. Daje ciepły, głęboki połysk, sprawia, że woda perli się na karoserii, i chroni lakier przed brudem, solą i owadami. W tej usłudze łączymy go z myciem detailingowym.",
      "Wosk nakładamy na czysty, zdekontaminowany lakier — tylko wtedy dobrze się z nim wiąże. To dobre rozwiązanie dla osób, które chcą regularnie odświeżać ochronę, zamiast od razu decydować się na ceramikę.",
    ],
    includes: [
      "Mycie detailingowe",
      "Ręczna aplikacja twardego wosku",
      "Efekt hydrofobowy i głęboki połysk",
      "Wykonywany po dekontaminacji lakieru",
    ],
    when: [
      "Sezonowa ochrona lakieru przed zimą lub latem",
      "Zabezpieczenie lakieru po polerowaniu",
      "Alternatywa dla ceramiki przy mniejszym budżecie",
    ],
    packages: ["ochrona-na-zime", "polerowanie-wosk"],
    faq: [
      {
        q: "Jak często woskować auto?",
        a: "Twardy wosk Soft99 trzyma zwykle do roku — ile dokładnie, zależy od eksploatacji: jak często i czym myjesz auto, ile jeździsz zimą po soli. Najlepiej odnawiać go przed zimą.",
      },
    ],
    related: ["mycie-detailingowe", "usuwanie-smoly", "powloka-ceramiczna"],
  },

  antideszcz: {
    h1: "Powłoka antydeszcz w Łodzi",
    metaTitle: "Powłoka antydeszcz na szybę Łódź",
    metaDescription:
      "Hydrofobowa powłoka antydeszcz na przednią szybę w Łodzi — woda spływa z szyby podczas jazdy, a widoczność w deszczu jest wyraźnie lepsza.",
    intro: [
      "Powłoka antydeszcz, nazywana „niewidzialną wycieraczką”, to hydrofobowa warstwa na szybę. Woda nie rozlewa się po szkle, tylko zbiera w krople, które podczas jazdy zdmuchuje pęd powietrza.",
      "W deszczu widzisz wyraźniej, rzadziej używasz wycieraczek, a zimą łatwiej usunąć z szyby lód i szron. Powłokę nakładamy na dokładnie oczyszczone szkło.",
    ],
    includes: [
      "Dokładne oczyszczenie szyby",
      "Aplikacja hydrofobowej powłoki",
      "Efekt „niewidzialnej wycieraczki”",
    ],
    when: [
      "Częsta jazda w deszczu lub po trasie",
      "Gorsza widoczność w nocy przy mokrej nawierzchni",
      "Uzupełnienie powłoki ceramicznej na lakierze",
    ],
    packages: [
      "ochrona-na-zime",
      "polerowanie-wosk",
      "polerowanie-ceramika-1-rok",
      "polerowanie-ceramika-3-lata",
    ],
    faq: [],
    related: ["ceramika-szyby", "mycie-detailingowe", "twardy-wosk"],
  },
};
