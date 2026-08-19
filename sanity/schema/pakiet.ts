import { defineField, defineType } from "sanity";

export const pakiet = defineType({
  name: "pakiet",
  title: "Pakiet",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nazwa", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Adres (slug)", type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Kolejność", type: "number", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Podtytuł", type: "string" }),
    defineField({ name: "short", title: "Krótki opis (karta)", type: "text", rows: 2 }),
    defineField({ name: "price", title: "Cena (tekst, np. od 349 zł)", type: "string" }),
    defineField({ name: "priceValue", title: "Cena (liczba, do sortowania)", type: "number" }),
    defineField({ name: "duration", title: "Czas realizacji", type: "string" }),
    defineField({ name: "cycle", title: "Częstotliwość", type: "string" }),
    defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
    defineField({ name: "problem", title: "Problem (dla kogo)", type: "text", rows: 4 }),
    defineField({ name: "effect", title: "Efekt", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "includes", title: "W pakiecie", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "popular", title: "Najczęściej wybierany", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Kolejność", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
  },
});
