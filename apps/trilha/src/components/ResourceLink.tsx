import {
  ArrowUpRight,
  Award,
  BookOpen,
  FileText,
  GraduationCap,
  Lock,
  PlayCircle,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Resource, ResourceKind } from "@/content/types";

const kindIcon: Record<ResourceKind, LucideIcon> = {
  curso: GraduationCap,
  doc: FileText,
  artigo: BookOpen,
  video: PlayCircle,
  livro: BookOpen,
  ferramenta: Wrench,
};

const kindLabel: Record<ResourceKind, string> = {
  curso: "Curso",
  doc: "Documentação",
  artigo: "Artigo",
  video: "Vídeo",
  livro: "Livro",
  ferramenta: "Ferramenta",
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `${hours} h`;
}

export function ResourceLink({ resource }: { resource: Resource }) {
  const Icon = kindIcon[resource.kind];

  const meta = (
    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      <span>{kindLabel[resource.kind]}</span>
      {resource.source && (
        <>
          <span aria-hidden>·</span>
          <span>{resource.source}</span>
        </>
      )}
      {resource.minutes !== undefined && (
        <>
          <span aria-hidden>·</span>
          <span data-numeric>{formatDuration(resource.minutes)}</span>
        </>
      )}
      {resource.certificate && (
        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[0.6875rem] text-accent-foreground">
          <Award className="size-3" aria-hidden />
          Emite certificado
        </span>
      )}
    </span>
  );

  // Recurso interno ainda sem URL: mostrar o que falta é melhor que
  // entregar um link quebrado ou esconder que o material existe.
  if (resource.internal && !resource.url) {
    return (
      <li className="flex items-start gap-3 rounded-md border border-dashed border-border px-3 py-3">
        <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="min-w-0">
          <span className="block text-sm text-foreground">{resource.label}</span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Material interno — peça o link ao seu mentor.
          </span>
        </span>
      </li>
    );
  }

  return (
    <li>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-start gap-3 rounded-md border border-border px-3 py-3 transition-colors duration-[--duration-fast] ease-[--ease-standard] hover:border-primary/50 hover:bg-accent/50"
      >
        <Icon
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors duration-[--duration-fast] group-hover:text-primary"
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-foreground">{resource.label}</span>
          {meta}
        </span>
        <ArrowUpRight
          className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-[--duration-fast] group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
      </a>
    </li>
  );
}
