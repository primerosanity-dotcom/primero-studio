import type { Service } from "@/lib/services";

/**
 * Opening promotion: paint polishing plus a ceramic coating (exterior only). Kept in code (not Sanity) because it is a time-limited offer.
 */
export const PROMO_SLUG = "promocja-otwarcia";

export const PROMO: Service = {
  slug: PROMO_SLUG,
  n: "-50%",
  name: "Polerowanie + Ceramika",
  tagline: "Przywrócenie połysku i ochrona ceramiczna",
  short:
    "Polerowanie przywracające głębię koloru i trwała powłoka ceramiczna.",
  price: "1 400 zł",
  priceValue: 1400,
  duration: "1–2 dni robocze",
  cycle: "Promocja z okazji otwarcia",
  prefill: PROMO_SLUG,
  image: "/images/pakiety/promocja.jpg",
  problem:
    "Z czasem lakier matowieje, pokrywa się swirlami i traci głębię koloru. Zwykłe mycie tego nie naprawi — potrzebne jest polerowanie. W tej promocji po polerowaniu zabezpieczamy lakier powłoką ceramiczną. Ceramika tworzy na lakierze twardą, gładką warstwę ochronną, która chroni go na długo: woda i brud spływają z niej same, sól drogowa i promienie UV nie niszczą lakieru, a auto myje się szybciej i dłużej wygląda jak po wyjeździe ze studia.",
  effect: [
    "Przywrócona głębia i połysk lakieru",
    "Usunięte zmatowienia i drobne rysy",
    "Długotrwała ochrona ceramiczna lakieru",
    "Efekt hydrofobowy: woda i brud spływają z lakieru",
    "Ochrona przed solą drogową, UV i zabrudzeniami",
    "Łatwiejsze i szybsze mycie auta",
  ],
  includes: [
    "Mycie detailingowe (pełny zakres)",
    "Dekontaminacja lakieru",
    "Polerowanie karoserii — przywrócenie głębi koloru",
    "Powłoka ceramiczna — długotrwała ochrona",
    "Czyszczenie szyb wewnątrz i na zewnątrz",
  ],
};

/** Price before the opening discount, shown crossed out on the card. */
export const PROMO_OLD_PRICE = "2 800 zł";
