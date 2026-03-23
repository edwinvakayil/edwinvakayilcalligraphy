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
 * Hero entrance animations — all GPU-composited (transform + opacity + filter only).
 *
 * ── Batch 1 — originals ──────────────────────────────────────────────────
 * rise        smooth upward fade (universal)
 * stagger     per-word upward rise in sequence
 * clip        text unmasked left to right
 * pop         spring scale-in
 * letters     each letter slides in with rotation
 * blur        emerges from blur
 * flip        3-D rotateX on entry
 * swipe       slides in from the right
 * typewriter  character-by-character reveal
 * bounce      drops from above with bounce
 *
 * ── Batch 2 — modern ─────────────────────────────────────────────────────
 * velvet      words drift in with skew
 * curtain     each word clips upward
 * morph       squash-and-stretch spring
 * ground      words emerge from baseline
 * cascade     diagonal character waterfall
 * spotlight   expands from compressed letterspace
 * ink         words fade in with gentle scale
 * hinge       words rotate from left edge
 * stretch     horizontal rubber-band expand
 * peel        bottom-to-top clip per word
 * fold        words rotate in on Z from a folded angle
 * shear       words skewY then settle
 * ripple      words scale from compressed point, elastic outward wave
 * cinch       chars pinch on scaleX then snap open with skew
 * tiltrise    words rise while untilting from a sideways lean
 * cardFlip    chars flip up on X from flat
 * converge    outer words fly in, meet in center
 * splitRise   alternating words from top/bottom
 *
 * ── Batch 3 — new untouched techniques ───────────────────────────────────
 * tectonic    words slam from alternating X sides with skew — collision energy
 * stratify    per-word Z-depth flight through blur — true depth-of-field
 * unfurl      line expands from horizontal center — origami opening
 * gravityWell chars fall from sky with micro-rotation physics overshoot
 * orbit       words grow from dot while rotating on Z-axis
 * liquid      per-word cross-axis squash then spring — fluid inertia
 * noiseFade   3 random opacity waveforms per word — signal locking in
 * slab        words stamp from left with scaleX — print-press energy
 * thread      chars float on individual sine-wave Y offsets — musical
 * billboard   whole line rotates in on Y-axis — turning sign
 *
 * ── Batch 7 — genuinely new mechanics ────────────────────────────────────
 * glassReveal  backdrop-filter blur evaporates as text solidifies
 * wordPop      per-word springs from zero scale at its own centre
 * charDrop     chars fall under pure gravity — no overshoot or rotation
 * scanline     single-pixel horizontal slice expands to full height
 * chromaShift  RGB channel offsets collapse to zero (printing-register feel)
 * wordFade     per-word cross-dissolve with warmth scale, no Y movement
 * rotateIn     full Y-axis card-flip per word (face-up reveal)
 * pressIn      presses to 0.92 then springs past 1 (physical button feel)
 */
export type HeroAnimation =
  // Batch 1
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
  // Batch 2
  | "velvet"
  | "curtain"
  | "morph"
  | "ground"
  | "cascade"
  | "spotlight"
  | "ink"
  | "hinge"
  | "stretch"
  | "peel"
  | "fold"
  | "shear"
  | "ripple"
  | "cinch"
  | "tiltrise"
  | "cardFlip"
  | "converge"
  | "splitRise"
  // Batch 3
  | "tectonic"
  | "stratify"
  | "unfurl"
  | "gravityWell"
  | "orbit"
  | "liquid"
  | "noiseFade"
  | "slab"
  | "thread"
  | "billboard"
  // Batch 7
  | "glassReveal"
  | "wordPop"
  | "charDrop"
  | "scanline"
  | "chromaShift"
  | "wordFade"
  | "rotateIn"
  | "pressIn";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Typography scale variant */
  variant?: TypographyVariant;

  /** Google Font name — auto-injects the Google Fonts <link> */
  font?: string;

  /** Text color — any valid CSS color */
  color?: string;

  /** Text alignment */
  align?: TextAlign;

  /** Override the rendered HTML tag */
  as?: ElementType;

  /** Truncate to single line with ellipsis */
  truncate?: boolean;

  /** Clamp to N lines */
  maxLines?: number;

  /**
   * Hero entrance animation.
   * Only applied on variant="Display" or variant="H1".
   */
  animation?: HeroAnimation;

  /**
   * Italic accent for Display / H1 heroes.
   * When true, <em> children render in Instrument Serif italic + accentColor.
   * Default: false.
   */
  italic?: boolean;

  /**
   * Color for the <em> italic accent span.
   * Default: "#c8b89a" (warm sand).
   */
  accentColor?: string;

  style?: CSSProperties;
  className?: string;
}

export type VariantTagMap = Record<TypographyVariant, keyof JSX.IntrinsicElements>;
export type VariantStyleMap = Record<TypographyVariant, CSSProperties>;

// Re-exported for convenience — consumers can import TypographyTheme from the root
export type { TypographyTheme } from "./Context";