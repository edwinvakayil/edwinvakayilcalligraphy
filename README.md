# @edwinvakayil/calligraphy

A lightweight **React + TypeScript** typography component with automatic **Google Fonts** support, **30+ hero entrance animations**, **custom motion config**, and an **italic accent toggle**.

---

## Install

```bash
npm install @edwinvakayil/calligraphy
# or
yarn add @edwinvakayil/calligraphy
```

---

## Quick Start

```tsx
import { Typography } from "@edwinvakayil/calligraphy";

export default function App() {
  return (
    <div>
      <Typography variant="Display" font="Bricolage Grotesque" animation="rise">
        Design with <em>intention</em>
      </Typography>

      <Typography variant="H1" font="Syne">
        Page Title
      </Typography>

      <Typography variant="Body" font="DM Sans">
        Regular body copy goes here.
      </Typography>
    </div>
  );
}
```

The `font` prop auto-injects the matching Google Font `<link>` tag — no manual imports needed.

---

## Variants

| Variant      | Tag      | Role                           |
|--------------|----------|--------------------------------|
| `Display`    | `h1`     | Hero / landing page headline   |
| `H1`         | `h1`     | Primary page heading           |
| `H2`         | `h2`     | Section heading                |
| `H3`         | `h3`     | Sub-section heading            |
| `H4`         | `h4`     | Card / panel heading           |
| `H5`         | `h5`     | Small heading                  |
| `H6`         | `h6`     | Micro heading                  |
| `Subheading` | `h6`     | Supporting subtitle            |
| `Overline`   | `span`   | ALL CAPS label above a heading |
| `Body`       | `p`      | Main body copy                 |
| `Label`      | `label`  | Form labels, tags              |
| `Caption`    | `span`   | Image captions, fine print     |

---

## Props

```ts
interface TypographyProps {
  variant?:      TypographyVariant    // default: "Body"
  font?:         string               // Google Font name e.g. "Bricolage Grotesque"
  color?:        string               // Any CSS color value
  align?:        "left" | "center" | "right" | "justify"
  as?:           ElementType          // Override rendered HTML tag
  truncate?:     boolean              // Single-line ellipsis
  maxLines?:     number               // Multi-line line-clamp
  animation?:    HeroAnimation        // Built-in entrance animation (Display / H1 only)
  motionConfig?: MotionConfig         // Custom keyframe animation — any variant
  motionRef?:    (el: HTMLElement | null) => void  // Direct DOM access for GSAP / Framer
  italic?:       boolean              // default: false — serif italic accent on <em>
  accentColor?:  string               // default: "#c8b89a" — color for <em> italic text
  className?:    string
  style?:        CSSProperties
}
```

---

## Hero Animations

The `animation` prop works on `Display` and `H1` variants. It injects a tiny stylesheet once (no external dependency) and applies a CSS keyframe entrance.

```tsx
<Typography variant="Display" font="Bricolage Grotesque" animation="rise">
  The future of design
</Typography>
```

### Available animations

#### Original

| Value        | Description                                          |
|--------------|------------------------------------------------------|
| `rise`       | Smooth upward fade-in — clean, universal             |
| `stagger`    | Each word rises in sequence                          |
| `clip`       | Text unmasked left to right — editorial feel         |
| `pop`        | Spring scale-in — energetic and confident            |
| `letters`    | Each letter slides in with a slight rotation         |
| `blur`       | Emerges from a blur — cinematic and dreamy           |
| `flip`       | 3-D perspective rotate on entry — depth and gravitas |
| `swipe`      | Slides in from the right — directional flow          |
| `typewriter` | Character-by-character reveal — focused              |
| `bounce`     | Drops from above with a soft bounce                  |

#### Modern

| Value       | Description                                              |
|-------------|----------------------------------------------------------|
| `velvet`    | Words drift in with a soft skew — buttery & modern       |
| `curtain`   | Each word clips upward like a rising curtain             |
| `morph`     | Squash-and-stretch spring — expressive & bold            |
| `ground`    | Words emerge from behind the baseline — editorial        |
| `cascade`   | Diagonal character waterfall — dynamic & layered         |
| `spotlight` | Expands from compressed letterspace — cinematic          |
| `ink`       | Words fade in with a gentle scale — calm & precise       |
| `hinge`     | Words rotate in from their left edge — mechanical        |
| `stretch`   | Horizontal rubber-band expand — playful & punchy         |
| `peel`      | Bottom-to-top clip reveal per word — sharp               |
| `ripple`    | Words scale out from a compressed point — elastic        |
| `cinch`     | Characters pinch then snap open — crisp & mechanical     |
| `tiltrise`  | Words rise while untilting from a lean — editorial       |

#### New mechanics

| Value        | Description                                              |
|--------------|----------------------------------------------------------|
| `unfurl`     | Line expands from horizontal center — origami opening    |
| `billboard`  | Whole line rotates in on Y-axis — turning sign           |
| `tectonic`   | Words slam from alternating sides with skew              |
| `stratify`   | Per-word Z-depth flight through blur — depth-of-field    |
| `orbit`      | Words grow from dot while rotating on Z-axis             |
| `liquid`     | Per-word cross-axis squash then spring — fluid inertia   |
| `noiseFade`  | 3 random opacity waveforms per word — signal locking     |
| `slab`       | Words stamp from left with scaleX — print-press energy   |
| `thread`     | Characters float on individual sine-wave Y offsets       |
| `glassReveal`| Backdrop blur evaporates as text solidifies              |
| `wordPop`    | Per-word spring from zero scale at its own centre        |
| `scanline`   | Single-pixel horizontal slice expands to full height     |
| `chromaShift`| RGB channel offsets collapse to zero — printing register |
| `wordFade`   | Per-word cross-dissolve with warmth scale                |
| `rotateIn`   | Full Y-axis card-flip per word — face-up reveal          |
| `pressIn`    | Presses to 0.92 then springs past 1 — physical button    |
| `unfurl`     | Text splits open from center — origami feel              |
| `dissolve`   | Characters dissolve in with random micro-rotation        |
| `depth`      | Z-axis push from far to near — immersive 3D              |
| `maskSweep`  | Mask-image sweep reveals text left to right              |
| `gradSweep`  | Gradient sweep across text then resolves to solid        |

All animations use only `transform`, `opacity`, and `filter` — GPU-composited, no layout thrashing, 60fps safe.

---

## Custom Motion — `motionConfig`

When the built-in presets don't fit, write your own keyframe. Works on **any variant**, not just heroes.

```tsx
import { Typography, type MotionConfig } from "@edwinvakayil/calligraphy";
```

### Whole-element animation

```tsx
<Typography
  variant="H2"
  font="Syne"
  motionConfig={{
    keyframes: `from { opacity: 0; transform: translateY(24px) skewX(6deg); }
                to   { opacity: 1; transform: none; }`,
    duration: "0.8s",
    easing:   "cubic-bezier(0.16, 1, 0.3, 1)",
    delay:    "0.1s",
  }}
>
  Section heading
</Typography>
```

### Per-word stagger

```tsx
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  motionConfig={{
    keyframes:    `from { opacity: 0; transform: translateX(-20px) rotate(-4deg); }
                  to   { opacity: 1; transform: none; }`,
    duration:     "0.65s",
    split:        "words",
    staggerDelay: 0.09,
  }}
>
  Design with <em>intention</em>
</Typography>
```

### Per-character stagger

```tsx
<Typography
  variant="Display"
  motionConfig={{
    keyframes:    `from { opacity: 0; transform: scaleY(0) translateY(10px); }
                  to   { opacity: 1; transform: none; }`,
    duration:     "0.5s",
    split:        "chars",
    staggerDelay: 0.035,
  }}
>
  Motion
</Typography>
```

### `MotionConfig` shape

```ts
interface MotionConfig {
  keyframes:     string                          // CSS keyframe body (without @keyframes name {})
  duration?:     string                          // default: "0.8s"
  easing?:       string                          // default: "cubic-bezier(0.16, 1, 0.3, 1)"
  delay?:        string                          // default: "0s"
  fillMode?:     "none"|"forwards"|"backwards"|"both"  // default: "both"
  split?:        "none" | "words" | "chars"      // default: "none"
  staggerDelay?: number                          // seconds between spans; default 0.07 (words) / 0.04 (chars)
}
```

---

## Direct DOM Access — `motionRef`

For full control with GSAP, Framer Motion, or the Web Animations API. The ref callback fires after mount and on every re-render.

`motionRef` takes priority over both `animation` and `motionConfig`.

```tsx
// Web Animations API
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  motionRef={(el) => {
    if (!el) return;
    el.animate(
      [{ opacity: 0, transform: "translateY(32px)" }, { opacity: 1, transform: "none" }],
      { duration: 900, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "both" }
    );
  }}
>
  Full control
</Typography>

// GSAP
<Typography
  variant="H1"
  motionRef={(el) => {
    if (!el) return;
    gsap.from(el, { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" });
  }}
>
  GSAP powered
</Typography>
```

### Priority order

```
motionRef  >  motionConfig  >  animation  >  no animation
```

---

## Italic Accent

When `italic={true}`, any `<em>` tag inside a `Display` or `H1` hero renders in **Instrument Serif italic** with an accent color. Off by default.

```tsx
// Off by default
<Typography variant="Display" font="Bricolage Grotesque">
  Build with <em>intention</em>
</Typography>

// Turn on
<Typography variant="Display" font="Bricolage Grotesque" italic>
  Build with <em>intention</em>
</Typography>

// Custom accent color
<Typography variant="Display" font="Bricolage Grotesque" italic accentColor="#7F77DD">
  Crafted with <em>precision</em>
</Typography>
```

`accentColor` has no effect when `italic={false}`.

---

## TypographyProvider

Wrap your app (or a section of it) with `TypographyProvider` to set defaults once. Any prop passed directly to `<Typography>` still wins — the provider is just the fallback.

```tsx
import { TypographyProvider, Typography } from "@edwinvakayil/calligraphy";

export default function App() {
  return (
    <TypographyProvider
      theme={{
        font:        "Bricolage Grotesque",
        accentColor: "#6366f1",
        italic:      true,
        animation:   "rise",
        color:       "#1a1a1a",
      }}
    >
      {/* Inherits all theme values */}
      <Typography variant="Display">
        Build with <em>intention</em>
      </Typography>

      {/* Overrides just the animation */}
      <Typography variant="H1" animation="clip">
        Another hero heading
      </Typography>

      {/* italic=false wins over theme's italic=true */}
      <Typography variant="Display" italic={false}>
        No serif accent here
      </Typography>
    </TypographyProvider>
  );
}
```

### Theme shape

```ts
interface TypographyTheme {
  font?:        string          // Google Font applied to all variants
  accentColor?: string          // <em> accent color for Display / H1
  italic?:      boolean         // italic accent on/off for Display / H1
  animation?:   HeroAnimation   // entrance animation for Display / H1
  color?:       string          // default text color for all variants
}
```

### Priority order

```
Explicit prop  >  TypographyProvider theme  >  built-in default
```

### Nesting providers

The nearest provider wins:

```tsx
<TypographyProvider theme={{ font: "Bricolage Grotesque", color: "#111" }}>
  <Typography variant="H1">Uses Bricolage Grotesque</Typography>

  <TypographyProvider theme={{ font: "Playfair Display", accentColor: "#e11d48" }}>
    <Typography variant="Display">
      Uses Playfair Display with red accent
    </Typography>
  </TypographyProvider>
</TypographyProvider>
```

---

## Examples

### Overline + Display combo

```tsx
<Typography variant="Overline" color="#6366f1">New Feature</Typography>
<Typography variant="Display" font="Bricolage Grotesque" animation="clip" accentColor="#6366f1">
  Build faster with <em>types</em>
</Typography>
```

### Body + Caption

```tsx
<Typography variant="Body" font="Lora">
  A well-set paragraph in a refined serif font brings reading pleasure.
</Typography>
<Typography variant="Caption" color="#888">
  Fig. 1 — System architecture overview
</Typography>
```

### Truncation

```tsx
<Typography variant="H2" truncate>
  This very long title will be cut off with an ellipsis
</Typography>

<Typography variant="Body" maxLines={3}>
  This paragraph will show at most three lines...
</Typography>
```

### Override HTML tag

```tsx
<Typography variant="H2" as="div">
  Renders as a div, styled as H2
</Typography>
```

---

## Pre-loading fonts

To avoid FOUT (flash of unstyled text), pre-load fonts at the top of your app:

```tsx
import { preloadFonts } from "@edwinvakayil/calligraphy";

// In your _app.tsx / main.tsx / layout.tsx
preloadFonts(["Bricolage Grotesque", "Instrument Serif", "DM Sans"]);
```

---

## Recommended hero font pairings

| Heading font          | Style      | Works well for               |
|-----------------------|------------|------------------------------|
| `Bricolage Grotesque` | Bold sans  | Startups, SaaS, modern brand |
| `Syne`                | Geometric  | Creative, portfolio, agency  |
| `Fraunces`            | Serif      | Editorial, luxury, fashion   |
| `Bebas Neue`          | Condensed  | Sports, bold campaigns       |
| `Playfair Display`    | Serif      | Journalism, books, culture   |
| `Outfit`              | Clean sans | Apps, dashboards, fintech    |

---

## SSR & Next.js

`@edwinvakayil/calligraphy` is fully SSR-safe. All DOM work (`<link>` and `<style>` injection) happens inside `useInsertionEffect`, which React never calls on the server. The text renders in the server HTML; animations play after hydration.

### Next.js App Router

```tsx
// app/layout.tsx
import { TypographyProvider } from "@edwinvakayil/calligraphy";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TypographyProvider theme={{ font: "Bricolage Grotesque", accentColor: "#6366f1" }}>
          {children}
        </TypographyProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx — Server Component
import { Typography } from "@edwinvakayil/calligraphy";

export default function Page() {
  return (
    <Typography variant="Display" animation="rise">
      Renders on the server, <em>animates</em> on the client
    </Typography>
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { TypographyProvider } from "@edwinvakayil/calligraphy";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TypographyProvider theme={{ font: "Syne" }}>
      <Component {...pageProps} />
    </TypographyProvider>
  );
}
```

### What renders where

| Prop | Server | Client |
|------|--------|--------|
| `variant`, `font`, `color`, `align`, `truncate`, `maxLines` | Inline styles in HTML | Hydrated |
| `animation` | Class name in HTML | Keyframe `<style>` injected, animation plays |
| `motionConfig` | Raw HTML (split spans present) | Animation applied after hydration |
| `motionRef` | Plain HTML | Callback fires after hydration |
| `italic` / `accentColor` | Inline styles on `<em>` | No flash on hydration |

---

## Build & Publish

```bash
npm install
npm run build          # outputs CJS + ESM + .d.ts to /dist
npm pack               # inspect the tarball before publishing
npm publish --access public
```

---

## License

Copyright (c) 2025 Edwin Vakayil. All rights reserved.

This package is proprietary software. You may install and use it for personal or internal business purposes, but you may not copy, modify, distribute, or create derivative works from it without explicit written permission from the author.

See the [LICENSE](./LICENSE) file for full terms.