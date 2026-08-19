import { defineField, defineType } from "sanity";

export const opinia = defineType({
  name: "opinia",
  title: "Opinia",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Imię i nazwisko", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Kolejność", type: "number", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Kiedy (np. 2 tygodnie temu)", type: "string" }),
    defineField({ name: "text", title: "Treść", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Kolejność", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "text" } },
});
