import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Without a project id the Studio throws on mount — show what to set instead.
  if (!sanityConfigured) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#150406",
          color: "#f7ebe4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "34rem", lineHeight: 1.6 }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            Studio nie jest jeszcze skonfigurowane
          </h1>
          <p style={{ opacity: 0.75, marginBottom: "1rem" }}>
            Ustaw zmienne środowiskowe i zdeployuj ponownie:
          </p>
          <pre
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "1rem",
              borderRadius: "0.5rem",
              fontSize: "0.85rem",
              overflowX: "auto",
            }}
          >
{`NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production`}
          </pre>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
