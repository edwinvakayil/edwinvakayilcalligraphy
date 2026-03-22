import React, { createContext, useContext, useMemo } from "react";
import { HeroAnimation } from "./types";
import { injectFont, buildFontUrl, GOOGLE_FONTS } from "./fonts";

// ─── Theme shape ──────────────────────────────────────────────────────────────

export interface TypographyTheme {
  /** Default Google Font for all Typography components */
  font?: string;

  /** Default accent color for <em> italic spans in Display / H1 */
  accentColor?: string;

  /** Default italic setting for Display / H1 heroes */
  italic?: boolean;

  /** Default entrance animation for Display / H1 heroes */
  animation?: HeroAnimation;

  /** Default text color applied to all variants */
  color?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_THEME: Required<TypographyTheme> = {
  font:        "",
  accentColor: "#c8b89a",
  italic:      false,
  animation:   "rise",
  color:       "",
};

// ─── Context ──────────────────────────────────────────────────────────────────

const TypographyContext = createContext<Required<TypographyTheme>>(DEFAULT_THEME);

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface TypographyProviderProps {
  theme: TypographyTheme;
  children: React.ReactNode;
}

export const TypographyProvider: React.FC<TypographyProviderProps> = ({
  theme,
  children,
}) => {
  const resolved = useMemo<Required<TypographyTheme>>(
    () => ({
      font:        theme.font        ?? DEFAULT_THEME.font,
      accentColor: theme.accentColor ?? DEFAULT_THEME.accentColor,
      italic:      theme.italic      ?? DEFAULT_THEME.italic,
      animation:   theme.animation   ?? DEFAULT_THEME.animation,
      color:       theme.color       ?? DEFAULT_THEME.color,
    }),
    [theme.font, theme.accentColor, theme.italic, theme.animation, theme.color]
  );

  // Pre-load the theme font as soon as the provider mounts
  if (resolved.font && GOOGLE_FONTS.includes(resolved.font)) {
    injectFont(buildFontUrl(resolved.font));
  }

  return (
    <TypographyContext.Provider value={resolved}>
      {children}
    </TypographyContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the resolved theme from the nearest TypographyProvider.
 * Falls back to DEFAULT_THEME if used outside a provider.
 */
export function useTypographyTheme(): Required<TypographyTheme> {
  return useContext(TypographyContext);
}