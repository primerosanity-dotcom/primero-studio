import { defineField, defineType } from "sanity";

export const realizacja = defineType({
  name: "realizacja",
  title: "Realizacja",
  type: "document",
  fields: [
    defineField({ name: "car", title: "Auto", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Adres (slug)", type: "slug",
      options: { source: "car", maxLength: 70 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Kolejność", type: "number", validation: (r) => r.required() }),
    defineField({ name: "service", title: "Zakres (plakietka)", type: "string" }),
    defineField({ name: "short", title: "Krótki opis (karta)", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Opis realizacji", type: "text", rows: 6 }),
    defineField({ name: "steps", title: "Zakres prac", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "duration", title: "Czas realizacji", type: "string" }),
    defineField({ name: "image", title: "Zdjęcie — PO", type: "image", options: { hotspot: true } }),
    defineField({
      name: "beforeImage", title: "Zdjęcie — PRZED (opcjonalne)", type: "image",
      options: { hotspot: true },
      description: "Gdy dodasz, na karcie pojawi się suwak przed/po.",
    }),
  ],
  orderings: [{ title: "Kolejność", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "car", subtitle: "service", media: "image" } },
});
