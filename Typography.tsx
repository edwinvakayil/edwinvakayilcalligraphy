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
} from "./animation";
import { useTypographyTheme } from "./Context";

// ─── Static maps ─────────────────────────────────────────────────────────────

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

// ─── Constants ───────────────────────────────────────────────────────────────

const INSTRUMENT_SERIF_URL =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function childrenToHTML(children: React.ReactNode): string {
  return (
    Children.map(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (isValidElement(child) && child.type === "em") {
        const inner =
          typeof child.props.children === "string" ? child.props.children : "";
        return `<em>${inner}</em>`;
      }
      return "";
    })?.join("") ?? ""
  );
}

function renderChildrenWithEmStyles(
  children: React.ReactNode,
  italic: boolean,
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

function applyEmStylesDOM(
  container: HTMLElement,
  italic: boolean,
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
      el.style.fontFamily = headingFont ? `'${headingFont}', sans-serif` : "inherit";
      el.style.fontStyle  = "normal";
      el.style.fontWeight = "inherit";
      el.style.color      = "inherit";
    }
  };
  container.querySelectorAll<HTMLElement>("em").forEach(apply);
  container.querySelectorAll<HTMLElement>("em > span").forEach(apply);
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Typography: React.FC<TypographyProps> = ({
  variant      = "Body",
  font:         fontProp,
  color:        colorProp,
  animation:    animationProp,
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

  // Prop wins; fall back to theme; fall back to built-in default
  const font        = fontProp        ?? (theme.font        || undefined);
  const color       = colorProp       ?? (theme.color       || undefined);
  const animation   = isHero ? (animationProp ?? theme.animation ?? undefined) : undefined;
  const italic      = italicProp      ?? theme.italic;
  const accentColor = accentColorProp ?? theme.accentColor;

  // ── useInsertionEffect: inject <link> and <style> tags ────────────────────
  //
  // WHY useInsertionEffect instead of plain render-phase calls:
  //
  // 1. Server safety — useInsertionEffect (like all effects) is never called
  //    on the server, so document.createElement / document.head never run
  //    during SSR. The isBrowser guard in ssr.ts is a belt-and-suspenders
  //    backup, but the effect boundary is the real guarantee.
  //
  // 2. Correctness — React 18 concurrent mode can call the render function
  //    multiple times before committing. Doing DOM work in render can fire
  //    those side-effects redundantly or out of order. useInsertionEffect
  //    fires synchronously before the browser paints, once per commit.
  //
  // 3. No FOUC — because it fires before paint (earlier than useLayoutEffect),
  //    the <style> tag is in the DOM before any text is visible, so there is
  //    no flash of unstyled / wrong-font text.

  useInsertionEffect(() => {
    // Instrument Serif — always pre-load for hero so toggling italic is instant
    if (isHero) {
      injectFont(INSTRUMENT_SERIF_URL);
    }
    // Heading Google Font
    if (font && GOOGLE_FONTS.includes(font)) {
      injectFont(buildFontUrl(font));
    }
    // Animation keyframe stylesheet
    if (animation && isHero) {
      injectAnimationStyles();
    }
  }, [isHero, font, animation]);

  // ── useEffect: re-stamp inline styles on <em> after DOM updates ───────────
  useEffect(() => {
    if (!isHero || !animation || !ref.current) return;
    applyEmStylesDOM(ref.current, italic, accentColor, font);
  }, [italic, accentColor, font, animation, isHero]);

  const Tag = (as ?? variantTagMap[variant]) as React.ElementType;

  // ── Animation path: build inner HTML ─────────────────────────────────────

  let animClass = "";
  let heroHTML: string | null = null;

  if (animation && isHero) {
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
      ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
      : {}),
    ...(maxLines && !truncate
      ? {
          display:         "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical" as CSSProperties["WebkitBoxOrient"],
          overflow:        "hidden",
        }
      : {}),
    margin:  0,
    padding: 0,
    ...style,
  };

  // ── Render: animation path (dangerouslySetInnerHTML) ──────────────────────

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

  // ── Render: standard path ────────────────────────────────────────────────

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