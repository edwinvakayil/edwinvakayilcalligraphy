import React, {
  CSSProperties,
  Children,
  isValidElement,
  useRef,
  useEffect,
  useInsertionEffect,
} from "react";
import { TypographyProps, VariantTagMap, VariantStyleMap } from "./types";
import { GOOGLE_FONTS, buildFontUrl, injectFont } from "./fonts";
import {
  injectAnimationStyles,
  getAnimationClass,
  isSplitAnimation,
  buildSplitHTML,
  applyThreadOffsets,
  injectCustomKeyframes,
  buildCustomHTML,
} from "./animation";
import { useTypographyTheme } from "./Context";

// ─── Variant → HTML tag map ───────────────────────────────────────────────────

const variantTagMap: VariantTagMap = {
  Display:    "h1",
  H1:         "h1",
  H2:         "h2",
  H3:         "h3",
  H4:         "h4",
  H5:         "h5",
  H6:         "h6",
  Subheading: "h6",
  Overline:   "span",
  Body:       "p",
  Label:      "label",
  Caption:    "span",
};

// ─── Variant → base CSS styles ────────────────────────────────────────────────

const variantStyleMap: VariantStyleMap = {
  Display: {
    fontSize:      "clamp(2.5rem, 6vw, 5rem)",
    fontWeight:    800,
    lineHeight:    1.05,
    letterSpacing: "-0.03em",
  },
  H1: {
    fontSize:      "clamp(2rem, 4vw, 3rem)",
    fontWeight:    700,
    lineHeight:    1.1,
    letterSpacing: "-0.02em",
  },
  H2: {
    fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
    fontWeight:    700,
    lineHeight:    1.2,
    letterSpacing: "-0.015em",
  },
  H3: {
    fontSize:      "clamp(1.25rem, 2.5vw, 1.75rem)",
    fontWeight:    600,
    lineHeight:    1.25,
    letterSpacing: "-0.01em",
  },
  H4: {
    fontSize:      "clamp(1.1rem, 2vw, 1.375rem)",
    fontWeight:    600,
    lineHeight:    1.3,
    letterSpacing: "-0.005em",
  },
  H5: {
    fontSize:      "clamp(1rem, 1.5vw, 1.125rem)",
    fontWeight:    600,
    lineHeight:    1.35,
    letterSpacing: "0em",
  },
  H6: {
    fontSize:      "1rem",
    fontWeight:    600,
    lineHeight:    1.4,
    letterSpacing: "0em",
  },
  Subheading: {
    fontSize:      "1.125rem",
    fontWeight:    500,
    lineHeight:    1.5,
    letterSpacing: "0.005em",
  },
  Overline: {
    fontSize:      "0.6875rem",
    fontWeight:    700,
    lineHeight:    1.6,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as CSSProperties["textTransform"],
  },
  Body: {
    fontSize:      "1rem",
    fontWeight:    400,
    lineHeight:    1.7,
    letterSpacing: "0.01em",
  },
  Label: {
    fontSize:      "0.875rem",
    fontWeight:    500,
    lineHeight:    1.5,
    letterSpacing: "0.02em",
  },
  Caption: {
    fontSize:      "0.75rem",
    fontWeight:    400,
    lineHeight:    1.6,
    letterSpacing: "0.03em",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

// Always pre-loaded for hero variants so toggling italic is instant with no FOUC
const INSTRUMENT_SERIF_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Serialise React children to a raw HTML string.
 * Handles plain strings and <em>text</em> elements.
 * Used to feed text into the animation split-builders.
 */
function childrenToHTML(children: React.ReactNode): string {
  return (
    Children.map(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement(child) && child.type === "em") {
        const inner =
          typeof child.props.children === "string"
            ? child.props.children
            : "";
        return `<em>${inner}</em>`;
      }
      return "";
    })?.join("") ?? ""
  );
}

/**
 * Standard (no-animation) render path.
 * Clones <em> children with explicit inline styles so the font switch is
 * guaranteed — parent fontFamily cannot override a child's own inline style.
 */
function renderChildrenWithEmStyles(
  children:    React.ReactNode,
  italic:      boolean,
  accentColor: string,
  headingFont?: string
): React.ReactNode {
  const italicStyle: CSSProperties = {
    fontFamily: "'Instrument Serif', serif",
    fontStyle:  "italic",
    fontWeight: 400,
    color:      accentColor,
  };
  const noItalicStyle: CSSProperties = {
    fontFamily: headingFont ? `'${headingFont}', sans-serif` : "inherit",
    fontStyle:  "normal",
    fontWeight: "inherit" as any,
    color:      "inherit",
  };

  return Children.map(children, (child, i) => {
    if (isValidElement(child) && child.type === "em") {
      return (
        <em key={i} style={italic ? italicStyle : noItalicStyle}>
          {child.props.children}
        </em>
      );
    }
    return child;
  });
}

/**
 * Animation (dangerouslySetInnerHTML) render path.
 * After the DOM is written we walk it and stamp inline styles onto every
 * <em> and <em > span — guaranteed to beat any inherited fontFamily.
 */
function applyEmStylesDOM(
  container:   HTMLElement,
  italic:      boolean,
  accentColor: string,
  headingFont?: string
): void {
  const apply = (el: HTMLElement) => {
    if (italic) {
      el.style.fontFamily = "'Instrument Serif', serif";
      el.style.fontStyle  = "italic";
      el.style.fontWeight = "400";
      el.style.color      = accentColor;
    } else {
      el.style.fontFamily = headingFont
        ? `'${headingFont}', sans-serif`
        : "inherit";
      el.style.fontStyle  = "normal";
      el.style.fontWeight = "inherit";
      el.style.color      = "inherit";
    }
  };
  container.querySelectorAll<HTMLElement>("em").forEach(apply);
  container.querySelectorAll<HTMLElement>("em > span").forEach(apply);
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Typography: React.FC<TypographyProps> = ({
  variant      = "Body",
  font:         fontProp,
  color:        colorProp,
  animation:    animationProp,
  motionConfig,
  motionRef,
  italic:       italicProp,
  accentColor:  accentColorProp,
  align,
  className,
  style,
  children,
  as,
  truncate,
  maxLines,
  ...rest
}) => {
  const theme  = useTypographyTheme();
  const isHero = variant === "Display" || variant === "H1";
  const ref    = useRef<HTMLElement>(null);

  // Prop wins → theme → built-in default
  const font        = fontProp        ?? (theme.font        || undefined);
  const color       = colorProp       ?? (theme.color       || undefined);
  const animation   = isHero
    ? (animationProp ?? theme.animation ?? undefined)
    : undefined;
  const italic      = italicProp      ?? theme.italic      ?? false;
  const accentColor = accentColorProp ?? theme.accentColor ?? "#c8b89a";

  // ── Font & style injection ─────────────────────────────────────────────────

  useInsertionEffect(() => {
    if (isHero) {
      injectFont(INSTRUMENT_SERIF_URL);
    }
    if (font && GOOGLE_FONTS.includes(font)) {
      injectFont(buildFontUrl(font));
    }
    if (animation && isHero) {
      injectAnimationStyles();
    }
    // Inject custom keyframes as soon as the prop arrives
    if (motionConfig?.keyframes) {
      injectCustomKeyframes(motionConfig.keyframes);
    }
  }, [isHero, font, animation, motionConfig?.keyframes]);

  // ── Re-stamp <em> inline styles after every relevant change ───────────────

  useEffect(() => {
    if (!isHero || !animation || !ref.current) return;
    applyEmStylesDOM(ref.current, italic, accentColor, font);
    if (animation === "thread") applyThreadOffsets(ref.current);
  }, [italic, accentColor, font, animation, isHero]);

  // ── motionRef callback — fires after mount and on every re-render ──────────
  // motionRef wins over animation and motionConfig — the user drives the DOM.

  useEffect(() => {
    if (!motionRef) return;
    motionRef(ref.current);
  });

  // ── Strip lingering CSS properties after animation ends ───────────────────

  useEffect(() => {
    const el = ref.current;
    if (!el || !animation) return;

    const cleanup = () => {
      if (animation === "maskSweep") {
        el.style.setProperty("mask-image", "none");
        el.style.setProperty("-webkit-mask-image", "none");
      }
      if (animation === "gradSweep") {
        el.style.animation = "none";
      }
    };

    el.addEventListener("animationend", cleanup, { once: true });
    return () => el.removeEventListener("animationend", cleanup);
  }, [animation]);

  const Tag = (as ?? variantTagMap[variant]) as React.ElementType;

  // ── Build inner HTML — priority: motionRef > motionConfig > animation ──────

  let animClass = "";
  let heroHTML:       string | null = null;
  let customAnimStyle: string | undefined;

  // motionRef — no HTML manipulation needed, user handles everything via ref
  if (motionRef) {
    // fall through to standard render; ref is forwarded via useEffect above
  }
  // motionConfig — works on any variant, not just heroes
  else if (motionConfig?.keyframes) {
    const keyframeName  = injectCustomKeyframes(motionConfig.keyframes);
    const duration      = motionConfig.duration     ?? "0.8s";
    const easing        = motionConfig.easing       ?? "cubic-bezier(0.16,1,0.3,1)";
    const delay         = motionConfig.delay        ?? "0s";
    const fillMode      = motionConfig.fillMode     ?? "both";
    const split         = motionConfig.split        ?? "none";
    const staggerDelay  = motionConfig.staggerDelay
      ?? (split === "chars" ? 0.04 : 0.07);

    const rawHTML = childrenToHTML(children);
    const { html, baseAnimation } = buildCustomHTML(
      rawHTML, keyframeName, duration, easing, delay, fillMode, split, staggerDelay
    );

    if (split === "none") {
      // Apply animation directly on the element via inline style
      customAnimStyle = baseAnimation;
      heroHTML = rawHTML;
    } else {
      heroHTML = html;
    }
  }
  // Built-in animation preset
  else if (animation && isHero) {
    const rawHTML = childrenToHTML(children);
    if (isSplitAnimation(animation)) {
      heroHTML = buildSplitHTML(animation, rawHTML);
    } else {
      heroHTML  = rawHTML;
      animClass = getAnimationClass(animation);
    }
  }

  // ── Computed container styles ─────────────────────────────────────────────

  const computedStyle: CSSProperties = {
    ...variantStyleMap[variant],
    ...(font  ? { fontFamily: `'${font}', sans-serif` } : {}),
    ...(color ? { color }                               : {}),
    ...(align ? { textAlign: align }                   : {}),
    ...(truncate
      ? {
          overflow:     "hidden",
          textOverflow: "ellipsis",
          whiteSpace:   "nowrap",
        }
      : {}),
    ...(maxLines && !truncate
      ? {
          display:         "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical" as CSSProperties["WebkitBoxOrient"],
          overflow:        "hidden",
        }
      : {}),
    // motionConfig split="none" — animation applied directly on the element
    ...(customAnimStyle ? { animation: customAnimStyle } : {}),
    margin:  0,
    padding: 0,
    ...style,
  };

  // ── Render: animation path ────────────────────────────────────────────────
  //
  // key={animation} forces React to unmount + remount the element when the
  // animation value changes, guaranteeing the CSS keyframe fires from frame 0
  // on every switch.

  if (heroHTML !== null) {
    return (
      <Tag
        key={animation}
        ref={ref}
        className={[animClass, className].filter(Boolean).join(" ")}
        style={computedStyle}
        dangerouslySetInnerHTML={{ __html: heroHTML }}
        {...rest}
      />
    );
  }

  // ── Render: standard path ─────────────────────────────────────────────────

  const processedChildren = isHero
    ? renderChildrenWithEmStyles(children, italic, accentColor, font)
    : children;

  return (
    <Tag
      ref={ref}
      className={className}
      style={computedStyle}
      {...rest}
    >
      {processedChildren}
    </Tag>
  );
};

export default Typography;