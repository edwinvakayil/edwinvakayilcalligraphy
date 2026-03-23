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
 * maskSweep    mask-image sweep reveals text left to right
 * gradSweep    gradient sweep across text then resolves to solid
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
  | "pressIn"
  | "maskSweep"
  | "gradSweep";

/**
 * Custom motion configuration for a Typography element.
 * Use this when the built-in `animation` presets don't fit your needs —
 * for example when you have brand-specific easing tokens, or when you want
 * to animate a non-hero variant like H2 or Body.
 *
 * @example
 * // Whole-element fade up
 * motionConfig={{
 *   keyframes: `from { opacity: 0; transform: translateY(24px); }
 *               to   { opacity: 1; transform: none; }`,
 *   duration: "0.8s",
 *   easing:   "cubic-bezier(0.16, 1, 0.3, 1)",
 *   delay:    "0.2s",
 *   split:    "none",
 * }}
 *
 * @example
 * // Per-word stagger with custom keyframe
 * motionConfig={{
 *   keyframes: `from { opacity: 0; transform: skewX(8deg) translateX(-12px); }
 *               to   { opacity: 1; transform: none; }`,
 *   duration:    "0.6s",
 *   easing:      "cubic-bezier(0.16, 1, 0.3, 1)",
 *   staggerDelay: 0.08,
 *   split:       "words",
 * }}
 */
export interface MotionConfig {
  /**
   * CSS keyframes body — the content between @keyframes name { … }.
   * Do not include the @keyframes rule or a name; the component generates both.
   *
   * @example "from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; }"
   */
  keyframes: string;

  /**
   * Animation duration. Accepts any CSS time value.
   * @default "0.8s"
   */
  duration?: string;

  /**
   * CSS easing function.
   * @default "cubic-bezier(0.16, 1, 0.3, 1)"
   */
  easing?: string;

  /**
   * Initial delay before the animation begins.
   * @default "0s"
   */
  delay?: string;

  /**
   * animation-fill-mode value.
   * @default "both"
   */
  fillMode?: "none" | "forwards" | "backwards" | "both";

  /**
   * How to split the text before animating.
   *
   * - "none"  — animate the whole element (default)
   * - "words" — wrap each word in a <span> and stagger them
   * - "chars" — wrap each character in a <span> and stagger them
   *
   * @default "none"
   */
  split?: "none" | "words" | "chars";

  /**
   * Delay increment between each word or character span (in seconds).
   * Only used when split is "words" or "chars".
   * @default 0.07  (words) | 0.04 (chars)
   */
  staggerDelay?: number;
}

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
   * Built-in hero entrance animation.
   * Only applied on variant="Display" or variant="H1".
   */
  animation?: HeroAnimation;

  /**
   * Custom motion config — use your own keyframes, easing, and split strategy.
   * Works on ALL variants (not just heroes).
   * Takes precedence over `animation` when both are provided.
   *
   * @see MotionConfig
   */
  motionConfig?: MotionConfig;

  /**
   * Ref callback giving direct access to the rendered DOM element.
   * Use this to drive animations with GSAP, Framer Motion, or the Web
   * Animations API. Called after mount and on every re-render.
   * Takes precedence over both `animation` and `motionConfig`.
   *
   * @example
   * motionRef={(el) => {
   *   if (!el) return;
   *   gsap.from(el, { opacity: 0, y: 40, duration: 0.9 });
   * }}
   */
  motionRef?: (el: HTMLElement | null) => void;

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

// Re-exported here so consumers can import from a single types path:
// import type { TypographyTheme } from "@edwinvakayil/calligraphy/types"
export type { TypographyTheme } from "./Context";