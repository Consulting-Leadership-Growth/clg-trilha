import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // O design system é source-first: exporta .ts/.tsx sem transpilar.
  // Excluir do pre-bundle faz o Vite compilar junto com o app.
  optimizeDeps: {
    exclude: ["@clg/design-system"],
  },
});
