import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Contexto sem permissão de área de transferência: o código continua
      // visível e selecionável, então não há nada a comunicar.
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors duration-[--duration-fast] hover:bg-accent hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-primary" aria-hidden />
              Copiado
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden />
              Copiar
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-3">
        <code className="font-mono text-[0.8125rem] leading-relaxed text-foreground">{code}</code>
      </pre>
    </div>
  );
}
