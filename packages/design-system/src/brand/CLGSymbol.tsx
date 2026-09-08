import { forwardRef } from "react";
import type { SVGProps } from "react";
import {
  CLG_SYMBOL_ASPECT_RATIO,
  CLG_SYMBOL_PATHS,
  CLG_SYMBOL_STROKE_WIDTH,
  CLG_SYMBOL_VIEW_BOX,
} from "./paths";

export interface CLGSymbolProps extends Omit<SVGProps<SVGSVGElement>, "viewBox"> {
  size?: number;
  accessibleLabel?: string;
}

export const CLGSymbol = forwardRef<SVGSVGElement, CLGSymbolProps>(function CLGSymbol(
  { size = 32, accessibleLabel, ...svgProps },
  ref,
) {
  const isDecorative = accessibleLabel === undefined;

  return (
    <svg
      ref={ref}
      viewBox={CLG_SYMBOL_VIEW_BOX}
      height={size}
      width={size * CLG_SYMBOL_ASPECT_RATIO}
      fill="currentColor"
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative || undefined}
      aria-label={accessibleLabel}
      {...svgProps}
    >
      <path
        d={CLG_SYMBOL_PATHS.container}
        fill="none"
        stroke="currentColor"
        strokeWidth={CLG_SYMBOL_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <path d={CLG_SYMBOL_PATHS.letterC} />
      <path d={CLG_SYMBOL_PATHS.letterL} />
      <path d={CLG_SYMBOL_PATHS.letterG} />
    </svg>
  );
});
