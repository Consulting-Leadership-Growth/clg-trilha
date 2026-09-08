import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/content/glossary";
import { RichText } from "@/components/RichText";

/** Ignora acento e caixa: "producao" precisa encontrar "Produção". */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function slugify(term: string): string {
  return normalize(term).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function Glossary() {
  const [query, setQuery] = useState("");

  const entries = useMemo(() => {
    const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "pt-BR"));
    const needle = normalize(query.trim());
    if (!needle) return sorted;

    return sorted.filter(
      (entry) =>
        normalize(entry.term).includes(needle) || normalize(entry.definition).includes(needle),
    );
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="animate-rise">
        <h1 className="font-display text-4xl leading-tight text-foreground">Glossário</h1>
        <p className="prose-measure mt-4 text-base leading-relaxed text-muted-foreground">
          As palavras que o time usa sem perceber. Ouviu algo numa reunião e não está aqui? Abra uma
          PR adicionando — é um ótimo primeiro exercício de contribuição.
        </p>

        <div className="relative mt-8">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar termo ou definição"
            aria-label="Buscar no glossário"
            className="w-full rounded-md border border-border bg-card py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-[--duration-fast] focus:border-primary/50"
          />
        </div>

        <p className="mt-3 text-xs text-muted-foreground" data-numeric role="status">
          {entries.length} {entries.length === 1 ? "termo" : "termos"}
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="mt-12 rounded-lg border border-dashed border-border px-5 py-10 text-center text-sm text-muted-foreground">
          Nenhum termo encontrado para “{query}”. Se é uma palavra que você ouviu aqui dentro, ela
          merece entrar no glossário.
        </p>
      ) : (
        <dl className="mt-10 flex flex-col">
          {entries.map((entry) => (
            <div
              key={entry.term}
              id={slugify(entry.term)}
              className="scroll-mt-8 border-t border-border py-5 first:border-t-0 first:pt-0"
            >
              <dt className="font-display text-lg text-foreground">{entry.term}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                <RichText>{entry.definition}</RichText>

                {entry.seeAlso && entry.seeAlso.length > 0 && (
                  <span className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">Veja também</span>
                    {entry.seeAlso.map((related) => (
                      <a
                        key={related}
                        href={`#${slugify(related)}`}
                        onClick={() => setQuery("")}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground transition-colors duration-[--duration-fast] hover:border-primary/50 hover:text-primary"
                      >
                        {related}
                      </a>
                    ))}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
