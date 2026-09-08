export const clgTypography = {
  families: {
    display: '"IBM Plex Sans", system-ui, sans-serif',
    sans: '"Lato", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  weights: {
    extraLight: 200,
    light: 300,
    regular: 400,
    semiBold: 600,
    bold: 700,
  },
  scale: {
    display: { size: "3.5rem", lineHeight: "1.05", tracking: "-0.03em" },
    h1: { size: "2.25rem", lineHeight: "1.15", tracking: "-0.02em" },
    h2: { size: "1.5rem", lineHeight: "1.25", tracking: "-0.015em" },
    h3: { size: "1.125rem", lineHeight: "1.35", tracking: "-0.01em" },
    body: { size: "0.9375rem", lineHeight: "1.6", tracking: "0" },
    small: { size: "0.8125rem", lineHeight: "1.5", tracking: "0" },
    eyebrow: { size: "0.75rem", lineHeight: "1.4", tracking: "0.14em" },
  },
} as const;

export const clgRadius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.625rem",
  xl: "0.875rem",
  pill: "9999px",
} as const;

export const clgSpacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  xxl: "2.5rem",
} as const;

export const clgMotion = {
  durations: { instant: "80ms", fast: "140ms", base: "220ms", slow: "360ms" },
  easings: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    decelerate: "cubic-bezier(0, 0, 0, 1)",
    accelerate: "cubic-bezier(0.3, 0, 1, 1)",
  },
} as const;

export type CLGTypeScaleToken = keyof typeof clgTypography.scale;
export type CLGRadiusToken = keyof typeof clgRadius;
