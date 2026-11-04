import type { Service } from "@/lib/services";

/**
 * Opening promotion: the RESTORE package with a ceramic coating in place of
 * the hard wax. Kept in code (not Sanity) because it is a time-limited offer.
 */
export const PROMO_SLUG = "promocja-otwarcia";

export const PROMO: Service = {
  slug: PROMO_SLUG,
  n: "-50%",
  name: "Polerowanie + Ceramika",
  tagline: "Przywrócenie połysku i ochrona ceramiczna",
  short:
    "Polerowanie przywracające głębię koloru i powłoka ceramiczna zamiast wosku.",
  price: "1 400 zł",
  priceValue: 1400,
  duration: "1–2 dni robocze",
  cycle: "Promocja z okazji otwarcia",
  prefill: PROMO_SLUG,
  image: "",
  problem:
    "Z czasem lakier matowieje, pokrywa się swirlami i traci głębię koloru. Zwykłe mycie tego nie naprawi — potrzebne jest polerowanie. W tej promocji po polerowaniu zabezpieczamy lakier powłoką ceramiczną zamiast wosku. Ceramika tworzy na lakierze twardą, gładką warstwę ochronną, która trzyma się znacznie dłużej niż wosk: woda i brud spływają z niej same, sól drogowa i promienie UV nie niszczą lakieru, a auto myje się szybciej i dłużej wygląda jak po wyjeździe ze studia.",
  effect: [
    "Przywrócona głębia i połysk lakieru",
    "Usunięte zmatowienia i drobne rysy",
    "Ochrona ceramiczna — znacznie trwalsza niż wosk",
    "Efekt hydrofobowy: woda i brud spływają z lakieru",
    "Ochrona przed solą drogową, UV i zabrudzeniami",
    "Łatwiejsze i szybsze mycie auta",
  ],
  includes: [
    "Mycie detailingowe (pełny zakres)",
    "Podstawowa pielęgnacja wnętrza",
    "Dekontaminacja lakieru",
    "Polerowanie karoserii — przywrócenie głębi koloru",
    "Powłoka ceramiczna (zamiast twardego wosku)",
    "Czyszczenie szyb wewnątrz i na zewnątrz",
  ],
};

/** Price before the opening discount, shown crossed out on the card. */
export const PROMO_OLD_PRICE = "2 800 zł";
