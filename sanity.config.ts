"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schema";

export default defineConfig({
  basePath: "/studio",
  title: "PRIMERO.STUDIO",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Treść")
          .items([
            S.listItem()
              .title("Ustawienia strony")
              .child(
                S.document().schemaType("ustawienia").documentId("ustawienia"),
              ),
            S.divider(),
            S.documentTypeListItem("pakiet").title("Pakiety"),
            S.documentTypeListItem("usluga").title("Usługi"),
            S.documentTypeListItem("realizacja").title("Realizacje"),
            S.documentTypeListItem("opinia").title("Opinie"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
