/**
 * Modelo de conteúdo da trilha.
 *
 * O conteúdo é DADO, não JSX: qualquer pessoa do time edita um arquivo em
 * `content/` sem abrir um componente. Os tipos abaixo são o contrato.
 */

export type TrackId = "core" | "front" | "back" | "devops";

export type PhaseId = "aterrissagem" | "fundamentos" | "especializacao" | "integracao";

/** Tipo de recurso, usado para escolher ícone e rótulo na UI. */
export type ResourceKind = "curso" | "doc" | "artigo" | "video" | "livro" | "ferramenta";

export interface Resource {
  label: string;
  /** Vazio quando `internal` é true — a UI mostra "peça ao seu mentor". */
  url: string;
  kind: ResourceKind;
  /** Duração estimada em minutos. Omitido para docs de referência contínua. */
  minutes?: number;
  /** Plataforma, para o dev saber onde vai cair antes de clicar. */
  source?: string;
  /** Emite certificado ao concluir. */
  certificate?: boolean;
  /** Recurso interno da CLG: a URL precisa ser preenchida pelo time. */
  internal?: boolean;
}

export interface Exercise {
  title: string;
  description: string;
  /** Passos objetivos. Cada um deve caber em uma linha. */
  steps: string[];
  /** Bloco de código opcional para o dev copiar. */
  snippet?: { language: string; code: string };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Índice da alternativa correta em `options`. */
  answerIndex: number;
  /** Mostrado depois da resposta, certa ou errada. */
  explanation: string;
}

export interface Module {
  id: string;
  /**
   * Posição na sequência global, em passos de 10 para caber inserção no meio.
   * É a ordem explícita da trilha inteira: a posição no arquivo não importa.
   *
   * Um módulo nunca pode depender de outro com `order` maior — a interface
   * sugeriria voltar atrás. `npm run validar` verifica isso.
   */
  order: number;
  /** A disciplina a que o módulo pertence. Define o rótulo e a cor. */
  trackId: TrackId;
  /**
   * Trilhas cujo caminho inclui este módulo.
   *
   * Omitido, é derivado do `trackId`: `core` entra nas três especializações,
   * e um módulo de especialização entra apenas na própria. Declare
   * explicitamente só quando o módulo for compartilhado entre algumas
   * trilhas mas não todas — Docker, por exemplo, é de DevOps mas o
   * back-end também precisa.
   *
   * Um pré-requisito precisa estar em TODO caminho que contém o módulo
   * que depende dele. `npm run validar` verifica isso.
   */
  paths?: TrackId[];
  phaseId: PhaseId;
  title: string;
  /** Frase curta mostrada na listagem. */
  summary: string;
  /** O que ele sai sabendo fazer. */
  goal: string;
  /** Por que isso importa na CLG especificamente. */
  whyHere: string;
  estimatedHours: number;
  resources: Resource[];
  exercise: Exercise;
  /** Critérios objetivos de conclusão. */
  doneWhen: string[];
  quiz?: QuizQuestion[];
  /** Ids de módulos que idealmente vêm antes. Gating é suave. */
  prerequisites: string[];
}

export interface Phase {
  id: PhaseId;
  title: string;
  /** Uma linha sobre o que muda nele nesta fase. */
  intent: string;
  dayRange: [number, number];
}

export interface Track {
  id: TrackId;
  name: string;
  /** Rótulo curto para as faixas do mapa. */
  shortName: string;
  description: string;
  /** Trilha comum a todos, cursada por inteiro antes da especialização. */
  isCore: boolean;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  /** Termos relacionados, por `term`. */
  seeAlso?: string[];
}
