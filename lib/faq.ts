import type { Service } from "./services";
import type { PointService } from "./individual-services";
import { SERVICE_PAGES } from "./service-pages";

export type FaqItem = { q: string; a: string };

/**
 * FAQ answers are assembled from the live prices, durations and hours, so the
 * text Google and AI answers quote can never drift from what the studio
 * actually charges. Every figure below comes from Sanity (or its fallback).
 */

const byId = <T extends { id: string }>(list: T[], id: string) =>
  list.find((s) => s.id === id);
const bySlug = (list: Service[], slug: string) =>
  list.find((s) => s.slug === slug);

function lower(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function homeFaq({
  packages,
  services,
  address,
  hours,
}: {
  packages: Service[];
  services: PointService[];
  address: string;
  hours: { days: string; hours: string }[];
}): FaqItem[] {
  const items: FaqItem[] = [];
  const wash = byId(services, "mycie-detailingowe");
  const ceramic = byId(services, "powloka-ceramiczna");
  const polish = byId(services, "polerowanie");
  const sorted = [...packages].sort((a, b) => a.priceValue - b.priceValue);
  const cheapest = sorted[0];
  const fullest = sorted[sorted.length - 1];

  if (wash && cheapest && fullest) {
    items.push({
      q: "Ile kosztuje detailing auta w Łodzi?",
      a: `Mycie detailingowe kosztuje ${wash.price}, a pakiety zaczynają się od pakietu ${cheapest.name} (${cheapest.price}) i kończą na pełnym detailingu ${fullest.name} (${fullest.price}). Ostateczna cena zależy od wielkości i stanu auta — wycenę przygotujemy bezpłatnie po zgłoszeniu.`,
    });
  }

  if (ceramic) {
    items.push({
      q: "Ile kosztuje i ile trwa powłoka ceramiczna?",
      a: `Powłoka ceramiczna kosztuje ${ceramic.price}, a jej wykonanie zajmuje ${ceramic.duration}. Przed aplikacją lakier przechodzi mycie i dekontaminację, a w pakiecie CERAMIC także polerowanie.`,
    });
  }

  if (polish) {
    items.push({
      q: "Ile trwa polerowanie lakieru?",
      a: `Polerowanie karoserii trwa ${polish.duration} i kosztuje ${polish.price}. Wykonujemy je zawsze po dekontaminacji lakieru, a po nim warto zabezpieczyć lakier woskiem lub ceramiką.`,
    });
  }

  const cycles = packages
    .filter((p) => p.cycle)
    .map((p) => `${p.name} — ${lower(p.cycle)}`)
    .join(", ");
  if (cycles) {
    items.push({
      q: "Jak często robić detailing auta?",
      a: `To zależy od zakresu. Zalecana częstotliwość dla naszych pakietów: ${cycles}.`,
    });
  }

  items.push({
    q: "Czym różni się studio detailingu od myjni?",
    a: "Myjnia ma umyć auto szybko. Studio detailingu dba o to, żeby lakier i wnętrze były w lepszym stanie po wizycie niż przed nią: myjemy ręcznie metodami bezpiecznymi dla lakieru, usuwamy zanieczyszczenia, polerujemy i zabezpieczamy karoserię woskiem lub ceramiką.",
  });

  const open = hours.map((h) => `${h.days}: ${h.hours}`).join(", ");
  items.push({
    q: "Gdzie znajduje się studio i jak umówić wizytę?",
    a: `Studio Primero mieści się pod adresem ${address}. Wizytę umówisz telefonicznie, przez WhatsApp lub formularzem na stronie.${open ? ` Godziny otwarcia: ${open}.` : ""}`,
  });

  return items;
}

/**
 * The natural phrase for a service ("pranie tapicerki samochodowej"), taken
 * from its landing-page H1 — the menu title ("Pranie / czyszczenie wnętrza")
 * reads badly inside a sentence.
 */
export function serviceName(service: PointService): string {
  return SERVICE_PAGES[service.id]?.h1.replace(/\s+w Łodzi$/, "") ?? service.title;
}

export function servicePageFaq(
  service: PointService,
  packages: Service[],
): FaqItem[] {
  const page = SERVICE_PAGES[service.id];
  const name = lower(serviceName(service));
  const items: FaqItem[] = [];

  if (service.price) {
    items.push({
      q: `Ile kosztuje ${name} w Łodzi?`,
      a: `${serviceName(service)} w Primero Studio kosztuje ${service.price}. Ostateczna cena zależy od wielkości i stanu auta — wycenę przygotujemy bezpłatnie.`,
    });
  }
  if (service.duration) {
    items.push({
      q: `Ile trwa ${name}?`,
      a: `Orientacyjny czas wykonania to ${service.duration}. Dokładny termin odbioru ustalimy przy umawianiu wizyty.`,
    });
  }

  const inPackages = (page?.packages ?? [])
    .map((slug) => bySlug(packages, slug))
    .filter((p): p is Service => Boolean(p));
  if (inPackages.length) {
    items.push({
      q: `Czy ${name} jest w którymś pakiecie?`,
      a: `Tak — ${name} jest częścią ${inPackages.length > 1 ? "pakietów" : "pakietu"} ${inPackages
        .map((p) => `${p.name} (${p.price})`)
        .join(", ")}. W pakiecie łączymy kilka usług w jednej wizycie.`,
    });
  }

  return [...items, ...(page?.faq ?? [])];
}

export function packageFaq(pkg: Service): FaqItem[] {
  return [
    {
      q: `Ile kosztuje pakiet ${pkg.name}?`,
      a: `Pakiet ${pkg.name} kosztuje ${pkg.price}. Ostateczna cena zależy od wielkości i stanu auta — wycenę przygotujemy bezpłatnie.`,
    },
    {
      q: `Ile trwa pakiet ${pkg.name}?`,
      a: `Orientacyjny czas realizacji to ${lower(pkg.duration)}. Zalecana częstotliwość: ${lower(pkg.cycle)}.`,
    },
    {
      q: `Co obejmuje pakiet ${pkg.name}?`,
      a: `W pakiecie: ${pkg.includes.map(lower).join(", ")}.`,
    },
  ];
}
