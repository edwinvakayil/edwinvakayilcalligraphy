/**
 * A curated list of popular Google Fonts.
 * Pass any valid Google Font name to the `font` prop — if it's in this list,
 * it will be auto-injected via a <link> tag. For unlisted fonts, add them here
 * or import them manually in your project.
 */
export const GOOGLE_FONTS: string[] = [
  // Serif
  "Playfair Display",
  "Merriweather",
  "Lora",
  "EB Garamond",
  "Libre Baskerville",
  "Cormorant Garamond",
  "DM Serif Display",
  "Crimson Text",
  "Source Serif 4",
  "Fraunces",

  // Sans-serif
  "Inter",
  "Roboto",
  "Open Sans",
  "Nunito",
  "Poppins",
  "Raleway",
  "Outfit",
  "DM Sans",
  "Manrope",
  "Plus Jakarta Sans",
  "Figtree",
  "Syne",
  "Albert Sans",

  // Display / Expressive
  "Bebas Neue",
  "Oswald",
  "Anton",
  "Barlow Condensed",
  "Righteous",
  "Abril Fatface",
  "Dela Gothic One",
  "Space Grotesk",
  "Unbounded",
  "Big Shoulders Display",

  // Mono
  "JetBrains Mono",
  "Fira Code",
  "Source Code Pro",
  "Space Mono",
  "IBM Plex Mono",
];

const injectedFonts = new Set<string>();

/**
 * Builds a Google Fonts URL for a given font family.
 * Requests weights 300, 400, 500, 600, 700, 800 — italic variants included.
 */
export function buildFontUrl(fontFamily: string): string {
  const encoded = fontFamily.replace(/ /g, "+");
  return `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,700&display=swap`;
}

/**
 * Injects a Google Fonts <link> into <head> once per unique URL.
 * Safe to call multiple times — deduped via a Set.
 */
export function injectFont(url: string): void {
  if (typeof document === "undefined") return; // SSR guard
  if (injectedFonts.has(url)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
  injectedFonts.add(url);
}

/**
 * Pre-load a set of fonts eagerly (e.g. at app root).
 * Usage: preloadFonts(["Playfair Display", "Inter"])
 */
export function preloadFonts(families: string[]): void {
  families.forEach((f) => {
    if (GOOGLE_FONTS.includes(f)) {
      injectFont(buildFontUrl(f));
    } else {
      console.warn(
        `[react-type-scale] "${f}" is not in the bundled GOOGLE_FONTS list. ` +
          `Add it to the list or import it manually.`
      );
    }
  });
}