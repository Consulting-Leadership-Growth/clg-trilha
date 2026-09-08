import { Link, Navigate, useParams } from "react-router-dom";
import { cn } from "@clg/design-system";
import { ArrowLeft, ArrowRight, Check, Clock, Target } from "lucide-react";
import { moduleById, modulesForTrackPath } from "@/content/modules";
import { phaseById, trackById } from "@/content/tracks";
import type { Module } from "@/content/types";
import { CodeBlock } from "@/components/CodeBlock";
import { Quiz } from "@/components/Quiz";
import { ResourceLink } from "@/components/ResourceLink";
import { RichText } from "@/components/RichText";
import { useProgress } from "@/progress/useProgress";

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const module = moduleId ? moduleById.get(moduleId) : undefined;

  if (!module) return <Navigate to="/" replace />;

  // A chave remonta a página inteira ao trocar de módulo, zerando o
  // estado local dos filhos em vez de misturar dois módulos.
  return <ModuleView key={module.id} module={module} />;
}

function ModuleView({ module }: { module: Module }) {
  const { isModuleComplete, toggleModule, isCriterionChecked, toggleCriterion, state, setNote } =
    useProgress();

  const track = trackById.get(module.trackId);
  const phase = phaseById.get(module.phaseId);
  const isDone = isModuleComplete(module.id);

  // Anterior/próximo caminham dentro do caminho da trilha (a própria + a base),
  // não da lista global: sair do último módulo de front e cair no primeiro de
  // back-end seria um salto que ninguém pediu.
  const path = modulesForTrackPath(module.trackId);
  const index = path.findIndex((item) => item.id === module.id);
  const previous = index > 0 ? path[index - 1] : undefined;
  const next = index < path.length - 1 ? path[index + 1] : undefined;

  const prerequisites = module.prerequisites
    .map((id) => moduleById.get(id))
    .filter((item): item is Module => item !== undefined);

  const checkedCount = module.doneWhen.filter((_, i) => isCriterionChecked(module.id, i)).length;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Link
        to={`/trilha/${module.trackId}`}
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-[--duration-fast] hover:text-foreground"
      >
        <ArrowLeft
          className="size-4 transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:-translate-x-0.5"
          aria-hidden
        />
        {track?.name ?? "Voltar"}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 animate-rise">
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            {module.title}
          </h1>

          <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
            <RichText>{module.summary}</RichText>
          </p>

          <div className="prose-measure mt-8 flex flex-col gap-6">
            <section>
              <h2 className="flex items-center gap-2 font-display text-lg text-foreground">
                <Target className="size-4 text-primary" aria-hidden />
                O que você vai saber fazer
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <RichText>{module.goal}</RichText>
              </p>
            </section>

            <section className="rounded-lg border border-border bg-card px-4 py-4">
              <h2 className="font-display text-base text-foreground">Por que isso importa aqui</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <RichText>{module.whyHere}</RichText>
              </p>
            </section>
          </div>

          <section className="mt-10" aria-labelledby="recursos">
            <h2 id="recursos" className="font-display text-xl text-foreground">
              Material de estudo
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {module.resources.map((resource) => (
                <ResourceLink key={resource.label} resource={resource} />
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="exercicio">
            <h2 id="exercicio" className="font-display text-xl text-foreground">
              {module.exercise.title}
            </h2>
            <p className="prose-measure mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
              <RichText>{module.exercise.description}</RichText>
            </p>

            <ol className="prose-measure mt-5 flex flex-col gap-3">
              {module.exercise.steps.map((step, stepIndex) => (
                <li key={step} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                  <span
                    className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[0.6875rem] text-muted-foreground"
                    data-numeric
                    aria-hidden
                  >
                    {stepIndex + 1}
                  </span>
                  <span className="text-muted-foreground"><RichText>{step}</RichText></span>
                </li>
              ))}
            </ol>

            {module.exercise.snippet && (
              <div className="mt-6">
                <CodeBlock
                  language={module.exercise.snippet.language}
                  code={module.exercise.snippet.code}
                />
              </div>
            )}
          </section>

          <section className="mt-10" aria-labelledby="pronto-quando">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 id="pronto-quando" className="font-display text-xl text-foreground">
                Pronto quando
              </h2>
              <span className="font-mono text-xs text-muted-foreground" data-numeric>
                {checkedCount} de {module.doneWhen.length}
              </span>
            </div>

            <ul className="flex flex-col gap-1">
              {module.doneWhen.map((criterion, criterionIndex) => {
                const checked = isCriterionChecked(module.id, criterionIndex);

                return (
                  <li key={criterion}>
                    <button
                      type="button"
                      onClick={() => toggleCriterion(module.id, criterionIndex)}
                      aria-pressed={checked}
                      className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:bg-accent/60"
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded border transition-all duration-[--duration-fast] ease-[--ease-standard]",
                          checked
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-transparent",
                        )}
                      >
                        <Check className="size-3" aria-hidden />
                      </span>
                      <span
                        className={cn(
                          "text-[0.9375rem] leading-relaxed transition-colors duration-[--duration-fast]",
                          checked ? "text-muted-foreground line-through" : "text-foreground",
                        )}
                      >
                        <RichText>{criterion}</RichText>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {module.quiz && module.quiz.length > 0 && (
            <div className="mt-12">
              <Quiz questions={module.quiz} />
            </div>
          )}

          <section className="mt-12" aria-labelledby="anotacoes">
            <h2 id="anotacoes" className="font-display text-xl text-foreground">
              Suas anotações
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              O que travou, o que ficou claro, o que perguntar no próximo 1:1. Fica salvo neste
              navegador.
            </p>
            <textarea
              value={state.notes[module.id] ?? ""}
              onChange={(event) => setNote(module.id, event.target.value)}
              rows={4}
              placeholder="Ex.: entendi rebase, mas ainda não sei quando preferir a merge…"
              aria-label={`Anotações sobre ${module.title}`}
              className="mt-4 w-full resize-y rounded-lg border border-border bg-card px-3 py-3 text-[0.9375rem] leading-relaxed text-foreground placeholder:text-muted-foreground/70 transition-colors duration-[--duration-fast] focus:border-primary/50"
            />
          </section>

          <nav
            aria-label="Navegação entre módulos"
            className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between"
          >
            {previous ? (
              <Link
                to={`/trilha/${previous.trackId}/${previous.id}`}
                className="group flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border px-4 py-3 transition-colors duration-[--duration-fast] hover:border-primary/40"
              >
                <ArrowLeft
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:-translate-x-0.5"
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Anterior</span>
                  <span className="block truncate text-sm text-foreground">{previous.title}</span>
                </span>
              </Link>
            ) : (
              <span className="flex-1" />
            )}

            {next && (
              <Link
                to={`/trilha/${next.trackId}/${next.id}`}
                className="group flex min-w-0 flex-1 items-center justify-end gap-3 rounded-md border border-border px-4 py-3 text-right transition-colors duration-[--duration-fast] hover:border-primary/40"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Próximo</span>
                  <span className="block truncate text-sm text-foreground">{next.title}</span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-[--duration-fast] ease-[--ease-standard] group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </nav>
        </div>

        {/* Trilho de meta e ação. Acompanha a leitura a partir de lg. */}
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <div className="flex flex-col gap-5 rounded-lg border border-border bg-card px-5 py-5">
            <button
              type="button"
              onClick={() => toggleModule(module.id)}
              aria-pressed={isDone}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-[--duration-fast] ease-[--ease-standard]",
                isDone
                  ? "border border-border text-muted-foreground hover:text-foreground"
                  : "bg-primary text-primary-foreground hover:bg-[hsl(var(--clg-gold-strong))]",
              )}
            >
              {isDone ? (
                <>
                  <Check className="size-4 text-primary" aria-hidden />
                  Concluído
                </>
              ) : (
                "Marcar como concluído"
              )}
            </button>

            <dl className="flex flex-col gap-3 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Fase</dt>
                <dd className="text-foreground">{phase?.title}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Trilha</dt>
                <dd className="text-foreground">{track?.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Dedicação</dt>
                <dd className="flex items-center gap-1.5 text-foreground" data-numeric>
                  <Clock className="size-3.5 text-muted-foreground" aria-hidden />
                  {module.estimatedHours} h
                </dd>
              </div>
            </dl>

            {prerequisites.length > 0 && (
              <div className="border-t border-border pt-4">
                <h2 className="text-sm text-muted-foreground">Antes deste, faça</h2>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {prerequisites.map((prerequisite) => (
                    <li key={prerequisite.id}>
                      <Link
                        to={`/trilha/${prerequisite.trackId}/${prerequisite.id}`}
                        className="flex items-center gap-2 text-sm text-foreground transition-colors duration-[--duration-fast] hover:text-primary"
                      >
                        <span
                          className={cn(
                            "inline-flex size-4 shrink-0 items-center justify-center rounded-full border",
                            isModuleComplete(prerequisite.id)
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-transparent",
                          )}
                        >
                          <Check className="size-2.5" aria-hidden />
                        </span>
                        {prerequisite.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
