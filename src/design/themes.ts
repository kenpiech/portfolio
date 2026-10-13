// Design tokens for the three styles. One component library reads these
// as CSS variables, so each design system is the same parts in a
// different material.

type TypeRole = {
  font: string;
  size: number; // px
  weight: number;
  lineHeight: number;
  tracking: string;
  transform?: "uppercase" | "none";
};

export type Theme = {
  slug: string;
  name: string;
  tagline: string;
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentText: string;
    accentHover: string;
    accentPressed: string;
    hover: string;
    focus: string;
    danger: string;
    success: string;
    disabledBg: string;
    disabledText: string;
  };
  type: { display: TypeRole; heading: TypeRole; body: TypeRole; label: TypeRole };
  shape: {
    radius: number;
    chipRadius: number;
    borderWidth: number;
    shadow: string;
    shadowPressed: string;
    press: [number, number]; // how far a pressed control moves
    focusWidth: number;
    note: string;
  };
  spacing: number[];
  tabPrefix: string; // drawn before the selected tab
};

export const swiss: Theme = {
  slug: "swiss",
  name: "Swiss",
  tagline: "Grid · Grotesk · One red",
  colors: {
    background: "#f4f4f1",
    surface: "#ffffff",
    text: "#111111",
    muted: "#5c5c58",
    border: "#111111",
    accent: "#e30613",
    accentText: "#ffffff",
    accentHover: "#c70511",
    accentPressed: "#a3040e",
    hover: "#e9e9e5",
    focus: "#111111",
    danger: "#c70511",
    success: "#0b6b3a",
    disabledBg: "#e4e4e0",
    disabledText: "#8a8a85",
  },
  type: {
    display: { font: "var(--font-inter-tight)", size: 64, weight: 700, lineHeight: 1, tracking: "-0.04em" },
    heading: { font: "var(--font-inter-tight)", size: 24, weight: 700, lineHeight: 1.2, tracking: "-0.02em" },
    body: { font: "var(--font-inter-tight)", size: 16, weight: 400, lineHeight: 1.5, tracking: "0" },
    label: { font: "var(--font-inter-tight)", size: 11, weight: 700, lineHeight: 1.2, tracking: "0.08em", transform: "uppercase" },
  },
  shape: {
    radius: 0,
    chipRadius: 0,
    borderWidth: 1,
    shadow: "none",
    shadowPressed: "none",
    press: [0, 0],
    focusWidth: 2,
    note: "Square corners · no shadow, a 1px black line instead",
  },
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  tabPrefix: "",
};

export const pixel: Theme = {
  slug: "pixel",
  name: "Retro Pixel",
  tagline: "8-bit · Hard edges · High scores",
  colors: {
    background: "#1d1b3a",
    surface: "#2b2858",
    text: "#fff1e8",
    muted: "#b0aad6",
    border: "#fff1e8",
    accent: "#d10040",
    accentText: "#fff1e8",
    accentHover: "#e8004a",
    accentPressed: "#a80034",
    hover: "#3a3670",
    focus: "#ffa300",
    danger: "#ff3d6e",
    success: "#00e436",
    disabledBg: "#34315e",
    disabledText: "#7a74a8",
  },
  type: {
    display: { font: "var(--font-press-start)", size: 40, weight: 400, lineHeight: 1.2, tracking: "0" },
    heading: { font: "var(--font-press-start)", size: 16, weight: 400, lineHeight: 1.5, tracking: "0" },
    body: { font: "var(--font-vt323)", size: 22, weight: 400, lineHeight: 1.25, tracking: "0" },
    label: { font: "var(--font-press-start)", size: 10, weight: 400, lineHeight: 1.6, tracking: "0", transform: "uppercase" },
  },
  shape: {
    radius: 0,
    chipRadius: 0,
    borderWidth: 4,
    shadow: "4px 4px 0 #0a0914",
    shadowPressed: "0 0 0 #0a0914",
    press: [4, 4],
    focusWidth: 4,
    note: "Square corners · 4px borders · hard 4px drop shadow that disappears when pressed",
  },
  spacing: [4, 8, 16, 24, 32, 48, 64],
  tabPrefix: "▶ ",
};

export const expedition: Theme = {
  slug: "expedition",
  name: "Expedition",
  tagline: "Charts · Canvas · Navy · One blaze of orange",
  colors: {
    background: "#ece6d8",
    surface: "#f8f5ee",
    text: "#14213d",
    muted: "#5a6170",
    border: "#c9bfa6",
    accent: "#b8461f",
    accentText: "#ffffff",
    accentHover: "#a23c19",
    accentPressed: "#8a3213",
    hover: "#e2dac7",
    focus: "#14213d",
    danger: "#a8321c",
    success: "#3d6b3a",
    disabledBg: "#e0d9c8",
    disabledText: "#8d8a80",
  },
  type: {
    display: { font: "var(--font-libre-caslon)", size: 56, weight: 400, lineHeight: 1.05, tracking: "-0.02em" },
    heading: { font: "var(--font-libre-caslon)", size: 24, weight: 700, lineHeight: 1.25, tracking: "-0.01em" },
    body: { font: "var(--font-plex-sans)", size: 16, weight: 400, lineHeight: 1.6, tracking: "0" },
    label: { font: "var(--font-plex-mono)", size: 11, weight: 500, lineHeight: 1.3, tracking: "0.12em", transform: "uppercase" },
  },
  shape: {
    radius: 6,
    chipRadius: 999,
    borderWidth: 1,
    shadow: "0 1px 0 rgba(20, 33, 61, 0.18)",
    shadowPressed: "inset 0 1px 2px rgba(20, 33, 61, 0.25)",
    press: [0, 1],
    focusWidth: 2,
    note: "6px corners, pill chips · canvas-colored rules · a stitched 1px shadow",
  },
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  tabPrefix: "",
};

export const themes = { swiss, pixel, expedition };

export function themeVars(t: Theme): React.CSSProperties {
  const c = t.colors;
  const role = (name: string, r: TypeRole) => ({
    [`--${name}-font`]: r.font,
    [`--${name}-size`]: `${r.size}px`,
    [`--${name}-weight`]: r.weight,
    [`--${name}-lh`]: r.lineHeight,
    [`--${name}-tracking`]: r.tracking,
    [`--${name}-transform`]: r.transform ?? "none",
  });
  return {
    "--c-bg": c.background,
    "--c-surface": c.surface,
    "--c-text": c.text,
    "--c-muted": c.muted,
    "--c-border": c.border,
    "--c-accent": c.accent,
    "--c-accent-fg": c.accentText,
    "--c-accent-hover": c.accentHover,
    "--c-accent-pressed": c.accentPressed,
    "--c-hover": c.hover,
    "--c-focus": c.focus,
    "--c-danger": c.danger,
    "--c-success": c.success,
    "--c-disabled-bg": c.disabledBg,
    "--c-disabled-fg": c.disabledText,
    ...role("display", t.type.display),
    ...role("heading", t.type.heading),
    ...role("body", t.type.body),
    ...role("label", t.type.label),
    "--radius": `${t.shape.radius}px`,
    "--radius-chip": `${t.shape.chipRadius}px`,
    "--bw": `${t.shape.borderWidth}px`,
    "--shadow": t.shape.shadow,
    "--shadow-pressed": t.shape.shadowPressed,
    "--press-x": `${t.shape.press[0]}px`,
    "--press-y": `${t.shape.press[1]}px`,
    "--focus-w": `${t.shape.focusWidth}px`,
    "--tab-prefix": `"${t.tabPrefix}"`,
  } as React.CSSProperties;
}

// WCAG 2 contrast ratio between two hex colors
export function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
