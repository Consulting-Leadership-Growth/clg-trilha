# Trilha CLG

Roadmap interativo de 90 dias para novos desenvolvedores da CLG. Front-end, back-end e DevOps,
com material de estudo, exercícios práticos e critérios objetivos de conclusão.

O app consome o `@clg/design-system`, então a própria trilha é o primeiro exemplo real da stack e
da identidade que o dev novo vai trabalhar.

## Rodando

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o app em desenvolvimento |
| `npm run build` | Valida o conteúdo, verifica tipos e gera o `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run typecheck` | Verifica tipos em todos os workspaces |
| `npm run validar --workspace=trilha` | Só a validação de integridade do conteúdo |

Requer Node 20 ou superior.

## As trilhas

São três caminhos **independentes**, não um catálogo comum filtrado. Quem segue back-end nunca vê
módulo de CSS; quem segue front-end nunca vê modelagem de banco.

| Trilha | Módulos | Horas |
| --- | --- | --- |
| Front-end | 28 | 294 h |
| Back-end | 27 | 296 h |
| DevOps | 26 | 266 h |

Cada caminho inclui a **base comum** (15 módulos: ambientação, terminal, Git, HTTP, JavaScript,
TypeScript e a fase final de integração) mais os módulos da própria disciplina. "Base comum" não é
uma trilha de estudo — é a interseção das outras três.

## Estrutura

```
apps/trilha/              # o app (Vite + React + TS + Tailwind v4)
  src/content/            # TODO o conteúdo da trilha, em TypeScript tipado
  src/progress/           # progresso em localStorage
  src/components/
  src/routes/
packages/design-system/   # @clg/design-system: tokens, tema e marca
```

O projeto usa **npm workspaces**. O `pnpm` exigiria privilégio de administrador nesta máquina
(`corepack enable pnpm` falha com `EPERM`); se o time preferir pnpm, a estrutura já está pronta —
basta habilitar e trocar o lockfile.

## Editando o conteúdo

O conteúdo é dado, não JSX. Para mexer, você não precisa abrir um componente:

| Arquivo | Conteúdo |
| --- | --- |
| `src/content/tracks.ts` | As quatro fases e as quatro trilhas |
| `src/content/modules/*.ts` | Os módulos, um arquivo por trilha |
| `src/content/glossary.ts` | O glossário |
| `src/content/types.ts` | O contrato de todos os campos |

Um módulo tem objetivo, um porquê ligado à CLG, material de estudo, exercício prático,
critérios de "pronto quando" e, opcionalmente, um quiz.

Dois campos governam a estrutura e valem a leitura antes de mexer:

- **`order`** define a sequência da trilha inteira, em passos de 10. A posição no arquivo não
  importa — é isso que permite um fundamento de front (HTML) vir antes de um da base (JavaScript)
  sem desorganizar os arquivos.
- **`paths`** diz em quais trilhas o módulo entra. Omitido, é derivado: `core` entra nas três,
  especialização entra só na própria. Declare quando for compartilhado por algumas — Docker é de
  DevOps, mas o back-end também precisa.

`npm run validar` roda antes de todo build e barra id repetido, pré-requisito inexistente,
dependência que aponta para frente e — a regra que mantém as trilhas separadas — pré-requisito
que não existe em algum caminho que contém o módulo.

Em qualquer texto de conteúdo, trechos entre crases viram código inline na tela —
`` `docker compose up` `` renderiza como código, não como crase crua.

### Recursos internos

Material que só existe dentro da CLG entra com `internal: true` e `url` vazia. A interface mostra
"peça o link ao seu mentor" em vez de um link quebrado. O que ainda falta preencher está listado
em [CONTEUDO-PENDENTE.md](CONTEUDO-PENDENTE.md).

## O mapa da tela inicial

A home desenha o roadmap como um grafo de dependências: cada cartão é um módulo, as linhas ligam
pré-requisito a consequência, e as bandas separam as fases. Conforme o dev conclui módulos, os
cartões ficam dourados e **as linhas que saem deles acendem** — o caminho se ilumina conforme ele
avança.

Quatro estados por cartão: concluído (dourado, com marca), próximo passo (borda acesa e etiqueta
"Comece aqui"), disponível e ainda-não (recuado, com cadeado). O bloqueio é visual, não real: dá
para abrir qualquer módulo a qualquer momento.

Detalhes de implementação que valem saber antes de mexer em `components/roadmap/`:

- O layout empilha os módulos por profundidade de dependência **dentro de cada fase**. Dependência
  que atravessa fase não empurra o módulo para baixo — senão "Ler o código de outra pessoa", que
  não tem pré-requisito, subiria para a primeira linha do roadmap.
- Os conectores são medidos do DOM real (`ResizeObserver` + posição dos cartões), não calculados a
  partir de um grid teórico. É o que mantém o traçado certo quando a fonte carrega ou a janela muda.
- Ligações muito longas **não** são desenhadas. Traçadas, cortariam ao meio os cartões no caminho.
  Essa dependência aparece escrita no topo do cartão de destino, e o rótulo também acende quando o
  pré-requisito é cumprido.
- Abaixo de 1024px o grafo é substituído pela lista das mesmas fases. Um grafo de dependências em
  375px é ilegível, e esconder por CSS só desperdiçaria renderização.

Os checkpoints continuam onde são úteis: a lista de cada trilha marca módulo concluído com um
clique, e a página do módulo tem a lista de "pronto quando" item a item.

## Progresso

Fica em `localStorage`, sem servidor e sem login. Em `/progresso` o dev exporta um JSON e manda
para o mentor, que importa e vê exatamente onde ele está. É o suficiente para acompanhar um dev
por vez; se um dia forem vários ao mesmo tempo, é a hora de trocar por um backend.

## Publicando

O build é estático (`apps/trilha/dist`), então serve em Vercel, Netlify ou GitHub Pages. Como o
app usa rotas do lado do cliente, configure o fallback de qualquer rota para `index.html` — sem
isso, recarregar em `/glossario` devolve 404.
