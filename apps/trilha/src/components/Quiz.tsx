import { cn } from "@clg/design-system";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/content/types";
import { useProgress } from "@/progress/useProgress";
import { RichText } from "./RichText";

function QuestionCard({ question }: { question: QuizQuestion }) {
  const { state, answerQuiz } = useProgress();
  const answered = state.quizAnswers[question.id];
  const hasAnswered = answered !== undefined;
  const isCorrect = answered === question.answerIndex;

  return (
    <div className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <p className="font-sans text-[0.9375rem] text-foreground"><RichText>{question.question}</RichText></p>

      <div role="group" aria-label={question.question} className="mt-3 flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isChosen = answered === index;
          const isAnswer = index === question.answerIndex;
          // Depois de responder, a alternativa correta sempre aparece marcada,
          // mesmo quando o dev escolheu outra: o objetivo é ensinar, não pontuar.
          const reveal = hasAnswered && (isChosen || isAnswer);

          return (
            <button
              key={option}
              type="button"
              disabled={hasAnswered}
              onClick={() => answerQuiz(question.id, index)}
              aria-pressed={isChosen}
              className={cn(
                "flex items-start gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors duration-[--duration-fast] ease-[--ease-standard]",
                !hasAnswered &&
                  "border-border text-muted-foreground hover:border-primary/40 hover:bg-accent/50 hover:text-foreground",
                hasAnswered && !reveal && "border-border text-muted-foreground opacity-60",
                reveal && isAnswer && "border-[var(--success)] bg-[var(--success)]/10 text-foreground",
                reveal &&
                  !isAnswer &&
                  "border-[var(--destructive)] bg-[var(--destructive)]/10 text-foreground",
              )}
            >
              <span className="mt-0.5 shrink-0">
                {reveal && isAnswer && <Check className="size-4 text-[var(--success)]" aria-hidden />}
                {reveal && !isAnswer && <X className="size-4 text-[var(--destructive)]" aria-hidden />}
                {!reveal && (
                  <span className="block size-4 rounded-full border border-current opacity-40" />
                )}
              </span>
              <span><RichText>{option}</RichText></span>
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <p
          role="status"
          className="mt-3 animate-rise rounded-md border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground"
        >
          <span className={cn("font-semibold", isCorrect ? "text-[var(--success)]" : "text-primary")}>
            {isCorrect ? "Isso mesmo. " : "Quase. "}
          </span>
          <RichText>{question.explanation}</RichText>
        </p>
      )}
    </div>
  );
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { state, clearQuizAnswers } = useProgress();
  const answeredCount = questions.filter((q) => state.quizAnswers[q.id] !== undefined).length;

  function retry() {
    clearQuizAnswers(questions.map((question) => question.id));
  }

  return (
    <section aria-labelledby="quiz-titulo">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="quiz-titulo" className="font-display text-xl text-foreground">
          Confira se entendeu
        </h2>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors duration-[--duration-fast] hover:bg-accent hover:text-foreground"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Responder de novo
          </button>
        )}
      </div>

      <div className="rounded-lg border border-border px-4 py-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
}
