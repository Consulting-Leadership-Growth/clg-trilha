import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const THEME_KEY = "clg-trilha:theme";

function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    // Aba anônima ou storage bloqueado: o tema da marca é o escuro.
    return "dark";
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  useEffect(() => {
    // O design system inverte os tokens pela classe `light` na raiz.
    document.documentElement.classList.toggle("light", theme === "light");

    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Preferência não persiste, mas a sessão atual continua correta.
    }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={next === "light" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      aria-label={next === "light" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-[--duration-fast] hover:border-primary/40 hover:text-foreground"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
