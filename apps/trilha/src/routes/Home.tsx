import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@clg/design-system";
import { ArrowRight, Check } from "lucide-react";
import { tracks } from "@/content/tracks";
import { hoursOf, modules, modulesForTrackPath } from "@/content/modules";
import type { Module, TrackId } from "@/content/types";
import { ModuleRow } from "@/components/ModuleRow";
import { ProgressMeter } from "@/components/ProgressMeter";
import { RoadmapGraph } from "@/components/roadmap/RoadmapGraph";
import { layoutGraph } from "@/components/roadmap/layout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNextModule, useProgress } from "@/progress/useProgress";

type View = TrackId | "todos";

const views: { id: View; label: string }[] = [
  { id: "todos", label: "Visão geral" },
  ...tracks
    .filter((track) => !track.isCore)
    .map((track) => ({ id: track.id as View, label: track.name })),
];

export function Home() {
  const { state, isModuleComplete, setFocusTrack } = useProgress();
  const isWide = useMediaQuery("(min-width: 1024px)");

  const [view, setView] = useState<View>(() => state.focusTrack ?? "todos");

  const visible = useMemo<Module[]>(
    () => (view === "todos" ? modules : modulesForTrackPath(view)),
    [view],
  );

  const nextModule = useNextModule(view === "todos" ? state.focusTrack : view);

  const done = visible.filter((module) => isModuleComplete(module.id));
  const ratio = visible.length === 0 ? 0 : done.length / visible.length;
  const isFocus = view !== "todos" && state.focusTrack === view;

  const bands = useMemo(() => layoutGraph(visible), [visible]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <section>
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Trilha do desenvolvedor
        </h1>

        <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
          Noventa dias da primeira máquina configurada até a primeira entrega em produção. Cada
          caixa é um módulo; as linhas mostram o que precisa vir antes. Conforme você conclui, o
          caminho acende.
        </p>
      </section>

      {/* Seletor de trilha. Cada aba é um caminho completo e independente. */}
      <div
        role="tablist"
        aria-label="Escolha a trilha"
        className="mt-10 inline-flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1"
      >
        {views.map((item) => {
          const active = view === item.id;

          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setView(item.id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm transition-colors duration-[--duration-fast] ease-[--ease-standard]",
                active
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-5 rounded-lg border border-border bg-card px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <ProgressMeter
            value={ratio}
            label={view === "todos" ? "Todos os módulos" : "Seu progresso nesta trilha"}
            detail={`${done.length} de ${visible.length} módulos · ${hoursOf(done)} de ${hoursOf(visible)} h`}
          />
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {view !== "todos" && (
            <button
              type="button"
              onClick={() => setFocusTrack(isFocus ? null : view)}
              aria-pressed={isFocus}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors duration-[--duration-fast]",
                isFocus
                  ? "border-primary/50 bg-accent text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {isFocus && <Check className="size-4 text-primary" aria-hidden />}
              {isFocus ? "Trilha em foco" : "Definir como meu foco"}
            </button>
          )}

          {nextModule && (
            <Link
              to={`/trilha/${nextModule.trackId}/${nextModule.id}`}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:bg-[hsl(var(--clg-gold-strong))]"
            >
              {done.length === 0 ? "Começar" : "Continuar"}
              <ArrowRight
                className="size-4 transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          )}
        </div>
      </div>

      {nextModule && (
        <p className="mt-3 text-sm text-muted-foreground">
          Próximo: <span className="text-foreground">{nextModule.title}</span> —{" "}
          {nextModule.summary}
        </p>
      )}

      <div className="mt-12">
        {isWide ? (
          <RoadmapGraph
            list={visible}
            nextModuleId={nextModule?.id ?? null}
            showTrack={view === "todos"}
          />
        ) : (
          /* Grafo de dependências não cabe em tela estreita: a mesma
             informação vira lista, agrupada pelas mesmas fases e linhas. */
          <div className="flex flex-col gap-10">
            {bands.map((band) => (
              <section key={band.phase.id} aria-labelledby={`fase-${band.phase.id}`}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-3">
                  <h2
                    id={`fase-${band.phase.id}`}
                    className="font-display text-xl text-foreground"
                  >
                    {band.phase.title}
                  </h2>
                  <span className="font-mono text-xs text-muted-foreground" data-numeric>
                    Dias {band.phase.dayRange[0]}–{band.phase.dayRange[1]}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {band.phase.intent}
                </p>

                <ul className="rounded-lg border border-border bg-card px-2">
                  {band.rows.flat().map((module) => (
                    <ModuleRow
                      key={module.id}
                      module={module}
                      showTrack={view === "todos"}
                      isNext={module.id === nextModule?.id}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
