/**
 * Search tweaks for single package pages (/pakiety/<slug>), kept in code so
 * the package copy in Sanity stays untouched. Used where people search for the
 * job by a different name than the package has — e.g. "Pranie wnętrza" is
 * searched as "pranie tapicerki samochodowej".
 *
 * Facts only from the studio itself; the price always comes from Sanity.
 */
export type PackageSeo = {
  /** <title> without the brand suffix. */
  title: string;
  /** Meta description; "{price}" is replaced with the package price. */
  description: string;
  /** Second line of the H1, under the package name. */
  h1Line: string;
  /** Extra section under the package details. */
  section: { heading: string; paragraphs: string[] };
};

export const PACKAGE_SEO: Record<string, PackageSeo> = {
  "pranie-wnetrza": {
    title: "Pranie tapicerki samochodowej Łódź",
    description:
      "Pranie tapicerki samochodowej w Łodzi: ekstrakcyjne pranie foteli, kanapy i dywaników, czyszczenie kabiny. Cena {price}, wycena na miejscu gratis.",
    h1Line: "Pranie tapicerki samochodowej w Łodzi",
    section: {
      heading: "Pranie tapicerki samochodowej w Łodzi",
      paragraphs: [
        "Pranie tapicerki robimy metodą ekstrakcyjną: środek czyszczący wnika w materiał, a odkurzacz piorący od razu wyciąga go razem z brudem. Tak pierzemy fotele, kanapę i dywaniki — odkurzanie usuwa tylko to, co leży na wierzchu, pranie sięga głębiej.",
        "W pakiecie czyścimy też boczki drzwi, plastiki, konsolę i szyby od wewnątrz. Usunięcie sierści zwierząt jest w cenie. Pranie zajmuje zwykle 4–6 godzin, a auto stoi w tym czasie w ogrzewanym studiu przy ul. Papiernicza 7R.",
        "Cena zależy od wielkości auta i stopnia zabrudzenia, dlatego wyceniamy na miejscu — oględziny i wycena są bezpłatne.",
      ],
    },
  },
};

/** Meta description cut to ~155 characters on a word boundary. */
export function clampDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:—–-]+$/, "")}…`;
}
