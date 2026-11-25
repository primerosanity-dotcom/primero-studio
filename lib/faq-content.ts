import type { FaqItem } from "./faq";

/**
 * Hand-written answers to the questions clients actually ask before booking
 * (fear of damaged paint, hidden costs, wet upholstery, what ceramic really
 * does). Every fact here was confirmed by the studio — keep it that way:
 * no new durability numbers, guarantees or services without asking first.
 *
 * Prices, durations, address and opening hours are NOT written here; the
 * generated questions in faq.ts take them from Sanity.
 */

/** Home page — general questions, in the order they are shown. */
export const HOME_FAQ_BEFORE_PRICE: FaqItem[] = [
  {
    q: "Czy polerowanie nie zniszczy mi lakieru?",
    a: "Nie, jeśli robi się je z głową. Przed pracą mierzymy grubość lakieru miernikiem i dobieramy pastę oraz pad do jego stanu. Zdejmujemy tylko tyle, ile trzeba, żeby usunąć zmatowienia — zwykle kilka mikronów. Jeśli jakiś element był lakierowany i lakieru jest mało, mówimy o tym przed startem i tam pracujemy delikatniej albo wcale.",
  },
  {
    q: "Czy usuniecie wszystkie rysy?",
    a: "Usuniemy zmatowienia, „pajęczynki” po myjni i drobne rysy. Głębokie rysy, w których zahacza paznokieć, często sięgają pod lakier bezbarwny — takie możemy tylko złagodzić, bo pełne usunięcie oznaczałoby przetarcie lakieru. Przy oględzinach pokażemy, co zejdzie całkiem, a co zostanie mniej widoczne.",
  },
];

export const HOME_FAQ_AFTER_PRICE: FaqItem[] = [
  {
    q: "Czy cena na miejscu może być wyższa niż na stronie?",
    a: "Na stronie podajemy ceny „od” — dla małego auta w normalnym stanie. Dokładną cenę ustalamy po bezpłatnych oględzinach auta w studiu, zawsze przed rozpoczęciem pracy. Dopłata może wynikać z wielkości auta albo bardzo mocnych zabrudzeń, ale mówimy o niej z góry. Bez Twojej zgody cena się nie zmienia.",
  },
  {
    q: "Czy możecie podać cenę przez telefon albo po zdjęciach?",
    a: "Przez telefon podamy orientacyjny przedział. Dokładną cenę mówimy dopiero po obejrzeniu auta na żywo — na zdjęciach nie widać prawdziwego stanu lakieru i tapicerki, a nie chcemy zgadywać. Oględziny i wycena są bezpłatne.",
  },
  {
    q: "Mam zwykłe auto, nie nowe ani drogie. Czy to ma sens?",
    a: "Tak — większość naszych klientów jeździ zwykłymi autami na co dzień. Wyprane wnętrze, odświeżony lakier i zabezpieczenie na zimę to realna różnica w komforcie i przy sprzedaży auta. Dobierzemy zakres do budżetu, bez wciskania najdroższego pakietu.",
  },
  {
    q: "Co jeśli nie będę zadowolony z efektu?",
    a: "Auto odbierasz razem z nami, w dobrym świetle, i sprawdzasz wszystko na miejscu. Jeśli coś jest niedoczyszczone albo niedopolerowane, poprawiamy to od razu. Dlatego przed pracą mówimy też uczciwie, czego zrobić się nie da — żeby oczekiwania były takie same po obu stronach.",
  },
  {
    q: "Czy moje auto jest bezpieczne, gdy zostaje u was?",
    a: "Auto stoi w zamkniętym studiu na zamkniętym terenie, nie na ulicy. Nie jeździmy autami klientów — przestawiamy je tylko w obrębie studia.",
  },
  {
    q: "Czy muszę zostawić auto na cały dzień?",
    a: "To zależy od usługi. Mycie detailingowe to kilka godzin. Pranie wnętrza, polerowanie i ceramika to zwykle cały dzień, a po praniu i ceramice najlepiej zostawić auto na noc: tapicerka dosycha w cieple, a powłoka przez pierwsze 24 godziny nie może złapać deszczu ani rosy. Pełny detailing to minimum 24 godziny. Dokładny czas odbioru podamy przy zapisie.",
  },
  {
    q: "Czy możecie odebrać auto spod domu?",
    a: "Tak, na życzenie odbierzemy auto i odwieziemy je po usłudze. Szczegóły ustalimy przy zapisie.",
  },
  {
    q: "Czy detailing ma sens zimą?",
    a: "Tak, a niektóre rzeczy szczególnie zimą: zabezpieczenie lakieru przed solą, pranie wnętrza z błota i soli, antydeszcz na szyby. Pracujemy w ogrzewanym studiu, więc pogoda nie ma wpływu na efekt, a wyprane wnętrze schnie w cieple, nie na mrozie.",
  },
  {
    q: "Czym różni się mycie u was od myjni?",
    a: "Na myjni szczotki albo ta sama gąbka do wszystkich aut przesuwają piasek po lakierze i zostawiają rysy. My najpierw zmiękczamy brud pianą, myjemy lakier czystymi rękawicami, felgi osobnymi narzędziami, a suszymy miękkimi ręcznikami. Lakier po myciu nie jest bardziej porysowany niż przed.",
  },
  {
    q: "Jak przygotować auto do wizyty?",
    a: "Wystarczy zabrać z auta rzeczy osobiste i wartościowe, a z bagażnika to, czego nie trzeba czyścić. Foteliki dziecięce możesz zostawić — powiedz tylko, czy też je wyczyścić. Nie musisz auta wcześniej myć.",
  },
];

/** Shown after the booking question (which carries the live address and hours). */
export const HOME_FAQ_END: FaqItem[] = [
  {
    q: "Jak można zapłacić? Czy wystawiacie fakturę?",
    a: "Płacisz gotówką, kartą (terminal), BLIK-iem albo przelewem. Na życzenie wystawiamy fakturę.",
  },
  {
    q: "Czy po waszej usłudze mogę myć auto na myjni automatycznej?",
    a: "Lepiej nie. Szczotki myjni automatycznej szybko zrobią nowe rysy i skrócą życie wosku czy ceramiki. Najbezpieczniej myć ręcznie, bezdotykowo albo u nas. Przy odbiorze dostajesz krótką instrukcję pielęgnacji.",
  },
  {
    q: "Wosk czy ceramika — co wybrać?",
    a: "Wosk to tańsza ochrona: trzyma zwykle do roku, zależnie od eksploatacji, i dobrze sprawdza się na zimę. Ceramika jest twardsza, mocniej odpycha wodę i brud, a auto łatwiej się myje — dajemy na nią gwarancję 1, 3 lub 5 lat z certyfikatem. Jeśli planujesz trzymać auto dłużej, zwykle opłaca się ceramika.",
  },
];

/** Package pages — added after the generated price / duration / scope questions. */
export const PACKAGE_FAQ: Record<string, FaqItem[]> = {
  "mycie-wnetrze": [
    {
      q: "Czym to się różni od zwykłego mycia z odkurzaniem?",
      a: "Myjemy lakier bezpiecznie dla powłoki, czyścimy felgi i wnętrze aż do plastików, boczków i konsoli, a na koniec zabezpieczamy plastiki i skórę dressingiem. To regularna pielęgnacja, nie szybkie „przelecenie”.",
    },
    {
      q: "Czy wypierzecie też fotele?",
      a: "Nie, w tym pakiecie fotele odkurzamy i czyścimy powierzchniowo. Pranie ekstrakcyjne jest w pakiecie „Pranie wnętrza”.",
    },
  ],
  "pranie-wnetrza": [
    {
      q: "Ile schnie tapicerka i czy nie będzie stęchlizny?",
      a: "Wodę z brudem od razu odsysamy odkurzaczem piorącym, więc fotele są wilgotne, a nie mokre. W ogrzewanym studiu schną zwykle 4–6 godzin, ale najlepiej zostawić auto u nas na noc, żeby tapicerka wyschła całkowicie. Stęchlizna pojawia się, gdy wilgoć zostaje w piance na dni, a my do tego nie dopuszczamy.",
    },
    {
      q: "Czy zejdą wszystkie plamy?",
      a: "Większość — tak: błoto, napoje, jedzenie, ślady po dzieciach. Stare plamy po kawie, długopisie czy farbie i odbarwiony materiał mogą zostać jaśniejsze, ale nie znikną całkiem. Takie miejsca pokażemy przy oględzinach, zanim zaczniemy.",
    },
    {
      q: "Czy usuniecie sierść i zapach po psie albo papierosach?",
      a: "Sierść usuwamy w ramach prania, bez dopłaty. Pranie zabiera też źródło zapachu z tapicerki i dywaników, więc w większości aut zapach znika albo mocno słabnie. W bardzo zadymionym aucie zapach siedzi też w podsufitce — wtedy warto dodać jej pranie.",
    },
  ],
  "ochrona-na-zime": [
    {
      q: "Na ile wystarczy ta ochrona?",
      a: "Twardy wosk Soft99 trzyma zwykle do roku — ile dokładnie, zależy od eksploatacji: jak często i czym myjesz auto i ile jeździsz po soli. Sól i błoto słabiej przywierają do lakieru, a auto łatwiej się myje.",
    },
    {
      q: "Po co dekontaminacja przed woskiem?",
      a: "Na lakierze są wbite drobinki smoły i metalu, których mycie nie zabierze. Jeśli nałożyć na nie wosk, zamkniemy brud pod ochroną, a wosk gorzej się trzyma.",
    },
  ],
  "auto-do-sprzedazy": [
    {
      q: "Czy to się opłaca przed sprzedażą?",
      a: "Zadbane auto lepiej wygląda na zdjęciach w ogłoszeniu i na oględzinach, a kupujący rzadziej zbija cenę za brud i zmatowiony lakier. W pakiecie robimy to, co kupujący widzi od razu: lakier, wnętrze, fotele, reflektory.",
    },
    {
      q: "Czy ukryjecie wady auta?",
      a: "Nie — czyścimy i odświeżamy, nie maskujemy usterek. Rysy, które zostaną po polerowaniu, i przetarcia na fotelach będą widoczne, tylko auto jako całość wygląda dużo lepiej.",
    },
  ],
  "wnetrze-jak-nowe": [
    {
      q: "Czym to się różni od pakietu „Pranie wnętrza”?",
      a: "Tu robimy całe wnętrze: wszystkie fotele, podsufitkę i podłogę. Fotele wyjmujemy z auta, żeby wyczyścić też miejsca pod nimi, a skórę i tkaniny dodatkowo zabezpieczamy impregnatem. „Pranie wnętrza” to fotele, kanapa, dywaniki i plastiki bez demontażu.",
    },
    {
      q: "Czy pranie podsufitki jest bezpieczne?",
      a: "Tak, jeśli robi się je delikatnie. Podsufitka jest klejona, więc nie zalewamy jej wodą — czyścimy ją pianą i lekko wilgotnym narzędziem, żeby klej nie puścił i materiał nie opadł.",
    },
  ],
  "polerowanie-wosk": [
    {
      q: "Czy po polerowaniu rysy wrócą?",
      a: "Usunięte rysy nie wrócą, ale nowe pojawią się, jeśli auto będzie dalej myte na myjni ze szczotkami. Wosk na końcu chroni wypolerowany lakier, a przy odbiorze podpowiadamy, jak myć auto, żeby efekt utrzymał się jak najdłużej.",
    },
    {
      q: "Co znaczy jednoetapowe polerowanie?",
      a: "Jeden etap pasty, która jednocześnie usuwa zmatowienia i nabłyszcza. Usuwa większość drobnych rys i „pajęczynek” i przywraca połysk. Przy bardzo zniszczonym lakierze lepsze jest polerowanie dwuetapowe.",
    },
  ],
  "ochrona-nowego-auta": [
    {
      q: "Auto jest nowe — po co je polerować?",
      a: "Nowe auta często przyjeżdżają z salonu z drobnymi rysami po transporcie i myciu u dealera. Lekkie polerowanie usuwa je przed nałożeniem ceramiki, żeby powłoka nie zamknęła ich pod sobą na lata.",
    },
    {
      q: "Kiedy najlepiej to zrobić?",
      a: "Jak najszybciej po odbiorze, zanim lakier zobaczy pierwszą zimę, sól i myjnię automatyczną.",
    },
  ],
  "pelny-detailing": [
    {
      q: "Dla kogo jest ten pakiet?",
      a: "Dla auta, które ma odzyskać najlepszy możliwy wygląd w środku i na zewnątrz: przed sprzedażą, po zakupie używanego albo po latach bez profesjonalnej pielęgnacji.",
    },
    {
      q: "Ile czasu auto zostaje u was?",
      a: "Minimum 24 godziny, a dokładny czas zależy od stanu auta — polerowanie, ceramika i pełne wnętrze wymagają czasu, a powłoka musi się utwardzić. Termin odbioru ustalimy przy oględzinach.",
    },
  ],
};

/** Same questions for the three ceramic packages. */
const CERAMIC_PACKAGE_FAQ: FaqItem[] = [
  {
    q: "Czy ceramika chroni przed rysami i odpryskami?",
    a: "Częściowo. Ceramika lepiej znosi mycie i drobne otarcia, chroni przed solą, ptasimi odchodami, żywicą i UV. Nie zatrzyma jednak kamienia, klucza ani szczotek myjni automatycznej — przed odpryskami chroni dopiero folia PPF.",
  },
  {
    q: "Czym różnią się warianty 1, 3 i 5 lat?",
    a: "Powłoką i trwałością: na 1 i 3 lata nakładamy powłoki Gyeon, na 5 lat — Gtechniq. Każdy wariant dostaje certyfikat z gwarancją. Rok wystarczy, jeśli auto sprzedasz za rok-dwa, a 3–5 lat ma sens, jeśli zostaje z Tobą na dłużej.",
  },
  {
    q: "Kiedy mogę pierwszy raz umyć auto i od czego zależy gwarancja?",
    a: "Przez pierwsze 24 godziny auto nie może złapać deszczu ani rosy, a pierwsze mycie — najwcześniej po 7 dniach. Powłoka utwardza się całkowicie w 2–3 tygodnie. Gwarancja wymaga przeglądu w studiu co 6 miesięcy i mycia bez myjni ze szczotkami.",
  },
];
for (const slug of [
  "polerowanie-ceramika-1-rok",
  "polerowanie-ceramika-3-lata",
  "polerowanie-ceramika-5-lat",
]) {
  PACKAGE_FAQ[slug] = CERAMIC_PACKAGE_FAQ;
}

/** Service pages — added after the generated questions and the page's own FAQ. */
export const SERVICE_FAQ: Record<string, FaqItem[]> = {
  polerowanie: [
    {
      q: "Ile lakieru zdejmujecie przy polerowaniu?",
      a: "Tylko cienką warstwę z wierzchu lakieru bezbarwnego, zwykle kilka mikronów. Grubość lakieru mierzymy miernikiem przed pracą, szczególnie na elementach po lakierowaniu.",
    },
  ],
  "polerowanie-dwuetapowe": [
    {
      q: "Kiedy wybrać dwa etapy zamiast jednego?",
      a: "Gdy lakier jest wyraźnie zmatowiony, ma dużo „pajęczynek” albo jest ciemny i każda rysa jest widoczna w słońcu. Pierwszy etap usuwa defekty, drugi wyprowadza głęboki połysk. Grubość lakieru sprawdzamy miernikiem przed pracą.",
    },
  ],
  "polerowanie-punktowe": [
    {
      q: "Czy da się usunąć jedną rysę bez polerowania całego auta?",
      a: "Tak, jeśli rysa jest w lakierze bezbarwnym — polerujemy tylko ten element albo jego fragment. Jeśli rysa sięga do podkładu, polerowanie jej nie usunie i potrzebny jest lakiernik. Powiemy to od razu przy oględzinach.",
    },
  ],
  "polerowanie-reflektorow": [
    {
      q: "Czy reflektory znowu zżółkną?",
      a: "Mocno zżółknięte i zmatowione klosze szlifujemy, polerujemy i zabezpieczamy folią, która chroni je przed ponownym matowieniem. Lekko zmatowione reflektory wystarczy odświeżyć samym polerowaniem. Który wariant jest potrzebny, ocenimy na miejscu.",
    },
  ],
  antideszcz: [
    {
      q: "Ile wytrzyma antydeszcz?",
      a: "Używamy powłoki Glaco. Na szybie trzyma zwykle do roku, a dokładnie zależy od eksploatacji — przede wszystkim od pracy wycieraczek i zimowej chemii. Przed aplikacją dokładnie czyścimy szybę, więc nie zostają smugi.",
    },
  ],
  "ceramika-szyby": [
    {
      q: "Czym ceramika na szyby różni się od zwykłego antydeszczu?",
      a: "Ceramika jest trwalsza i bardziej odporna na wycieraczki i zimową chemię, więc dłużej utrzymuje efekt spływania wody.",
    },
  ],
  "ceramika-felgi": [
    {
      q: "Czy ceramika na felgi ma sens zimą?",
      a: "Tak, właśnie wtedy. Nakładamy powłoki Gyeon i Gtechniq, na których pył z klocków hamulcowych i sól słabiej przywierają, więc felgi łatwiej umyć i nie powstają na nich wżery od pyłu.",
    },
  ],
  "impregnacja-skory": [
    {
      q: "Czy preparat odbarwi albo natłuści skórę?",
      a: "Nie. Najpierw czyścimy skórę, potem nakładamy preparat do skóry samochodowej, który nie zostawia tłustej warstwy i nie brudzi ubrań. Przy jasnej skórze najpierw sprawdzamy go w niewidocznym miejscu.",
    },
  ],
  "impregnacja-tapicerki": [
    {
      q: "Co daje impregnacja tapicerki?",
      a: "Płyny i brud wsiąkają wolniej, więc plamę po kawie czy błocie łatwiej wytrzeć, zanim wejdzie w materiał. Najlepiej robić ją zaraz po praniu, na czystą tapicerkę.",
    },
  ],
  "pranie-podsufitki": [
    {
      q: "Czy podsufitka nie opadnie po praniu?",
      a: "Nie zalewamy podsufitki wodą: czyścimy ją delikatnie pianą i lekko wilgotnym narzędziem, właśnie po to, żeby klej trzymał.",
    },
  ],
  "komora-silnika": [
    {
      q: "Czy mycie silnika nie zaszkodzi elektronice?",
      a: "Elektronikę i złącza najpierw zabezpieczamy. Brud rozpuszczamy pianą i pędzlami, a spłukujemy myjką ciśnieniową z wyczuciem, z dala od zabezpieczonych miejsc. Na koniec dbamy o plastiki i gumy. Czysty silnik pomaga też szybciej zauważyć wycieki.",
    },
  ],
  "usuwanie-smoly": [
    {
      q: "Czy usuwanie smoły nie zmatowi lakieru?",
      a: "Nie. Smołę rozpuszczamy preparatem, bez szorowania, więc lakier nie dostaje nowych rys. Kropki smoły po zimie warto usunąć szybko, zanim wżerą się w lakier.",
    },
  ],
  "powloka-ceramiczna": [
    {
      q: "Jakich powłok używacie?",
      a: "Na 1 i 3 lata nakładamy powłoki Gyeon, na 5 lat — Gtechniq. Każda powłoka dostaje certyfikat z gwarancją, a jej warunkiem jest przegląd w studiu co 6 miesięcy.",
    },
    {
      q: "Kiedy mogę umyć auto po nałożeniu ceramiki?",
      a: "Przez pierwsze 24 godziny auto nie może złapać deszczu ani rosy, a pierwsze mycie — najwcześniej po 7 dniach. Powłoka utwardza się całkowicie w 2–3 tygodnie.",
    },
  ],
};
