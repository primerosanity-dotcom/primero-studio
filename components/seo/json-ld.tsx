/**
 * Renders a schema.org node. Kept as a server component so the payload ships
 * in the HTML Google first parses, not after hydration.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
