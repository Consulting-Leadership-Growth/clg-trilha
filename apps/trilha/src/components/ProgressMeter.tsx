import { cn } from "@clg/design-system";

interface ProgressMeterProps {
  /** 0 a 1. */
  value: number;
  label?: string;
  /** Texto à direita do rótulo, normalmente "3 de 12". */
  detail?: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Medidor linear. Preferido a um anel: números reais são mais fáceis de
 * comparar entre trilhas, e a barra não vira ornamento.
 */
export function ProgressMeter({
  value,
  label,
  detail,
  size = "md",
  className,
}: ProgressMeterProps) {
  const percent = Math.round(Math.min(Math.max(value, 0), 1) * 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || detail) && (
        <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          {label && (
            <span
              className={cn(
                "font-sans text-foreground",
                size === "sm" ? "text-[0.8125rem]" : "text-sm",
              )}
            >
              {label}
            </span>
          )}
          {detail && (
            <span className="font-mono text-xs text-muted-foreground" data-numeric>
              {detail}
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progresso"}
        className={cn(
          "w-full overflow-hidden rounded-full bg-secondary",
          size === "sm" ? "h-1" : "h-1.5",
        )}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[--duration-base] ease-[--ease-standard]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
