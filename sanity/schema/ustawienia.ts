import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: contacts, opening hours, home-page numbers, Google rating. */
export const ustawienia = defineType({
  name: "ustawienia",
  title: "Ustawienia strony",
  type: "document",
  groups: [
    { name: "kontakt", title: "Kontakt", default: true },
    { name: "godziny", title: "Godziny" },
    { name: "strona", title: "Strona główna" },
    { name: "zdjecia", title: "Zdjęcia" },
    { name: "google", title: "Google" },
  ],
  fields: [
    // Kontakt
    defineField({ name: "phone", title: "Telefon", type: "string", group: "kontakt" }),
    defineField({ name: "whatsapp", title: "WhatsApp (numer)", type: "string", group: "kontakt" }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "kontakt" }),
    defineField({ name: "instagramHandle", title: "Instagram (@nazwa)", type: "string", group: "kontakt" }),
    defineField({ name: "instagramUrl", title: "Instagram (link)", type: "url", group: "kontakt" }),
    defineField({
      name: "addressLines", title: "Adres (linie)", type: "array",
      of: [{ type: "string" }], group: "kontakt",
    }),
    defineField({ name: "mapsUrl", title: "Link do map", type: "url", group: "kontakt" }),

    // Godziny
    defineField({
      name: "hours", title: "Godziny otwarcia", type: "array", group: "godziny",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "days", title: "Dni", type: "string" }),
            defineField({ name: "hours", title: "Godziny", type: "string" }),
          ],
          preview: { select: { title: "days", subtitle: "hours" } },
        }),
      ],
    }),

    // Strona główna
    defineField({
      name: "stats", title: "Liczby w bloku O nas", type: "array", group: "strona",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Wartość", type: "string" }),
            defineField({ name: "label", title: "Podpis", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({ name: "aboutText", title: "Tekst O nas", type: "text", rows: 4, group: "strona" }),

    // Zdjęcia
    defineField({
      name: "heroDesktop", title: "Zdjęcie główne — desktop", type: "image",
      options: { hotspot: true }, group: "zdjecia",
    }),
    defineField({
      name: "heroMobile", title: "Zdjęcie główne — telefon", type: "image",
      options: { hotspot: true }, group: "zdjecia",
      description: "Kadr pionowy.",
    }),
    defineField({
      name: "aboutImage", title: "Zdjęcie studia (blok O nas)", type: "image",
      options: { hotspot: true }, group: "zdjecia",
    }),

    // Google
    defineField({ name: "googleRating", title: "Ocena (np. 5,0)", type: "string", group: "google" }),
    defineField({ name: "googleReviewCount", title: "Liczba opinii", type: "number", group: "google" }),
    defineField({ name: "googleUrl", title: "Link do profilu Google", type: "url", group: "google" }),
  ],
  preview: { prepare: () => ({ title: "Ustawienia strony" }) },
});
