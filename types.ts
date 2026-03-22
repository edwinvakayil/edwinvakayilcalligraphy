import { CSSProperties, ElementType, HTMLAttributes } from "react";

export type TypographyVariant =
  | "Display"
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "H6"
  | "Subheading"
  | "Overline"
  | "Body"
  | "Label"
  | "Caption";

export type TextAlign = "left" | "center" | "right" | "justify";

/**
 * Built-in hero text entrance animations.
 * Applied via CSS keyframes — GPU-composited, 60fps safe.
 *
 * — Original —
 * rise       — smooth upward fade-in (universal default)
 * stagger    — each word rises in sequence
 * clip       — text unmasked left-to-right (editorial)
 * pop        — spring scale-in (energetic)
 * letters    — each letter slides in with a slight rotation
 * blur       — emerges from a blur (cinematic)
 * flip       — 3-D perspective rotate on entry (depth)
 * swipe      — slides in from the right
 * typewriter — character-by-character reveal
 * bounce     — drops from above with a soft bounce
 *
 * — Modern —
 * velvet     — words drift in with a soft skew (buttery & modern)
 * curtain    — each word clips upward like a rising curtain
 * morph      — squash-and-stretch spring (expressive & bold)
 * ground     — words emerge from behind the baseline (editorial)
 * cascade    — diagonal character waterfall (dynamic & layered)
 * spotlight  — expands from compressed letterspace (cinematic)
 * ink        — words fade in with a gentle scale (calm & precise)
 * hinge      — words rotate in from their left edge (mechanical)
 * stretch    — horizontal rubber-band expand (playful & punchy)
 * peel       — bottom-to-top clip reveal per word (sharp)
 */
export type HeroAnimation =
  | "rise"
  | "stagger"
  | "clip"
  | "pop"
  | "letters"
  | "blur"
  | "flip"
  | "swipe"
  | "typewriter"
  | "bounce"
  | "velvet"
  | "curtain"
  | "morph"
  | "ground"
  | "cascade"
  | "spotlight"
  | "ink"
  | "hinge"
  | "stretch"
  | "peel";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography scale variant */
  variant?: TypographyVariant;

  /** Google Font name e.g. "Bricolage Grotesque", "Playfair Display" */
  font?: string;

  /** Text color — any valid CSS color */
  color?: string;

  /** Text alignment */
  align?: TextAlign;

  /** Override the rendered HTML tag */
  as?: ElementType;

  /** Truncate to single line with ellipsis */
  truncate?: boolean;

  /** Clamp to N lines with ellipsis */
  maxLines?: number;

  /**
   * Hero entrance animation. Only applies when variant is
   * "Display" or "H1". Injects a CSS class and keyframe stylesheet once.
   */
  animation?: HeroAnimation;

  /**
   * Italic accent for Display / H1 heroes.
   * When true, any <em> child renders in Instrument Serif italic
   * with an accent color. Defaults to false — everything renders
   * in the heading font/weight with no serif or italics.
   */
  italic?: boolean;

  /**
   * Accent color for the <em> italic span inside Display / H1.
   * Defaults to a warm sand tone (#c8b89a).
   */
  accentColor?: string;

  /** Inline style overrides */
  style?: CSSProperties;

  /** Additional class names */
  className?: string;
}

export type VariantTagMap = Record<TypographyVariant, keyof JSX.IntrinsicElements>;
export type VariantStyleMap = Record<TypographyVariant, CSSProperties>;

// Re-exported for convenience — consumers can import TypographyTheme from the root
export type { TypographyTheme } from "./Context";