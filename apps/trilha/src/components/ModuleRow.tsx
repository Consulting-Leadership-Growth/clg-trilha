import { Link } from "react-router-dom";
import { cn } from "@clg/design-system";
import { Check, ChevronRight, Clock } from "lucide-react";
import type { Module } from "@/content/types";
import { trackById } from "@/content/tracks";
import { useModuleStatus, useProgress } from "@/progress/useProgress";

interface ModuleRowProps {
  module: Module;
  /** Mostra de qual trilha o módulo veio. Útil em listas misturadas. */
  showTrack?: boolean;
  /** Destaca o módulo como o próximo sugerido. */
  isNext?: boolean;
}

export function ModuleRow({ module, showTrack = false, isNext = false }: ModuleRowProps) {
  const status = useModuleStatus(module);
  const { toggleModule } = useProgress();
  const track = trackById.get(module.trackId);

  return (
    <li className="group relative flex items-stretch gap-3 border-b border-border last:border-b-0">
      {/* Marcar concluído sem abrir o módulo: o botão é irmão do link,
          nunca aninhado dentro dele. */}
      <button
        type="button"
        onClick={() => toggleModule(module.id)}
        aria-pressed={status === "concluido"}
        aria-label={
          status === "concluido"
            ? `Desmarcar ${module.title} como concluído`
            : `Marcar ${module.title} como concluído`
        }
        className={cn(
          "my-3 ml-1 inline-flex size-6 shrink-0 items-center justify-center self-start rounded-full border transition-all duration-[--duration-fast] ease-[--ease-standard]",
          status === "concluido"
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-transparent hover:border-primary/60 hover:text-primary/40",
          isNext && status !== "concluido" && "border-primary/60 animate-current",
        )}
      >
        <Check className="size-3.5" aria-hidden />
      </button>

      <Link
        to={`/trilha/${module.trackId}/${module.id}`}
        // Pré-requisito pendente recua visualmente em vez de anunciar-se em
        // texto: o rótulo repetido em trinta linhas vira ruído, o recuo não.
        className={cn(
          "focus-inset flex min-w-0 flex-1 items-center gap-4 py-3 pr-2 transition-all duration-[--duration-fast] ease-[--ease-standard]",
          status === "sugerido-depois" && "opacity-65 hover:opacity-100",
        )}
        title={
          status === "sugerido-depois"
            ? "Sugerido depois dos pré-requisitos, mas você pode abrir agora"
            : undefined
        }
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className={cn(
                "font-sans text-[0.9375rem] transition-colors duration-[--duration-fast]",
                status === "concluido"
                  ? "text-muted-foreground"
                  : "text-foreground group-hover:text-primary",
              )}
            >
              {module.title}
            </span>

            {isNext && status !== "concluido" && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-semibold text-primary-foreground">
                Próximo
              </span>
            )}

            {showTrack && track && !track.isCore && (
              <span className="rounded-full border border-border px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
                {track.shortName}
              </span>
            )}

          </span>

          <span className="mt-0.5 block truncate text-[0.8125rem] text-muted-foreground">
            {module.summary}
          </span>
        </span>

        <span
          className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground sm:flex"
          data-numeric
        >
          <Clock className="size-3.5" aria-hidden />
          {module.estimatedHours} h
        </span>

        <ChevronRight
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>
    </li>
  );
}
