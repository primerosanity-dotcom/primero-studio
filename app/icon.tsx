import { ImageResponse } from "next/og";

// 192 is a multiple of 48 — Google's requirement for the favicon it shows
// in search results.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/**
 * The brand mark on wine, not the old gold-on-gold render: at the 16px
 * Google and the browser tab actually draw it, that one collapsed into a
 * featureless blob.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2d070a",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 120 120" fill="#d9b872">
          <path d="M35.3 0L11.4 23.9L48.1 23.9L27.8 53.7L27.5 120L53.9 93.3L53.4 23.7L85.9 23.2L69.4 40.4L69 78.6L108.6 39.1L108.6 14.8L93.5 0Z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
