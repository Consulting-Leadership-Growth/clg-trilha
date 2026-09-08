import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Module } from "@/content/types";
import { useProgress } from "@/progress/useProgress";
import { GraphNode } from "./GraphNode";
import { connectorPath, graphEdges, layoutGraph } from "./layout";

interface DrawnEdge {
  key: string;
  d: string;
  /** Origem concluída: o caminho acende. É o retorno visual do progresso. */
  lit: boolean;
}

interface RoadmapGraphProps {
  list: Module[];
  nextModuleId: string | null;
  showTrack?: boolean;
}

export function RoadmapGraph({ list, nextModuleId, showTrack = false }: RoadmapGraphProps) {
  const { isModuleComplete } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [edgesDrawn, setEdgesDrawn] = useState<DrawnEdge[]>([]);

  const bands = useMemo(() => layoutGraph(list), [list]);
  const edges = useMemo(() => graphEdges(bands), [bands]);

  // Muda quando alguma conclusão muda: é o gatilho para reacender os caminhos.
  const completionKey = list
    .map((module) => (isModuleComplete(module.id) ? "1" : "0"))
    .join("");

  const registerNode = useCallback((id: string, element: HTMLAnchorElement | null) => {
    if (element) nodeRefs.current.set(id, element);
    else nodeRefs.current.delete(id);
  }, []);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const origin = container.getBoundingClientRect();
    const drawn: DrawnEdge[] = [];

    // Limite de comprimento derivado da geometria real, não de número mágico:
    // uma ligação mais alta que dois cartões empilhados atravessaria a fileira
    // do meio e cortaria os cartões que estiverem no caminho. Essas dependências
    // continuam visíveis — escritas no topo do cartão de destino.
    let tallest = 0;
    for (const element of nodeRefs.current.values()) {
      tallest = Math.max(tallest, element.getBoundingClientRect().height);
    }
    const maxSpan = Math.max(tallest * 2.2, 340);

    for (const edge of edges) {
      const from = nodeRefs.current.get(edge.from);
      const to = nodeRefs.current.get(edge.to);
      if (!from || !to) continue;

      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();

      // Coordenadas relativas ao container, somando o scroll interno para o
      // traçado acompanhar quando o grafo rola na horizontal.
      const x1 = a.left - origin.left + container.scrollLeft + a.width / 2;
      const y1 = a.bottom - origin.top + container.scrollTop;
      const x2 = b.left - origin.left + container.scrollLeft + b.width / 2;
      const y2 = b.top - origin.top + container.scrollTop;

      // Aresta que sobe significaria voltar atrás: o validador impede, mas se
      // acontecer é melhor não desenhar do que desenhar errado.
      if (y2 < y1) continue;
      if (y2 - y1 > maxSpan) continue;

      drawn.push({
        key: `${edge.from}->${edge.to}`,
        d: connectorPath(x1, y1, x2, y2),
        lit: isModuleComplete(edge.from),
      });
    }

    setEdgesDrawn((current) => {
      if (current.length === drawn.length) {
        const igual = current.every(
          (item, index) =>
            item.key === drawn[index]?.key &&
            item.d === drawn[index]?.d &&
            item.lit === drawn[index]?.lit,
        );
        // Evita re-render em loop com o ResizeObserver quando nada mudou.
        if (igual) return current;
      }
      return drawn;
    });
  }, [edges, isModuleComplete]);

  useLayoutEffect(() => {
    measure();
  }, [measure, completionKey, bands]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    for (const element of nodeRefs.current.values()) observer.observe(element);

    // Fonte web carregando depois muda a altura dos cartões.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(() => measure()).catch(() => {});

    window.addEventListener("resize", measure);
    container.addEventListener("scroll", measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      container.removeEventListener("scroll", measure);
    };
  }, [measure, bands]);

  return (
    <div ref={containerRef} className="relative overflow-x-auto pb-4">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        {edgesDrawn.map((edge) => (
          <path
            key={edge.key}
            d={edge.d}
            fill="none"
            strokeWidth={edge.lit ? 1.5 : 1}
            stroke={edge.lit ? "var(--color-primary)" : "var(--color-border)"}
            strokeOpacity={edge.lit ? 0.85 : 1}
            className="transition-[stroke,stroke-width,stroke-opacity] duration-[--duration-base] ease-[--ease-standard]"
          />
        ))}
      </svg>

      <div className="relative flex min-w-fit flex-col">
        {bands.map((band) => (
          <section key={band.phase.id} aria-labelledby={`banda-${band.phase.id}`}>
            <div className="flex items-center gap-4 py-8 first:pt-0">
              <span aria-hidden className="h-px flex-1 bg-border" />
              <h2
                id={`banda-${band.phase.id}`}
                className="flex items-baseline gap-2.5 whitespace-nowrap"
              >
                <span className="font-display text-sm uppercase tracking-[0.16em] text-foreground">
                  {band.phase.title}
                </span>
                <span className="font-mono text-[0.6875rem] text-muted-foreground" data-numeric>
                  dias {band.phase.dayRange[0]}–{band.phase.dayRange[1]}
                </span>
              </h2>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-12">
              {band.rows.map((row, rowIndex) => (
                <div
                  key={`${band.phase.id}-${rowIndex}`}
                  /*
                   * Quebra de linha permitida de propósito. Cada fileira é um
                   * nível de dependência, e o ideal seria não quebrar — mas
                   * forçar isso empurra a visão geral para 1928px e obriga a
                   * rolar a home na horizontal, o que é pior. Os conectores são
                   * medidos da posição real, então continuam corretos mesmo
                   * quando uma fileira ocupa duas linhas.
                   */
                  className="flex flex-wrap justify-center gap-x-8 gap-y-10"
                >
                  {row.map((module) => (
                    <GraphNode
                      key={module.id}
                      module={module}
                      status={
                        isModuleComplete(module.id)
                          ? "concluido"
                          : module.prerequisites.some((id) => !isModuleComplete(id))
                            ? "sugerido-depois"
                            : "disponivel"
                      }
                      isNext={module.id === nextModuleId}
                      showTrack={showTrack}
                      ref={(element) => registerNode(module.id, element)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
