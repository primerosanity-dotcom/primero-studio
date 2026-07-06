import localFont from "next/font/local";

// Heavy display grotesque — the strong capslock headlines on light sections.
export const clash = localFont({
  src: "../public/fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
  weight: "300 700",
});

// Neutral grotesque — elegant light headlines (gold on dark), UI, body copy.
export const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});
