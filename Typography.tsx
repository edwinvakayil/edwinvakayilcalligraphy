import React, { CSSProperties, Children, isValidElement, useRef, useEffect } from "react";
import { TypographyProps, VariantTagMap, VariantStyleMap } from "./types";
import { GOOGLE_FONTS, buildFontUrl, injectFont } from "./fonts";
import {
  injectAnimationStyles,
  getAnimationClass,
  buildStaggerHTML,
  buildLettersHTML,
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
  const applyTo = (el: HTMLElement) => {
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

  container.querySelectorAll<HTMLElement>("em").forEach(applyTo);
  container.querySelectorAll<HTMLElement>("em > span").forEach(applyTo);
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Typography: React.FC<TypographyProps> = ({
  variant     = "Body",
  // Explicit undefined = "not set by caller" → fall through to context
  font:        fontProp,
  color:       colorProp,
  animation:   animationProp,
  italic:      italicProp,
  accentColor: accentColorProp,
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

  // Prop wins if explicitly provided; otherwise fall back to theme value.
  // We use `?? ` (nullish coalescing) so that false / 0 / "" from props still win.
  const font        = fontProp        ?? (theme.font        || undefined);
  const color       = colorProp       ?? (theme.color       || undefined);
  const animation   = isHero
    ? (animationProp  ?? theme.animation  ?? undefined)
    : undefined;
  const italic      = italicProp      ?? theme.italic;
  const accentColor = accentColorProp ?? theme.accentColor;

  // Always pre-load Instrument Serif for hero elements
  if (isHero) {
    injectFont(INSTRUMENT_SERIF_URL);
  }

  // Inject heading Google Font
  if (font && GOOGLE_FONTS.includes(font)) {
    injectFont(buildFontUrl(font));
  }

  // Inject animation keyframes once
  if (animation && isHero) {
    injectAnimationStyles();
  }

  // Re-stamp em styles after DOM updates (animation / dangerouslySetInnerHTML path)
  useEffect(() => {
    if (!isHero || !animation || !ref.current) return;
    applyEmStylesDOM(ref.current, italic, accentColor, font);
  }, [italic, accentColor, font, animation, isHero]);

  const Tag = (as ?? variantTagMap[variant]) as React.ElementType;

  // ── Animation path ────────────────────────────────────────────────────────

  let animClass = "";
  let heroHTML: string | null = null;

  if (animation && isHero) {
    const rawHTML = childrenToHTML(children);

    if (animation === "stagger") {
      heroHTML = buildStaggerHTML(rawHTML);
    } else if (animation === "letters") {
      heroHTML = buildLettersHTML(rawHTML);
    } else {
      heroHTML  = rawHTML;
      animClass = getAnimationClass(animation);
    }
  }

  // ── Computed styles ───────────────────────────────────────────────────────

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

  // ── Render: standard path (real React children) ───────────────────────────

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