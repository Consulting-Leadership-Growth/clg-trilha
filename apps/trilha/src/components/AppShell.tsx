import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { CLGLogo, cn } from "@clg/design-system";
import { BookMarked, Map, Menu, TrendingUp, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tracks } from "@/content/tracks";
import { useCompletion } from "@/progress/useProgress";
import { ProgressMeter } from "./ProgressMeter";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const primaryNav: NavItem[] = [
  { to: "/", label: "Mapa da trilha", icon: Map, end: true },
  { to: "/glossario", label: "Glossário", icon: BookMarked },
  { to: "/progresso", label: "Meu progresso", icon: TrendingUp },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-[--duration-fast] ease-[--ease-standard]",
    isActive
      ? "bg-accent text-foreground"
      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { overall, byTrack } = useCompletion();

  // Navegar fecha o menu móvel e devolve o topo da página.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const sidebar = (
    <div className="flex h-full flex-col gap-8 overflow-y-auto px-5 py-6">
      <Link
        to="/"
        className="inline-flex w-fit rounded-md text-foreground transition-colors duration-[--duration-fast] hover:text-primary"
      >
        <CLGLogo variant="lockup" size={34} />
      </Link>

      <nav aria-label="Navegação principal" className="flex flex-col gap-1">
        {primaryNav.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col gap-1">
        <h2 className="px-3 pb-2 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Trilhas
        </h2>

        {tracks.map((track) => {
          const completion = byTrack.get(track.id);

          return (
            <NavLink key={track.id} to={`/trilha/${track.id}`} className={navLinkClass}>
              <span className="flex-1 truncate">{track.name}</span>
              <span className="font-mono text-xs text-muted-foreground" data-numeric>
                {completion ? `${completion.done}/${completion.total}` : ""}
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto border-t border-border pt-5">
        <ProgressMeter
          value={overall.ratio}
          label="Progresso geral"
          detail={`${overall.done} de ${overall.total}`}
          size="sm"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      {/* Barra lateral fixa a partir de lg. */}
      <aside className="sticky top-0 hidden h-dvh border-r border-border bg-card lg:block">
        {sidebar}
      </aside>

      {/* Barra superior no móvel. */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="text-foreground">
          <CLGLogo variant="compact" size={26} />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-[--duration-fast] hover:text-foreground"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] animate-rise border-r border-border bg-card">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="absolute right-4 top-5 inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-[--duration-fast] hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <div className="hidden justify-end px-8 pt-6 lg:flex">
          <ThemeToggle />
        </div>
        <main className="min-w-0 flex-1 px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-4">{children}</main>
      </div>
    </div>
  );
}
