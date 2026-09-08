# @clg/design-system

Tokens de marca, tema para shadcn/ui e componentes de identidade da CLG.
Source-first: não há etapa de build. Os projetos consumidores compilam o TypeScript
direto pelo próprio bundler (Vite, Next, Electron).

## Instalação

### Monorepo (recomendado)

```
apps/
  discord-clone/
  site-institucional/
packages/
  design-system/     <- esta pasta
```

`package.json` da raiz:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

No app consumidor:

```bash
pnpm add @clg/design-system@workspace:*
```

### Projeto isolado (via Git)

```bash
pnpm add github:clg/design-system#v0.1.0
```

Como o pacote exporta `.ts` e `.tsx` sem transpilar, o consumidor precisa incluir
`node_modules/@clg/design-system/src` no escopo do bundler. No Vite:

```ts
export default defineConfig({
  optimizeDeps: { exclude: ["@clg/design-system"] },
});
```

## Uso

### 1. Tema

Importe a folha de tema antes de qualquer CSS do app:

```css
@import "@clg/design-system/theme.css";
```

Isso registra as variáveis que o shadcn/ui consome (`--primary`, `--background`,
`--border`, `--ring` etc.) e o bloco `@theme inline` do Tailwind v4.

O tema é dark por padrão, alinhado à identidade. Para telas claras, aplique a
classe `light` em um contêiner ou no `<html>`.

### 2. Fontes

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;300;400;600&family=Lato:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
```

`IBM Plex Sans` cobre display e títulos. `Lato` cobre corpo e interface.

### 3. Componentes de marca

```tsx
import { CLGLogo, CLGSymbol } from "@clg/design-system";

<CLGLogo variant="lockup" size={40} />
<CLGLogo variant="compact" size={28} />
<CLGSymbol size={20} className="text-primary" accessibleLabel="CLG" />
```

O símbolo usa `currentColor`. A cor vem do contexto — `text-primary` para dourado,
`text-foreground` para claro. Não existe variante de cor hardcoded no componente.

### 4. Tokens em TypeScript

Para casos fora do CSS (Canvas, geração de PDF, e-mail transacional, temas de
gráficos):

```ts
import { clgPalette, clgTypography, clgMotion } from "@clg/design-system/tokens";

const gold = clgPalette.gold.hex;
const easing = clgMotion.easings.standard;
```

### 5. shadcn/ui

Copie o `components.json` deste pacote para a raiz do app e ajuste o caminho do
CSS. Depois:

```bash
pnpm dlx shadcn@latest add button dialog dropdown-menu tooltip scroll-area
```

Os componentes gerados leem as variáveis do tema automaticamente. Não altere as
cores dentro deles: ajuste os tokens em `theme.css`.

## Paleta

| Token | Hex | Papel |
| --- | --- | --- |
| `gold` | `#D8B23A` | Ação primária, destaque, foco |
| `goldStrong` | `#B8942A` | Dourado sobre fundo claro |
| `black` | `#0D0D0D` | Fundo base |
| `surface` | `#141414` | Cards, painéis |
| `elevated` | `#1C1C1C` | Popover, menus, estados hover |
| `line` | `#292929` | Bordas e divisores |
| `mist` | `#E6E6E6` | Texto primário |
| `steel` | `#666666` | Borda de ênfase, ícone decorativo, estado desabilitado |
| `steelText` | `#858585` | Texto secundário sobre fundo escuro |

O dourado é acento, não superfície. Áreas grandes preenchidas de `#D8B23A`
quebram o contraste do texto e descaracterizam a marca — use em ícone ativo,
borda de foco, botão primário e nada além disso.

## Assets

`assets/clg-symbol.svg` usa `currentColor` e serve para embutir em HTML.
As variantes `-white`, `-gold` e `-black` têm cor fixa, para contextos que não
herdam cor (e-mail, README, OG image). `favicon.svg` já vem com o contêiner
preto arredondado.

## Acessibilidade

`CLGSymbol` é decorativo por padrão (`aria-hidden`). Passe `accessibleLabel`
apenas quando o logo for a única identificação da página ou o conteúdo de um
link. O contraste de `mist` sobre `black` é 15.9:1 e o de `gold` sobre `black`
é 9.2:1 — ambos passam em AAA para texto normal.

Duas correções de contraste aplicadas na v0.2.0:

- `--muted-foreground` no tema escuro passou de `steel` (#666, **3.4:1** — reprova
  em AA) para `steelText` (#858585, 5.3:1). No tema claro `steel` sobre branco dá
  5.7:1 e foi mantido.
- `--primary-foreground` no tema claro passou de branco sobre `goldStrong`
  (**2.9:1** — reprova) para o preto da marca (6.8:1), alinhando com o tema escuro,
  onde o rótulo do botão primário também é escuro.

Ao escolher cor de texto, prefira sempre o token semântico (`--foreground`,
`--muted-foreground`) a um token de paleta: os semânticos já estão calibrados
para os dois temas.

## Versionamento

Mudança de valor de token é `minor`. Remoção ou renomeação de token exportado
é `major`. Novo componente de marca é `minor`.
