import { CLGSymbol } from "./CLGSymbol";
import { cn } from "../lib/cn";

export type CLGLogoVariant = "symbol" | "lockup" | "compact";

export interface CLGLogoProps {
  variant?: CLGLogoVariant;
  size?: number;
  className?: string;
  accessibleLabel?: string;
}

const WORDMARK_LINES = ["Consulting", "Launch Growth"] as const;

interface WordmarkMetrics {
  fontSize: number;
  lineHeight: number;
  gap: number;
  acronymSize: number;
}

function resolveWordmarkMetrics(size: number): WordmarkMetrics {
  return {
    fontSize: Math.round(size * 0.34),
    lineHeight: Math.round(size * 0.42),
    gap: Math.round(size * 0.4),
    acronymSize: Math.round(size * 0.4),
  };
}

export function CLGLogo({
  variant = "lockup",
  size = 40,
  className,
  accessibleLabel = "CLG Consulting Launch Growth",
}: CLGLogoProps) {
  if (variant === "symbol") {
    return <CLGSymbol size={size} className={className} accessibleLabel={accessibleLabel} />;
  }

  const metrics = resolveWordmarkMetrics(size);

  if (variant === "compact") {
    return (
      <span
        role="img"
        aria-label={accessibleLabel}
        className={cn("inline-flex items-center", className)}
        style={{ gap: metrics.gap }}
      >
        <CLGSymbol size={size} />
        <span
          aria-hidden
          className="font-sans font-bold"
          style={{ fontSize: metrics.acronymSize, letterSpacing: "0.08em" }}
        >
          CLG
        </span>
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={accessibleLabel}
      className={cn("inline-flex items-center", className)}
      style={{ gap: metrics.gap }}
    >
      <CLGSymbol size={size} />
      <span aria-hidden className="self-stretch w-px bg-current opacity-35" />
      <span
        aria-hidden
        className="flex flex-col font-sans"
        style={{
          fontSize: metrics.fontSize,
          lineHeight: `${metrics.lineHeight}px`,
          letterSpacing: "-0.01em",
        }}
      >
        {WORDMARK_LINES.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </span>
  );
}
