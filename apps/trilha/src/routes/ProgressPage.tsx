import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Download, RotateCcw, Upload } from "lucide-react";
import { phases, tracks } from "@/content/tracks";
import { moduleById, totalHours } from "@/content/modules";
import { ProgressMeter } from "@/components/ProgressMeter";
import { useCompletion, useProgress } from "@/progress/useProgress";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProgressPage() {
  const { state, exportJson, importJson, reset } = useProgress();
  const { overall, byTrack, byPhase } = useCompletion();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "erro"; text: string } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const completed = Object.entries(state.completedModules)
    .map(([id, date]) => ({ module: moduleById.get(id), date }))
    .filter((item): item is { module: NonNullable<typeof item.module>; date: string } =>
      Boolean(item.module),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  function handleExport() {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `trilha-clg-progresso-${today}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setMessage({ tone: "ok", text: "Arquivo gerado. Mande para o seu mentor no próximo 1:1." });
  }

  async function handleImport(file: File) {
    const text = await file.text();
    const error = importJson(text);

    setMessage(
      error
        ? { tone: "erro", text: error }
        : { tone: "ok", text: "Progresso importado. As marcações foram substituídas." },
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="animate-rise">
        <h1 className="font-display text-4xl leading-tight text-foreground">Meu progresso</h1>
        <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
          Tudo fica salvo neste navegador, sem servidor e sem login. Para o seu mentor acompanhar,
          exporte o arquivo e mande no 1:1 — ele importa e vê exatamente onde você está.
        </p>
      </header>

      <section className="mt-10 rounded-lg border border-border bg-card px-5 py-5">
        <ProgressMeter
          value={overall.ratio}
          label="Trilha completa"
          detail={`${overall.done} de ${overall.total} módulos · ${overall.hoursDone} de ${totalHours} h`}
        />

        {state.startedAt && (
          <p className="mt-4 text-sm text-muted-foreground">
            Começou em <span className="text-foreground">{formatDate(state.startedAt)}</span>.
          </p>
        )}
      </section>

      <section className="mt-10" aria-labelledby="por-trilha">
        <h2 id="por-trilha" className="font-display text-xl text-foreground">
          Por trilha
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          {tracks.map((track) => {
            const completion = byTrack.get(track.id);
            if (!completion) return null;

            return (
              <Link
                key={track.id}
                to={`/trilha/${track.id}`}
                className="rounded-lg border border-border px-4 py-4 transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:border-primary/40 hover:bg-accent/40"
              >
                <ProgressMeter
                  value={completion.ratio}
                  label={track.name}
                  detail={`${completion.done} de ${completion.total}`}
                  size="sm"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="por-fase">
        <h2 id="por-fase" className="font-display text-xl text-foreground">
          Por fase
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          {phases.map((phase) => {
            const completion = byPhase.get(phase.id);
            if (!completion) return null;

            return (
              <div key={phase.id} className="rounded-lg border border-border px-4 py-4">
                <ProgressMeter
                  value={completion.ratio}
                  label={`${phase.title} · dias ${phase.dayRange[0]}–${phase.dayRange[1]}`}
                  detail={`${completion.done} de ${completion.total}`}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="concluidos">
        <h2 id="concluidos" className="font-display text-xl text-foreground">
          Módulos concluídos
        </h2>

        {completed.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-border px-5 py-8 text-center text-sm text-muted-foreground">
            Nada marcado ainda. Comece pelo{" "}
            <Link to="/trilha/core/boas-vindas" className="text-primary hover:underline">
              primeiro módulo
            </Link>{" "}
            — leva umas duas horas.
          </p>
        ) : (
          <ul className="mt-4 rounded-lg border border-border bg-card">
            {completed.map(({ module, date }) => (
              <li key={module.id} className="border-b border-border last:border-b-0">
                <Link
                  to={`/trilha/${module.trackId}/${module.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-[--duration-fast] hover:bg-accent/40"
                >
                  <span className="min-w-0 truncate text-sm text-foreground">{module.title}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground" data-numeric>
                    {formatDate(date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12 border-t border-border pt-8" aria-labelledby="dados">
        <h2 id="dados" className="font-display text-xl text-foreground">
          Levar seu progresso com você
        </h2>
        <p className="prose-measure mt-2 text-sm leading-relaxed text-muted-foreground">
          Trocou de máquina ou limpou o navegador? Exporte antes e importe depois.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:bg-[hsl(var(--clg-gold-strong))]"
          >
            <Download className="size-4" aria-hidden />
            Exportar progresso
          </button>

          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-foreground transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:border-primary/40"
          >
            <Upload className="size-4" aria-hidden />
            Importar arquivo
          </button>

          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImport(file);
              // Permite reimportar o mesmo arquivo depois de um erro.
              event.target.value = "";
            }}
          />

          {confirmingReset ? (
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirmingReset(false);
                  setMessage({ tone: "ok", text: "Progresso apagado." });
                }}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--destructive)] px-4 py-2.5 text-sm text-[var(--destructive)] transition-colors duration-[--duration-fast] hover:bg-[var(--destructive)]/10"
              >
                Apagar mesmo
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-[--duration-fast] hover:text-foreground"
              >
                Cancelar
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-[--duration-fast] hover:text-foreground"
            >
              <RotateCcw className="size-4" aria-hidden />
              Zerar progresso
            </button>
          )}
        </div>

        {message && (
          <p
            role="status"
            className={
              message.tone === "erro"
                ? "mt-4 animate-rise rounded-md border border-[var(--destructive)] bg-[var(--destructive)]/10 px-4 py-3 text-sm text-foreground"
                : "mt-4 animate-rise rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
            }
          >
            {message.text}
          </p>
        )}
      </section>
    </div>
  );
}
