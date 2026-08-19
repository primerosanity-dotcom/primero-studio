import { defineField, defineType } from "sanity";

export const usluga = defineType({
  name: "usluga",
  title: "Usługa",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nazwa", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug", title: "Identyfikator", type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Kolejność", type: "number", validation: (r) => r.required() }),
    defineField({ name: "desc", title: "Opis", type: "text", rows: 3 }),
    defineField({ name: "price", title: "Cena (tekst)", type: "string" }),
    defineField({ name: "duration", title: "Czas trwania", type: "string" }),
    defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Kolejność", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "price", media: "image" } },
});
