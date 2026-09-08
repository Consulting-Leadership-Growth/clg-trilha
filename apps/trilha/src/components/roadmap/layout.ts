import type { Module, Phase } from "@/content/types";
import { phases } from "@/content/tracks";

export interface GraphBand {
  phase: Phase;
  /** Cada linha é um nível de profundidade dentro da fase. */
  rows: Module[][];
}

export interface GraphEdge {
  from: string;
  to: string;
}

/**
 * Organiza os módulos em bandas (fases) e, dentro de cada banda, em linhas por
 * profundidade de dependência: um módulo fica uma linha abaixo do seu
 * pré-requisito mais profundo da mesma fase.
 *
 * Dependência que atravessa fase não empurra o módulo para baixo — a fase já
 * garante que ela veio antes. Sem isso, "Ler o código de outra pessoa", que não
 * tem pré-requisito, subiria para a primeira linha do roadmap inteiro.
 */
export function layoutGraph(list: Module[]): GraphBand[] {
  const bands: GraphBand[] = [];

  for (const phase of phases) {
    const inPhase = list.filter((module) => module.phaseId === phase.id);
    if (inPhase.length === 0) continue;

    const ids = new Set(inPhase.map((module) => module.id));
    const byId = new Map(inPhase.map((module) => [module.id, module]));
    const depths = new Map<string, number>();

    const depthOf = (module: Module, visiting: Set<string>): number => {
      const cached = depths.get(module.id);
      if (cached !== undefined) return cached;

      // Ciclo não deveria existir (o validador barra), mas se existir a
      // renderização não pode entrar em recursão infinita.
      if (visiting.has(module.id)) return 0;
      visiting.add(module.id);

      let depth = 0;
      for (const prerequisite of module.prerequisites) {
        if (!ids.has(prerequisite)) continue;
        const parent = byId.get(prerequisite);
        if (!parent) continue;
        depth = Math.max(depth, depthOf(parent, visiting) + 1);
      }

      visiting.delete(module.id);
      depths.set(module.id, depth);
      return depth;
    };

    for (const module of inPhase) depthOf(module, new Set());

    const rows: Module[][] = [];
    for (const module of inPhase) {
      const depth = depths.get(module.id) ?? 0;
      (rows[depth] ??= []).push(module);
    }

    for (const row of rows) row.sort((a, b) => a.order - b.order);

    bands.push({ phase, rows: rows.filter(Boolean) });
  }

  return bands;
}

interface Position {
  band: number;
  row: number;
}

function positions(bands: GraphBand[]): Map<string, Position> {
  const map = new Map<string, Position>();

  bands.forEach((band, bandIndex) => {
    band.rows.forEach((row, rowIndex) => {
      for (const module of row) map.set(module.id, { band: bandIndex, row: rowIndex });
    });
  });

  return map;
}

/**
 * Arestas que valem uma linha desenhada: as de curta distância.
 *
 * Dependência que pula várias linhas — "HTTP e API REST" depender de "Como a
 * web funciona", lá na fase anterior — não vira linha. Traçada, ela cortaria
 * pelo meio os cartões que estão no caminho, e o desenho vira ruído. Essa
 * informação já aparece escrita no topo do próprio cartão, que é como os mapas
 * de trilha resolvem isso.
 */
export function graphEdges(bands: GraphBand[]): GraphEdge[] {
  const at = positions(bands);
  const edges: GraphEdge[] = [];

  for (const band of bands) {
    for (const row of band.rows) {
      for (const module of row) {
        const alvo = at.get(module.id);
        if (!alvo) continue;

        for (const prerequisite of module.prerequisites) {
          const origem = at.get(prerequisite);
          if (!origem) continue;

          const mesmaBanda = origem.band === alvo.band && alvo.row - origem.row === 1;
          const bandaSeguinte = alvo.band - origem.band === 1 && alvo.row === 0;

          if (mesmaBanda || bandaSeguinte) edges.push({ from: prerequisite, to: module.id });
        }
      }
    }
  }

  return edges;
}

/**
 * Traçado ortogonal entre dois pontos: desce, faz a curva na altura média,
 * atravessa e desce de novo. Reto quando as colunas coincidem.
 */
export function connectorPath(x1: number, y1: number, x2: number, y2: number): string {
  if (Math.abs(x1 - x2) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const direction = x2 > x1 ? 1 : -1;
  const span = Math.abs(x2 - x1);
  const drop = Math.abs(y2 - y1);
  // O raio encolhe quando não há espaço para a curva inteira.
  const radius = Math.min(10, span / 2, drop / 2);
  const midY = y1 + (y2 - y1) / 2;

  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${midY - radius}`,
    `Q ${x1} ${midY} ${x1 + radius * direction} ${midY}`,
    `L ${x2 - radius * direction} ${midY}`,
    `Q ${x2} ${midY} ${x2} ${midY + radius}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}
