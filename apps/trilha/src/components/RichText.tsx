import { Fragment } from "react";

/**
 * O conteúdo da trilha escreve identificadores entre crases — `useEffect`,
 * `.env`, `docker compose up`. Renderizar como código inline é o mínimo:
 * crase crua na tela é ruído, e o dev precisa distinguir prosa de comando.
 *
 * Deliberadamente não é Markdown. Uma marcação só, previsível, sem
 * dependência e sem HTML vindo de string.
 */
export function RichText({ children }: { children: string }) {
  const parts = children.split("`");

  return (
    <>
      {parts.map((part, index) => {
        // Índice ímpar = trecho entre crases. Uma crase solta no fim deixa o
        // último pedaço em índice par e ele sai como texto comum.
        const isCode = index % 2 === 1;

        return isCode ? (
          <code
            key={index}
            className="rounded border border-border bg-secondary px-1 py-0.5 font-mono text-[0.875em] text-foreground"
          >
            {part}
          </code>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        );
      })}
    </>
  );
}
