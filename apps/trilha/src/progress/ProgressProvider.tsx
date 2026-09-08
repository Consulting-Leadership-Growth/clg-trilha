import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TrackId } from "@/content/types";
import {
  emptyProgress,
  loadProgress,
  parseProgress,
  saveProgress,
  clearProgress,
  type ProgressState,
} from "./storage";

export interface ProgressContextValue {
  state: ProgressState;
  isModuleComplete: (moduleId: string) => boolean;
  toggleModule: (moduleId: string) => void;
  toggleCriterion: (moduleId: string, index: number) => void;
  isCriterionChecked: (moduleId: string, index: number) => boolean;
  answerQuiz: (questionId: string, optionIndex: number) => void;
  clearQuizAnswers: (questionIds: string[]) => void;
  setNote: (moduleId: string, note: string) => void;
  setFocusTrack: (trackId: TrackId | null) => void;
  reset: () => void;
  exportJson: () => string;
  /** Devolve uma mensagem de erro, ou `null` se a importação deu certo. */
  importJson: (raw: string) => string | null;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Inicialização preguiçosa: lê o storage uma vez, não a cada renderização.
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const isModuleComplete = useCallback(
    (moduleId: string) => moduleId in state.completedModules,
    [state.completedModules],
  );

  const toggleModule = useCallback((moduleId: string) => {
    setState((current) => {
      const completed = { ...current.completedModules };

      if (moduleId in completed) {
        delete completed[moduleId];
      } else {
        completed[moduleId] = new Date().toISOString();
      }

      return {
        ...current,
        completedModules: completed,
        startedAt: current.startedAt ?? new Date().toISOString(),
      };
    });
  }, []);

  const toggleCriterion = useCallback((moduleId: string, index: number) => {
    setState((current) => {
      const checked = current.doneCriteria[moduleId] ?? [];
      const next = checked.includes(index)
        ? checked.filter((item) => item !== index)
        : [...checked, index];

      return {
        ...current,
        doneCriteria: { ...current.doneCriteria, [moduleId]: next },
      };
    });
  }, []);

  const isCriterionChecked = useCallback(
    (moduleId: string, index: number) => (state.doneCriteria[moduleId] ?? []).includes(index),
    [state.doneCriteria],
  );

  const answerQuiz = useCallback((questionId: string, optionIndex: number) => {
    setState((current) => ({
      ...current,
      quizAnswers: { ...current.quizAnswers, [questionId]: optionIndex },
    }));
  }, []);

  const clearQuizAnswers = useCallback((questionIds: string[]) => {
    setState((current) => {
      const answers = { ...current.quizAnswers };
      for (const id of questionIds) delete answers[id];
      return { ...current, quizAnswers: answers };
    });
  }, []);

  const setNote = useCallback((moduleId: string, note: string) => {
    setState((current) => ({
      ...current,
      notes: { ...current.notes, [moduleId]: note },
    }));
  }, []);

  const setFocusTrack = useCallback((trackId: TrackId | null) => {
    setState((current) => ({ ...current, focusTrack: trackId }));
  }, []);

  const reset = useCallback(() => {
    clearProgress();
    setState(emptyProgress);
  }, []);

  const exportJson = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importJson = useCallback((raw: string) => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return "Este arquivo não é um JSON válido.";
    }

    const validated = parseProgress(parsed);
    if (!validated) {
      return "Este JSON não tem o formato de um progresso da trilha.";
    }

    setState(validated);
    return null;
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      isModuleComplete,
      toggleModule,
      toggleCriterion,
      isCriterionChecked,
      answerQuiz,
      clearQuizAnswers,
      setNote,
      setFocusTrack,
      reset,
      exportJson,
      importJson,
    }),
    [
      state,
      isModuleComplete,
      toggleModule,
      toggleCriterion,
      isCriterionChecked,
      answerQuiz,
      clearQuizAnswers,
      setNote,
      setFocusTrack,
      reset,
      exportJson,
      importJson,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
