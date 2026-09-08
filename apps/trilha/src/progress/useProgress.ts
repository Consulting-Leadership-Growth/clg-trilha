import { useContext, useMemo } from "react";
import { ProgressContext, type ProgressContextValue } from "./ProgressProvider";
import { modules, modulesForTrackPath } from "@/content/modules";
import { tracks } from "@/content/tracks";
import type { Module, PhaseId, TrackId } from "@/content/types";

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress precisa estar dentro de <ProgressProvider>.");
  }

  return context;
}

export interface Completion {
  done: number;
  total: number;
  /** 0 a 1. Vale 0 quando não há módulos, para não dividir por zero. */
  ratio: number;
  hoursDone: number;
  hoursTotal: number;
}

function summarize(list: Module[], isDone: (id: string) => boolean): Completion {
  const done = list.filter((module) => isDone(module.id));

  return {
    done: done.length,
    total: list.length,
    ratio: list.length === 0 ? 0 : done.length / list.length,
    hoursDone: done.reduce((sum, module) => sum + module.estimatedHours, 0),
    hoursTotal: list.reduce((sum, module) => sum + module.estimatedHours, 0),
  };
}

/** Progresso agregado: geral, por trilha e por fase. */
export function useCompletion() {
  const { isModuleComplete } = useProgress();

  return useMemo(() => {
    const overall = summarize(modules, isModuleComplete);

    const byTrack = new Map<TrackId, Completion>(
      tracks.map((track) => [
        track.id,
        summarize(
          modules.filter((module) => module.trackId === track.id),
          isModuleComplete,
        ),
      ]),
    );

    const byPhase = new Map<PhaseId, Completion>();
    for (const module of modules) {
      if (!byPhase.has(module.phaseId)) {
        byPhase.set(
          module.phaseId,
          summarize(
            modules.filter((item) => item.phaseId === module.phaseId),
            isModuleComplete,
          ),
        );
      }
    }

    return { overall, byTrack, byPhase };
  }, [isModuleComplete]);
}

/** Progresso do caminho completo de uma trilha (a própria + a base comum). */
export function useTrackPathCompletion(trackId: TrackId): Completion {
  const { isModuleComplete } = useProgress();

  return useMemo(
    () => summarize(modulesForTrackPath(trackId), isModuleComplete),
    [trackId, isModuleComplete],
  );
}

export type ModuleStatus = "concluido" | "disponivel" | "sugerido-depois";

/**
 * Gating suave: um módulo com pré-requisito pendente aparece como
 * "sugerido depois", mas continua acessível. Trilha travada de verdade
 * vira frustração, não aprendizado.
 */
export function useModuleStatus(module: Module): ModuleStatus {
  const { isModuleComplete } = useProgress();

  if (isModuleComplete(module.id)) return "concluido";

  const pending = module.prerequisites.some((id) => !isModuleComplete(id));
  return pending ? "sugerido-depois" : "disponivel";
}

/** O próximo módulo sugerido: o primeiro disponível na ordem canônica. */
export function useNextModule(focusTrack: TrackId | null): Module | null {
  const { isModuleComplete } = useProgress();

  return useMemo(() => {
    const pool = focusTrack ? modulesForTrackPath(focusTrack) : modules;

    return (
      pool.find(
        (module) =>
          !isModuleComplete(module.id) &&
          module.prerequisites.every((id) => isModuleComplete(id)),
      ) ??
      pool.find((module) => !isModuleComplete(module.id)) ??
      null
    );
  }, [focusTrack, isModuleComplete]);
}
