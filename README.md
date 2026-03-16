# @edwinvakayil/calligraphy

A lightweight **React + TypeScript** typography component with automatic **Google Fonts** support, **hero entrance animations**, and an **italic accent toggle**.

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

| Variant      | Tag      | Role                              |
|--------------|----------|-----------------------------------|
| `Display`    | `h1`     | Hero / landing page headline      |
| `H1`         | `h1`     | Primary page heading              |
| `H2`         | `h2`     | Section heading                   |
| `H3`         | `h3`     | Sub-section heading               |
| `H4`         | `h4`     | Card / panel heading              |
| `H5`         | `h5`     | Small heading                     |
| `H6`         | `h6`     | Micro heading                     |
| `Subheading` | `h6`     | Supporting subtitle               |
| `Overline`   | `span`   | ALL CAPS label above a heading    |
| `Body`       | `p`      | Main body copy                    |
| `Label`      | `label`  | Form labels, tags                 |
| `Caption`    | `span`   | Image captions, fine print        |

---

## Props

```ts
interface TypographyProps {
  variant?:     TypographyVariant    // default: "Body"
  font?:        string               // Google Font name e.g. "Bricolage Grotesque"
  color?:       string               // Any CSS color value
  align?:       "left" | "center" | "right" | "justify"
  as?:          ElementType          // Override rendered HTML tag
  truncate?:    boolean              // Single-line ellipsis
  maxLines?:    number               // Multi-line line-clamp
  animation?:   HeroAnimation        // Entrance animation (Display / H1 only)
  italic?:      boolean              // default: true — show serif italic accent on <em>
  accentColor?: string               // default: "#c8b89a" — color for <em> italic text
  className?:   string
  style?:       CSSProperties
}
```

---

## Hero Animations

The `animation` prop works on `Display` and `H1` variants only. It injects a tiny stylesheet once (no external dependency) and applies a CSS keyframe entrance.

```tsx
<Typography variant="Display" font="Bricolage Grotesque" animation="rise">
  The future of design
</Typography>
```

### Available animations

| Value         | Description                                           |
|---------------|-------------------------------------------------------|
| `rise`        | Smooth upward fade-in — clean, universal              |
| `stagger`     | Each word rises in sequence                           |
| `clip`        | Text unmasked left to right — editorial feel          |
| `pop`         | Spring scale-in — energetic and confident             |
| `letters`     | Each letter slides in with a slight rotation          |
| `blur`        | Emerges from a blur — cinematic and dreamy            |
| `flip`        | 3-D perspective rotate on entry — depth and gravitas  |
| `swipe`       | Slides in from the right — directional flow           |
| `typewriter`  | Character-by-character reveal — focused               |
| `bounce`      | Drops from above with a soft bounce                   |

All animations use only `transform`, `opacity`, and `filter` — GPU-composited, no layout thrashing, 60fps safe.

---

## Italic Accent

When `italic={true}` (the default), any `<em>` tag inside a `Display` or `H1` hero renders in **Instrument Serif italic** with an accent color. This creates a classic editorial contrast between a bold sans-serif header and a refined serif word.

```tsx
// With italic accent (default)
<Typography variant="Display" font="Bricolage Grotesque">
  Build with <em>intention</em>
</Typography>

// Turn off — everything renders in the heading font
<Typography variant="Display" font="Bricolage Grotesque" italic={false}>
  Build with <em>intention</em>
</Typography>
```

### Custom accent color

```tsx
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  accentColor="#7F77DD"
>
  Crafted with <em>precision</em>
</Typography>
```

The `accentColor` prop only affects the `<em>` italic span. It has no effect when `italic={false}`.

---

## Examples

### Overline + Display combo

```tsx
<Typography variant="Overline" color="#6366f1">
  New Feature
</Typography>
<Typography
  variant="Display"
  font="Bricolage Grotesque"
  animation="clip"
  accentColor="#6366f1"
>
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
{/* Single line */}
<Typography variant="H2" truncate>
  This very long title will be cut off with an ellipsis
</Typography>

{/* Multi-line clamp */}
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

| Heading font           | Style      | Works well for               |
|------------------------|------------|------------------------------|
| `Bricolage Grotesque`  | Bold sans  | Startups, SaaS, modern brand |
| `Syne`                 | Geometric  | Creative, portfolio, agency  |
| `Fraunces`             | Serif      | Editorial, luxury, fashion   |
| `Bebas Neue`           | Condensed  | Sports, bold campaigns       |
| `Playfair Display`     | Serif      | Journalism, books, culture   |
| `Outfit`               | Clean sans | Apps, dashboards, fintech    |

All are on Google Fonts and auto-injected when passed to the `font` prop.

## License

Copyright (c) 2025 Edwin Vakayil. All rights reserved.

This package is proprietary software. You may install and use it for personal
or internal business purposes, but you may not copy, modify, distribute, or
create derivative works from it without explicit written permission from the author.

See the [LICENSE](./LICENSE) file for full terms.