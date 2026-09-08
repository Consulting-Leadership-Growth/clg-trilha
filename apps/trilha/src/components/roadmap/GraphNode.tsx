import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@clg/design-system";
import { Check, Clock, Lock } from "lucide-react";
import type { Module } from "@/content/types";
import { moduleById } from "@/content/modules";
import { trackById } from "@/content/tracks";
import type { ModuleStatus } from "@/progress/useProgress";

interface GraphNodeProps {
  module: Module;
  status: ModuleStatus;
  isNext: boolean;
  /** Mostra de qual trilha o módulo é. Útil só na visão geral. */
  showTrack?: boolean;
}

export const GraphNode = forwardRef<HTMLAnchorElement, GraphNodeProps>(function GraphNode(
  { module, status, isNext, showTrack = false },
  ref,
) {
  const done = status === "concluido";
  const blocked = status === "sugerido-depois";
  const track = trackById.get(module.trackId);

  const prerequisiteTitles = module.prerequisites
    .map((id) => moduleById.get(id)?.title)
    .filter((title): title is string => Boolean(title));

  return (
    <Link
      ref={ref}
      to={`/trilha/${module.trackId}/${module.id}`}
      aria-current={isNext ? "step" : undefined}
      className={cn(
        "group relative flex w-[15.5rem] flex-col rounded-lg border bg-card px-4 py-3 text-left",
        "transition-[border-color,box-shadow,opacity,transform] duration-[--duration-base] ease-[--ease-standard]",
        "hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
        done && "border-primary/55 bg-primary/[0.06]",
        !done && isNext && "border-primary shadow-[0_6px_28px_-10px_hsl(var(--clg-gold)/0.55)]",
        !done && !isNext && !blocked && "border-border hover:border-primary/45",
        blocked && "border-border/70 opacity-55 hover:opacity-100 hover:border-primary/30",
      )}
    >
      {/*
        De onde este módulo vem. Nem toda dependência vira linha no grafo — as
        que pulam várias fileiras aparecem só aqui — então este rótulo também
        muda de cor quando o pré-requisito é cumprido.
      */}
      <span
        className={cn(
          "flex min-h-4 items-center gap-1.5 text-[0.625rem] leading-tight transition-colors duration-[--duration-base]",
          blocked ? "text-muted-foreground" : "text-primary/75",
        )}
      >
        {blocked && <Lock className="size-2.5 shrink-0" aria-hidden />}
        {prerequisiteTitles.length > 0 ? (
          <span className="truncate uppercase tracking-[0.1em]">
            {prerequisiteTitles.join(" + ")}
          </span>
        ) : (
          <span className="uppercase tracking-[0.1em] text-muted-foreground">Ponto de partida</span>
        )}
      </span>

      <span
        className={cn(
          "mt-2 font-display text-[0.9375rem] leading-snug transition-colors duration-[--duration-fast]",
          done ? "text-primary" : "text-foreground group-hover:text-primary",
        )}
      >
        {module.title}
      </span>

      <span className="mt-1 line-clamp-2 text-[0.75rem] leading-relaxed text-muted-foreground">
        {module.summary}
      </span>

      <span className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-2">
        <span className="flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground" data-numeric>
          <Clock className="size-3" aria-hidden />
          {module.estimatedHours} h
        </span>

        <span className="flex items-center gap-2">
          {showTrack && track && !track.isCore && (
            <span className="rounded-full border border-border px-1.5 py-0.5 text-[0.625rem] text-muted-foreground">
              {track.shortName}
            </span>
          )}

          {done ? (
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-2.5" aria-hidden />
              <span className="sr-only">Concluído</span>
            </span>
          ) : (
            <span
              className={cn(
                "inline-flex size-4 items-center justify-center rounded-full border",
                isNext ? "border-primary animate-current" : "border-border",
              )}
            >
              <span className="sr-only">{isNext ? "Próximo módulo" : "Não concluído"}</span>
            </span>
          )}
        </span>
      </span>

      {isNext && !done && (
        <span className="absolute -top-2.5 left-3 rounded-full bg-primary px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
          Comece aqui
        </span>
      )}
    </Link>
  );
});
