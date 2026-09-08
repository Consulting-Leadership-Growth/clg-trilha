import { Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { phases, trackById, tracks } from "@/content/tracks";
import { modulesForTrackPath } from "@/content/modules";
import type { TrackId } from "@/content/types";
import { ModuleRow } from "@/components/ModuleRow";
import { ProgressMeter } from "@/components/ProgressMeter";
import { useNextModule, useProgress, useTrackPathCompletion } from "@/progress/useProgress";

const validTrackIds = new Set<string>(tracks.map((track) => track.id));

export function TrackPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const { state, setFocusTrack } = useProgress();

  if (!trackId || !validTrackIds.has(trackId)) {
    return <Navigate to="/" replace />;
  }

  return <TrackView trackId={trackId as TrackId} focusTrack={state.focusTrack} onFocus={setFocusTrack} />;
}

interface TrackViewProps {
  trackId: TrackId;
  focusTrack: TrackId | null;
  onFocus: (trackId: TrackId | null) => void;
}

function TrackView({ trackId, focusTrack, onFocus }: TrackViewProps) {
  const track = trackById.get(trackId);
  const completion = useTrackPathCompletion(trackId);
  const nextModule = useNextModule(focusTrack);
  const pathModules = modulesForTrackPath(trackId);
  const isFocus = focusTrack === trackId;

  if (!track) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="animate-rise">
        <h1 className="font-display text-4xl leading-tight text-foreground">{track.name}</h1>

        <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
          {track.description}
        </p>

        <div className="mt-8 flex flex-col gap-5 rounded-lg border border-border bg-card px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <ProgressMeter
              value={completion.ratio}
              label={track.isCore ? "Progresso na base" : "Progresso no caminho completo"}
              detail={`${completion.done} de ${completion.total} módulos · ${completion.hoursDone} de ${completion.hoursTotal} h`}
            />
          </div>

          {!track.isCore && (
            <button
              type="button"
              onClick={() => onFocus(isFocus ? null : trackId)}
              aria-pressed={isFocus}
              className={
                isFocus
                  ? "inline-flex shrink-0 items-center gap-2 rounded-md border border-primary/50 bg-accent px-4 py-2.5 text-sm text-foreground transition-colors duration-[--duration-fast]"
                  : "inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-[--duration-fast] hover:border-primary/40 hover:text-foreground"
              }
            >
              {isFocus && <Check className="size-4 text-primary" aria-hidden />}
              {isFocus ? "Trilha em foco" : "Definir como meu foco"}
            </button>
          )}
        </div>

        {!track.isCore && (
          <p className="mt-3 text-sm text-muted-foreground">
            O caminho abaixo inclui a base comum. Ela é pré-requisito real — pular direto para a
            especialização costuma custar mais tempo do que economiza.
          </p>
        )}
      </header>

      <div className="mt-12 flex flex-col gap-10">
        {phases.map((phase) => {
          const phaseModules = pathModules.filter((module) => module.phaseId === phase.id);
          if (phaseModules.length === 0) return null;

          return (
            <section key={phase.id} aria-labelledby={`trilha-fase-${phase.id}`}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-3">
                <h2 id={`trilha-fase-${phase.id}`} className="font-display text-xl text-foreground">
                  {phase.title}
                </h2>
                <span className="font-mono text-xs text-muted-foreground" data-numeric>
                  Dias {phase.dayRange[0]}–{phase.dayRange[1]}
                </span>
              </div>

              <ul className="rounded-lg border border-border bg-card px-2">
                {phaseModules.map((module) => (
                  <ModuleRow
                    key={module.id}
                    module={module}
                    showTrack={!track.isCore}
                    isNext={module.id === nextModule?.id}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
