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
    packages: ["essential", "protect", "restore", "ceramic", "signature"],
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
    related: ["pielegnacja-wnetrza", "dekontaminacja", "twardy-wosk"],
  },

  "pielegnacja-wnetrza": {
    h1: "Czyszczenie wnętrza auta w Łodzi",
    metaTitle: "Czyszczenie wnętrza auta Łódź",
    metaDescription:
      "Regularna pielęgnacja wnętrza auta w Łodzi — odkurzanie kabiny i bagażnika, czyszczenie plastików, boczków i szyb, kondycjonowanie skóry.",
    intro: [
      "Podstawowa pielęgnacja wnętrza utrzymuje kabinę w czystości pomiędzy większymi zabiegami. To usługa dla auta, którego wnętrze jest w dobrym stanie i wymaga regularnego odświeżenia, a nie głębokiego prania.",
      "Odkurzamy kabinę i bagażnik, czyścimy wszystkie twarde powierzchnie, a na koniec zabezpieczamy plastiki i skórę preparatami kondycjonującymi, które przywracają im naturalny wygląd.",
    ],
    includes: [
      "Odkurzanie wnętrza i bagażnika",
      "Czyszczenie plastików, boczków drzwi i konsoli",
      "Mycie szyb od wewnątrz",
      "Kondycjonowanie plastików i skóry",
    ],
    when: [
      "Regularne odświeżenie wnętrza co kilka tygodni",
      "Kabina zakurzona, ale bez plam na tapicerce",
      "Uzupełnienie mycia detailingowego karoserii",
    ],
    packages: ["essential", "protect", "restore", "ceramic"],
    faq: [
      {
        q: "Czy w tej usłudze pierzecie tapicerkę?",
        a: "Nie — podstawowa pielęgnacja to odkurzanie, czyszczenie powierzchni i kondycjonowanie. Jeśli na fotelach lub podsufitce są plamy albo zapachy, potrzebne jest pranie wnętrza.",
      },
    ],
    related: ["pranie-wnetrza", "mycie-detailingowe", "czyszczenie-szyb"],
  },

  "pranie-wnetrza": {
    h1: "Pranie tapicerki samochodowej w Łodzi",
    metaTitle: "Pranie tapicerki samochodowej Łódź",
    metaDescription:
      "Pranie tapicerki i głębokie czyszczenie wnętrza auta w Łodzi. Wariant Standard bez demontażu lub Premium z częściowym demontażem foteli.",
    intro: [
      "Pranie wnętrza to głębokie czyszczenie tapicerki, wykładzin i podsufitki profesjonalną chemią. Usuwa plamy, zabrudzenia wbite w materiał i nieprzyjemne zapachy, których nie zbierze zwykły odkurzacz.",
      "Wykonujemy je w dwóch wariantach: Standard — bez demontażu elementów, oraz Premium — z częściowym demontażem, który pozwala dotrzeć do miejsc pod fotelami i przy prowadnicach.",
    ],
    includes: [
      "Pranie foteli, kanapy i wykładzin",
      "Czyszczenie podsufitki i boczków drzwi",
      "Wariant Premium z częściowym demontażem elementów",
    ],
    when: [
      "Plamy na fotelach lub wykładzinie",
      "Nieprzyjemny zapach we wnętrzu",
      "Auto kupione z rynku wtórnego",
      "Przygotowanie auta do sprzedaży",
    ],
    packages: ["signature"],
    faq: [
      {
        q: "Czym różni się wariant Standard od Premium?",
        a: "Standard to pranie bez demontażu elementów — wystarcza przy typowych zabrudzeniach. Premium obejmuje częściowy demontaż, dzięki któremu czyścimy także miejsca pod fotelami i przy prowadnicach, gdzie zbiera się najwięcej brudu.",
      },
      {
        q: "Czy po praniu tapicerka musi schnąć?",
        a: "Tak, materiał potrzebuje czasu na wyschnięcie. Odbiór auta ustalamy tak, żeby wnętrze było suche, zanim do niego wsiądziesz.",
      },
    ],
    related: ["pielegnacja-wnetrza", "czyszczenie-szyb", "mycie-detailingowe"],
  },

  dekontaminacja: {
    h1: "Dekontaminacja lakieru w Łodzi",
    metaTitle: "Dekontaminacja lakieru Łódź — bitum, metal",
    metaDescription:
      "Dekontaminacja lakieru w Łodzi — usuwanie bitumu, smoły i wtrąceń metalicznych. Niezbędny krok przed woskiem, polerowaniem i powłoką ceramiczną.",
    intro: [
      "Nawet umyty lakier ma na sobie zanieczyszczenia, których nie widać gołym okiem: drobiny bitumu, smołę i opiłki metalu z klocków hamulcowych. Pod palcami lakier jest wtedy szorstki zamiast gładkiego.",
      "Dekontaminacja usuwa je chemicznie i mechanicznie. To obowiązkowy etap przed każdym zabezpieczeniem — wosk ani powłoka ceramiczna nie zwiążą się dobrze z zanieczyszczonym lakierem, a polerowanie rozmazałoby brud po powierzchni.",
    ],
    includes: [
      "Usuwanie bitumu i smoły",
      "Usuwanie wtrąceń metalicznych (deironizacja)",
      "Oczyszczenie lakieru przed dalszą obróbką",
    ],
    when: [
      "Przed nałożeniem wosku lub powłoki ceramicznej",
      "Przed polerowaniem lakieru",
      "Lakier szorstki w dotyku mimo mycia",
      "Rdzawe kropki na jasnym lakierze",
    ],
    packages: ["protect", "restore", "ceramic", "signature"],
    faq: [
      {
        q: "Jak sprawdzić, czy lakier wymaga dekontaminacji?",
        a: "Po umyciu auta przesuń palcami po masce przez cienką folię spożywczą. Jeśli czujesz szorstkość zamiast gładkiej powierzchni, na lakierze są zanieczyszczenia, które usuwa dekontaminacja.",
      },
    ],
    related: ["twardy-wosk", "polerowanie", "powloka-ceramiczna"],
  },

  polerowanie: {
    h1: "Polerowanie lakieru w Łodzi",
    metaTitle: "Polerowanie lakieru Łódź — korekta lakieru",
    metaDescription:
      "Polerowanie i korekta lakieru w Łodzi — usuwamy zmatowienia, swirle i drobne rysy, przywracając głębię koloru i połysk.",
    intro: [
      "Z czasem każdy lakier matowieje: myjnie automatyczne, piasek i niewłaściwe mycie zostawiają na nim siatkę drobnych rys (swirli), które najlepiej widać w słońcu. Mycie tego nie cofnie — potrzebne jest polerowanie.",
      "Korekta lakieru polega na maszynowym zebraniu cienkiej warstwy lakieru bezbarwnego razem z rysami. Pracujemy po pełnym myciu i dekontaminacji, element po elemencie.",
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
    packages: ["restore", "ceramic", "signature"],
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
    related: ["powloka-ceramiczna", "dekontaminacja", "twardy-wosk"],
  },

  "powloka-ceramiczna": {
    h1: "Powłoka ceramiczna w Łodzi",
    metaTitle: "Powłoka ceramiczna Łódź — ceramika na lakier",
    metaDescription:
      "Powłoka ceramiczna na lakier w Łodzi — długotrwała ochrona, głęboki połysk i efekt hydrofobowy. Nakładana po dekontaminacji i korekcie lakieru.",
    intro: [
      "Powłoka ceramiczna to twarda, przezroczysta warstwa ochronna, która wiąże się z lakierem. Chroni go przed promieniowaniem UV, solą drogową i zanieczyszczeniami, nadaje głęboki połysk i silny efekt hydrofobowy — woda i brud spływają z karoserii, a auto łatwiej utrzymać w czystości.",
      "Ceramika jest tak dobra, jak lakier, na który ją nakładamy: zamyka pod sobą jego stan. Dlatego przed aplikacją auto przechodzi pełne mycie i dekontaminację, a zwykle także korektę lakieru.",
    ],
    includes: [
      "Mycie detailingowe i dekontaminacja lakieru",
      "Odtłuszczenie lakieru przed aplikacją",
      "Aplikacja powłoki ceramicznej",
      "Czas na utwardzenie powłoki w studiu",
    ],
    when: [
      "Nowe auto, które chcesz zabezpieczyć od początku",
      "Lakier po polerowaniu — żeby efekt został na lata",
      "Chcesz rzadziej i łatwiej myć auto",
    ],
    packages: ["ceramic", "signature"],
    faq: [
      {
        q: "Wosk czy powłoka ceramiczna — co wybrać?",
        a: "Twardy wosk daje piękny połysk, ale zmywa się po kilku miesiącach. Powłoka ceramiczna jest znacznie trwalsza — w pakiecie CERAMIC zalecamy jej odnowienie raz na 2–3 lata. Jeśli zależy Ci na długiej ochronie, wybierz ceramikę.",
      },
      {
        q: "Czy przed ceramiką trzeba polerować lakier?",
        a: "Powłoka utrwala stan lakieru, który jest pod nią — razem ze swirlami i zmatowieniami. Dlatego w pakiecie CERAMIC polerowanie jest częścią usługi. Jeśli lakier jest w bardzo dobrym stanie, ocenimy to i doradzimy uczciwie.",
      },
      {
        q: "Jak myć auto z powłoką ceramiczną?",
        a: "Najlepiej ręcznie, metodą dwufazową — tak jak przy myciu detailingowym. Unikaj myjni szczotkowych, które rysują lakier niezależnie od zabezpieczenia.",
      },
    ],
    related: ["polerowanie", "dekontaminacja", "antideszcz"],
  },

  "twardy-wosk": {
    h1: "Woskowanie auta w Łodzi",
    metaTitle: "Woskowanie auta Łódź — twardy wosk na lakier",
    metaDescription:
      "Twardy wosk na lakier w Łodzi — głęboki połysk, efekt hydrofobowy i ochrona przed warunkami zewnętrznymi. Nakładany po dekontaminacji.",
    intro: [
      "Twardy wosk to klasyczne zabezpieczenie lakieru. Daje ciepły, głęboki połysk, sprawia, że woda perli się na karoserii, i chroni lakier przed brudem, solą i owadami.",
      "Wosk nakładamy na czysty, zdekontaminowany lakier — tylko wtedy dobrze się z nim wiąże. To dobre rozwiązanie dla osób, które chcą regularnie odświeżać ochronę, zamiast od razu decydować się na ceramikę.",
    ],
    includes: [
      "Ręczna aplikacja twardego wosku",
      "Efekt hydrofobowy i głęboki połysk",
      "Wykonywany po dekontaminacji lakieru",
    ],
    when: [
      "Sezonowa ochrona lakieru przed zimą lub latem",
      "Zabezpieczenie lakieru po polerowaniu",
      "Alternatywa dla ceramiki przy mniejszym budżecie",
    ],
    packages: ["protect", "restore"],
    faq: [
      {
        q: "Jak często woskować auto?",
        a: "Twardy wosk zmywa się stopniowo i po kilku miesiącach traci właściwości ochronne. W pakiecie PROTECT zalecamy odnawianie ochrony co 2–3 miesiące.",
      },
    ],
    related: ["dekontaminacja", "powloka-ceramiczna", "mycie-detailingowe"],
  },

  "czyszczenie-szyb": {
    h1: "Czyszczenie szyb samochodowych w Łodzi",
    metaTitle: "Czyszczenie szyb samochodowych Łódź",
    metaDescription:
      "Profesjonalne czyszczenie szyb samochodowych w Łodzi — od wewnątrz i od zewnątrz, bez smug i nalotu, który oślepia pod słońce i w nocy.",
    intro: [
      "Na szybach od środka osadza się tłusty nalot, który najbardziej przeszkadza pod słońce i w nocy, gdy światła innych aut rozmywają się w smugach. Od zewnątrz szkło zbiera osad z dróg i owady.",
      "Czyścimy szyby z obu stron preparatami, które nie zostawiają smug, łącznie z trudno dostępnymi miejscami przy desce rozdzielczej.",
    ],
    includes: [
      "Czyszczenie szyb od wewnątrz",
      "Czyszczenie szyb od zewnątrz",
      "Usunięcie tłustego nalotu i smug",
    ],
    when: [
      "Smugi i nalot na przedniej szybie",
      "Oślepianie przez słońce lub światła w nocy",
      "Przed nałożeniem powłoki antideszcz",
    ],
    packages: ["protect", "restore", "ceramic", "signature"],
    faq: [],
    related: ["antideszcz", "pielegnacja-wnetrza", "mycie-detailingowe"],
  },

  antideszcz: {
    h1: "Powłoka antideszcz w Łodzi",
    metaTitle: "Powłoka antideszcz na szyby Łódź",
    metaDescription:
      "Hydrofobowa powłoka antideszcz na szyby samochodowe w Łodzi — woda spływa z szyby podczas jazdy, a widoczność w deszczu jest wyraźnie lepsza.",
    intro: [
      "Powłoka antideszcz, nazywana „niewidzialną wycieraczką”, to hydrofobowa warstwa na szybę. Woda nie rozlewa się po szkle, tylko zbiera w krople, które podczas jazdy zdmuchuje pęd powietrza.",
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
    packages: ["protect", "ceramic", "signature"],
    faq: [],
    related: ["czyszczenie-szyb", "powloka-ceramiczna", "twardy-wosk"],
  },
};
