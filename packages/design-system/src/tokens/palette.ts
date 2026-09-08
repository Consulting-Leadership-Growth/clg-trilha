export const clgPalette = {
  gold: { hex: "#D8B23A", hsl: "46 67% 54%" },
  goldStrong: { hex: "#B8942A", hsl: "46 72% 44%" },
  black: { hex: "#0D0D0D", hsl: "0 0% 5%" },
  surface: { hex: "#141414", hsl: "0 0% 8%" },
  elevated: { hex: "#1C1C1C", hsl: "0 0% 11%" },
  line: { hex: "#292929", hsl: "0 0% 16%" },
  mist: { hex: "#E6E6E6", hsl: "0 0% 90%" },
  steel: { hex: "#666666", hsl: "0 0% 40%" },
  /* Texto secundário sobre fundo escuro: `steel` reprova em AA (3.4:1). */
  steelText: { hex: "#858585", hsl: "0 0% 52%" },
} as const;

export const clgSemanticColors = {
  success: { hex: "#3B8F5C", hsl: "146 42% 40%" },
  warning: { hex: "#C98A1E", hsl: "39 74% 45%" },
  danger: { hex: "#C0392B", hsl: "6 63% 46%" },
  info: { hex: "#3B7CB8", hsl: "208 51% 48%" },
} as const;

export type CLGPaletteToken = keyof typeof clgPalette;
export type CLGSemanticToken = keyof typeof clgSemanticColors;

export function paletteHex(token: CLGPaletteToken): string {
  return clgPalette[token].hex;
}
