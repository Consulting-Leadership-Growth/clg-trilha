import type { TrackId } from "@/content/types";

export const STORAGE_KEY = "clg-trilha:progress:v1";

export interface ProgressState {
  version: 1;
  /** Definido quando o primeiro módulo é concluído. */
  startedAt: string | null;
  /** moduleId -> data ISO da conclusão. */
  completedModules: Record<string, string>;
  /** moduleId -> índices marcados na lista de "pronto quando". */
  doneCriteria: Record<string, number[]>;
  /** questionId -> índice da alternativa escolhida. */
  quizAnswers: Record<string, number>;
  /** moduleId -> anotação livre do dev. */
  notes: Record<string, string>;
  /** Trilha de especialização escolhida como foco. */
  focusTrack: TrackId | null;
}

export const emptyProgress: ProgressState = {
  version: 1,
  startedAt: null,
  completedModules: {},
  doneCriteria: {},
  quizAnswers: {},
  notes: {},
  focusTrack: null,
};

/**
 * Aceita apenas o que tem o formato esperado e descarta o resto.
 * O arquivo pode vir de um import feito à mão, então nada aqui confia na entrada.
 */
export function parseProgress(raw: unknown): ProgressState | null {
  if (typeof raw !== "object" || raw === null) return null;
  const data = raw as Partial<ProgressState>;
  if (data.version !== 1) return null;

  const isStringRecord = (value: unknown): value is Record<string, string> =>
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((entry) => typeof entry === "string");

  return {
    version: 1,
    startedAt: typeof data.startedAt === "string" ? data.startedAt : null,
    completedModules: isStringRecord(data.completedModules) ? data.completedModules : {},
    doneCriteria:
      typeof data.doneCriteria === "object" && data.doneCriteria !== null
        ? Object.fromEntries(
            Object.entries(data.doneCriteria)
              .filter(([, value]) => Array.isArray(value))
              .map(([key, value]) => [
                key,
                (value as unknown[]).filter((item): item is number => typeof item === "number"),
              ]),
          )
        : {},
    quizAnswers:
      typeof data.quizAnswers === "object" && data.quizAnswers !== null
        ? Object.fromEntries(
            Object.entries(data.quizAnswers).filter(([, value]) => typeof value === "number"),
          )
        : {},
    notes: isStringRecord(data.notes) ? data.notes : {},
    focusTrack:
      data.focusTrack === "front" || data.focusTrack === "back" || data.focusTrack === "devops"
        ? data.focusTrack
        : null,
  };
}

/**
 * Toda leitura e escrita é protegida: aba anônima, storage desabilitado e cota
 * estourada lançam exceção, e nenhum desses casos deve derrubar a aplicação.
 */
export function loadProgress(): ProgressState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyProgress;
    return parseProgress(JSON.parse(stored)) ?? emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sem persistência a sessão continua funcionando em memória.
  }
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nada a fazer: já está efetivamente limpo para esta sessão.
  }
}
